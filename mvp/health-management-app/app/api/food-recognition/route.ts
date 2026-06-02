import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import foodDatabase from '@/data/food_database.json';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY || '',
});

interface FoodItem {
  name: string;
  weight_grams: number;
  confidence: number;
}

interface FoodRecognitionResponse {
  foods: FoodItem[];
}

interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json(
        { error: '请上传图片' },
        { status: 400 }
      );
    }

    // 转换图片为base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // 调用Claude Vision API识别食物
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: image.type as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
              data: base64Image,
            },
          },
          {
            type: 'text',
            text: `请分析这张食物图片，按照以下JSON格式返回：
{
  "foods": [
    {
      "name": "食物名称",
      "weight_grams": 估算重量（克）,
      "confidence": 置信度(0-1)
    }
  ]
}
只返回JSON，不要其他文字。`,
          },
        ],
      }],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }

    const recognitionResult: FoodRecognitionResponse = JSON.parse(content.text);

    // 本地数据库检索热量
    const enrichedFoods = recognitionResult.foods.map(food => {
      const nutrition = getCalories(food.name, food.weight_grams);
      return {
        ...food,
        ...nutrition,
      };
    });

    return NextResponse.json({
      success: true,
      foods: enrichedFoods,
    });

  } catch (error) {
    console.error('Food recognition error:', error);
    return NextResponse.json(
      { error: '识别失败，请重试' },
      { status: 500 }
    );
  }
}

function getCalories(foodName: string, weightGrams: number): NutritionInfo {
  // 查找食物数据库
  const food = foodDatabase.foods.find(f =>
    f.name === foodName || f.aliases.includes(foodName)
  );

  if (!food) {
    // 未找到则返回估算值
    return {
      calories: Math.round(weightGrams * 1.5), // 简单估算
      protein: Math.round(weightGrams * 0.1),
      carbs: Math.round(weightGrams * 0.2),
      fat: Math.round(weightGrams * 0.05),
    };
  }

  const ratio = weightGrams / 100;
  return {
    calories: Math.round(food.calories_per_100g * ratio),
    protein: Math.round(food.protein_per_100g * ratio * 10) / 10,
    carbs: Math.round(food.carbs_per_100g * ratio * 10) / 10,
    fat: Math.round(food.fat_per_100g * ratio * 10) / 10,
  };
}
