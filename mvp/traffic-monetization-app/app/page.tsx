'use client';

import { useState } from 'react';

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

export default function Home() {
  const [view, setView] = useState<'dashboard' | 'spaces' | 'optimization'>('dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');

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

        {/* 导航 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-2 border border-gray-100">
          <div className="flex gap-2">
            <button
              onClick={() => setView('dashboard')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                view === 'dashboard'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              📊 数据概览
            </button>
            <button
              onClick={() => setView('spaces')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                view === 'spaces'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              📍 广告位
            </button>
            <button
              onClick={() => setView('optimization')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                view === 'optimization'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🚀 优化建议
            </button>
          </div>
        </div>

        {view === 'dashboard' && (
          <>
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

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">💡 快速操作</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl border border-blue-200 text-left transition-all">
                  <div className="text-2xl mb-2">🔄</div>
                  <p className="font-semibold text-gray-900 mb-1">批量刷新</p>
                  <p className="text-xs text-gray-600">刷新所有广告位数据</p>
                </button>
                <button className="p-4 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl border border-green-200 text-left transition-all">
                  <div className="text-2xl mb-2">📊</div>
                  <p className="font-semibold text-gray-900 mb-1">导出报表</p>
                  <p className="text-xs text-gray-600">导出完整数据报表</p>
                </button>
                <button className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl border border-purple-200 text-left transition-all">
                  <div className="text-2xl mb-2">⚙️</div>
                  <p className="font-semibold text-gray-900 mb-1">批量设置</p>
                  <p className="text-xs text-gray-600">批量修改广告位配置</p>
                </button>
              </div>
            </div>
          </div>
        )}

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
      </div>
    </main>
  );
}
