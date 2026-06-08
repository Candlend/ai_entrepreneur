import { z } from 'zod';

export const exerciseSchema = z.object({
  name: z.string().min(1, '请输入运动名称'),
  duration: z.number().min(1, '时长至少1分钟').max(480, '时长不能超过480分钟'),
  caloriesBurned: z.number().min(0, '消耗热量不能为负'),
});

export const weightSchema = z.object({
  weight: z.number().min(20, '体重至少20kg').max(500, '体重不能超过500kg'),
});

export const userProfileSchema = z.object({
  age: z.number().min(1).max(150),
  gender: z.enum(['male', 'female']),
  height: z.number().min(50).max(300),
  weight: z.number().min(20).max(500),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'veryActive']),
  goal: z.enum(['lose', 'maintain', 'gain']),
});

export type ExerciseInput = z.infer<typeof exerciseSchema>;
export type WeightInput = z.infer<typeof weightSchema>;
