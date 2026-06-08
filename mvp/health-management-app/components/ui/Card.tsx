import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: ReactNode;
  className?: string;
}

export default function Card({ children, title, subtitle, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-lg backdrop-blur-sm sm:p-6 ${className}`}
    >
      {title && (
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 sm:text-xl">{title}</h2>
          {subtitle && <span className="text-xs text-gray-500 sm:text-sm">{subtitle}</span>}
        </div>
      )}
      {children}
    </div>
  );
}
