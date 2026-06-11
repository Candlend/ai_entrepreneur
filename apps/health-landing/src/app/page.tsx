"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 集成表单提交API
    console.log("预订单:", { email, phone });
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">瘦享AI</h1>
        <p className="text-2xl text-gray-700 mb-4">AI智能减肥健康管理</p>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          大模型精准识别食材热量 · AI视觉分析体脂率 · 个性化健康管理方案
        </p>

        {/* CTA */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto mb-16">
          {!submitted ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                限时预订优惠
              </h2>
              <p className="text-green-600 font-bold text-3xl mb-2">¥49/月</p>
              <p className="text-gray-500 mb-6 line-through">原价 ¥99/月</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="邮箱地址"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="手机号码（可选）"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg transition-colors"
                >
                  立即预订
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                预订成功！
              </h3>
              <p className="text-gray-600">我们会尽快联系您</p>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          核心功能
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">📸</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI食物识别</h3>
            <p className="text-gray-600">
              大模型精准识别食材与热量，准确度超过90%，支持多角度拍摄
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">体脂率分析</h3>
            <p className="text-gray-600">
              上传身体照片，AI视觉分析估算体脂率，±3%精度范围
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">个性化目标</h3>
            <p className="text-gray-600">
              基于基础代谢率计算，制定专属每日热量目标和饮食计划
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">热量追踪</h3>
            <p className="text-gray-600">
              简单直观的记录界面，每日/每周统计图表，轻松管理饮食
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-green-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            为什么选择瘦享AI？
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-start gap-4">
              <div className="text-2xl">✓</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">识别更准确</h4>
                <p className="text-gray-600">
                  大模型技术，识别准确度超过90%，远超传统应用
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl">✓</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">体脂率创新</h4>
                <p className="text-gray-600">
                  无需专业设备，手机拍照即可分析体脂率
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl">✓</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">个性化方案</h4>
                <p className="text-gray-600">
                  基于你的身体数据，制定专属健康管理计划
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl">✓</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">简单易用</h4>
                <p className="text-gray-600">
                  拍照即用，无需复杂操作，轻松管理健康
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 瘦享AI. 健康管理，从AI开始。</p>
          <p className="text-gray-500 text-sm mt-2">
            本应用不提供医疗诊断，仅供健康管理参考
          </p>
        </div>
      </footer>
    </main>
  );
}
