'use client';

import { useState } from 'react';
import type { FoodLog, NutritionTotals } from '@/types';
import Card from '@/components/ui/Card';
import ProgressRing from '@/components/ui/ProgressRing';
import FoodCamera from '@/components/FoodCamera';

interface DietViewProps {
  foodLogs: FoodLog[];
  nutritionTotals: NutritionTotals;
  netCalories: number;
  caloriesTarget: number;
  caloriesBurned: number;
  isLoading: boolean;
  error: string | null;
  onRecognize: (file: File) => void;
  onDeleteFood: (id: string) => void;
  onClearFile: () => void;
}

export default function DietView({
  foodLogs,
  nutritionTotals,
  netCalories,
  caloriesTarget,
  caloriesBurned,
  isLoading,
  error,
  onRecognize,
  onDeleteFood,
  onClearFile,
}: DietViewProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageCapture = (file: File) => {
    setSelectedFile(file);
  };

  const handleRecognize = () => {
    if (selectedFile) {
      onRecognize(selectedFile);
      setSelectedFile(null);
    }
  };

  return (
    <>
      <Card
        title="今日热量"
        subtitle={new Date().toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
      >
        <div className="mb-4 flex flex-col items-center">
          <ProgressRing
            value={netCalories}
            max={caloriesTarget}
            color={netCalories > caloriesTarget ? 'text-red-500' : 'text-green-500'}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-green-50 p-3">
            <p className="mb-1 text-gray-600">摄入</p>
            <p className="text-lg font-bold text-green-600">+{nutritionTotals.calories}</p>
          </div>
          <div className="rounded-lg bg-orange-50 p-3">
            <p className="mb-1 text-gray-600">消耗</p>
            <p className="text-lg font-bold text-orange-600">-{caloriesBurned}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-4">
          <NutrientCard
            emoji="💪"
            label="蛋白质"
            value={nutritionTotals.protein}
            unit="g"
            color="blue"
          />
          <NutrientCard
            emoji="🌾"
            label="碳水"
            value={nutritionTotals.carbs}
            unit="g"
            color="amber"
          />
          <NutrientCard emoji="🥑" label="脂肪" value={nutritionTotals.fat} unit="g" color="rose" />
        </div>
      </Card>

      <Card title="📸 记录食物">
        <FoodCamera onImageCapture={handleImageCapture} />

        {selectedFile && (
          <button
            onClick={handleRecognize}
            disabled={isLoading}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:from-green-600 hover:to-emerald-700 hover:shadow-lg active:scale-95 disabled:from-gray-400 disabled:to-gray-500 sm:py-4"
          >
            {isLoading ? (
              <>
                <Spinner />
                <span>AI 识别中...</span>
              </>
            ) : (
              <>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span>开始识别</span>
              </>
            )}
          </button>
        )}

        {error && (
          <div className="mt-4 flex items-start gap-3 rounded-lg border-l-4 border-red-500 bg-red-50 p-3 sm:p-4">
            <svg
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <p className="flex-1 text-sm text-red-700">{error}</p>
          </div>
        )}
      </Card>

      {foodLogs.length > 0 ? (
        <Card
          title="🍽️ 今日餐品"
          subtitle={
            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 sm:text-sm">
              {foodLogs.length} 项
            </span>
          }
        >
          <div className="space-y-3">
            {foodLogs.map(log => (
              <FoodLogCard key={log.id} log={log} onDelete={onDeleteFood} />
            ))}
          </div>
        </Card>
      ) : (
        <EmptyState
          emoji="🍽️"
          title="还没有记录"
          description="拍照上传食物照片，AI 帮你识别营养信息"
        />
      )}
    </>
  );
}

function NutrientCard({
  emoji,
  label,
  value,
  unit,
  color,
}: {
  emoji: string;
  label: string;
  value: number;
  unit: string;
  color: string;
}) {
  const bgMap: Record<string, string> = {
    blue: 'from-blue-50 to-blue-100 border-blue-200',
    amber: 'from-amber-50 to-amber-100 border-amber-200',
    rose: 'from-rose-50 to-rose-100 border-rose-200',
  };
  const textMap: Record<string, string> = {
    blue: 'text-blue-600',
    amber: 'text-amber-600',
    rose: 'text-rose-600',
  };

  return (
    <div
      className={`bg-gradient-to-br p-2 text-center sm:p-3 ${bgMap[color]} rounded-xl border shadow-sm transition-shadow hover:shadow-md`}
    >
      <div className="mb-1 text-2xl">{emoji}</div>
      <p className="mb-1 text-xs text-gray-600 sm:text-sm">{label}</p>
      <p className={`text-base font-bold sm:text-lg ${textMap[color]}`}>
        {value.toFixed(1)}
        {unit}
      </p>
    </div>
  );
}

function FoodLogCard({ log, onDelete }: { log: FoodLog; onDelete: (id: string) => void }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 transition-all duration-200 hover:border-green-300 hover:shadow-md sm:p-4">
      <div className="mb-2 flex items-start justify-between sm:mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍴</span>
          <div>
            <h3 className="text-base font-bold text-gray-900 sm:text-lg">{log.name}</h3>
            <p className="text-xs text-gray-500">{log.time}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
              {log.calories}
            </span>
            <span className="ml-1 text-xs text-gray-500 sm:text-sm">卡</span>
          </div>
          <button
            onClick={() => onDelete(log.id)}
            className="rounded-lg p-1 transition-colors hover:bg-red-50"
          >
            <svg
              className="h-5 w-5 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="mb-2 flex items-center gap-2 text-xs text-gray-600 sm:text-sm">
        <span className="rounded-md bg-gray-100 px-2 py-1">⚖️ {log.weight_grams}g</span>
        <span className="rounded-md bg-blue-100 px-2 py-1 text-blue-600">
          AI {(log.confidence * 100).toFixed(0)}%
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm">
        <div className="rounded-lg bg-blue-50 p-2 text-center">
          <p className="text-gray-600">蛋白质</p>
          <p className="font-semibold text-blue-600">{log.protein.toFixed(1)}g</p>
        </div>
        <div className="rounded-lg bg-amber-50 p-2 text-center">
          <p className="text-gray-600">碳水</p>
          <p className="font-semibold text-amber-600">{log.carbs.toFixed(1)}g</p>
        </div>
        <div className="rounded-lg bg-rose-50 p-2 text-center">
          <p className="text-gray-600">脂肪</p>
          <p className="font-semibold text-rose-600">{log.fat.toFixed(1)}g</p>
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white/60 p-8 text-center shadow-md backdrop-blur-sm sm:p-12">
      <div className="mb-4 text-6xl sm:text-7xl">{emoji}</div>
      <h3 className="mb-2 text-lg font-semibold text-gray-700 sm:text-xl">{title}</h3>
      <p className="text-sm text-gray-500 sm:text-base">{description}</p>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
