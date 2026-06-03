'use client';

import { useState } from 'react';

interface VisaSlot {
  id: string;
  date: string;
  time: string;
  embassy: string;
  available: boolean;
  status: 'available' | 'limited' | 'full';
}

interface MonitorConfig {
  city: string;
  visaType: string;
  preferredDates: string[];
  autoBook: boolean;
  notificationEmail: string;
}

export default function Home() {
  const [step, setStep] = useState<'intro' | 'config' | 'monitoring'>('intro');
  const [config, setConfig] = useState<MonitorConfig>({
    city: '',
    visaType: '',
    preferredDates: [],
    autoBook: false,
    notificationEmail: ''
  });
  const [slots, setSlots] = useState<VisaSlot[]>([]);
  const [monitoring, setMonitoring] = useState(false);

  const cities = [
    { id: 'beijing', name: '北京' },
    { id: 'shanghai', name: '上海' },
    { id: 'guangzhou', name: '广州' },
    { id: 'chengdu', name: '成都' },
    { id: 'shenyang', name: '沈阳' }
  ];

  const visaTypes = [
    { id: 'f1', name: 'F-1 学生签证', desc: '适用于赴美留学的学生' },
    { id: 'b1b2', name: 'B-1/B-2 旅游商务签证', desc: '适用于短期旅游或商务访问' },
    { id: 'h1b', name: 'H-1B 工作签证', desc: '适用于专业技术工作' },
    { id: 'j1', name: 'J-1 交流访问签证', desc: '适用于交流访问学者' },
    { id: 'l1', name: 'L-1 跨国公司调派签证', desc: '适用于跨国公司内部调派' }
  ];

  const generateMockSlots = (): VisaSlot[] => {
    const mockSlots: VisaSlot[] = [
      {
        id: '1',
        date: '2026-06-15',
        time: '09:00',
        embassy: config.city,
        available: true,
        status: 'available'
      },
      {
        id: '2',
        date: '2026-06-18',
        time: '14:30',
        embassy: config.city,
        available: true,
        status: 'limited'
      },
      {
        id: '3',
        date: '2026-06-22',
        time: '10:00',
        embassy: config.city,
        available: true,
        status: 'available'
      },
      {
        id: '4',
        date: '2026-06-25',
        time: '15:00',
        embassy: config.city,
        available: false,
        status: 'full'
      },
      {
        id: '5',
        date: '2026-06-28',
        time: '11:30',
        embassy: config.city,
        available: true,
        status: 'available'
      }
    ];
    return mockSlots;
  };

  const startMonitoring = () => {
    setSlots(generateMockSlots());
    setMonitoring(true);
    setStep('monitoring');
  };

  const bookSlot = (slotId: string) => {
    setSlots(slots.map(slot =>
      slot.id === slotId
        ? { ...slot, available: false, status: 'full' as const }
        : slot
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'limited':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'full':
        return 'bg-gray-100 text-gray-500 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-500 border-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return '可预约';
      case 'limited':
        return '名额紧张';
      case 'full':
        return '已满';
      default:
        return '未知';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* 标题 */}
        <div className="text-center pt-2 sm:pt-4 pb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full mb-3 sm:mb-4 shadow-lg">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            美签预约助手
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">AI智能监控 · 自动提醒 · 一键预约</p>
        </div>

        {step === 'intro' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100">
                <div className="text-3xl mb-2">🔍</div>
                <h3 className="font-bold text-gray-900 mb-1">实时监控</h3>
                <p className="text-sm text-gray-600">7x24小时监控预约时间</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100">
                <div className="text-3xl mb-2">🔔</div>
                <h3 className="font-bold text-gray-900 mb-1">即时通知</h3>
                <p className="text-sm text-gray-600">有空位第一时间通知</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-bold text-gray-900 mb-1">快速预约</h3>
                <p className="text-sm text-gray-600">自动抢签，一键预约</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📋 为什么选择我们？</h2>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">智能算法</h4>
                    <p className="text-sm text-gray-600">AI分析预约规律，预测最佳预约时间</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">多渠道通知</h4>
                    <p className="text-sm text-gray-600">邮件、短信、微信多渠道即时提醒</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">自动抢签</h4>
                    <p className="text-sm text-gray-600">设置条件后自动预约，无需手动操作</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep('config')}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
              >
                开始配置监控
              </button>
            </div>
          </>
        )}

        {step === 'config' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">⚙️ 配置监控设置</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">选择使领馆</label>
                <select
                  value={config.city}
                  onChange={(e) => setConfig({ ...config, city: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">请选择城市</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}使领馆
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">签证类型</label>
                <div className="space-y-2">
                  {visaTypes.map((visa) => (
                    <button
                      key={visa.id}
                      onClick={() => setConfig({ ...config, visaType: visa.name })}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        config.visaType === visa.name
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold text-gray-900">{visa.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{visa.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">通知邮箱</label>
                <input
                  type="email"
                  value={config.notificationEmail}
                  onChange={(e) => setConfig({ ...config, notificationEmail: e.target.value })}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.autoBook}
                    onChange={(e) => setConfig({ ...config, autoBook: e.target.checked })}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">启用自动预约</div>
                    <div className="text-sm text-gray-600">发现可用时间后自动完成预约</div>
                  </div>
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep('intro')}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-200"
                >
                  返回
                </button>
                <button
                  onClick={startMonitoring}
                  disabled={!config.city || !config.visaType || !config.notificationEmail}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
                >
                  开始监控
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'monitoring' && (
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${monitoring ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    {monitoring ? '🔍 监控中' : '⏸️ 已暂停'}
                  </h2>
                </div>
                <button
                  onClick={() => setStep('config')}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  修改设置
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">使领馆</p>
                  <p className="font-semibold text-gray-900">{config.city}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">签证类型</p>
                  <p className="font-semibold text-gray-900 text-sm">{config.visaType}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">自动预约</p>
                  <p className="font-semibold text-gray-900">{config.autoBook ? '已启用' : '未启用'}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">监控时长</p>
                  <p className="font-semibold text-gray-900">24小时</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <h4 className="font-semibold text-gray-900">监控说明</h4>
                </div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 系统每5分钟自动检查一次</li>
                  <li>• 发现可用时间立即通知您</li>
                  <li>• 自动预约功能可随时关闭</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📅 可用预约时间</h3>

              <div className="space-y-3">
                {slots.map((slot) => (
                  <div
                    key={slot.id}
                    className={`rounded-xl border-2 p-4 transition-all ${
                      slot.available
                        ? 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-2xl">📅</div>
                          <div>
                            <div className="font-bold text-gray-900">
                              {new Date(slot.date).toLocaleDateString('zh-CN', {
                                month: 'long',
                                day: 'numeric',
                                weekday: 'short'
                              })}
                            </div>
                            <div className="text-sm text-gray-600">{slot.time} · {slot.embassy}使领馆</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(slot.status)}`}>
                          {getStatusText(slot.status)}
                        </span>
                        {slot.available ? (
                          <button
                            onClick={() => bookSlot(slot.id)}
                            className="flex-1 sm:flex-none bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 active:scale-95"
                          >
                            立即预约
                          </button>
                        ) : (
                          <button
                            disabled
                            className="flex-1 sm:flex-none bg-gray-300 text-gray-500 font-semibold py-2 px-4 rounded-lg cursor-not-allowed"
                          >
                            已预约
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {slots.filter(s => s.available).length === 0 && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">😔</div>
                  <p className="text-gray-600 mb-2">暂无可用预约时间</p>
                  <p className="text-sm text-gray-500">我们会持续监控并在有空位时第一时间通知您</p>
                </div>
              )}
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🔔 最近通知</h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">发现新的可用时间</p>
                    <p className="text-xs text-gray-600 mt-1">2026-06-15 09:00 有空位，已发送邮件通知</p>
                    <p className="text-xs text-gray-500 mt-1">2分钟前</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                    ℹ️
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">监控启动成功</p>
                    <p className="text-xs text-gray-600 mt-1">已开始监控{config.city}使领馆的{config.visaType}</p>
                    <p className="text-xs text-gray-500 mt-1">5分钟前</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
