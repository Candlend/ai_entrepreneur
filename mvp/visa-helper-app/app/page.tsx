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
  notificationPhone: string;
  notificationWechat: string;
}

interface BookingHistory {
  id: string;
  date: string;
  time: string;
  embassy: string;
  visaType: string;
  status: 'success' | 'cancelled' | 'pending';
  bookingDate: string;
}

interface Document {
  name: string;
  required: boolean;
  description: string;
  tips: string;
}

interface BookingTip {
  title: string;
  content: string;
  icon: string;
}

type ViewType = 'home' | 'config' | 'monitoring' | 'history' | 'documents' | 'tips';

export default function Home() {
  const [view, setView] = useState<ViewType>('home');
  const [config, setConfig] = useState<MonitorConfig>({
    city: '',
    visaType: '',
    preferredDates: [],
    autoBook: false,
    notificationEmail: '',
    notificationPhone: '',
    notificationWechat: ''
  });
  const [slots, setSlots] = useState<VisaSlot[]>([]);
  const [monitoring, setMonitoring] = useState(false);
  const [bookingHistory, setBookingHistory] = useState<BookingHistory[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [tips, setTips] = useState<BookingTip[]>([]);

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

  const generateBookingHistory = () => {
    const history: BookingHistory[] = [
      {
        id: '1',
        date: '2026-06-15',
        time: '09:00',
        embassy: '北京',
        visaType: 'F-1 学生签证',
        status: 'success',
        bookingDate: '2026-06-04'
      },
      {
        id: '2',
        date: '2026-05-20',
        time: '14:00',
        embassy: '上海',
        visaType: 'B-1/B-2 旅游商务签证',
        status: 'cancelled',
        bookingDate: '2026-05-10'
      },
      {
        id: '3',
        date: '2026-04-12',
        time: '10:30',
        embassy: '广州',
        visaType: 'H-1B 工作签证',
        status: 'success',
        bookingDate: '2026-04-01'
      }
    ];
    setBookingHistory(history);
  };

  const generateDocuments = () => {
    const docs: Document[] = [
      {
        name: 'DS-160表格确认页',
        required: true,
        description: '在线填写的非移民签证申请表',
        tips: '打印时请确保包含条形码，且信息清晰可见'
      },
      {
        name: '有效护照',
        required: true,
        description: '护照有效期需超过预计在美停留期至少6个月',
        tips: '检查护照是否有破损，建议提前准备护照复印件'
      },
      {
        name: '签证照片',
        required: true,
        description: '6个月内拍摄的51mm x 51mm白底彩色照片',
        tips: '不要佩戴眼镜，露出双耳，表情自然'
      },
      {
        name: 'I-20表格（F-1签证）',
        required: true,
        description: '学校签发的入学资格证明',
        tips: '确保I-20上的SEVIS费用已缴纳，保留缴费收据'
      },
      {
        name: '在读证明/学历证明',
        required: true,
        description: '证明当前学业状态或已获学历',
        tips: '中英文对照版本，加盖学校公章'
      },
      {
        name: '资金证明',
        required: true,
        description: '银行存款证明、父母收入证明等',
        tips: '建议提供至少覆盖一年学费和生活费的资金证明'
      },
      {
        name: 'SEVIS缴费收据',
        required: true,
        description: 'I-901 SEVIS费用缴纳证明',
        tips: '在线缴费后打印收据，保留电子版备份'
      },
      {
        name: '面试预约确认页',
        required: true,
        description: '预约成功后打印的确认页',
        tips: '面试当天必须携带，建议多打印一份备用'
      }
    ];
    setDocuments(docs);
  };

  const generateTips = () => {
    const bookingTips: BookingTip[] = [
      {
        title: '最佳预约时间',
        icon: '⏰',
        content: '使馆通常在工作日早上8点、中午12点、下午5点释放取消的预约名额，建议在这些时间段重点监控。'
      },
      {
        title: '提前准备材料',
        icon: '📄',
        content: '在抢到预约前就准备好所有材料，包括DS-160表格、照片、资金证明等，以免错过预约时间。'
      },
      {
        title: '多城市监控',
        icon: '🏙️',
        content: '如果您所在城市预约困难，可以考虑监控周边城市的使领馆，有时其他城市会有更多可用时间。'
      },
      {
        title: '避开高峰期',
        icon: '📅',
        content: '5-8月是签证高峰期，建议尽量选择3-4月或9-11月预约，可用时间更多，面签通过率也相对较高。'
      },
      {
        title: '设置多个提醒',
        icon: '🔔',
        content: '同时开启邮件、短信和微信通知，确保第一时间收到预约提醒，避免错过机会。'
      },
      {
        title: '保持网络畅通',
        icon: '📱',
        content: '抢签时网络速度至关重要，建议使用稳定的Wi-Fi或4G网络，提前测试登录使馆网站。'
      },
      {
        title: '填写准确信息',
        icon: '✍️',
        content: 'DS-160表格信息必须与护照完全一致，任何错误都可能导致签证被拒，填写时务必仔细核对。'
      },
      {
        title: '面签注意事项',
        icon: '🎤',
        content: '回答问题要简洁明了，保持自信和礼貌，提前准备常见问题的回答，如学习计划、归国打算等。'
      }
    ];
    setTips(bookingTips);
  };

  const startMonitoring = () => {
    setSlots(generateMockSlots());
    setMonitoring(true);
    setView('monitoring');
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

  const getHistoryStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getHistoryStatusText = (status: string) => {
    switch (status) {
      case 'success':
        return '已完成';
      case 'cancelled':
        return '已取消';
      case 'pending':
        return '待面签';
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

        {/* 导航标签 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-2 border border-gray-100 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {[
              { id: 'home' as ViewType, label: '🏠 首页' },
              { id: 'config' as ViewType, label: '⚙️ 配置' },
              { id: 'monitoring' as ViewType, label: '🔍 监控' },
              { id: 'history' as ViewType, label: '📋 历史' },
              { id: 'documents' as ViewType, label: '📄 材料' },
              { id: 'tips' as ViewType, label: '💡 技巧' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setView(tab.id);
                  if (tab.id === 'history' && bookingHistory.length === 0) {
                    generateBookingHistory();
                  }
                  if (tab.id === 'documents' && documents.length === 0) {
                    generateDocuments();
                  }
                  if (tab.id === 'tips' && tips.length === 0) {
                    generateTips();
                  }
                }}
                className={`py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
                  view === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 首页视图 */}
        {view === 'home' && (
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
                <p className="text-sm text-gray-600">邮件+短信+微信三重提醒</p>
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
                onClick={() => setView('config')}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
              >
                开始配置监控
              </button>
            </div>
          </>
        )}

        {/* 配置视图 */}
        {view === 'config' && (
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

              {/* 通知设置 */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-3">🔔 通知方式设置</h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">邮箱通知</label>
                    <input
                      type="email"
                      value={config.notificationEmail}
                      onChange={(e) => setConfig({ ...config, notificationEmail: e.target.value })}
                      placeholder="example@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">短信通知</label>
                    <input
                      type="tel"
                      value={config.notificationPhone}
                      onChange={(e) => setConfig({ ...config, notificationPhone: e.target.value })}
                      placeholder="13800138000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">微信通知</label>
                    <input
                      type="text"
                      value={config.notificationWechat}
                      onChange={(e) => setConfig({ ...config, notificationWechat: e.target.value })}
                      placeholder="微信号"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
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

              <button
                onClick={startMonitoring}
                disabled={!config.city || !config.visaType || !config.notificationEmail}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
              >
                开始监控
              </button>
            </div>
          </div>
        )}

        {/* 监控视图 */}
        {view === 'monitoring' && (
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
                  onClick={() => setView('config')}
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

              {/* 通知渠道状态 */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-3">✅ 通知渠道已激活</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                  {config.notificationEmail && (
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">📧</span>
                      <span className="text-gray-700">邮件通知</span>
                    </div>
                  )}
                  {config.notificationPhone && (
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">📱</span>
                      <span className="text-gray-700">短信通知</span>
                    </div>
                  )}
                  {config.notificationWechat && (
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">💬</span>
                      <span className="text-gray-700">微信通知</span>
                    </div>
                  )}
                </div>
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
          </div>
        )}

        {/* 预约历史视图 */}
        {view === 'history' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📋 预约历史记录</h2>

            {bookingHistory.length > 0 ? (
              <div className="space-y-3">
                {bookingHistory.map((booking) => (
                  <div key={booking.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-gray-900">{booking.visaType}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getHistoryStatusColor(booking.status)}`}>
                            {getHistoryStatusText(booking.status)}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>📅 面签时间：{booking.date} {booking.time}</p>
                          <p>🏛️ 使领馆：{booking.embassy}使领馆</p>
                          <p>📝 预约日期：{booking.bookingDate}</p>
                        </div>
                      </div>
                      {booking.status === 'success' && (
                        <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                          查看详情
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">📋</div>
                <p className="text-gray-600">暂无预约记录</p>
              </div>
            )}
          </div>
        )}

        {/* 签证材料清单视图 */}
        {view === 'documents' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📄 签证材料清单</h2>

            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200 mb-4">
              <div className="flex items-start gap-2">
                <span className="text-xl">⚠️</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">重要提示</h4>
                  <p className="text-sm text-gray-700">以下为F-1学生签证所需材料清单，其他签证类型请根据实际情况准备</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {documents.map((doc, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        doc.required ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {doc.required ? '✓' : '○'}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900">{doc.name}</h3>
                        {doc.required && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-semibold">
                            必需
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                      <div className="bg-blue-50 rounded-lg p-2 border border-blue-200">
                        <p className="text-xs text-blue-900">
                          <span className="font-semibold">💡 提示：</span>
                          {doc.tips}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
              <h4 className="font-semibold text-gray-900 mb-2">✅ 材料准备检查清单</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 所有文件准备齐全，按顺序整理</li>
                <li>• 重要文件准备复印件备用</li>
                <li>• 翻译件需加盖翻译公司公章</li>
                <li>• 照片符合使馆最新规格要求</li>
                <li>• 提前一天检查所有材料完整性</li>
              </ul>
            </div>
          </div>
        )}

        {/* 预约技巧视图 */}
        {view === 'tips' && (
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">💡 预约技巧和注意事项</h2>
              <p className="text-sm text-gray-600 mb-4">
                基于数千次成功预约经验总结的实用技巧，帮助您提高预约成功率
              </p>
            </div>

            {tips.map((tip, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center text-2xl">
                    {tip.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{tip.content}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-4 sm:p-6 border border-red-200">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                <span>特别注意</span>
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• 预约成功后请务必在规定时间内支付签证费用，否则预约将被自动取消</li>
                <li>• 面签当天请提前30分钟到达使馆，迟到可能导致预约作废</li>
                <li>• 使馆附近禁止携带电子设备，请提前安排好物品寄存</li>
                <li>• 如需取消或改期，请至少提前24小时操作，避免影响他人</li>
                <li>• 签证申请一旦被拒，短期内再次申请成功率较低，请谨慎准备</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

