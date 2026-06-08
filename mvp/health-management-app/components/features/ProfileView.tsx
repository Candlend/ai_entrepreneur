import type { UserProfile } from '@/types';
import Card from '@/components/ui/Card';

interface ProfileViewProps {
  userProfile: UserProfile;
  bmr: number;
  tdee: number;
  caloriesTarget: number;
}

const GOAL_LABELS: Record<UserProfile['goal'], string> = {
  lose: '减重',
  maintain: '维持',
  gain: '增重',
};

const ACTIVITY_LABELS: Record<UserProfile['activityLevel'], string> = {
  sedentary: '久坐',
  light: '轻度',
  moderate: '中度',
  active: '活跃',
  veryActive: '非常活跃',
};

export default function ProfileView({ userProfile, bmr, tdee, caloriesTarget }: ProfileViewProps) {
  return (
    <Card title="👤 个人信息">
      <div className="mb-6 space-y-4">
        <InfoRow label="年龄" value={`${userProfile.age} 岁`} />
        <InfoRow label="性别" value={userProfile.gender === 'female' ? '女' : '男'} />
        <InfoRow label="身高" value={`${userProfile.height} cm`} />
        <InfoRow label="当前体重" value={`${userProfile.weight} kg`} />
      </div>

      <div className="mb-6 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <h3 className="mb-4 font-semibold text-gray-900">🔥 代谢数据</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="mb-1 text-sm text-gray-600">基础代谢率 (BMR)</p>
            <p className="text-2xl font-bold text-blue-600">{Math.round(bmr)}</p>
            <p className="text-xs text-gray-500">卡/天</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-gray-600">每日消耗 (TDEE)</p>
            <p className="text-2xl font-bold text-purple-600">{Math.round(tdee)}</p>
            <p className="text-xs text-gray-500">卡/天</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <h3 className="mb-4 font-semibold text-gray-900">🎯 目标设置</h3>
        <div className="space-y-3">
          <InfoRow label="健康目标" value={GOAL_LABELS[userProfile.goal]} />
          <InfoRow label="活动水平" value={ACTIVITY_LABELS[userProfile.activityLevel]} />
          <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-3">
            <span className="text-gray-700">每日目标热量</span>
            <span className="text-xl font-bold text-green-600">{caloriesTarget} 卡</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
      <span className="text-gray-700">{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}
