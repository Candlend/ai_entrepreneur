'use client';

import { useState } from 'react';
import type { ViewType, BodyFatResult, FoodLog } from '@/types';
import { useHealthState } from '@/lib/hooks/useHealthState';
import Navigation from '@/components/features/Navigation';
import DietView from '@/components/features/DietView';
import ExerciseView from '@/components/features/ExerciseView';
import WeightView from '@/components/features/WeightView';
import BodyFatView from '@/components/features/BodyFatView';
import StatsView from '@/components/features/StatsView';
import ProfileView from '@/components/features/ProfileView';

export default function EnhancedHealthApp() {
  const [view, setView] = useState<ViewType>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bodyFatResult, setBodyFatResult] = useState<BodyFatResult | null>(null);

  const state = useHealthState();

  const handleRecognize = async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/food-recognition', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '识别失败');
      }

      if (data.success && data.foods) {
        const newLogs: FoodLog[] = data.foods.map((food: FoodLog) => ({
          ...food,
          id: Math.random().toString(36).substr(2, 9),
          time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        }));
        state.addFoodLogs(newLogs);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '识别失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeBodyFat = () => {
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setIsLoading(false);
      setBodyFatResult({
        bodyFat: 26,
        bodyFatRange: '24-28%',
        category: '正常',
        visceral: 7,
        recommendations: [
          '增加有氧运动，每周3-4次，每次30-45分钟',
          '控制碳水化合物摄入，优先选择复合碳水',
          '保证优质蛋白质摄入，建议每天1.2-1.5g/kg体重',
          '充足睡眠，每晚7-8小时',
        ],
      });
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 px-3 py-4 sm:px-4 sm:py-8">
      <div className="mx-auto max-w-4xl space-y-4 sm:space-y-6">
        <div className="pb-2 pt-2 text-center sm:pt-4">
          <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-blue-500 shadow-lg sm:mb-4 sm:h-20 sm:w-20">
            <svg
              className="h-8 w-8 text-white sm:h-10 sm:w-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl md:text-4xl">
            健康管理助手
          </h1>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">AI 智能分析 · 科学管理健康</p>
        </div>

        <Navigation view={view} onViewChange={setView} />

        {view === 'home' && (
          <DietView
            foodLogs={state.foodLogs}
            nutritionTotals={state.nutritionTotals}
            netCalories={state.netCalories}
            caloriesTarget={state.caloriesTarget}
            caloriesBurned={state.caloriesBurned}
            isLoading={isLoading}
            error={error}
            onRecognize={handleRecognize}
            onDeleteFood={state.deleteFoodLog}
            onClearFile={() => {}}
          />
        )}

        {view === 'exercise' && (
          <ExerciseView
            exercises={state.exerciseRecords}
            caloriesBurned={state.caloriesBurned}
            exerciseDuration={state.exerciseDuration}
            onAdd={state.addExercise}
            onDelete={state.deleteExercise}
          />
        )}

        {view === 'weight' && (
          <WeightView
            weightRecords={state.weightRecords}
            currentWeight={state.userProfile.weight}
            onAddWeight={state.addWeight}
          />
        )}

        {view === 'bodyfat' && (
          <BodyFatView
            userProfile={state.userProfile}
            bodyFatResult={bodyFatResult}
            isLoading={isLoading}
            error={error}
            onAnalyze={handleAnalyzeBodyFat}
          />
        )}

        {view === 'stats' && (
          <StatsView
            nutritionTotals={state.nutritionTotals}
            caloriesTarget={state.caloriesTarget}
          />
        )}

        {view === 'profile' && (
          <ProfileView
            userProfile={state.userProfile}
            bmr={state.bmr}
            tdee={state.tdee}
            caloriesTarget={state.caloriesTarget}
          />
        )}
      </div>
    </main>
  );
}
