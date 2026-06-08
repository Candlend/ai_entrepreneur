import { describe, it, expect } from 'vitest';
import {
  sumNutritionTotals,
  sumExerciseCalories,
  sumExerciseDuration,
  calculateNetCalories,
} from '@/lib/nutrition';
import type { FoodLog, ExerciseRecord } from '@/types';

const sampleFoodLogs: FoodLog[] = [
  {
    id: '1',
    name: '沙拉',
    calories: 320,
    protein: 35,
    carbs: 20,
    fat: 8,
    weight_grams: 250,
    confidence: 0.92,
    time: '12:30',
  },
  {
    id: '2',
    name: '牛排',
    calories: 450,
    protein: 40,
    carbs: 5,
    fat: 25,
    weight_grams: 200,
    confidence: 0.85,
    time: '18:00',
  },
];

const sampleExercises: ExerciseRecord[] = [
  { id: '1', name: '跑步', duration: 30, caloriesBurned: 250, time: '07:00', type: 'cardio' },
  { id: '2', name: '瑜伽', duration: 45, caloriesBurned: 120, time: '18:30', type: 'flexibility' },
];

describe('sumNutritionTotals', () => {
  it('sums all nutrients from food logs', () => {
    const result = sumNutritionTotals(sampleFoodLogs);
    expect(result.calories).toBe(770);
    expect(result.protein).toBe(75);
    expect(result.carbs).toBe(25);
    expect(result.fat).toBe(33);
  });

  it('returns zeros for empty array', () => {
    const result = sumNutritionTotals([]);
    expect(result).toEqual({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  });

  it('handles single item', () => {
    const result = sumNutritionTotals([sampleFoodLogs[0]]);
    expect(result.calories).toBe(320);
    expect(result.protein).toBe(35);
  });
});

describe('sumExerciseCalories', () => {
  it('sums calories from exercises', () => {
    expect(sumExerciseCalories(sampleExercises)).toBe(370);
  });

  it('returns 0 for empty array', () => {
    expect(sumExerciseCalories([])).toBe(0);
  });
});

describe('sumExerciseDuration', () => {
  it('sums duration from exercises', () => {
    expect(sumExerciseDuration(sampleExercises)).toBe(75);
  });

  it('returns 0 for empty array', () => {
    expect(sumExerciseDuration([])).toBe(0);
  });
});

describe('calculateNetCalories', () => {
  it('calculates net calories (consumed - burned)', () => {
    expect(calculateNetCalories(sampleFoodLogs, sampleExercises)).toBe(400);
  });

  it('returns negative when exercise exceeds food', () => {
    const heavyExercise: ExerciseRecord[] = [
      {
        id: '1',
        name: '马拉松',
        duration: 240,
        caloriesBurned: 2000,
        time: '06:00',
        type: 'cardio',
      },
    ];
    expect(calculateNetCalories(sampleFoodLogs, heavyExercise)).toBe(-1230);
  });
});
