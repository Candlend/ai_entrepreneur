import type { ViewType } from '@/types';

interface NavigationProps {
  view: ViewType;
  onViewChange: (view: ViewType) => void;
}

const TABS: { id: ViewType; label: string }[] = [
  { id: 'home', label: '🍽️ 饮食' },
  { id: 'exercise', label: '🏃 运动' },
  { id: 'weight', label: '⚖️ 体重' },
  { id: 'bodyfat', label: '📊 体脂' },
  { id: 'stats', label: '📈 统计' },
  { id: 'profile', label: '👤 设置' },
];

export default function Navigation({ view, onViewChange }: NavigationProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white/80 p-2 shadow-lg backdrop-blur-sm">
      <div className="flex min-w-max gap-2">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => onViewChange(tab.id)}
            className={`flex-1 whitespace-nowrap rounded-xl px-4 py-3 text-xs font-semibold transition-all sm:text-sm ${
              view === tab.id
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
