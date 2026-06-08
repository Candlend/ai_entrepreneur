import type { NutritionTotals } from '@/types';
import Card from '@/components/ui/Card';
import BarChart from '@/components/ui/BarChart';

interface StatsViewProps {
  nutritionTotals: NutritionTotals;
  caloriesTarget: number;
}

const WEEKLY_CALORIES = [1820, 1950, 1780, 2100, 1850, 1900, 1850];
const DAYS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

export default function StatsView({ nutritionTotals, caloriesTarget }: StatsViewProps) {
  const chartData = WEEKLY_CALORIES.map((cal, i) => ({
    label: DAYS[i],
    value: cal,
    display: String(cal),
  }));

  return (
    <Card title="📈 每周统计">
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatBox emoji="🍽️" label="平均摄入" value="1850" unit="卡/天" color="green" />
        <StatBox emoji="🏃" label="运动消耗" value="1750" unit="卡/周" color="orange" />
        <StatBox emoji="⚖️" label="体重变化" value="-2.5" unit="kg/月" color="blue" />
        <StatBox emoji="🎯" label="目标进度" value="75%" unit="已完成" color="pink" />
      </div>

      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4">
        <h3 className="mb-4 font-semibold text-gray-900">🥗 营养摄入分析</h3>
        <div className="space-y-3">
          {[
            { name: '蛋白质', current: nutritionTotals.protein, target: 75, color: 'blue' },
            { name: '碳水化合物', current: nutritionTotals.carbs, target: 200, color: 'amber' },
            { name: '脂肪', current: nutritionTotals.fat, target: 55, color: 'rose' },
          ].map(nutrient => (
            <NutrientBar key={nutrient.name} {...nutrient} />
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <h3 className="mb-4 font-semibold text-gray-900">📊 7天热量趋势</h3>
        <BarChart data={chartData} threshold={caloriesTarget} />
      </div>
    </Card>
  );
}

function StatBox({
  emoji,
  label,
  value,
  unit,
  color,
}: {
  emoji: string;
  label: string;
  value: string;
  unit: string;
  color: string;
}) {
  const bgMap: Record<string, string> = {
    green: 'from-green-50 to-emerald-100',
    orange: 'from-orange-50 to-red-100',
    blue: 'from-blue-50 to-purple-100',
    pink: 'from-pink-50 to-rose-100',
  };
  const textMap: Record<string, string> = {
    green: 'text-green-600',
    orange: 'text-orange-600',
    blue: 'text-blue-600',
    pink: 'text-pink-600',
  };

  return (
    <div className={`bg-gradient-to-br ${bgMap[color]} rounded-xl p-4 text-center`}>
      <div className="mb-2 text-2xl">{emoji}</div>
      <p className="mb-1 text-xs text-gray-600">{label}</p>
      <p className={`text-xl font-bold ${textMap[color]}`}>{value}</p>
      <p className="text-xs text-gray-500">{unit}</p>
    </div>
  );
}

function NutrientBar({
  name,
  current,
  target,
  color,
}: {
  name: string;
  current: number;
  target: number;
  color: string;
}) {
  const width = Math.min((current / target) * 100, 100);

  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-gray-700">{name}</span>
        <span className="text-gray-600">
          {current.toFixed(1)}g / {target}g
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className={`bg-${color}-500 h-2 rounded-full transition-all`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
