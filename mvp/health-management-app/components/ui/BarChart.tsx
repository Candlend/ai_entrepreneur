interface BarChartData {
  label: string;
  value: number;
  display?: string;
}

interface BarChartProps {
  data: BarChartData[];
  maxValue?: number;
  threshold?: number;
  className?: string;
}

export default function BarChart({ data, maxValue, threshold, className = '' }: BarChartProps) {
  const max = maxValue ?? Math.max(...data.map(d => d.value), 1);

  return (
    <div
      className={`flex items-end justify-between gap-2 ${className}`}
      style={{ height: '10rem' }}
    >
      {data.map((item, index) => {
        const height = Math.max((item.value / max) * 100, 10);

        return (
          <div key={index} className="flex flex-1 flex-col items-center gap-2">
            <div className="text-xs font-semibold text-gray-700">{item.display ?? item.value}</div>
            <div
              className={`w-full rounded-t-lg transition-all hover:opacity-80 ${
                threshold && item.value > threshold
                  ? 'bg-gradient-to-t from-red-400 to-red-500'
                  : 'bg-gradient-to-t from-green-400 to-green-500'
              }`}
              style={{ height: `${height}%` }}
            />
            <div className="text-xs text-gray-500">{item.label}</div>
          </div>
        );
      })}
    </div>
  );
}
