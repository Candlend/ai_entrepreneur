import { describe, it, expect } from 'vitest';

describe('Health App - Unit Tests', () => {
  describe('BMR Calculation', () => {
    // Mifflin-St Jeor Equation
    const calculateBMR = (
      weight: number,
      height: number,
      age: number,
      gender: 'male' | 'female'
    ) => {
      if (gender === 'male') {
        return 10 * weight + 6.25 * height - 5 * age + 5;
      }
      return 10 * weight + 6.25 * height - 5 * age - 161;
    };

    it('calculates BMR correctly for female', () => {
      const bmr = calculateBMR(60, 165, 28, 'female');
      expect(bmr).toBeCloseTo(1330.25, 0);
    });

    it('calculates BMR correctly for male', () => {
      const bmr = calculateBMR(75, 178, 30, 'male');
      expect(bmr).toBeCloseTo(1717.5, 0);
    });

    it('gives different results for male vs female with same stats', () => {
      const femaleBMR = calculateBMR(65, 170, 25, 'female');
      const maleBMR = calculateBMR(65, 170, 25, 'male');
      expect(maleBMR).toBeGreaterThan(femaleBMR);
    });
  });

  describe('TDEE Calculation', () => {
    const calculateTDEE = (bmr: number, activityLevel: string) => {
      const multipliers: Record<string, number> = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9,
      };
      return bmr * multipliers[activityLevel];
    };

    it('calculates TDEE for moderate activity', () => {
      const tdee = calculateTDEE(1330, 'moderate');
      expect(tdee).toBeCloseTo(2061.5, 0);
    });

    it('calculates TDEE for sedentary', () => {
      const tdee = calculateTDEE(1330, 'sedentary');
      expect(tdee).toBeCloseTo(1596, 0);
    });

    it('sedentary TDEE is less than very active TDEE', () => {
      const sedentary = calculateTDEE(1330, 'sedentary');
      const veryActive = calculateTDEE(1330, 'veryActive');
      expect(veryActive).toBeGreaterThan(sedentary);
    });
  });

  describe('Target Calories', () => {
    const calculateTargetCalories = (tdee: number, goal: string) => {
      if (goal === 'lose') return Math.round(tdee - 500);
      if (goal === 'gain') return Math.round(tdee + 300);
      return Math.round(tdee);
    };

    it('sets deficit for weight loss', () => {
      expect(calculateTargetCalories(2000, 'lose')).toBe(1500);
    });

    it('sets surplus for weight gain', () => {
      expect(calculateTargetCalories(2000, 'gain')).toBe(2300);
    });

    it('maintains for weight maintenance', () => {
      expect(calculateTargetCalories(2000, 'maintain')).toBe(2000);
    });
  });

  describe('Nutrition Totals', () => {
    it('sums calories from food logs', () => {
      const logs = [
        { calories: 320, protein: 35, carbs: 20, fat: 8 },
        { calories: 450, protein: 25, carbs: 55, fat: 15 },
      ];
      const totalCalories = logs.reduce((sum, log) => sum + log.calories, 0);
      expect(totalCalories).toBe(770);
    });

    it('sums protein from food logs', () => {
      const logs = [
        { calories: 320, protein: 35, carbs: 20, fat: 8 },
        { calories: 450, protein: 25, carbs: 55, fat: 15 },
      ];
      const totalProtein = logs.reduce((sum, log) => sum + log.protein, 0);
      expect(totalProtein).toBe(60);
    });

    it('returns 0 for empty logs', () => {
      const logs: Array<{ calories: number }> = [];
      const total = logs.reduce((sum, log) => sum + log.calories, 0);
      expect(total).toBe(0);
    });
  });
});
