import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ClipRequest {
  videoId: string;
  duration: 30 | 60 | 180;
  highlights: string[];
}

interface ClipResult {
  success: boolean;
  clipId: string;
  clipUrl: string;
  duration: number;
  segments: Array<{
    startTime: number;
    endTime: number;
    description: string;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const body: ClipRequest = await request.json();
    const { videoId, duration, highlights } = body;

    if (!videoId || !duration) {
      return NextResponse.json(
        { success: false, error: '缺少必要参数' },
        { status: 400 }
      );
    }

    if (![30, 60, 180].includes(duration)) {
      return NextResponse.json(
        { success: false, error: '时长必须是30、60或180秒' },
        { status: 400 }
      );
    }

    // 生成剪辑ID
    const clipId = `clip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // MVP版本：生成模拟剪辑结果
    // 完整版本中，这里会调用FFmpeg进行实际的视频剪辑
    const mockClip = generateMockClip(clipId, videoId, duration, highlights);

    return NextResponse.json(mockClip);

  } catch (error) {
    console.error('视频剪辑错误:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '视频剪辑失败，请重试'
      },
      { status: 500 }
    );
  }
}

// 生成模拟剪辑数据（MVP版本）
function generateMockClip(
  clipId: string,
  videoId: string,
  targetDuration: number,
  selectedHighlights: string[]
): ClipResult {
  const segmentCount = targetDuration === 30 ? 3 : targetDuration === 60 ? 5 : 8;
  const segmentDuration = Math.floor(targetDuration / segmentCount);

  const segments = [];
  let currentTime = 0;

  for (let i = 0; i < segmentCount; i++) {
    const startTime = Math.floor(Math.random() * 100) + i * 20; // 分散在视频各处
    segments.push({
      startTime,
      endTime: startTime + segmentDuration,
      description: `精彩片段 ${i + 1}`
    });
    currentTime += segmentDuration;
  }

  // MVP版本：返回模拟的视频URL
  // 完整版本会返回实际生成的视频文件URL
  const clipUrl = `/demo-clips/${clipId}.mp4`;

  return {
    success: true,
    clipId,
    clipUrl,
    duration: targetDuration,
    segments
  };
}
