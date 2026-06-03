import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface HighlightMoment {
  timestamp: number;
  duration: number;
  type: 'scene_change' | 'audio_peak' | 'exciting_moment';
  confidence: number;
  description: string;
}

interface AnalysisResult {
  success: boolean;
  videoId: string;
  duration: number;
  highlights: HighlightMoment[];
  scenes: Array<{
    id: string;
    startTime: number;
    endTime: number;
    description: string;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const videoFile = formData.get('video') as File;

    if (!videoFile) {
      return NextResponse.json(
        { success: false, error: '未提供视频文件' },
        { status: 400 }
      );
    }

    // 检查文件类型
    const allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska'];
    if (!allowedTypes.includes(videoFile.type)) {
      return NextResponse.json(
        { success: false, error: '不支持的视频格式，请上传MP4、MOV、AVI或MKV文件' },
        { status: 400 }
      );
    }

    // 检查文件大小（2GB限制）
    const maxSize = 2 * 1024 * 1024 * 1024;
    if (videoFile.size > maxSize) {
      return NextResponse.json(
        { success: false, error: '视频文件过大，最大支持2GB' },
        { status: 400 }
      );
    }

    // 生成视频ID
    const videoId = `video_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // MVP版本：使用模拟数据进行分析
    // 在完整版本中，这里会调用FFmpeg进行实际的视频分析
    const mockAnalysis = generateMockAnalysis(videoId, videoFile.size);

    return NextResponse.json(mockAnalysis);

  } catch (error) {
    console.error('视频分析错误:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '视频分析失败，请重试'
      },
      { status: 500 }
    );
  }
}

// 生成模拟分析数据（MVP版本）
function generateMockAnalysis(videoId: string, fileSize: number): AnalysisResult {
  // 根据文件大小估算时长（粗略估计：1MB约1秒）
  const estimatedDuration = Math.floor(fileSize / (1024 * 1024)) || 60;

  const highlights: HighlightMoment[] = [];
  const scenes = [];

  // 生成高光时刻（每30秒一个）
  const highlightCount = Math.min(Math.floor(estimatedDuration / 30), 10);
  for (let i = 0; i < highlightCount; i++) {
    const timestamp = (i + 1) * Math.floor(estimatedDuration / (highlightCount + 1));
    highlights.push({
      timestamp,
      duration: Math.floor(Math.random() * 5) + 8, // 8-13秒
      type: ['scene_change', 'audio_peak', 'exciting_moment'][Math.floor(Math.random() * 3)] as any,
      confidence: 0.7 + Math.random() * 0.25, // 0.7-0.95
      description: [
        '精彩画面切换',
        '音量峰值时刻',
        '重要场景片段',
        '高能反应镜头',
        '关键对话片段'
      ][Math.floor(Math.random() * 5)]
    });
  }

  // 生成场景分割
  const sceneCount = Math.min(Math.floor(estimatedDuration / 20), 15);
  for (let i = 0; i < sceneCount; i++) {
    const startTime = i * Math.floor(estimatedDuration / sceneCount);
    const endTime = (i + 1) * Math.floor(estimatedDuration / sceneCount);
    scenes.push({
      id: `scene_${i + 1}`,
      startTime,
      endTime,
      description: `场景 ${i + 1}`
    });
  }

  return {
    success: true,
    videoId,
    duration: estimatedDuration,
    highlights: highlights.sort((a, b) => b.confidence - a.confidence),
    scenes
  };
}
