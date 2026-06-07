'use client';

import { useState, useEffect } from 'react';

interface AdSpace {
  id: string;
  name: string;
  position: string;
  size: string;
  impressions: number;
  clicks: number;
  revenue: number;
  ctr: number;
  cpm: number;
  fillRate: number;
}

interface OptimizationSuggestion {
  id: string;
  type: 'warning' | 'info' | 'success';
  title: string;
  description: string;
  impact: string;
}

interface ABTest {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'draft';
  variantA: string;
  variantB: string;
  conversionA: number;
  conversionB: number;
  winner: 'A' | 'B' | 'undecided';
  startDate: string;
  endDate: string;
}

interface Platform {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  revenue: number;
  impressions: number;
  status: 'active' | 'inactive' | 'error';
}

interface ReportConfig {
  format: 'excel' | 'pdf' | 'csv';
  period: 'today' | 'week' | 'month' | 'custom';
  includeCharts: boolean;
  includeDetails: boolean;
}

type ViewType = 'dashboard' | 'spaces' | 'optimization' | 'abtest' | 'platforms' | 'export';

export default function Home() {
  const [view, setView] = useState<ViewType>('dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [abTests, setABTests] = useState<ABTest[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    format: 'excel',
    period: 'today',
    includeCharts: true,
    includeDetails: true
  });

  const mockAdSpaces: AdSpace[] = [
    {
      id: '1',
      name: '首页横幅',
      position: '顶部',
      size: '728x90',
      impressions: 15420,
      clicks: 234,
      revenue: 1580,
      ctr: 1.52,
      cpm: 102.5,
      fillRate: 98.5
    },
    {
      id: '2',
      name: '侧边栏广告',
      position: '右侧',
      size: '300x250',
      impressions: 12340,
      clicks: 156,
      revenue: 980,
      ctr: 1.26,
      cpm: 79.4,
      fillRate: 95.2
    },
    {
      id: '3',
      name: '文章内嵌',
      position: '内容中',
      size: '336x280',
      impressions: 8750,
      clicks: 198,
      revenue: 1250,
      ctr: 2.26,
      cpm: 142.9,
      fillRate: 92.8
    },
    {
      id: '4',
      name: '底部广告',
      position: '底部',
      size: '970x90',
      impressions: 6890,
      clicks: 89,
      revenue: 560,
      ctr: 1.29,
      cpm: 81.3,
      fillRate: 88.5
    }
  ];

  const mockSuggestions: OptimizationSuggestion[] = [
    {
      id: '1',
      type: 'success',
      title: '文章内嵌广告表现优秀',
      description: 'CTR达到2.26%，建议增加类似位置的广告位',
      impact: '+25% 预期收益'
    },
    {
      id: '2',
      type: 'warning',
      title: '底部广告填充率偏低',
      description: '填充率仅88.5%，建议添加备用广告源',
      impact: '+12% 预期收益'
    },
    {
      id: '3',
      type: 'info',
      title: '移动端流量增长',
      description: '移动端流量占比达65%，建议优化移动端广告尺寸',
      impact: '+18% 预期收益'
    },
    {
      id: '4',
      type: 'warning',
      title: '首页横幅CPM偏高',
      description: '当前CPM为102.5，但转化率一般，建议调整广告策略',
      impact: '优化空间'
    }
  ];

  // 初始化A/B测试数据
  const generateABTests = () => {
    const tests: ABTest[] = [
      {
        id: '1',
        name: '首页横幅尺寸测试',
        status: 'running',
        variantA: '728x90',
        variantB: '970x90',
        conversionA: 1.52,
        conversionB: 1.78,
        winner: 'B',
        startDate: '2026-06-01',
        endDate: '2026-06-14'
      },
      {
        id: '2',
        name: '侧边栏颜色测试',
        status: 'running',
        variantA: '蓝色主题',
        variantB: '红色主题',
        conversionA: 1.26,
        conversionB: 1.31,
        winner: 'undecided',
        startDate: '2026-06-03',
        endDate: '2026-06-17'
      },
      {
        id: '3',
        name: '底部广告位置测试',
        status: 'completed',
        variantA: '固定底部',
        variantB: '滚动底部',
        conversionA: 1.29,
        conversionB: 1.65,
        winner: 'B',
        startDate: '2026-05-20',
        endDate: '2026-06-03'
      }
    ];
    setABTests(tests);
  };

  // 初始化平台数据
  const generatePlatforms = () => {
    const platformList: Platform[] = [
      {
        id: '1',
        name: 'Google AdSense',
        icon: '🌐',
        connected: true,
        revenue: 2850,
        impressions: 32400,
        status: 'active'
      },
      {
        id: '2',
        name: '百度联盟',
        icon: '🔍',
        connected: true,
        revenue: 1680,
        impressions: 18900,
        status: 'active'
      },
      {
        id: '3',
        name: '腾讯广告',
        icon: '💬',
        connected: true,
        revenue: 1240,
        impressions: 15200,
        status: 'active'
      },
      {
        id: '4',
        name: '头条广告',
        icon: '📰',
        connected: false,
        revenue: 0,
        impressions: 0,
        status: 'inactive'
      },
      {
        id: '5',
        name: 'Taboola',
        icon: '🎯',
        connected: false,
        revenue: 0,
        impressions: 0,
        status: 'inactive'
      }
    ];
    setPlatforms(platformList);
  };

  // 实时数据更新
  useEffect(() => {
    if (isAutoRefresh) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
      }, 30000); // 每30秒更新一次

      return () => clearInterval(interval);
    }
  }, [isAutoRefresh]);

  const totalStats = {
    revenue: mockAdSpaces.reduce((sum, space) => sum + space.revenue, 0),
    impressions: mockAdSpaces.reduce((sum, space) => sum + space.impressions, 0),
    clicks: mockAdSpaces.reduce((sum, space) => sum + space.clicks, 0),
    avgCTR: (mockAdSpaces.reduce((sum, space) => sum + space.ctr, 0) / mockAdSpaces.length).toFixed(2)
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return '•';
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getABTestStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      case 'draft':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getABTestStatusText = (status: string) => {
    switch (status) {
      case 'running':
        return '进行中';
      case 'completed':
        return '已完成';
      case 'draft':
        return '草稿';
      default:
        return '未知';
    }
  };

  const getPlatformStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'inactive':
        return 'bg-gray-100 text-gray-500';
      case 'error':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  const exportReport = () => {
    alert(`正在导出${reportConfig.format.toUpperCase()}格式的${reportConfig.period === 'today' ? '今日' : reportConfig.period === 'week' ? '本周' : '本月'}报表...`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        {/* 标题 */}
        <div className="text-center pt-2 sm:pt-4 pb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-3 sm:mb-4 shadow-lg">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            流量变现工具
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">AI智能优化 · 收益最大化 · 数据分析</p>
        </div>

        {/* 导航标签 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-2 border border-gray-100 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {[
              { id: 'dashboard' as ViewType, label: '📊 概览' },
              { id: 'spaces' as ViewType, label: '📍 广告位' },
              { id: 'optimization' as ViewType, label: '🚀 优化' },
              { id: 'abtest' as ViewType, label: '🧪 A/B测试' },
              { id: 'platforms' as ViewType, label: '🔗 平台' },
              { id: 'export' as ViewType, label: '📄 导出' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setView(tab.id);
                  if (tab.id === 'abtest' && abTests.length === 0) {
                    generateABTests();
                  }
                  if (tab.id === 'platforms' && platforms.length === 0) {
                    generatePlatforms();
                  }
                }}
                className={`py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
                  view === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 数据概览视图 */}
        {view === 'dashboard' && (
          <>
            {/* 实时更新状态 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-3 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${isAutoRefresh ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                  <span className="text-sm text-gray-600">
                    最后更新：{lastUpdate.toLocaleTimeString('zh-CN')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAutoRefresh}
                      onChange={(e) => setIsAutoRefresh(e.target.checked)}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">自动刷新</span>
                  </label>
                  <button
                    onClick={() => setLastUpdate(new Date())}
                    className="px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-sm font-medium transition-all"
                  >
                    🔄 刷新
                  </button>
                </div>
              </div>
            </div>

            {/* 时间选择 */}
            <div className="flex justify-end gap-2">
              {(['today', 'week', 'month'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedPeriod === period
                      ? 'bg-purple-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {period === 'today' ? '今日' : period === 'week' ? '本周' : '本月'}
                </button>
              ))}
            </div>

            {/* 统计卡片 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100">
                <div className="text-3xl mb-2">💰</div>
                <p className="text-xs text-gray-500 mb-1">总收益</p>
                <p className="text-2xl font-bold text-gray-900">¥{totalStats.revenue.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">↑ 15.3%</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100">
                <div className="text-3xl mb-2">👁️</div>
                <p className="text-xs text-gray-500 mb-1">曝光量</p>
                <p className="text-2xl font-bold text-gray-900">{(totalStats.impressions / 1000).toFixed(1)}K</p>
                <p className="text-xs text-green-600 mt-1">↑ 8.7%</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100">
                <div className="text-3xl mb-2">🖱️</div>
                <p className="text-xs text-gray-500 mb-1">点击量</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.clicks}</p>
                <p className="text-xs text-green-600 mt-1">↑ 12.4%</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100">
                <div className="text-3xl mb-2">📈</div>
                <p className="text-xs text-gray-500 mb-1">平均CTR</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.avgCTR}%</p>
                <p className="text-xs text-green-600 mt-1">↑ 3.2%</p>
              </div>
            </div>

            {/* 收益趋势 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📊 收益趋势</h2>
              <div className="h-48 flex items-end justify-between gap-2">
                {[820, 950, 1100, 980, 1250, 1580, 1420].map((value, index) => {
                  const maxValue = 1580;
                  const height = (value / maxValue) * 100;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="text-xs font-semibold text-gray-700">¥{value}</div>
                      <div
                        className="w-full bg-gradient-to-t from-purple-500 to-pink-600 rounded-t-lg transition-all hover:opacity-80"
                        style={{ height: `${height}%` }}
                      ></div>
                      <div className="text-xs text-gray-500">
                        {['周一', '周二', '周三', '周四', '周五', '周六', '周日'][index]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 热门广告位 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">🔥 热门广告位</h2>
              <div className="space-y-3">
                {mockAdSpaces.slice(0, 3).map((space, index) => (
                  <div key={space.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{space.name}</p>
                        <p className="text-xs text-gray-500">{space.position} · {space.size}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-purple-600">¥{space.revenue}</p>
                      <p className="text-xs text-gray-500">CTR: {space.ctr}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 广告位视图 */}
        {view === 'spaces' && (
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">📍 广告位管理</h2>
                <button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 active:scale-95">
                  + 添加广告位
                </button>
              </div>

              <div className="grid gap-4">
                {mockAdSpaces.map((space) => (
                  <div
                    key={space.id}
                    className="bg-white rounded-xl border-2 border-gray-200 p-4 hover:border-purple-300 hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-pink-300 rounded-lg flex items-center justify-center text-2xl">
                            📍
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">{space.name}</h3>
                            <p className="text-sm text-gray-600">{space.position} · {space.size}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div>
                            <p className="text-xs text-gray-500">曝光量</p>
                            <p className="font-semibold text-gray-900">{space.impressions.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">点击量</p>
                            <p className="font-semibold text-gray-900">{space.clicks}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">CTR</p>
                            <p className="font-semibold text-gray-900">{space.ctr}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">填充率</p>
                            <p className="font-semibold text-gray-900">{space.fillRate}%</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="text-right">
                          <p className="text-xs text-gray-500">收益</p>
                          <p className="text-2xl font-bold text-purple-600">¥{space.revenue}</p>
                          <p className="text-xs text-gray-500">CPM: ¥{space.cpm}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-all">
                            编辑
                          </button>
                          <button className="px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-sm font-medium transition-all">
                            查看详情
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 优化建议视图 */}
        {view === 'optimization' && (
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">🚀 AI优化建议</h2>
              <p className="text-sm text-gray-600 mb-4">
                基于数据分析，AI为您提供以下优化建议，帮助提升广告收益
              </p>

              <div className="space-y-3">
                {mockSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className={`rounded-xl border-2 p-4 ${getSuggestionColor(suggestion.type)}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-lg">
                        {getSuggestionIcon(suggestion.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 className="font-bold text-gray-900">{suggestion.title}</h3>
                          <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-purple-600 whitespace-nowrap">
                            {suggestion.impact}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{suggestion.description}</p>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold rounded-lg text-sm transition-all duration-200 active:scale-95">
                            立即优化
                          </button>
                          <button className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg text-sm border border-gray-300 transition-all">
                            查看详情
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📈 优化效果预测</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                  <p className="text-sm text-gray-600 mb-2">当前日收益</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">¥{totalStats.revenue.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">基于今日数据</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                  <p className="text-sm text-gray-600 mb-2">优化后预期</p>
                  <p className="text-3xl font-bold text-green-600 mb-1">¥{Math.round(totalStats.revenue * 1.35).toLocaleString()}</p>
                  <p className="text-xs text-green-600">↑ +35% 提升空间</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">优化执行计划</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                    <p className="text-sm text-gray-700">第1步: 增加高CTR位置的广告位（已完成）</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">2</div>
                    <p className="text-sm text-gray-700">第2步: 添加备用广告源提升填充率</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs">3</div>
                    <p className="text-sm text-gray-700">第3步: 优化移动端广告尺寸和位置</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs">4</div>
                    <p className="text-sm text-gray-700">第4步: 调整低效广告位的投放策略</p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200">
                一键执行优化方案
              </button>
            </div>
          </div>
        )}

        {/* A/B测试视图 */}
        {view === 'abtest' && (
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">🧪 A/B测试管理</h2>
                <button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 active:scale-95">
                  + 创建测试
                </button>
              </div>

              <div className="space-y-3">
                {abTests.map((test) => (
                  <div key={test.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-gray-900">{test.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getABTestStatusColor(test.status)}`}>
                            {getABTestStatusText(test.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {test.startDate} 至 {test.endDate}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className={`p-3 rounded-lg border-2 ${test.winner === 'A' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                        <p className="text-xs text-gray-500 mb-1">版本 A</p>
                        <p className="font-semibold text-gray-900 mb-1">{test.variantA}</p>
                        <p className="text-lg font-bold text-purple-600">{test.conversionA}% CTR</p>
                        {test.winner === 'A' && (
                          <p className="text-xs text-green-600 mt-1">🏆 获胜版本</p>
                        )}
                      </div>
                      <div className={`p-3 rounded-lg border-2 ${test.winner === 'B' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                        <p className="text-xs text-gray-500 mb-1">版本 B</p>
                        <p className="font-semibold text-gray-900 mb-1">{test.variantB}</p>
                        <p className="text-lg font-bold text-purple-600">{test.conversionB}% CTR</p>
                        {test.winner === 'B' && (
                          <p className="text-xs text-green-600 mt-1">🏆 获胜版本</p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-all">
                        查看详情
                      </button>
                      {test.status === 'running' && (
                        <button className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-all">
                          停止测试
                        </button>
                      )}
                      {test.status === 'completed' && test.winner !== 'undecided' && (
                        <button className="px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg text-sm font-medium transition-all">
                          应用获胜版本
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 sm:p-6 border border-blue-200">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span>💡</span>
                <span>A/B测试最佳实践</span>
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 每次只测试一个变量，确保结果可归因</li>
                <li>• 测试周期建议至少7-14天，获取充足样本</li>
                <li>• 显著性差异达到95%以上再应用获胜版本</li>
                <li>• 记录所有测试结果，建立知识库</li>
              </ul>
            </div>
          </div>
        )}

        {/* 平台集成视图 */}
        {view === 'platforms' && (
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">🔗 广告平台集成</h2>

              <div className="grid gap-4">
                {platforms.map((platform) => (
                  <div key={platform.id} className="bg-white rounded-xl border-2 border-gray-200 p-4 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-200 rounded-xl flex items-center justify-center text-3xl">
                          {platform.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-900">{platform.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPlatformStatusColor(platform.status)}`}>
                              {platform.connected ? '已连接' : '未连接'}
                            </span>
                          </div>
                          {platform.connected ? (
                            <div className="grid grid-cols-2 gap-3 mt-2">
                              <div>
                                <p className="text-xs text-gray-500">收益</p>
                                <p className="font-bold text-purple-600">¥{platform.revenue.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">曝光量</p>
                                <p className="font-semibold text-gray-900">{(platform.impressions / 1000).toFixed(1)}K</p>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-600">连接此平台以聚合广告收益数据</p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {platform.connected ? (
                          <>
                            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg text-sm transition-all">
                              配置
                            </button>
                            <button className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-lg text-sm transition-all">
                              断开
                            </button>
                          </>
                        ) : (
                          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold rounded-lg text-sm transition-all active:scale-95">
                            连接平台
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 sm:p-6 border border-yellow-200">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span>📊</span>
                <span>多平台数据聚合优势</span>
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• 统一管理多个广告平台，一站式查看所有收益</li>
                <li>• 自动对比各平台CPM和CTR，选择最优平台</li>
                <li>• 智能分配流量到高收益平台，提升整体收入</li>
                <li>• 支持批量导出报表，简化财务对账流程</li>
              </ul>
            </div>
          </div>
        )}

        {/* 报表导出视图 */}
        {view === 'export' && (
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📄 报表导出</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">导出格式</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['excel', 'pdf', 'csv'] as const).map((format) => (
                      <button
                        key={format}
                        onClick={() => setReportConfig({ ...reportConfig, format })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          reportConfig.format === format
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">
                          {format === 'excel' ? '📊' : format === 'pdf' ? '📄' : '📋'}
                        </div>
                        <p className="font-semibold text-gray-900 text-sm">{format.toUpperCase()}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">时间范围</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['today', 'week', 'month', 'custom'] as const).map((period) => (
                      <button
                        key={period}
                        onClick={() => setReportConfig({ ...reportConfig, period })}
                        className={`py-3 px-4 rounded-lg font-medium text-sm transition-all ${
                          reportConfig.period === period
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {period === 'today' ? '今日' : period === 'week' ? '本周' : period === 'month' ? '本月' : '自定义'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">报表内容</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={reportConfig.includeCharts}
                        onChange={(e) => setReportConfig({ ...reportConfig, includeCharts: e.target.checked })}
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">包含图表</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={reportConfig.includeDetails}
                        onChange={(e) => setReportConfig({ ...reportConfig, includeDetails: e.target.checked })}
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">包含详细数据</span>
                    </label>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                  <h4 className="font-semibold text-gray-900 mb-2">报表预览</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    即将导出{reportConfig.period === 'today' ? '今日' : reportConfig.period === 'week' ? '本周' : reportConfig.period === 'month' ? '本月' : '自定义时间段'}
                    的{reportConfig.format.toUpperCase()}格式报表
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ 总收益、曝光量、点击量数据</li>
                    <li>✓ 各广告位详细表现</li>
                    {reportConfig.includeCharts && <li>✓ 收益趋势图表</li>}
                    {reportConfig.includeDetails && <li>✓ 每日明细数据</li>}
                  </ul>
                </div>

                <button
                  onClick={exportReport}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
                >
                  立即导出报表
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

