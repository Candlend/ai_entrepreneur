#!/usr/bin/env python3
"""
使用OpenAI Whisper API转录音频文件
"""
import os
import sys
from pathlib import Path
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

def transcribe_audio(audio_file):
    """使用OpenAI Whisper API转录音频"""
    client = OpenAI(
        api_key=os.getenv('OPENAI_API_KEY'),
        base_url=os.getenv('OPENAI_API_BASE')
    )

    print(f"正在转录: {audio_file}")

    with open(audio_file, 'rb') as f:
        transcript = client.audio.transcriptions.create(
            model="whisper-1",
            file=f,
            language="zh"
        )

    return transcript.text

def main():
    if len(sys.argv) < 2:
        print("用法: python transcribe_openai.py <audio_file>")
        sys.exit(1)

    audio_file = sys.argv[1]
    if not Path(audio_file).exists():
        print(f"错误: 文件不存在: {audio_file}")
        sys.exit(1)

    try:
        text = transcribe_audio(audio_file)

        # 保存文本
        output_txt = Path(audio_file).with_suffix('.txt')
        with open(output_txt, 'w', encoding='utf-8') as f:
            f.write(text)

        print(f"转录完成，保存到: {output_txt}")
        print(f"\n文本预览:\n{text[:500]}...")

        return True
    except Exception as e:
        print(f"转录失败: {e}")
        return False

if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1)
