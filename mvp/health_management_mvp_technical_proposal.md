# 减肥与健康管理应用 - MVP技术方案

**项目名称**：HealthAI（暂定）  
**方案版本**：v1.0  
**编写日期**：2026年6月2日  
**目标交付**：2026年6月9日（下周二会议演示）  
**开发周期**：6-8周完整MVP  

---

## 一、项目概述

### 1.1 核心价值主张

**解决的问题**：
- 现有应用拍照识别热量不准确
- 缺少精准的体脂率分析工具
- 健康外卖推荐不个性化

**我们的解决方案**：
- 大模型识别食材种类与重量 + 本地数据库检索卡路里（提升准确度）
- 拍身体照片分析体脂率（创新提示词功能）
- 个性化健康外卖推荐

### 1.2 MVP目标

**下周二（6月9日）Demo需实现**：
1. ✅ 食物拍照识别与热量计算
2. ✅ 基础的用户资料设置（身高、体重、目标）
3. ✅ 简单的热量摄入记录界面
4. ✅ 可演示的核心流程

**完整MVP（6-8周）需实现**：
1. 用户注册与个人档案管理
2. 食物识别与热量计算（大模型+本地数据库）
3. 体脂率照片分析
4. 每日热量摄入/消耗跟踪
5. 基础数据可视化（图表）
6. 个性化建议（AI生成）
7. 健康外卖推荐（对接外卖平台API）

---

## 二、技术架构设计

### 2.1 技术栈选择

**前端**：
- **框架**：Next.js 14 (App Router)
- **UI库**：Tailwind CSS + shadcn/ui
- **状态管理**：React Context + Zustand（轻量级）
- **图表**：Recharts 或 Chart.js
- **相机/上传**：react-dropzone + next/image

**后端**：
- **框架**：Next.js API Routes（全栈方案）
- **数据库**：Supabase（PostgreSQL + Auth）
- **ORM**：Prisma 或 Drizzle
- **文件存储**：Supabase Storage（图片存储）

**AI集成**：
- **大模型API**：Claude 3.5 Sonnet（黄程宇提供的API Key）
- **图像识别**：Claude Vision API
- **本地数据库**：预置食物热量数据库（JSON/SQLite）

**部署**：
- **托管**：Vercel（免费额度）
- **数据库**：Supabase Free Tier
- **域名**：暂用Vercel默认域名

### 2.2 系统架构图

```
┌─────────────────────────────────────────────────────────┐
│                    用户界面 (Next.js)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │  拍照上传    │  │  数据展示    │  │  个人资料    │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              Next.js API Routes (后端逻辑)               │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐       │
│  │ 食物识别API │  │ 用户管理API │  │ 数据分析API │       │
│  └────────────┘  └────────────┘  └────────────┘       │
└─────────────────────────────────────────────────────────┘
         ↓                    ↓                    ↓
┌───────────────┐   ┌──────────────┐   ┌──────────────┐
│ Claude Vision │   │  Supabase DB  │   │ 本地食物库    │
│     API       │   │ (用户数据)     │   │  (热量数据)   │
└───────────────┘   └──────────────┘   └──────────────┘
```

### 2.3 数据库设计

**用户表 (users)**：
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  age INTEGER,
  gender VARCHAR(10),
  height DECIMAL(5,2), -- 身高(cm)
  weight DECIMAL(5,2), -- 体重(kg)
  target_weight DECIMAL(5,2), -- 目标体重
  activity_level VARCHAR(20), -- 活动水平
  goal VARCHAR(50), -- 减肥/增肌/维持
  daily_calorie_target INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**食物记录表 (food_logs)**：
```sql
CREATE TABLE food_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  date DATE NOT NULL,
  meal_type VARCHAR(20), -- 早餐/午餐/晚餐/加餐
  food_name VARCHAR(255),
  food_image_url TEXT,
  calories INTEGER,
  protein DECIMAL(5,2),
  carbs DECIMAL(5,2),
  fat DECIMAL(5,2),
  weight_grams DECIMAL(6,2),
  ai_confidence DECIMAL(3,2), -- AI识别置信度
  created_at TIMESTAMP DEFAULT NOW()
);
```

**体重记录表 (weight_logs)**：
```sql
CREATE TABLE weight_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  date DATE NOT NULL,
  weight DECIMAL(5,2),
  body_fat_percentage DECIMAL(4,2), -- 体脂率
  photo_url TEXT, -- 体脂率分析照片
  created_at TIMESTAMP DEFAULT NOW()
);
```

**本地食物数据库 (food_database.json)**：
```json
{
  "foods": [
    {
      "name": "白米饭",
      "calories_per_100g": 116,
      "protein_per_100g": 2.6,
      "carbs_per_100g": 25.6,
      "fat_per_100g": 0.3,
      "aliases": ["米饭", "大米饭", "steamed rice"]
    }
  ]
}
```

