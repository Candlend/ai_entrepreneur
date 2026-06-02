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
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* 标题 */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">健康饮食助手</h1>
          <p className="mt-2 text-gray-600">AI 智能识别食物热量</p>
        </div>

        {/* 今日热量摄入卡片 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">今日热量</h2>

          {/* 进度条 */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>已摄入 {caloriesConsumed} 卡路里</span>
              <span>目标 {caloriesTarget} 卡路里</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  caloriesConsumed > caloriesTarget ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min((caloriesConsumed / caloriesTarget) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* 营养素分布 */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">蛋白质</p>
              <p className="text-lg font-semibold text-blue-600">{proteinConsumed.toFixed(1)}g</p>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-gray-600">碳水</p>
              <p className="text-lg font-semibold text-yellow-600">{carbsConsumed.toFixed(1)}g</p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <p className="text-sm text-gray-600">脂肪</p>
              <p className="text-lg font-semibold text-red-600">{fatConsumed.toFixed(1)}g</p>
            </div>
          </div>
        </div>

        {/* 拍照上传 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">记录食物</h2>

          <FoodCamera onImageCapture={setSelectedFile} />

          {selectedFile && (
            <button
              onClick={handleRecognize}
              disabled={isLoading}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              {isLoading ? '识别中...' : '开始识别'}
            </button>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* 今日餐品记录 */}
        {foodLogs.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">今日餐品</h2>

            <div className="space-y-3">
              {foodLogs.map((log, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{log.name}</h3>
                    <span className="text-lg font-bold text-green-600">
                      {log.calories} 卡
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>重量：{log.weight_grams}克</p>
                    <p>蛋白质：{log.protein.toFixed(1)}g | 碳水：{log.carbs.toFixed(1)}g | 脂肪：{log.fat.toFixed(1)}g</p>
                    <p className="text-xs text-gray-500">
                      AI置信度：{(log.confidence * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
