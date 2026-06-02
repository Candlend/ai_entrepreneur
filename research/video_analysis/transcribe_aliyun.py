#!/usr/bin/env python3
"""
使用阿里云ASR服务转录音频文件
"""
import os
import json
import time
import sys
from pathlib import Path
from aliyunsdkcore.client import AcsClient
from aliyunsdkcore.request import CommonRequest
from dotenv import load_dotenv

load_dotenv()

def upload_to_oss(audio_file):
    """上传音频文件到阿里云OSS"""
    import oss2

    access_key_id = os.getenv('ALIYUN_ACCESS_KEY_ID')
    access_key_secret = os.getenv('ALIYUN_ACCESS_KEY_SECRET')
    endpoint = os.getenv('ALIYUN_OSS_ENDPOINT')
    bucket_name = os.getenv('ALIYUN_OSS_BUCKET_NAME')

    auth = oss2.Auth(access_key_id, access_key_secret)
    bucket = oss2.Bucket(auth, endpoint, bucket_name)

    # 生成OSS对象名
    file_name = Path(audio_file).name
    object_name = f"asr_temp/{file_name}"

    print(f"正在上传到OSS: {object_name}")
    bucket.put_object_from_file(object_name, audio_file)

    # 生成公网访问URL（24小时有效）
    url = bucket.sign_url('GET', object_name, 24 * 3600)
    print(f"OSS URL: {url}")
    return url

def transcribe_file(file_url, output_file):
    """使用阿里云ASR转录音频文件"""
    access_key_id = os.getenv('ALIYUN_ACCESS_KEY_ID')
    access_key_secret = os.getenv('ALIYUN_ACCESS_KEY_SECRET')
    app_key = os.getenv('ALIYUN_ASR_APPKEY')

    REGION_ID = "cn-shanghai"
    PRODUCT = "nls-filetrans"
    DOMAIN = "filetrans.cn-shanghai.aliyuncs.com"
    API_VERSION = "2018-08-17"

    client = AcsClient(access_key_id, access_key_secret, REGION_ID)

    # 提交转录任务
    post_request = CommonRequest()
    post_request.set_domain(DOMAIN)
    post_request.set_version(API_VERSION)
    post_request.set_product(PRODUCT)
    post_request.set_action_name("SubmitTask")
    post_request.set_method('POST')

    task = {
        "appkey": app_key,
        "file_link": file_url,
        "version": "4.0",
        "enable_words": False
    }
    post_request.add_body_params("Task", json.dumps(task))

    print("提交转录任务...")
    post_response = client.do_action_with_exception(post_request)
    post_response = json.loads(post_response)
    print(f"任务响应: {post_response}")

    if post_response.get("StatusText") != "SUCCESS":
        print("任务提交失败！")
        return None

    task_id = post_response.get("TaskId")
    print(f"任务ID: {task_id}")

    # 轮询查询结果
    get_request = CommonRequest()
    get_request.set_domain(DOMAIN)
    get_request.set_version(API_VERSION)
    get_request.set_product(PRODUCT)
    get_request.set_action_name("GetTaskResult")
    get_request.set_method('GET')
    get_request.add_query_param("TaskId", task_id)

    print("等待转录完成...")
    while True:
        get_response = client.do_action_with_exception(get_request)
        get_response = json.loads(get_response)

        status = get_response.get("StatusText")
        print(f"状态: {status}")

        if status in ["RUNNING", "QUEUEING"]:
            time.sleep(10)
        elif status == "SUCCESS":
            print("转录成功！")
            result = get_response.get("Result")

            # 保存完整结果
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(get_response, f, ensure_ascii=False, indent=2)

            # 提取纯文本
            if result:
                sentences = json.loads(result).get("Sentences", [])
                text = "\n".join([s.get("Text", "") for s in sentences])

                text_file = Path(output_file).with_suffix('.txt')
                with open(text_file, 'w', encoding='utf-8') as f:
                    f.write(text)

                print(f"转录文本保存到: {text_file}")

            return get_response
        else:
            print(f"转录失败: {status}")
            return None

def main():
    if len(sys.argv) < 2:
        print("用法: python transcribe_aliyun.py <audio_file>")
        sys.exit(1)

    audio_file = sys.argv[1]
    if not Path(audio_file).exists():
        print(f"错误: 文件不存在: {audio_file}")
        sys.exit(1)

    # 上传到OSS
    try:
        file_url = upload_to_oss(audio_file)
    except Exception as e:
        print(f"上传失败: {e}")
        sys.exit(1)

    # 转录
    output_file = Path(audio_file).with_suffix('.json')
    result = transcribe_file(file_url, output_file)

    if result:
        print(f"完整结果保存到: {output_file}")
    else:
        print("转录失败")
        sys.exit(1)

if __name__ == '__main__':
    main()