---

## 三、核心功能实现

### 3.1 食物识别与热量计算

**实现流程**：

1. **用户上传食物照片**
   - 前端使用 react-dropzone 或原生 `<input type="file">`
   - 图片压缩（前端压缩至1MB以内）
   - 上传至 Supabase Storage

2. **调用Claude Vision API识别**
   ```typescript
   // api/food-recognition.ts
   import Anthropic from '@anthropic-ai/sdk';
   
   async function recognizeFood(imageUrl: string) {
     const anthropic = new Anthropic({
       apiKey: process.env.CLAUDE_API_KEY,
     });
     
     const message = await anthropic.messages.create({
       model: 'claude-3-5-sonnet-20241022',
       max_tokens: 1024,
       messages: [{
         role: 'user',
         content: [
           {
             type: 'image',
             source: {
               type: 'url',
               url: imageUrl,
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
     
     return JSON.parse(message.content[0].text);
   }
   ```

3. **本地数据库检索热量**
   ```typescript
   import foodDatabase from '@/data/food_database.json';
   
   function getCalories(foodName: string, weightGrams: number) {
     // 模糊匹配食物名称
     const food = foodDatabase.foods.find(f => 
       f.name === foodName || f.aliases.includes(foodName)
     );
     
     if (!food) {
       // 未找到则再次调用Claude估算
       return estimateCaloriesWithClaude(foodName, weightGrams);
     }
     
     return {
       calories: (food.calories_per_100g / 100) * weightGrams,
       protein: (food.protein_per_100g / 100) * weightGrams,
       carbs: (food.carbs_per_100g / 100) * weightGrams,
       fat: (food.fat_per_100g / 100) * weightGrams,
     };
   }
   ```

4. **保存至数据库**
   ```typescript
   async function saveFoodLog(userId: string, foodData: any) {
     const { data, error } = await supabase
       .from('food_logs')
       .insert({
         user_id: userId,
         date: new Date().toISOString().split('T')[0],
         meal_type: foodData.meal_type,
         food_name: foodData.name,
         food_image_url: foodData.image_url,
         calories: foodData.calories,
         protein: foodData.protein,
         carbs: foodData.carbs,
         fat: foodData.fat,
         weight_grams: foodData.weight_grams,
         ai_confidence: foodData.confidence,
       });
     
     return data;
   }
   ```

### 3.2 体脂率照片分析

**实现方案**：

提示词工程 + Claude Vision API

```typescript
async function analyzeBodyFat(imageUrl: string, userProfile: any) {
  const prompt = `你是专业的健身教练。请分析这张人体照片，估算体脂率。

用户信息：
- 性别：${userProfile.gender}
- 年龄：${userProfile.age}
- 身高：${userProfile.height}cm
- 体重：${userProfile.weight}kg

请根据：
1. 腹部脂肪堆积情况
2. 肌肉线条可见度
3. 整体体型
4. 性别和年龄因素

返回JSON格式：
{
  "body_fat_percentage": 估算体脂率(%),
  "confidence": 置信度(0-1),
  "analysis": "简要分析",
  "suggestions": ["建议1", "建议2"]
}`;

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: [
        { type: 'image', source: { type: 'url', url: imageUrl } },
        { type: 'text', text: prompt },
      ],
    }],
  });
  
  return JSON.parse(message.content[0].text);
}
```

### 3.3 个性化健康外卖推荐

**实现流程**：

1. **获取用户今日摄入**
   ```typescript
   async function getTodayIntake(userId: string) {
     const today = new Date().toISOString().split('T')[0];
     const { data } = await supabase
       .from('food_logs')
       .select('*')
       .eq('user_id', userId)
       .eq('date', today);
     
     const totalCalories = data.reduce((sum, log) => sum + log.calories, 0);
     return {
       consumed: totalCalories,
       remaining: userProfile.daily_calorie_target - totalCalories,
     };
   }
   ```

2. **调用Claude生成外卖推荐**
   ```typescript
   async function recommendMeals(userProfile: any, caloriesBudget: number) {
     const prompt = `用户需要健康外卖推荐。

用户信息：
- 目标：${userProfile.goal}
- 剩余热量预算：${caloriesBudget} 卡路里
- 饮食偏好：${userProfile.dietary_preferences}

请推荐3个适合的外卖餐品，返回JSON：
{
  "recommendations": [
    {
      "meal_name": "餐品名称",
      "restaurant": "推荐餐厅类型",
      "calories": 大约热量,
      "macros": {"protein": xx, "carbs": xx, "fat": xx},
      "reason": "推荐理由"
    }
  ]
}`;

     const message = await anthropic.messages.create({
       model: 'claude-3-5-sonnet-20241022',
       max_tokens: 1024,
       messages: [{ role: 'user', content: prompt }],
     });
     
     return JSON.parse(message.content[0].text);
   }
   ```

