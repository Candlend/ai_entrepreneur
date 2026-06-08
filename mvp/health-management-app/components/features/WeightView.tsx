'use client';

import { useState } from 'react';
import type { WeightRecord } from '@/types';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import BarChart from '@/components/ui/BarChart';
import { weightSchema } from '@/lib/validation';

interface WeightViewProps {
  weightRecords: WeightRecord[];
  currentWeight: number;
  onAddWeight: (record: WeightRecord) => void;
}

export default function WeightView({ weightRecords, currentWeight, onAddWeight }: WeightViewProps) {
  const [showModal, setShowModal] = useState(false);
  const [weight, setWeight] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    setError(null);
    const result = weightSchema.safeParse({ weight: parseFloat(weight) });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    onAddWeight({
      date: new Date().toISOString().split('T')[0],
      weight: result.data.weight,
    });
    setWeight('');
    setShowModal(false);
  };

  const weightChange =
    weightRecords.length >= 2
      ? weightRecords[weightRecords.length - 1].weight -
        weightRecords[weightRecords.length - 2].weight
      : 0;

  const chartData = weightRecords.map(r => ({
    label: r.date.slice(5),
    value: r.weight,
    display: String(r.weight),
  }));

  return (
    <Card
      title="⚖️ 体重追踪"
      subtitle={
        <button
          onClick={() => setShowModal(true)}
          className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg"
        >
          + 记录体重
        </button>
      }
    >
      <div className="mb-6 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="text-center">
          <p className="mb-2 text-sm text-gray-600">当前体重</p>
          <p className="mb-2 text-5xl font-bold text-blue-600">{currentWeight}</p>
          <p className="text-sm text-gray-600">公斤</p>

          {weightRecords.length >= 2 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              {weightChange < 0 ? (
                <>
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold text-green-600">{weightChange.toFixed(1)}kg</span>
                </>
              ) : (
                <>
                  <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold text-red-600">+{weightChange.toFixed(1)}kg</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-3 font-semibold text-gray-900">📈 趋势图</h3>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <BarChart data={chartData} />
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-semibold text-gray-900">📋 历史记录</h3>
        <div className="space-y-2">
          {[...weightRecords].reverse().map((record, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:border-blue-300"
            >
              <div>
                <p className="font-semibold text-gray-900">{record.date}</p>
                {record.bodyFat && (
                  <p className="text-sm text-gray-500">体脂率: {record.bodyFat}%</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{record.weight}</p>
                <p className="text-xs text-gray-500">kg</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="记录体重">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">今日体重（kg）</label>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="60.0"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            onClick={handleSubmit}
            className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 py-3 font-semibold text-white transition-all hover:shadow-lg"
          >
            确认记录
          </button>
        </div>
      </Modal>
    </Card>
  );
}
