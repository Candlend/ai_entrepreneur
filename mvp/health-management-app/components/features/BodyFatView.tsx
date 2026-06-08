'use client';

import { useState } from 'react';
import type { BodyFatResult, UserProfile } from '@/types';
import Card from '@/components/ui/Card';

interface BodyFatViewProps {
  userProfile: UserProfile;
  bodyFatResult: BodyFatResult | null;
  isLoading: boolean;
  error: string | null;
  onAnalyze: (file: File) => void;
}

export default function BodyFatView({
  userProfile,
  bodyFatResult,
  isLoading,
  error,
  onAnalyze,
}: BodyFatViewProps) {
  const [bodyPhotoFile, setBodyPhotoFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setBodyPhotoFile(file);
  };

  const handleAnalyze = () => {
    if (bodyPhotoFile) {
      onAnalyze(bodyPhotoFile);
    }
  };

  return (
    <Card title="📊 AI 体脂率分析">
      <div className="mb-6 rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-6">
        <div className="mb-4 text-center">
          <div className="mb-4 text-6xl">📸</div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">上传身体照片</h3>
          <p className="mb-4 text-sm text-gray-600">AI 将分析您的体型并估算体脂率</p>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="body-photo"
          />
          <label
            htmlFor="body-photo"
            className="inline-block cursor-pointer rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
          >
            选择照片
          </label>
        </div>

        {bodyPhotoFile && (
          <div className="text-center">
            <p className="mb-3 text-sm text-gray-600">已选择: {bodyPhotoFile.name}</p>
            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg disabled:opacity-50"
            >
              {isLoading ? 'AI 分析中...' : '开始分析'}
            </button>
          </div>
        )}
      </div>

      {bodyFatResult && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 text-center">
              <p className="mb-2 text-sm text-gray-600">预估体脂率</p>
              <p className="mb-2 text-5xl font-bold text-purple-600">{bodyFatResult.bodyFat}%</p>
              <p className="text-sm text-gray-500">范围: {bodyFatResult.bodyFatRange}</p>
              <div className="mt-4 inline-block rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">
                {bodyFatResult.category}
              </div>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-blue-50 p-4 text-center">
                <p className="mb-1 text-sm text-gray-600">体重</p>
                <p className="text-2xl font-bold text-blue-600">{userProfile.weight} kg</p>
              </div>
              <div className="rounded-xl bg-purple-50 p-4 text-center">
                <p className="mb-1 text-sm text-gray-600">内脏脂肪</p>
                <p className="text-2xl font-bold text-purple-600">{bodyFatResult.visceral}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="mb-3 font-semibold text-gray-900">💡 个性化建议</h4>
              <div className="space-y-2">
                {bodyFatResult.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm text-gray-700">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
            <div className="flex gap-2">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-yellow-800">
                <strong>免责声明：</strong>
                本分析结果仅供参考，误差范围±3%。如需精确数据，请使用专业体脂秤或咨询医疗机构。
              </p>
            </div>
          </div>
        </div>
      )}

      {!bodyFatResult && (
        <div className="rounded-xl bg-gray-50 p-6">
          <h4 className="mb-3 font-semibold text-gray-900">📋 使用说明</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-blue-500">1.</span>
              <span>上传正面或侧面身体照片（建议穿紧身衣或运动装）</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-500">2.</span>
              <span>确保照片清晰，光线充足</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-500">3.</span>
              <span>AI 将分析体型特征并估算体脂率</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-500">4.</span>
              <span>获得个性化健康建议</span>
            </li>
          </ul>
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-start gap-3 rounded-lg border-l-4 border-red-500 bg-red-50 p-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </Card>
  );
}