3. **（可选）对接外卖平台API**
   - 美团/饿了么开放平台
   - 根据推荐关键词搜索实际商品
   - 返回可点击链接（CPS佣金）

---

## 四、前端页面设计

### 4.1 页面结构

```
app/
├── (auth)/
│   ├── login/page.tsx          # 登录页
│   └── signup/page.tsx         # 注册页
├── (dashboard)/
│   ├── layout.tsx              # Dashboard布局
│   ├── page.tsx                # 首页（今日摘要）
│   ├── log/page.tsx            # 记录食物
│   ├── progress/page.tsx       # 进度追踪
│   ├── recommendations/page.tsx # 外卖推荐
│   └── profile/page.tsx        # 个人资料
├── api/
│   ├── food-recognition/route.ts
│   ├── body-fat-analysis/route.ts
│   ├── meal-recommendations/route.ts
│   └── user/route.ts
└── components/
    ├── FoodCamera.tsx          # 食物拍照组件
    ├── CalorieChart.tsx        # 热量图表
    ├── MacrosPieChart.tsx      # 营养素饼图
    └── MealCard.tsx            # 餐品卡片
```

### 4.2 核心页面设计

**首页（今日摘要）**：
```typescript
// app/(dashboard)/page.tsx
export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* 今日热量摄入进度条 */}
      <Card>
        <CardHeader>
          <CardTitle>今日热量</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={caloriesConsumed / caloriesTarget * 100} />
          <p className="text-sm text-muted-foreground mt-2">
            已摄入 {caloriesConsumed} / 目标 {caloriesTarget} 卡路里
          </p>
        </CardContent>
      </Card>
      
      {/* 营养素分布 */}
      <Card>
        <CardHeader>
          <CardTitle>营养素分布</CardTitle>
        </CardHeader>
        <CardContent>
          <MacrosPieChart data={macrosData} />
        </CardContent>
      </Card>
      
      {/* 今日餐品记录 */}
      <Card>
        <CardHeader>
          <CardTitle>今日餐品</CardTitle>
        </CardHeader>
        <CardContent>
          {foodLogs.map(log => (
            <MealCard key={log.id} meal={log} />
          ))}
        </CardContent>
      </Card>
      
      {/* 快捷操作 */}
      <div className="grid grid-cols-2 gap-4">
        <Button asChild>
          <Link href="/log">记录食物</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/recommendations">外卖推荐</Link>
        </Button>
      </div>
    </div>
  );
}
```

**记录食物页面**：
```typescript
// app/(dashboard)/log/page.tsx
export default function LogFood() {
  const [image, setImage] = useState<File | null>(null);
  const [recognitionResult, setRecognitionResult] = useState(null);
  
  const handleRecognize = async () => {
    const formData = new FormData();
    formData.append('image', image);
    
    const response = await fetch('/api/food-recognition', {
      method: 'POST',
      body: formData,
    });
    
    const result = await response.json();
    setRecognitionResult(result);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>拍照识别食物</CardTitle>
        </CardHeader>
        <CardContent>
          <FoodCamera onCapture={setImage} />
          {image && (
            <Button onClick={handleRecognize} className="mt-4">
              识别食物
            </Button>
          )}
        </CardContent>
      </Card>
      
      {recognitionResult && (
        <Card>
          <CardHeader>
            <CardTitle>识别结果</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recognitionResult.foods.map((food, index) => (
                <div key={index} className="border-b pb-4">
                  <h3 className="font-semibold">{food.name}</h3>
                  <p>重量：{food.weight_grams}克</p>
                  <p>热量：{food.calories}卡路里</p>
                  <p className="text-sm text-muted-foreground">
                    置信度：{(food.confidence * 100).toFixed(0)}%
                  </p>
                </div>
              ))}
              <Button onClick={handleSave}>保存记录</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
```

---

## 五、开发计划

### 5.1 下周二Demo（6月9日）最小版本

**Day 1-2（6月3-4日）**：
- ✅ 项目初始化（Next.js + Supabase）
- ✅ 基础UI框架搭建
- ✅ 用户资料输入页面

**Day 3-4（6月5-6日）**：
- ✅ 食物拍照上传功能
- ✅ Claude Vision API集成
- ✅ 基础识别结果展示

**Day 5-6（6月7-8日）**：
- ✅ 本地食物数据库（50个常见食物）
- ✅ 热量计算逻辑
- ✅ 今日摘要页面
- ✅ Demo演示准备

**Day 7（6月9日）**：
- ✅ 会议演示
- ✅ 收集反馈

### 5.2 完整MVP开发（6-8周）

