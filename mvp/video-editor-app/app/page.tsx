'use client';

import { useState } from 'react';
import VideoUploader from '@/components/VideoUploader';

export default function Home() {
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleVideoUpload = (file: File) => {
    setUploadedVideo(file);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
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
        {videoUrl && (
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

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>开始AI分析</span>
              </button>
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
                <p>上传您的长视频（支持MP4、MOV格式，最大2GB，时长30分钟内）</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-xs">2</span>
                <p>AI自动分析视频内容，识别高光时刻、场景切换和精彩片段</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-xs">3</span>
                <p>选择您想要的视频时长（30秒/1分钟/3分钟），一键生成短视频</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-xs">4</span>
                <p>预览并下载成品视频，可直接发布到各大短视频平台</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
