'use client';

import { useState } from 'react';
import FoodCamera from '@/components/FoodCamera';

interface FoodLog {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  weight_grams: number;
  confidence: number;
  time: string;
}

interface WeightRecord {
  date: string;
  weight: number;
  bodyFat?: number;
}

interface ExerciseRecord {
  id: string;
  name: string;
  duration: number;
  caloriesBurned: number;
  time: string;
  type: string;
}

interface UserProfile {
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
  goal: 'lose' | 'maintain' | 'gain';
}

type ViewType = 'home' | 'weight' | 'exercise' | 'stats' | 'bodyfat' | 'profile';

export default function EnhancedHealthApp() {
  const [view, setView] = useState<ViewType>('home');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [bodyPhotoFile, setBodyPhotoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bodyFatResult, setBodyFatResult] = useState<any>(null);

  // 用户信息
  const [userProfile, setUserProfile] = useState<UserProfile>({
    age: 28,
    gender: 'female',
    height: 165,
    weight: 60,
    activityLevel: 'moderate',
    goal: 'lose'
  });

  // 饮食记录
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>([
    {
      id: '1',
      name: '鸡胸肉沙拉',
      calories: 320,
      protein: 35,
      carbs: 20,
      fat: 8,
      weight_grams: 250,
      confidence: 0.92,
      time: '12:30'
    }
  ]);

  // 体重记录
  const [weightRecords, setWeightRecords] = useState<WeightRecord[]>([
    { date: '2026-05-28', weight: 62.5, bodyFat: 28 },
    { date: '2026-05-30', weight: 61.8, bodyFat: 27.5 },
    { date: '2026-06-01', weight: 61.2, bodyFat: 27 },
    { date: '2026-06-03', weight: 60.5, bodyFat: 26.5 },
    { date: '2026-06-04', weight: 60.0, bodyFat: 26 }
  ]);

  // 运动记录
  const [exerciseRecords, setExerciseRecords] = useState<ExerciseRecord[]>([
    { id: '1', name: '跑步', duration: 30, caloriesBurned: 250, time: '07:00', type: 'cardio' },
    { id: '2', name: '瑜伽', duration: 45, caloriesBurned: 120, time: '18:30', type: 'flexibility' },
    { id: '3', name: '力量训练', duration: 40, caloriesBurned: 180, time: '19:30', type: 'strength' }
  ]);

  // 计算BMR（基础代谢率）- Mifflin-St Jeor方程
  const calculateBMR = () => {
    if (userProfile.gender === 'male') {
      return 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age + 5;
    } else {
      return 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age - 161;
    }
  };

  // 计算TDEE（每日总能量消耗）
  const calculateTDEE = () => {
    const bmr = calculateBMR();
    const activityMultipliers = {
      'sedentary': 1.2,
      'light': 1.375,
      'moderate': 1.55,
      'active': 1.725,
      'veryActive': 1.9
    };
    return bmr * activityMultipliers[userProfile.activityLevel];
  };

  // 计算目标热量
  const calculateTargetCalories = () => {
    const tdee = calculateTDEE();
    if (userProfile.goal === 'lose') return Math.round(tdee - 500);
    if (userProfile.goal === 'gain') return Math.round(tdee + 300);
    return Math.round(tdee);
  };

  const bmr = calculateBMR();
  const tdee = calculateTDEE();
  const caloriesTarget = calculateTargetCalories();
  const caloriesConsumed = foodLogs.reduce((sum, log) => sum + log.calories, 0);
  const caloriesBurned = exerciseRecords.reduce((sum, ex) => sum + ex.caloriesBurned, 0);
  const netCalories = caloriesConsumed - caloriesBurned;
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
        const newLogs = data.foods.map((food: any) => ({
          ...food,
          id: Math.random().toString(36).substr(2, 9),
          time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
        }));
        setFoodLogs([...foodLogs, ...newLogs]);
        setSelectedFile(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '识别失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeBodyFat = async () => {
    if (!bodyPhotoFile) {
      setError('请先上传身体照片');
      return;
    }

    setIsLoading(true);
    setError(null);

    // 模拟AI分析
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
          '充足睡眠，每晚7-8小时'
        ]
      });
    }, 2000);
  };

  const deleteFood = (id: string) => {
    setFoodLogs(foodLogs.filter(log => log.id !== id));
  };

  const addExercise = () => {
    const name = prompt('运动名称：');
    const duration = prompt('运动时长（分钟）：');
    const calories = prompt('消耗热量：');

    if (name && duration && calories) {
      const newExercise: ExerciseRecord = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        duration: parseInt(duration),
        caloriesBurned: parseInt(calories),
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        type: 'other'
      };
      setExerciseRecords([...exerciseRecords, newExercise]);
    }
  };

  const addWeight = () => {
    const weight = prompt('今日体重（kg）：');
    if (weight) {
      const newRecord: WeightRecord = {
        date: new Date().toISOString().split('T')[0],
        weight: parseFloat(weight)
      };
      setWeightRecords([...weightRecords, newRecord]);
      setUserProfile({ ...userProfile, weight: parseFloat(weight) });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* 标题 */}
        <div className="text-center pt-2 sm:pt-4 pb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mb-3 sm:mb-4 shadow-lg">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            健康管理助手
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">AI 智能分析 · 科学管理健康</p>
        </div>

        {/* 导航标签 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-2 border border-gray-100 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {[
              { id: 'home' as ViewType, label: '🍽️ 饮食', width: 'flex-1' },
              { id: 'exercise' as ViewType, label: '🏃 运动', width: 'flex-1' },
              { id: 'weight' as ViewType, label: '⚖️ 体重', width: 'flex-1' },
              { id: 'bodyfat' as ViewType, label: '📊 体脂', width: 'flex-1' },
              { id: 'stats' as ViewType, label: '📈 统计', width: 'flex-1' },
              { id: 'profile' as ViewType, label: '👤 设置', width: 'flex-1' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setView(tab.id)}
                className={`py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${tab.width} ${
                  view === tab.id
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 饮食视图 */}
        {view === 'home' && (
          <>
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
                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - Math.min(netCalories / caloriesTarget, 1))}`}
                        className={`transition-all duration-500 ${
                          netCalories > caloriesTarget ? 'text-red-500' : 'text-green-500'
                        }`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl sm:text-3xl font-bold text-gray-900">{netCalories}</span>
                      <span className="text-xs sm:text-sm text-gray-500">/ {caloriesTarget} 卡</span>
                    </div>
                  </div>
                </div>

                {/* 热量详情 */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-gray-600 mb-1">摄入</p>
                    <p className="text-lg font-bold text-green-600">+{caloriesConsumed}</p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <p className="text-gray-600 mb-1">消耗</p>
                    <p className="text-lg font-bold text-orange-600">-{caloriesBurned}</p>
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
                <div className="mt-4 p-3 sm:p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3">
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
                  {foodLogs.map((log) => (
                    <div
                      key={log.id}
                      className="border border-gray-200 rounded-xl p-3 sm:p-4 hover:border-green-300 hover:shadow-md transition-all duration-200 bg-white"
                    >
                      <div className="flex justify-between items-start mb-2 sm:mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">🍴</span>
                          <div>
                            <h3 className="font-bold text-gray-900 text-base sm:text-lg">{log.name}</h3>
                            <p className="text-xs text-gray-500">{log.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                              {log.calories}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-500 ml-1">卡</span>
                          </div>
                          <button
                            onClick={() => deleteFood(log.id)}
                            className="p-1 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-2">
                        <span className="px-2 py-1 bg-gray-100 rounded-md">⚖️ {log.weight_grams}g</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md">
                          AI {(log.confidence * 100).toFixed(0)}%
                        </span>
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
          </>
        )}

        {/* 运动视图 */}
        {view === 'exercise' && (
          <>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">🏃 今日运动</h2>
                <button
                  onClick={addExercise}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
                >
                  + 添加运动
                </button>
              </div>

              {/* 运动统计 */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 rounded-xl text-center">
                  <p className="text-xs text-gray-600 mb-1">运动时长</p>
                  <p className="text-xl font-bold text-orange-600">
                    {exerciseRecords.reduce((sum, ex) => sum + ex.duration, 0)} 分钟
                  </p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-3 rounded-xl text-center">
                  <p className="text-xs text-gray-600 mb-1">消耗热量</p>
                  <p className="text-xl font-bold text-red-600">{caloriesBurned} 卡</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-xl text-center">
                  <p className="text-xs text-gray-600 mb-1">活动次数</p>
                  <p className="text-xl font-bold text-purple-600">{exerciseRecords.length} 次</p>
                </div>
              </div>

              {/* 运动记录列表 */}
              <div className="space-y-3">
                {exerciseRecords.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="border border-gray-200 rounded-xl p-4 hover:border-orange-300 hover:shadow-md transition-all bg-white"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center text-2xl">
                          {exercise.type === 'cardio' ? '🏃' : exercise.type === 'strength' ? '💪' : '🧘'}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{exercise.name}</h3>
                          <p className="text-sm text-gray-500">{exercise.time}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setExerciseRecords(exerciseRecords.filter(e => e.id !== exercise.id))}
                        className="p-1 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">时长</p>
                        <p className="text-lg font-bold text-blue-600">{exercise.duration} 分钟</p>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">消耗</p>
                        <p className="text-lg font-bold text-red-600">{exercise.caloriesBurned} 卡</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {exerciseRecords.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🏃</div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">还没有运动记录</h3>
                  <p className="text-sm text-gray-500">点击"添加运动"记录今日活动</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* 体重视图 */}
        {view === 'weight' && (
          <>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">⚖️ 体重追踪</h2>
                <button
                  onClick={addWeight}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
                >
                  + 记录体重
                </button>
              </div>

              {/* 当前体重卡片 */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl mb-6 border border-blue-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">当前体重</p>
                  <p className="text-5xl font-bold text-blue-600 mb-2">{userProfile.weight}</p>
                  <p className="text-sm text-gray-600">公斤</p>

                  {weightRecords.length >= 2 && (
                    <div className="mt-4 flex items-center justify-center gap-2">
                      {weightRecords[weightRecords.length - 1].weight < weightRecords[weightRecords.length - 2].weight ? (
                        <>
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                          </svg>
                          <span className="text-green-600 font-semibold">
                            -{(weightRecords[weightRecords.length - 2].weight - weightRecords[weightRecords.length - 1].weight).toFixed(1)}kg
                          </span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          <span className="text-red-600 font-semibold">
                            +{(weightRecords[weightRecords.length - 1].weight - weightRecords[weightRecords.length - 2].weight).toFixed(1)}kg
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* 体重趋势图 */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">📈 趋势图</h3>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <div className="flex items-end justify-between h-40">
                    {weightRecords.map((record, index) => {
                      const maxWeight = Math.max(...weightRecords.map(r => r.weight));
                      const minWeight = Math.min(...weightRecords.map(r => r.weight));
                      const range = maxWeight - minWeight || 1;
                      const height = ((record.weight - minWeight) / range) * 100;

                      return (
                        <div key={index} className="flex-1 flex flex-col items-center gap-2">
                          <div className="text-xs font-semibold text-gray-700">{record.weight}</div>
                          <div
                            className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all hover:opacity-80"
                            style={{ height: `${Math.max(height, 20)}%` }}
                          />
                          <div className="text-xs text-gray-500">{record.date.slice(5)}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 体重记录列表 */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">📋 历史记录</h3>
                <div className="space-y-2">
                  {[...weightRecords].reverse().map((record, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">{record.date}</p>
                        {record.bodyFat && (
                          <p className="text-sm text-gray-500">体脂率: {record.bodyFat}%</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">{record.weight}</p>
                        <p className="text-xs text-gray-500">kg</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* 体脂分析视图 */}
        {view === 'bodyfat' && (
          <>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📊 AI 体脂率分析</h2>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl mb-6 border border-purple-200">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-4">📸</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">上传身体照片</h3>
                  <p className="text-sm text-gray-600 mb-4">AI 将分析您的体型并估算体脂率</p>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBodyPhotoFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="body-photo"
                  />
                  <label
                    htmlFor="body-photo"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold cursor-pointer hover:shadow-lg transition-all"
                  >
                    选择照片
                  </label>
                </div>

                {bodyPhotoFile && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-3">已选择: {bodyPhotoFile.name}</p>
                    <button
                      onClick={analyzeBodyFat}
                      disabled={isLoading}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {isLoading ? 'AI 分析中...' : '开始分析'}
                    </button>
                  </div>
                )}
              </div>

              {/* 分析结果 */}
              {bodyFatResult && (
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="text-center mb-6">
                      <p className="text-sm text-gray-600 mb-2">预估体脂率</p>
                      <p className="text-5xl font-bold text-purple-600 mb-2">{bodyFatResult.bodyFat}%</p>
                      <p className="text-sm text-gray-500">范围: {bodyFatResult.bodyFatRange}</p>
                      <div className="mt-4 inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">
                        {bodyFatResult.category}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-blue-50 p-4 rounded-xl text-center">
                        <p className="text-sm text-gray-600 mb-1">体重</p>
                        <p className="text-2xl font-bold text-blue-600">{userProfile.weight} kg</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-xl text-center">
                        <p className="text-sm text-gray-600 mb-1">内脏脂肪</p>
                        <p className="text-2xl font-bold text-purple-600">{bodyFatResult.visceral}</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-semibold text-gray-900 mb-3">💡 个性化建议</h4>
                      <div className="space-y-2">
                        {bodyFatResult.recommendations.map((rec: string, index: number) => (
                          <div key={index} className="flex gap-2 items-start">
                            <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm text-gray-700">{rec}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                    <div className="flex gap-2">
                      <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm text-yellow-800">
                        <strong>免责声明：</strong>本分析结果仅供参考，误差范围±3%。如需精确数据，请使用专业体脂秤或咨询医疗机构。
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {!bodyFatResult && (
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-3">📋 使用说明</h4>
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
            </div>
          </>
        )}

        {/* 统计视图 */}
        {view === 'stats' && (
          <>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📈 每周统计</h2>

              {/* 周汇总 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-xl text-center">
                  <div className="text-2xl mb-2">🍽️</div>
                  <p className="text-xs text-gray-600 mb-1">平均摄入</p>
                  <p className="text-xl font-bold text-green-600">1850</p>
                  <p className="text-xs text-gray-500">卡/天</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-100 p-4 rounded-xl text-center">
                  <div className="text-2xl mb-2">🏃</div>
                  <p className="text-xs text-gray-600 mb-1">运动消耗</p>
                  <p className="text-xl font-bold text-orange-600">1750</p>
                  <p className="text-xs text-gray-500">卡/周</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-100 p-4 rounded-xl text-center">
                  <div className="text-2xl mb-2">⚖️</div>
                  <p className="text-xs text-gray-600 mb-1">体重变化</p>
                  <p className="text-xl font-bold text-blue-600">-2.5</p>
                  <p className="text-xs text-gray-500">kg/月</p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-rose-100 p-4 rounded-xl text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <p className="text-xs text-gray-600 mb-1">目标进度</p>
                  <p className="text-xl font-bold text-pink-600">75%</p>
                  <p className="text-xs text-gray-500">已完成</p>
                </div>
              </div>

              {/* 营养摄入分析 */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">🥗 营养摄入分析</h3>
                <div className="space-y-3">
                  {[
                    { name: '蛋白质', current: 65, target: 75, color: 'blue' },
                    { name: '碳水化合物', current: 180, target: 200, color: 'amber' },
                    { name: '脂肪', current: 45, target: 55, color: 'rose' }
                  ].map((nutrient) => (
                    <div key={nutrient.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{nutrient.name}</span>
                        <span className="text-gray-600">{nutrient.current}g / {nutrient.target}g</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`bg-${nutrient.color}-500 h-2 rounded-full transition-all`}
                          style={{ width: `${(nutrient.current / nutrient.target) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7天趋势 */}
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">📊 7天热量趋势</h3>
                <div className="flex items-end justify-between h-40 gap-2">
                  {[1820, 1950, 1780, 2100, 1850, 1900, 1850].map((cal, index) => {
                    const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
                    const height = (cal / 2100) * 100;

                    return (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div className="text-xs font-semibold text-gray-700">{cal}</div>
                        <div
                          className={`w-full rounded-t-lg transition-all hover:opacity-80 ${
                            cal > caloriesTarget ? 'bg-gradient-to-t from-red-400 to-red-500' : 'bg-gradient-to-t from-green-400 to-green-500'
                          }`}
                          style={{ height: `${height}%` }}
                        />
                        <div className="text-xs text-gray-500">{days[index]}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {/* 个人设置视图 */}
        {view === 'profile' && (
          <>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">👤 个人信息</h2>

              {/* 基本信息 */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-700">年龄</span>
                  <span className="font-semibold text-gray-900">{userProfile.age} 岁</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-700">性别</span>
                  <span className="font-semibold text-gray-900">{userProfile.gender === 'female' ? '女' : '男'}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-700">身高</span>
                  <span className="font-semibold text-gray-900">{userProfile.height} cm</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-700">当前体重</span>
                  <span className="font-semibold text-gray-900">{userProfile.weight} kg</span>
                </div>
              </div>

              {/* 代谢数据 */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl mb-6 border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-4">🔥 代谢数据</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">基础代谢率 (BMR)</p>
                    <p className="text-2xl font-bold text-blue-600">{Math.round(bmr)}</p>
                    <p className="text-xs text-gray-500">卡/天</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">每日消耗 (TDEE)</p>
                    <p className="text-2xl font-bold text-purple-600">{Math.round(tdee)}</p>
                    <p className="text-xs text-gray-500">卡/天</p>
                  </div>
                </div>
              </div>

              {/* 目标设置 */}
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">🎯 目标设置</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">健康目标</span>
                    <span className="font-semibold text-gray-900">
                      {userProfile.goal === 'lose' ? '减重' : userProfile.goal === 'gain' ? '增重' : '维持'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">活动水平</span>
                    <span className="font-semibold text-gray-900">
                      {userProfile.activityLevel === 'sedentary' ? '久坐' :
                       userProfile.activityLevel === 'light' ? '轻度' :
                       userProfile.activityLevel === 'moderate' ? '中度' :
                       userProfile.activityLevel === 'active' ? '活跃' : '非常活跃'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-gray-700">每日目标热量</span>
                    <span className="text-xl font-bold text-green-600">{caloriesTarget} 卡</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}