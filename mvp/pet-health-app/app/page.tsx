'use client';

import { useState } from 'react';

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  avatar: string;
}

interface HealthRecord {
  id: string;
  date: string;
  symptoms: string;
  aiAnalysis: string;
  recommendations: string[];
}

interface FeedingReminder {
  id: string;
  time: string;
  foodType: string;
  amount: string;
  enabled: boolean;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
}

interface HospitalVisit {
  id: string;
  date: string;
  hospital: string;
  doctor: string;
  reason: string;
  diagnosis: string;
  treatment: string;
  cost: number;
}

interface Photo {
  id: string;
  url: string;
  date: string;
  description: string;
}

interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
  icon: string;
}

interface Expense {
  id: string;
  date: string;
  category: string;
  item: string;
  amount: number;
}

type ViewType = 'health' | 'feeding' | 'medication' | 'hospital' | 'photos' | 'milestone' | 'expense' | 'profile';

export default function Home() {
  const [view, setView] = useState<ViewType>('profile');

  // 宠物信息
  const [pet, setPet] = useState<Pet>({
    id: '1',
    name: '旺财',
    species: '狗',
    breed: '金毛',
    age: 3,
    weight: 30,
    avatar: '🐕'
  });

  // 健康记录
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([
    {
      id: '1',
      date: '2026-06-01',
      symptoms: '食欲不振，精神萎靡',
      aiAnalysis: '可能是轻度肠胃不适，建议观察24小时',
      recommendations: ['清淡饮食', '充足水分', '观察体温']
    }
  ]);

  // 喂食提醒
  const [feedingReminders, setFeedingReminders] = useState<FeedingReminder[]>([
    { id: '1', time: '07:00', foodType: '狗粮', amount: '200g', enabled: true },
    { id: '2', time: '18:00', foodType: '狗粮', amount: '200g', enabled: true }
  ]);

  // 用药记录
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: '益生菌',
      dosage: '1包',
      frequency: '每日2次',
      startDate: '2026-06-01',
      endDate: '2026-06-07'
    }
  ]);

  // 就诊记录
  const [hospitalVisits, setHospitalVisits] = useState<HospitalVisit[]>([
    {
      id: '1',
      date: '2026-05-28',
      hospital: '爱宠动物医院',
      doctor: '张医生',
      reason: '疫苗接种',
      diagnosis: '健康状况良好',
      treatment: '狂犬疫苗注射',
      cost: 120
    }
  ]);

  // 照片相册
  const [photos, setPhotos] = useState<Photo[]>([
    { id: '1', url: '🐕', date: '2026-06-04', description: '今天很开心' },
    { id: '2', url: '🎾', date: '2026-06-03', description: '玩球球' },
    { id: '3', url: '😴', date: '2026-06-02', description: '午睡时间' }
  ]);

  // 成长里程碑
  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: '1', date: '2023-03-15', title: '来到新家', description: '第一天到家，很害羞', icon: '🏠' },
    { id: '2', date: '2023-06-20', title: '学会坐下', description: '成功学会第一个指令', icon: '🎓' },
    { id: '3', date: '2024-03-15', title: '1岁生日', description: '健康快乐成长', icon: '🎂' },
    { id: '4', date: '2025-03-15', title: '2岁生日', description: '越来越乖巧', icon: '🎉' }
  ]);

  // 支出记录
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', date: '2026-06-04', category: '食品', item: '狗粮10kg', amount: 280 },
    { id: '2', date: '2026-06-03', category: '玩具', item: '咬咬球', amount: 45 },
    { id: '3', date: '2026-06-01', category: '医疗', item: '益生菌', amount: 89 },
    { id: '4', date: '2026-05-28', category: '医疗', item: '疫苗接种', amount: 120 }
  ]);

  const addFeedingReminder = () => {
    const time = prompt('喂食时间（例如：12:00）：');
    const foodType = prompt('食物类型：');
    const amount = prompt('食物量（例如：200g）：');

    if (time && foodType && amount) {
      setFeedingReminders([...feedingReminders, {
        id: Date.now().toString(),
        time,
        foodType,
        amount,
        enabled: true
      }]);
    }
  };

  const addMedication = () => {
    const name = prompt('药品名称：');
    const dosage = prompt('剂量：');
    const frequency = prompt('频率（例如：每日2次）：');

    if (name && dosage && frequency) {
      setMedications([...medications, {
        id: Date.now().toString(),
        name,
        dosage,
        frequency,
        startDate: new Date().toISOString().split('T')[0],
        endDate: ''
      }]);
    }
  };

  const addExpense = () => {
    const category = prompt('类别（食品/玩具/医疗/美容/其他）：');
    const item = prompt('项目名称：');
    const amountStr = prompt('金额：');

    if (category && item && amountStr) {
      setExpenses([...expenses, {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        category,
        item,
        amount: parseFloat(amountStr)
      }]);
    }
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* 标题 */}
        <div className="text-center pt-2 sm:pt-4 pb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full mb-3 sm:mb-4 shadow-lg">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            宠物健康助手
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">AI智能管理 · 全方位呵护 · 健康成长</p>
        </div>

        {/* 导航标签 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-2 border border-gray-100 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {[
              { id: 'profile' as ViewType, label: '👤 档案' },
              { id: 'health' as ViewType, label: '🏥 健康' },
              { id: 'feeding' as ViewType, label: '🍖 喂食' },
              { id: 'medication' as ViewType, label: '💊 用药' },
              { id: 'hospital' as ViewType, label: '🏥 就诊' },
              { id: 'photos' as ViewType, label: '📷 相册' },
              { id: 'milestone' as ViewType, label: '🎯 里程碑' },
              { id: 'expense' as ViewType, label: '💰 支出' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setView(tab.id)}
                className={`py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
                  view === tab.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 宠物档案视图 */}
        {view === 'profile' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">👤 宠物档案</h2>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full mb-3 text-5xl">
                {pet.avatar}
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{pet.name}</h3>
              <p className="text-gray-600">{pet.breed} · {pet.age}岁</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">物种</p>
                <p className="text-xl font-bold text-amber-600">{pet.species}</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">体重</p>
                <p className="text-xl font-bold text-amber-600">{pet.weight} kg</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="text-center p-3 bg-blue-50 rounded-xl">
                <div className="text-2xl mb-1">🏥</div>
                <p className="text-xs text-gray-600">健康记录</p>
                <p className="text-lg font-bold text-blue-600">{healthRecords.length}</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-xl">
                <div className="text-2xl mb-1">💊</div>
                <p className="text-xs text-gray-600">用药中</p>
                <p className="text-lg font-bold text-green-600">{medications.length}</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-xl">
                <div className="text-2xl mb-1">📷</div>
                <p className="text-xs text-gray-600">照片</p>
                <p className="text-lg font-bold text-purple-600">{photos.length}</p>
              </div>
              <div className="text-center p-3 bg-pink-50 rounded-xl">
                <div className="text-2xl mb-1">💰</div>
                <p className="text-xs text-gray-600">本月支出</p>
                <p className="text-lg font-bold text-pink-600">¥{totalExpenses}</p>
              </div>
            </div>
          </div>
        )}

        {/* 健康记录视图 */}
        {view === 'health' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">🏥 健康记录</h2>

            <div className="space-y-3">
              {healthRecords.map((record) => (
                <div key={record.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs text-gray-500">{record.date}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">症状：</p>
                    <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">{record.symptoms}</p>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">AI分析：</p>
                    <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">{record.aiAnalysis}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">建议：</p>
                    <ul className="space-y-1">
                      {record.recommendations.map((rec, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 喂食提醒视图 */}
        {view === 'feeding' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">🍖 喂食提醒</h2>
              <button
                onClick={addFeedingReminder}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
              >
                + 添加提醒
              </button>
            </div>

            <div className="space-y-3">
              {feedingReminders.map((reminder) => (
                <div key={reminder.id} className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-2xl">
                        🍖
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{reminder.time}</p>
                        <p className="text-sm text-gray-600">{reminder.foodType} · {reminder.amount}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setFeedingReminders(feedingReminders.map(r =>
                          r.id === reminder.id ? { ...r, enabled: !r.enabled } : r
                        ));
                      }}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                        reminder.enabled
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {reminder.enabled ? '已启用' : '已关闭'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-gray-700">
                💡 <strong>提示:</strong> 开启提醒后，系统会在指定时间通知您喂食
              </p>
            </div>
          </div>
        )}

        {/* 用药记录视图 */}
        {view === 'medication' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">💊 用药记录</h2>
              <button
                onClick={addMedication}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
              >
                + 添加用药
              </button>
            </div>

            <div className="space-y-3">
              {medications.map((med) => (
                <div key={med.id} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-2xl">
                        💊
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{med.name}</h3>
                        <p className="text-sm text-gray-600">剂量: {med.dosage}</p>
                        <p className="text-sm text-gray-600">频率: {med.frequency}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>开始: {med.startDate}</span>
                    {med.endDate && <span>结束: {med.endDate}</span>}
                  </div>
                </div>
              ))}
            </div>

            {medications.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">💊</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">暂无用药记录</h3>
                <p className="text-sm text-gray-500">点击"添加用药"记录宠物的用药情况</p>
              </div>
            )}
          </div>
        )}

        {/* 就诊记录视图 */}
        {view === 'hospital' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">🏥 就诊记录</h2>

            <div className="space-y-4">
              {hospitalVisits.map((visit) => (
                <div key={visit.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900">{visit.hospital}</h3>
                      <p className="text-sm text-gray-600">医生: {visit.doctor}</p>
                      <p className="text-xs text-gray-500">{visit.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-red-600">¥{visit.cost}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">就诊原因: </span>
                      <span className="text-gray-600">{visit.reason}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">诊断结果: </span>
                      <span className="text-gray-600">{visit.diagnosis}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">治疗方案: </span>
                      <span className="text-gray-600">{visit.treatment}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 照片相册视图 */}
        {view === 'photos' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📷 照片相册</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200 hover:shadow-lg transition-all">
                  <div className="text-6xl text-center mb-3">{photo.url}</div>
                  <p className="text-sm font-semibold text-gray-900 text-center mb-1">{photo.description}</p>
                  <p className="text-xs text-gray-500 text-center">{photo.date}</p>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200">
              + 上传新照片
            </button>
          </div>
        )}

        {/* 成长里程碑视图 */}
        {view === 'milestone' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">🎯 成长里程碑</h2>

            <div className="relative">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="flex gap-4 mb-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
                      {milestone.icon}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-1 h-16 bg-gradient-to-b from-green-400 to-emerald-500 opacity-30"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                      <p className="text-xs text-gray-500 mb-1">{milestone.date}</p>
                      <h3 className="font-bold text-gray-900 mb-1">{milestone.title}</h3>
                      <p className="text-sm text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200">
              + 添加里程碑
            </button>
          </div>
        )}

        {/* 支出记录视图 */}
        {view === 'expense' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">💰 支出记录</h2>
              <button
                onClick={addExpense}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
              >
                + 添加支出
              </button>
            </div>

            <div className="mb-6 p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-200">
              <p className="text-sm text-gray-600 mb-1">总支出</p>
              <p className="text-3xl font-bold text-pink-600">¥{totalExpenses.toFixed(2)}</p>
            </div>

            <div className="space-y-3">
              {expenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">
                        {expense.category === '食品' && '🍖'}
                        {expense.category === '玩具' && '🎾'}
                        {expense.category === '医疗' && '💊'}
                        {expense.category === '美容' && '✂️'}
                        {expense.category === '其他' && '📦'}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{expense.item}</p>
                      <p className="text-xs text-gray-500">{expense.date} · {expense.category}</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-pink-600">¥{expense.amount}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-yellow-50 rounded-xl">
              <p className="text-sm text-gray-700">
                💡 <strong>支出分析:</strong> 本月主要支出在医疗和食品方面
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

