interface ProgressRingProps {
  value: number;
  max: number;
  color?: string;
  size?: number;
}

export default function ProgressRing({
  value,
  max,
  color = 'text-green-500',
  size = 160,
}: ProgressRingProps) {
  const percentage = Math.min(value / max, 1);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percentage);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="h-full w-full -rotate-90 transform">
        <circle
          cx="50%"
          cy="50%"
          r={`${radius}%`}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-gray-200"
        />
        <circle
          cx="50%"
          cy="50%"
          r={`${radius}%`}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`transition-all duration-500 ${color}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-gray-900 sm:text-3xl">{value}</span>
        <span className="text-xs text-gray-500 sm:text-sm">/ {max} 卡</span>
      </div>
    </div>
  );
}
