import type { FoodLog, ExerciseRecord, NutritionTotals } from '@/types';

export function sumNutritionTotals(logs: FoodLog[]): NutritionTotals {
  return logs.reduce(
    (totals, log) => ({
      calories: totals.calories + log.calories,
      protein: totals.protein + log.protein,
      carbs: totals.carbs + log.carbs,
      fat: totals.fat + log.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

export function sumExerciseCalories(records: ExerciseRecord[]): number {
  return records.reduce((sum, ex) => sum + ex.caloriesBurned, 0);
}

export function sumExerciseDuration(records: ExerciseRecord[]): number {
  return records.reduce((sum, ex) => sum + ex.duration, 0);
}

export function calculateNetCalories(
  foodLogs: FoodLog[],
  exerciseRecords: ExerciseRecord[]
): number {
  const consumed = sumNutritionTotals(foodLogs).calories;
  const burned = sumExerciseCalories(exerciseRecords);
  return consumed - burned;
}
