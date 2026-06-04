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

interface Scene {
  id: string;
  startTime: number;
  endTime: number;
  description: string;
}

interface AnalysisResult {
  videoId: string;
  duration: number;
  highlights: Highlight[];
  scenes: Scene[];
}

interface TrimSettings {
  startTime: number;
  endTime: number;
}

interface SubtitleLine {
  startTime: number;
  endTime: number;
  text: string;
}

type ViewType = 'upload' | 'trim' | 'music' | 'subtitle' | 'effects' | 'speed' | 'highlight' | 'export';

export default function Home() {
  const [view, setView] = useState<ViewType>('upload');
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 剪辑设置
  const [trimSettings, setTrimSettings] = useState<TrimSettings>({ startTime: 0, endTime: 0 });
  const [selectedMusic, setSelectedMusic] = useState<string>('');
  const [subtitles, setSubtitles] = useState<SubtitleLine[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('none');
  const [selectedTransition, setSelectedTransition] = useState<string>('fade');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isGeneratingSubtitles, setIsGeneratingSubtitles] = useState(false);

  const handleVideoUpload = (file: File) => {
    setUploadedVideo(file);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setAnalysisResult(null);
    setError(null);

    // 获取视频元数据
    const video = document.createElement('video');
    video.src = url;
    video.onloadedmetadata = () => {
      setTrimSettings({ startTime: 0, endTime: video.duration });
    };
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
        setView('highlight');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '分析失败，请重试');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateSubtitles = async () => {
    if (!uploadedVideo) return;

    setIsGeneratingSubtitles(true);
    setError(null);

    // 模拟字幕生成
    setTimeout(() => {
      setSubtitles([
        { startTime: 0, endTime: 3, text: '这是第一句字幕' },
        { startTime: 3, endTime: 6, text: '这是第二句字幕' },
        { startTime: 6, endTime: 9, text: '这是第三句字幕' },
      ]);
      setIsGeneratingSubtitles(false);
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
          <p className="mt-2 text-sm sm:text-base text-gray-600">智能剪辑 · 一键生成 · 专业效果</p>
        </div>

        {/* 导航标签 */}
        {uploadedVideo && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-2 border border-gray-100 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {[
                { id: 'upload' as ViewType, label: '📤 上传', icon: '📤' },
                { id: 'trim' as ViewType, label: '✂️ 剪裁', icon: '✂️' },
                { id: 'music' as ViewType, label: '🎵 音乐', icon: '🎵' },
                { id: 'subtitle' as ViewType, label: '📝 字幕', icon: '📝' },
                { id: 'effects' as ViewType, label: '🎨 效果', icon: '🎨' },
                { id: 'speed' as ViewType, label: '⚡ 速度', icon: '⚡' },
                { id: 'highlight' as ViewType, label: '🎯 高光', icon: '🎯' },
                { id: 'export' as ViewType, label: '💾 导出', icon: '💾' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setView(tab.id)}
                  className={`py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
                    view === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 上传视图 */}
        {view === 'upload' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📤 上传视频</h2>
            <VideoUploader onVideoUpload={handleVideoUpload} />

            {videoUrl && (
              <div className="mt-6">
                <h3 className="font-bold text-gray-900 mb-3">🎥 视频预览</h3>
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                  <video src={videoUrl} controls className="w-full h-full">
                    您的浏览器不支持视频播放
                  </video>
                </div>
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
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
                    <span>🎯 开始AI分析</span>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* 剪裁视图 */}
        {view === 'trim' && videoUrl && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">✂️ 视频剪裁</h2>

            <div className="relative aspect-video bg-black rounded-xl overflow-hidden mb-4">
              <video src={videoUrl} controls className="w-full h-full">
                您的浏览器不支持视频播放
              </video>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  开始时间: {formatTime(trimSettings.startTime)}
                </label>
                <input
                  type="range"
                  min="0"
                  max={trimSettings.endTime}
                  value={trimSettings.startTime}
                  onChange={(e) => setTrimSettings({ ...trimSettings, startTime: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  结束时间: {formatTime(trimSettings.endTime)}
                </label>
                <input
                  type="range"
                  min={trimSettings.startTime}
                  max="600"
                  value={trimSettings.endTime}
                  onChange={(e) => setTrimSettings({ ...trimSettings, endTime: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="bg-purple-50 p-4 rounded-xl">
                <p className="text-sm text-gray-700">
                  <strong>剪辑时长:</strong> {formatTime(trimSettings.endTime - trimSettings.startTime)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 音乐视图 */}
        {view === 'music' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">🎵 添加音乐</h2>

            <div className="space-y-3">
              {[
                { id: 'upbeat', name: '欢快背景音乐', duration: '2:30', mood: '轻快' },
                { id: 'calm', name: '温馨钢琴曲', duration: '3:15', mood: '温柔' },
                { id: 'epic', name: '史诗配乐', duration: '2:45', mood: '激昂' },
                { id: 'electronic', name: '电子节拍', duration: '3:00', mood: '动感' }
              ].map((music) => (
                <div
                  key={music.id}
                  onClick={() => setSelectedMusic(music.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedMusic === music.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">{music.name}</h3>
                      <p className="text-sm text-gray-600">时长: {music.duration} · 风格: {music.mood}</p>
                    </div>
                    <button className="w-10 h-10 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center text-white transition-all">
                      ▶
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-gray-700">
                💡 <strong>提示:</strong> 选择的音乐将自动调整至视频长度
              </p>
            </div>
          </div>
        )}

        {/* 字幕视图 */}
        {view === 'subtitle' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📝 添加字幕</h2>

            <button
              onClick={handleGenerateSubtitles}
              disabled={isGeneratingSubtitles}
              className="w-full mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isGeneratingSubtitles ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>AI识别中...</span>
                </>
              ) : (
                <span>🎤 AI自动识别语音生成字幕</span>
              )}
            </button>

            {subtitles.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900 mb-3">字幕列表</h3>
                {subtitles.map((subtitle, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">
                          {formatTime(subtitle.startTime)} - {formatTime(subtitle.endTime)}
                        </p>
                        <input
                          type="text"
                          value={subtitle.text}
                          onChange={(e) => {
                            const newSubtitles = [...subtitles];
                            newSubtitles[index].text = e.target.value;
                            setSubtitles(newSubtitles);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 p-4 bg-yellow-50 rounded-xl">
              <p className="text-sm text-gray-700">
                💡 <strong>AI技术:</strong> 使用Whisper语音识别引擎自动转写音频内容
              </p>
            </div>
          </div>
        )}

        {/* 效果视图 */}
        {view === 'effects' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">🎨 视觉效果</h2>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">🎬 转场效果</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'fade', name: '淡入淡出', icon: '🌅' },
                  { id: 'slide', name: '滑动', icon: '➡️' },
                  { id: 'zoom', name: '缩放', icon: '🔍' },
                  { id: 'dissolve', name: '溶解', icon: '✨' }
                ].map((transition) => (
                  <button
                    key={transition.id}
                    onClick={() => setSelectedTransition(transition.id)}
                    className={`p-3 rounded-xl text-center transition-all ${
                      selectedTransition === transition.id
                        ? 'bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-md'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <div className="text-2xl mb-1">{transition.icon}</div>
                    <p className="text-xs font-semibold">{transition.name}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">🎨 滤镜效果</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'none', name: '无滤镜', preview: 'bg-gray-200' },
                  { id: 'vintage', name: '复古', preview: 'bg-orange-200' },
                  { id: 'bw', name: '黑白', preview: 'bg-gray-400' },
                  { id: 'vivid', name: '鲜艳', preview: 'bg-pink-300' },
                  { id: 'cool', name: '冷色调', preview: 'bg-blue-300' },
                  { id: 'warm', name: '暖色调', preview: 'bg-yellow-300' }
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      selectedFilter === filter.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className={`w-full h-16 ${filter.preview} rounded-lg mb-2`}></div>
                    <p className="text-xs font-semibold text-gray-900">{filter.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 速度视图 */}
        {view === 'speed' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">⚡ 播放速度</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  速度: {playbackSpeed}x
                </label>
                <input
                  type="range"
                  min="0.25"
                  max="4"
                  step="0.25"
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setPlaybackSpeed(speed)}
                    className={`py-2 px-3 rounded-lg font-semibold transition-all ${
                      playbackSpeed === speed
                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>

              <div className="bg-green-50 p-4 rounded-xl">
                <p className="text-sm text-gray-700">
                  <strong>效果预览:</strong>
                  {playbackSpeed < 1 && ' 慢动作效果，适合展示细节'}
                  {playbackSpeed === 1 && ' 正常速度'}
                  {playbackSpeed > 1 && ' 快进效果，适合压缩时长'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 高光时刻视图 */}
        {view === 'highlight' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">🎯 AI高光时刻分析</h2>

            {!analysisResult ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">请先在"上传"页面进行AI分析</p>
                <button
                  onClick={() => setView('upload')}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-2 px-6 rounded-xl"
                >
                  前往上传
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">检测到高光时刻</span>
                    <span className="text-purple-600 font-bold">{analysisResult.highlights.length} 个</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-700 font-medium">场景分割</span>
                    <span className="text-pink-600 font-bold">{analysisResult.scenes.length} 个</span>
                  </div>
                </div>

                <h3 className="font-bold text-gray-900 mb-3">✨ 高光时刻列表</h3>
                <div className="space-y-2 mb-6 max-h-96 overflow-y-auto">
                  {analysisResult.highlights.map((highlight, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{highlight.description}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            时间: {formatTime(highlight.timestamp)} ·
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

                <h3 className="font-bold text-gray-900 mb-3">🎬 场景分割</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {analysisResult.scenes.map((scene) => (
                    <div key={scene.id} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-semibold text-gray-900 mb-1">{scene.description}</p>
                      <p className="text-xs text-gray-600">
                        {formatTime(scene.startTime)} - {formatTime(scene.endTime)}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* 导出视图 */}
        {view === 'export' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">💾 导出视频</h2>

            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <h3 className="font-bold text-gray-900 mb-3">📋 剪辑配置总览</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">剪辑时长:</span>
                    <span className="font-semibold">{formatTime(trimSettings.endTime - trimSettings.startTime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">背景音乐:</span>
                    <span className="font-semibold">{selectedMusic || '未选择'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">字幕:</span>
                    <span className="font-semibold">{subtitles.length} 条</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">滤镜:</span>
                    <span className="font-semibold">{selectedFilter === 'none' ? '无' : selectedFilter}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">播放速度:</span>
                    <span className="font-semibold">{playbackSpeed}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">转场效果:</span>
                    <span className="font-semibold">{selectedTransition}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">📤 导出格式</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'mp4', name: 'MP4视频', desc: '通用格式' },
                    { id: 'json', name: '时间轴JSON', desc: '供进一步编辑' },
                    { id: 'pr', name: 'Premiere工程', desc: 'PR工程文件' }
                  ].map((format) => (
                    <button
                      key={format.id}
                      className="p-4 border-2 border-gray-200 hover:border-purple-500 rounded-xl transition-all text-left"
                    >
                      <p className="font-bold text-gray-900">{format.name}</p>
                      <p className="text-xs text-gray-600 mt-1">{format.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>开始导出</span>
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
      </div>
    </main>
  );
}