**Week 1-2**：
- 用户注册登录（Supabase Auth）
- 完整的食物识别与记录
- 数据可视化（图表）

**Week 3-4**：
- 体脂率照片分析
- 体重记录与趋势
- 个性化目标设置

**Week 5-6**：
- 外卖推荐功能
- AI健康建议
- 社交功能（可选）

**Week 7-8**：
- 性能优化
- Bug修复
- 小范围测试（50-100用户）

---

## 六、成本估算

### 6.1 开发成本

- **人力**：1人全职（黄程宇） + 2人协助（成昂、南火朱雀）
- **时间**：6-8周
- **工具费用**：
  - Vercel：免费额度（足够MVP）
  - Supabase：免费额度
  - Claude API：黄程宇已充值
  - 域名（可选）：10-20美元/年

**总成本**：≈ 0元（使用免费额度和已有资源）

### 6.2 运营成本（MVP阶段）

**月度成本估算**（100用户）：
- Vercel托管：0元（免费额度）
- Supabase数据库：0元（免费额度）
- Claude API：
  - 每用户每天5次识别 × 100用户 = 500次/天
  - 图像识别：500次 × $0.024/次 ≈ $12/天
  - 文本生成：500次 × $0.003/次 ≈ $1.5/天
  - **月成本**：约$400（2,800元）

**100用户以内可控制在3000元/月以内**

### 6.3 扩展成本（1000用户）

- Vercel：可能需要升级Pro（$20/月）
- Supabase：可能需要升级Pro（$25/月）
- Claude API：约$4,000/月（28,000元）

**需要严格控制免费用户使用频率**

---

## 七、风险与应对

### 7.1 技术风险

| 风险 | 可能性 | 影响 | 应对策略 |
|-----|-------|------|---------|
| API成本超预算 | 高 | 高 | 限制免费用户每日识别次数（3-5次） |
| 食物识别不准 | 中 | 高 | 建立用户反馈机制，持续优化本地数据库 |
| Claude API限流 | 低 | 中 | 实现请求队列和重试机制 |
| 图片上传慢 | 中 | 中 | 前端压缩+CDN加速 |

### 7.2 用户体验风险

| 风险 | 应对策略 |
|-----|---------|
| 用户不会拍照 | 提供拍照指南和示例图片 |
| 识别结果不符预期 | 允许用户手动编辑和修正 |
| 数据输入繁琐 | 智能默认值和快捷操作 |

### 7.3 商业风险

| 风险 | 应对策略 |
|-----|---------|
| 用户留存率低 | 每日提醒+成就系统 |
| 付费转化率低 | 免费功能足够好用，付费提供高级功能 |
| 竞品压力 | 差异化功能（体脂率分析、外卖推荐） |

---

## 八、下一步行动

### 8.1 立即行动（本周）

**黄程宇**：
1. ✅ 初始化Next.js项目
2. ✅ 配置Supabase数据库
3. ✅ 实现基础食物拍照功能
4. ✅ 集成Claude Vision API
5. ✅ 准备下周二Demo

**成昂**：
1. 收集50个常见食物的热量数据
2. 测试食物识别准确度
3. 准备演示脚本

**南火朱雀**：
1. 协助前端页面UI设计
2. 准备测试用例
3. 记录开发过程中的问题

### 8.2 下周二会议

**演示内容**：
1. 用户拍照上传食物
2. AI识别食物种类和重量
3. 自动计算热量
4. 展示今日摄入数据

**决策点**：
- 是否正式立项
- 是否继续投入完整MVP开发
- 调整优先级和功能范围

### 8.3 后续里程碑

**Month 1（6月）**：
- 完成Demo演示
- 决定是否正式立项
- 开始完整MVP开发

**Month 2（7月）**：
- 完成核心功能开发
- 邀请50-100人内测
- 收集反馈迭代

**Month 3（8月）**：
- 产品优化
- 小规模推广（小红书、朋友圈）
- 验证付费意愿

---

## 九、附录

### 9.1 技术参考文档

- Next.js文档：https://nextjs.org/docs
- Supabase文档：https://supabase.com/docs
- Claude API文档：https://docs.anthropic.com/
- shadcn/ui组件：https://ui.shadcn.com/

### 9.2 竞品参考

- 薄荷健康：https://www.boohee.com/
- Keep：https://www.gotokeep.com/
- MyFitnessPal：https://www.myfitnesspal.com/

### 9.3 开源资源

- 食物热量数据库：https://github.com/nutritionix/food-database
- 图表组件：https://github.com/recharts/recharts
- 图片压缩：https://github.com/fengyuanchen/compressorjs

---

**方案完成日期**：2026年6月2日  
**负责人**：黄程宇  
**审核人**：成昂、南火朱雀  

**祝开发顺利！💪**
