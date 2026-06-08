import type { UserProfile } from '@/types';

const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
} as const;

const CALORIE_DEFICIT = 500;
const CALORIE_SURPLUS = 300;

export function calculateBMR(
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female'
): number {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }
  return 10 * weight + 6.25 * height - 5 * age - 161;
}

export function calculateTDEE(bmr: number, activityLevel: UserProfile['activityLevel']): number {
  return bmr * ACTIVITY_MULTIPLIERS[activityLevel];
}

export function calculateTargetCalories(tdee: number, goal: UserProfile['goal']): number {
  if (goal === 'lose') return Math.round(tdee - CALORIE_DEFICIT);
  if (goal === 'gain') return Math.round(tdee + CALORIE_SURPLUS);
  return Math.round(tdee);
}
