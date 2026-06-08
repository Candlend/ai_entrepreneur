'use client';

import { useState, useMemo, useCallback } from 'react';
import type { FoodLog, WeightRecord, ExerciseRecord, UserProfile } from '@/types';
import { calculateBMR, calculateTDEE, calculateTargetCalories } from '@/lib/health-math';
import {
  sumNutritionTotals,
  sumExerciseCalories,
  sumExerciseDuration,
  calculateNetCalories,
} from '@/lib/nutrition';

const DEFAULT_FOOD_LOGS: FoodLog[] = [
  {
    id: '1',
    name: '鸡胸肉沙拉',
    calories: 320,
    protein: 35,
    carbs: 20,
    fat: 8,
    weight_grams: 250,
    confidence: 0.92,
    time: '12:30',
  },
];

const DEFAULT_WEIGHT_RECORDS: WeightRecord[] = [
  { date: '2026-05-28', weight: 62.5, bodyFat: 28 },
  { date: '2026-05-30', weight: 61.8, bodyFat: 27.5 },
  { date: '2026-06-01', weight: 61.2, bodyFat: 27 },
  { date: '2026-06-03', weight: 60.5, bodyFat: 26.5 },
  { date: '2026-06-04', weight: 60.0, bodyFat: 26 },
];

const DEFAULT_EXERCISES: ExerciseRecord[] = [
  { id: '1', name: '跑步', duration: 30, caloriesBurned: 250, time: '07:00', type: 'cardio' },
  { id: '2', name: '瑜伽', duration: 45, caloriesBurned: 120, time: '18:30', type: 'flexibility' },
  { id: '3', name: '力量训练', duration: 40, caloriesBurned: 180, time: '19:30', type: 'strength' },
];

const DEFAULT_PROFILE: UserProfile = {
  age: 28,
  gender: 'female',
  height: 165,
  weight: 60,
  activityLevel: 'moderate',
  goal: 'lose',
};

export function useHealthState() {
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>(DEFAULT_FOOD_LOGS);
  const [weightRecords, setWeightRecords] = useState<WeightRecord[]>(DEFAULT_WEIGHT_RECORDS);
  const [exerciseRecords, setExerciseRecords] = useState<ExerciseRecord[]>(DEFAULT_EXERCISES);

  const bmr = useMemo(
    () => calculateBMR(userProfile.weight, userProfile.height, userProfile.age, userProfile.gender),
    [userProfile.weight, userProfile.height, userProfile.age, userProfile.gender]
  );

  const tdee = useMemo(
    () => calculateTDEE(bmr, userProfile.activityLevel),
    [bmr, userProfile.activityLevel]
  );

  const caloriesTarget = useMemo(
    () => calculateTargetCalories(tdee, userProfile.goal),
    [tdee, userProfile.goal]
  );

  const nutritionTotals = useMemo(() => sumNutritionTotals(foodLogs), [foodLogs]);
  const caloriesBurned = useMemo(() => sumExerciseCalories(exerciseRecords), [exerciseRecords]);
  const exerciseDuration = useMemo(() => sumExerciseDuration(exerciseRecords), [exerciseRecords]);
  const netCalories = useMemo(
    () => calculateNetCalories(foodLogs, exerciseRecords),
    [foodLogs, exerciseRecords]
  );

  const addFoodLogs = useCallback((foods: FoodLog[]) => {
    setFoodLogs(prev => [...prev, ...foods]);
  }, []);

  const deleteFoodLog = useCallback((id: string) => {
    setFoodLogs(prev => prev.filter(log => log.id !== id));
  }, []);

  const addExercise = useCallback((exercise: ExerciseRecord) => {
    setExerciseRecords(prev => [...prev, exercise]);
  }, []);

  const deleteExercise = useCallback((id: string) => {
    setExerciseRecords(prev => prev.filter(ex => ex.id !== id));
  }, []);

  const addWeight = useCallback((record: WeightRecord) => {
    setWeightRecords(prev => [...prev, record]);
    setUserProfile(prev => ({ ...prev, weight: record.weight }));
  }, []);

  return {
    userProfile,
    foodLogs,
    weightRecords,
    exerciseRecords,
    bmr,
    tdee,
    caloriesTarget,
    nutritionTotals,
    caloriesBurned,
    exerciseDuration,
    netCalories,
    addFoodLogs,
    deleteFoodLog,
    addExercise,
    deleteExercise,
    addWeight,
  };
}
