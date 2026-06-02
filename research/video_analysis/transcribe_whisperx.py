#!/usr/bin/env python3
"""
使用WhisperX转录音频文件（本地运行，更快更准确）
"""
import sys
import torch
from pathlib import Path
import whisperx

def transcribe_audio(audio_file, device="cuda", compute_type="float16"):
    """使用WhisperX转录音频"""

    # 如果没有GPU，使用CPU
    if not torch.cuda.is_available():
        device = "cpu"
        compute_type = "int8"

    print(f"正在转录: {audio_file}")
    print(f"设备: {device}, 计算类型: {compute_type}")

    # 加载模型
    model = whisperx.load_model("large-v2", device, compute_type=compute_type, language="zh")

    # 转录
    audio = whisperx.load_audio(audio_file)
    result = model.transcribe(audio, batch_size=16)

    # 对齐
    model_a, metadata = whisperx.load_align_model(language_code=result["language"], device=device)
    result = whisperx.align(result["segments"], model_a, metadata, audio, device, return_char_alignments=False)

    return result

def main():
    if len(sys.argv) < 2:
        print("用法: python transcribe_whisperx.py <audio_file>")
        sys.exit(1)

    audio_file = sys.argv[1]
    if not Path(audio_file).exists():
        print(f"错误: 文件不存在: {audio_file}")
        sys.exit(1)

    try:
        result = transcribe_audio(audio_file)

        # 提取文本
        text = " ".join([seg["text"] for seg in result["segments"]])

        # 保存文本
        output_txt = Path(audio_file).with_suffix('.txt')
        with open(output_txt, 'w', encoding='utf-8') as f:
            f.write(text)

        print(f"转录完成，保存到: {output_txt}")
        print(f"\n文本预览:\n{text[:500]}...")

        return True
    except Exception as e:
        print(f"转录失败: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1)
