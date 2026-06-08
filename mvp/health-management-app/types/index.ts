export interface FoodLog {
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

export interface WeightRecord {
  date: string;
  weight: number;
  bodyFat?: number;
}

export interface ExerciseRecord {
  id: string;
  name: string;
  duration: number;
  caloriesBurned: number;
  time: string;
  type: 'cardio' | 'strength' | 'flexibility' | 'other';
}

export interface UserProfile {
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
  goal: 'lose' | 'maintain' | 'gain';
}

export type ViewType = 'home' | 'weight' | 'exercise' | 'stats' | 'bodyfat' | 'profile';

export interface BodyFatResult {
  bodyFat: number;
  bodyFatRange: string;
  category: string;
  visceral: number;
  recommendations: string[];
}

export interface NutritionTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}
