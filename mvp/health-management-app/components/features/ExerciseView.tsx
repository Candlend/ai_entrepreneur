'use client';

import { useState } from 'react';
import type { ExerciseRecord } from '@/types';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import { exerciseSchema } from '@/lib/validation';

interface ExerciseViewProps {
  exercises: ExerciseRecord[];
  caloriesBurned: number;
  exerciseDuration: number;
  onAdd: (exercise: ExerciseRecord) => void;
  onDelete: (id: string) => void;
}

export default function ExerciseView({
  exercises,
  caloriesBurned,
  exerciseDuration,
  onAdd,
  onDelete,
}: ExerciseViewProps) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    setError(null);
    const result = exerciseSchema.safeParse({
      name,
      duration: parseInt(duration),
      caloriesBurned: parseInt(calories),
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    onAdd({
      id: Math.random().toString(36).substr(2, 9),
      name: result.data.name,
      duration: result.data.duration,
      caloriesBurned: result.data.caloriesBurned,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      type: 'other',
    });
    setName('');
    setDuration('');
    setCalories('');
    setShowModal(false);
  };

  return (
    <Card
      title="🏃 今日运动"
      subtitle={
        <button
          onClick={() => setShowModal(true)}
          className="rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg"
        >
          + 添加运动
        </button>
      }
    >
      <div className="mb-6 grid grid-cols-3 gap-3">
        <StatBox label="运动时长" value={`${exerciseDuration} 分钟`} color="orange" />
        <StatBox label="消耗热量" value={`${caloriesBurned} 卡`} color="red" />
        <StatBox label="活动次数" value={`${exercises.length} 次`} color="purple" />
      </div>

      <div className="space-y-3">
        {exercises.map(exercise => (
          <ExerciseCard key={exercise.id} exercise={exercise} onDelete={onDelete} />
        ))}
      </div>

      {exercises.length === 0 && (
        <EmptyState emoji="🏃" title="还没有运动记录" description='点击"添加运动"记录今日活动' />
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="添加运动">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">运动名称</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
              placeholder="例如：跑步"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">时长（分钟）</label>
            <input
              type="number"
              value={duration}
              onChange={e => setDuration(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
              placeholder="30"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">消耗热量（卡）</label>
            <input
              type="number"
              value={calories}
              onChange={e => setCalories(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
              placeholder="250"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            onClick={handleSubmit}
            className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-600 py-3 font-semibold text-white transition-all hover:shadow-lg"
          >
            确认添加
          </button>
        </div>
      </Modal>
    </Card>
  );
}

function StatBox({ label, value, color }: { label: string; value: string; color: string }) {
  const bgMap: Record<string, string> = {
    orange: 'from-orange-50 to-orange-100',
    red: 'from-red-50 to-red-100',
    purple: 'from-purple-50 to-purple-100',
  };
  const textMap: Record<string, string> = {
    orange: 'text-orange-600',
    red: 'text-red-600',
    purple: 'text-purple-600',
  };

  return (
    <div className={`bg-gradient-to-br ${bgMap[color]} rounded-xl p-3 text-center`}>
      <p className="mb-1 text-xs text-gray-600">{label}</p>
      <p className={`text-xl font-bold ${textMap[color]}`}>{value}</p>
    </div>
  );
}

function ExerciseCard({
  exercise,
  onDelete,
}: {
  exercise: ExerciseRecord;
  onDelete: (id: string) => void;
}) {
  const emoji = exercise.type === 'cardio' ? '🏃' : exercise.type === 'strength' ? '💪' : '🧘';

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-orange-300 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-red-100 text-2xl">
            {emoji}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{exercise.name}</h3>
            <p className="text-sm text-gray-500">{exercise.time}</p>
          </div>
        </div>
        <button
          onClick={() => onDelete(exercise.id)}
          className="rounded-lg p-1 transition-colors hover:bg-red-50"
        >
          <svg
            className="h-5 w-5 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-blue-50 p-3">
          <p className="mb-1 text-xs text-gray-600">时长</p>
          <p className="text-lg font-bold text-blue-600">{exercise.duration} 分钟</p>
        </div>
        <div className="rounded-lg bg-red-50 p-3">
          <p className="mb-1 text-xs text-gray-600">消耗</p>
          <p className="text-lg font-bold text-red-600">{exercise.caloriesBurned} 卡</p>
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <div className="py-12 text-center">
      <div className="mb-4 text-6xl">{emoji}</div>
      <h3 className="mb-2 text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
