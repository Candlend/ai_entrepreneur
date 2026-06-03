'use client';

import { useState } from 'react';
import VideoUploader from '@/components/VideoUploader';

interface Highlight {
  timestamp: number;
  duration: number;
  type: string;
  confidence: number;
  description: string;
}

interface AnalysisResult {
  videoId: string;
  duration: number;
  highlights: Highlight[];
}

interface ClipResult {
  clipId: string;
  clipUrl: string;
  duration: number;
}

export default function Home() {
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isClipping, setIsClipping] = useState(false);
  const [clipResult, setClipResult] = useState<ClipResult | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<30 | 60 | 180>(60);
  const [error, setError] = useState<string | null>(null);

  const handleVideoUpload = (file: File) => {
    setUploadedVideo(file);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setAnalysisResult(null);
    setClipResult(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!uploadedVideo) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('video', uploadedVideo);

      const response = await fetch('/api/video/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '分析失败');
      }

      if (data.success) {
        setAnalysisResult(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '分析失败，请重试');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateClip = async () => {
    if (!analysisResult) return;

    setIsClipping(true);
    setError(null);

    try {
      const response = await fetch('/api/video/clip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoId: analysisResult.videoId,
          duration: selectedDuration,
          highlights: analysisResult.highlights.slice(0, 5).map((_, i) => `highlight_${i}`)
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '剪辑失败');
      }

      if (data.success) {
        setClipResult(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '剪辑失败，请重试');
    } finally {
      setIsClipping(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        {/* 标题 */}
        <div className="text-center pt-2 sm:pt-4 pb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-3 sm:mb-4 shadow-lg">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI视频剪辑助手
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">上传长视频 · AI识别高光 · 一键生成精彩短视频</p>
        </div>

        {/* 功能介绍卡片 */}
        {!uploadedVideo && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-2">🎬</div>
              <h3 className="font-bold text-gray-900 mb-1">智能分析</h3>
              <p className="text-sm text-gray-600">AI自动识别视频中的精彩时刻和场景切换</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-2">✂️</div>
              <h3 className="font-bold text-gray-900 mb-1">一键剪辑</h3>
              <p className="text-sm text-gray-600">自动生成30秒/1分钟/3分钟短视频</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-2">📱</div>
              <h3 className="font-bold text-gray-900 mb-1">快速导出</h3>
              <p className="text-sm text-gray-600">支持多种格式导出，适配各大平台</p>
            </div>
          </div>
        )}

        {/* 视频上传区域 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📤 上传视频</h2>
          <VideoUploader onVideoUpload={handleVideoUpload} />
        </div>

        {/* 视频预览 */}
        {videoUrl && !analysisResult && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">🎥 视频预览</h2>
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
              <video
                src={videoUrl}
                controls
                className="w-full h-full"
              >
                您的浏览器不支持视频播放
              </video>
            </div>

            <div className="mt-4">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>AI分析中...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>开始AI分析</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* 分析结果 */}
        {analysisResult && !clipResult && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">✨ 分析结果</h2>

            <div className="mb-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">视频时长</span>
                <span className="text-purple-600 font-bold">{Math.floor(analysisResult.duration / 60)}:{(analysisResult.duration % 60).toString().padStart(2, '0')}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-700 font-medium">高光时刻</span>
                <span className="text-pink-600 font-bold">{analysisResult.highlights.length} 个</span>
              </div>
            </div>

            <h3 className="font-bold text-gray-900 mb-3">🎯 高光时刻</h3>
            <div className="space-y-2 mb-6 max-h-64 overflow-y-auto">
              {analysisResult.highlights.map((highlight, index) => (
                <div key={index} className="p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{highlight.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        时间: {Math.floor(highlight.timestamp / 60)}:{(highlight.timestamp % 60).toString().padStart(2, '0')} ·
                        时长: {highlight.duration}秒 ·
                        置信度: {(highlight.confidence * 100).toFixed(0)}%
                      </p>
                    </div>
                    <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">
                      {highlight.type === 'scene_change' ? '场景' : highlight.type === 'audio_peak' ? '音频' : '精彩'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-bold text-gray-900 mb-3">🎬 选择时长</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {([30, 60, 180] as const).map((duration) => (
                  <button
                    key={duration}
                    onClick={() => setSelectedDuration(duration)}
                    className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                      selectedDuration === duration
                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {duration < 60 ? `${duration}秒` : `${duration / 60}分钟`}
                  </button>
                ))}
              </div>

              <button
                onClick={handleGenerateClip}
                disabled={isClipping}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isClipping ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>生成中...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>生成短视频</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* 剪辑结果 */}
        {clipResult && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">🎉 短视频生成成功！</h2>

            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900">视频生成完成</p>
                  <p className="text-sm text-gray-600">时长: {clipResult.duration}秒</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setUploadedVideo(null);
                  setVideoUrl(null);
                  setAnalysisResult(null);
                  setClipResult(null);
                }}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
              >
                🎬 处理新视频
              </button>
            </div>
          </div>
        )}

        {/* 错误提示 */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 text-sm flex-1">{error}</p>
            </div>
          </div>
        )}

        {/* 使用说明 */}
        {!uploadedVideo && (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-md p-6 sm:p-8 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">💡 使用说明</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-xs">1</span>
                <p>上传您的长视频（支持MP4、MOV、AVI、MKV格式，最大2GB）</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-xs">2</span>
                <p>点击"开始AI分析"，系统自动识别视频中的高光时刻</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-xs">3</span>
                <p>选择您想要的短视频时长（30秒/1分钟/3分钟）</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-xs">4</span>
                <p>点击"生成短视频"，即可获得精彩剪辑成品</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
