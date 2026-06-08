import { describe, it, expect } from 'vitest';
import { exerciseSchema, weightSchema, userProfileSchema } from '@/lib/validation';

describe('exerciseSchema', () => {
  it('accepts valid exercise input', () => {
    const result = exerciseSchema.safeParse({ name: '跑步', duration: 30, caloriesBurned: 250 });
    expect(result.success).toBe(true);
  });

  it('rejects empty name', () => {
    const result = exerciseSchema.safeParse({ name: '', duration: 30, caloriesBurned: 250 });
    expect(result.success).toBe(false);
  });

  it('rejects negative duration', () => {
    const result = exerciseSchema.safeParse({ name: '跑步', duration: -1, caloriesBurned: 250 });
    expect(result.success).toBe(false);
  });

  it('rejects duration over 480 minutes', () => {
    const result = exerciseSchema.safeParse({ name: '跑步', duration: 500, caloriesBurned: 250 });
    expect(result.success).toBe(false);
  });

  it('rejects negative caloriesBurned', () => {
    const result = exerciseSchema.safeParse({ name: '跑步', duration: 30, caloriesBurned: -10 });
    expect(result.success).toBe(false);
  });
});

describe('weightSchema', () => {
  it('accepts valid weight', () => {
    const result = weightSchema.safeParse({ weight: 65 });
    expect(result.success).toBe(true);
  });

  it('rejects weight below 20kg', () => {
    const result = weightSchema.safeParse({ weight: 10 });
    expect(result.success).toBe(false);
  });

  it('rejects weight above 500kg', () => {
    const result = weightSchema.safeParse({ weight: 600 });
    expect(result.success).toBe(false);
  });
});

describe('userProfileSchema', () => {
  it('accepts valid profile', () => {
    const result = userProfileSchema.safeParse({
      age: 28,
      gender: 'female',
      height: 165,
      weight: 60,
      activityLevel: 'moderate',
      goal: 'lose',
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid gender', () => {
    const result = userProfileSchema.safeParse({
      age: 28,
      gender: 'other',
      height: 165,
      weight: 60,
      activityLevel: 'moderate',
      goal: 'lose',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid goal', () => {
    const result = userProfileSchema.safeParse({
      age: 28,
      gender: 'female',
      height: 165,
      weight: 60,
      activityLevel: 'moderate',
      goal: 'sleep',
    });
    expect(result.success).toBe(false);
  });
});
