'use client';

import { useState } from 'react';
import FoodCamera from '@/components/FoodCamera';

interface FoodLog {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  weight_grams: number;
  confidence: number;
}

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 用户基本信息（MVP阶段使用固定值）
  const caloriesTarget = 2000;
  const caloriesConsumed = foodLogs.reduce((sum, log) => sum + log.calories, 0);
  const proteinConsumed = foodLogs.reduce((sum, log) => sum + log.protein, 0);
  const carbsConsumed = foodLogs.reduce((sum, log) => sum + log.carbs, 0);
  const fatConsumed = foodLogs.reduce((sum, log) => sum + log.fat, 0);

  const handleRecognize = async () => {
    if (!selectedFile) {
      setError('请先选择图片');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch('/api/food-recognition', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '识别失败');
      }

      if (data.success && data.foods) {
        setFoodLogs([...foodLogs, ...data.foods]);
        setSelectedFile(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '识别失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
        {/* 标题 */}
        <div className="text-center pt-2 sm:pt-4 pb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mb-3 sm:mb-4 shadow-lg">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            健康饮食助手
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">AI 智能识别食物热量 · 科学管理健康</p>
        </div>

        {/* 今日热量摄入卡片 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">今日热量</h2>
            <span className="text-xs sm:text-sm text-gray-500">
              {new Date().toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
            </span>
          </div>

          {/* 进度环形图 */}
          <div className="mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                <svg className="transform -rotate-90 w-full h-full">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - Math.min(caloriesConsumed / caloriesTarget, 1))}`}
                    className={`transition-all duration-500 ${
                      caloriesConsumed > caloriesTarget ? 'text-red-500' : 'text-green-500'
                    }`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">{caloriesConsumed}</span>
                  <span className="text-xs sm:text-sm text-gray-500">/ {caloriesTarget} 卡</span>
                </div>
              </div>
            </div>
          </div>

          {/* 营养素分布 */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="text-center p-2 sm:p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl mb-1">💪</div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">蛋白质</p>
              <p className="text-base sm:text-lg font-bold text-blue-600">{proteinConsumed.toFixed(1)}g</p>
            </div>
            <div className="text-center p-2 sm:p-3 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl mb-1">🌾</div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">碳水</p>
              <p className="text-base sm:text-lg font-bold text-amber-600">{carbsConsumed.toFixed(1)}g</p>
            </div>
            <div className="text-center p-2 sm:p-3 bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl border border-rose-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl mb-1">🥑</div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">脂肪</p>
              <p className="text-base sm:text-lg font-bold text-rose-600">{fatConsumed.toFixed(1)}g</p>
            </div>
          </div>
        </div>

        {/* 拍照上传 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📸 记录食物</h2>

          <FoodCamera onImageCapture={setSelectedFile} />

          {selectedFile && (
            <button
              onClick={handleRecognize}
              disabled={isLoading}
              className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 sm:py-4 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>AI 识别中...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>开始识别</span>
                </>
              )}
            </button>
          )}

          {error && (
            <div className="mt-4 p-3 sm:p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3 animate-shake">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 text-sm flex-1">{error}</p>
            </div>
          )}
        </div>

        {/* 今日餐品记录 */}
        {foodLogs.length > 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">🍽️ 今日餐品</h2>
              <span className="text-xs sm:text-sm px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                {foodLogs.length} 项
              </span>
            </div>

            <div className="space-y-3">
              {foodLogs.map((log, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-3 sm:p-4 hover:border-green-300 hover:shadow-md transition-all duration-200 bg-white"
                >
                  <div className="flex justify-between items-start mb-2 sm:mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🍴</span>
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg">{log.name}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        {log.calories}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500 ml-1">卡</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-2">
                    <span className="px-2 py-1 bg-gray-100 rounded-md">⚖️ {log.weight_grams}g</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm">
                    <div className="bg-blue-50 rounded-lg p-2 text-center">
                      <p className="text-gray-600">蛋白质</p>
                      <p className="font-semibold text-blue-600">{log.protein.toFixed(1)}g</p>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-2 text-center">
                      <p className="text-gray-600">碳水</p>
                      <p className="font-semibold text-amber-600">{log.carbs.toFixed(1)}g</p>
                    </div>
                    <div className="bg-rose-50 rounded-lg p-2 text-center">
                      <p className="text-gray-600">脂肪</p>
                      <p className="font-semibold text-rose-600">{log.fat.toFixed(1)}g</p>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-end gap-1 text-xs text-gray-400">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>AI 置信度 {(log.confidence * 100).toFixed(0)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-md p-8 sm:p-12 border border-gray-100 text-center">
            <div className="text-6xl sm:text-7xl mb-4">🍽️</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">还没有记录</h3>
            <p className="text-sm sm:text-base text-gray-500">拍照上传食物照片，AI 帮你识别营养信息</p>
          </div>
        )}
      </div>
    </main>
  );
}
