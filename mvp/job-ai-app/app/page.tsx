'use client';

import { useState } from 'react';

interface Question {
  id: number;
  text: string;
  category: string;
}

export default function Home() {
  const [role, setRole] = useState('');
  const [showInterview, setShowInterview] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');

  const questions: Question[] = [
    { id: 1, text: '请做一个自我介绍，包括您的教育背景和工作经验', category: '基础问题' },
    { id: 2, text: '您最大的优势是什么？请举例说明', category: '自我认知' },
    { id: 3, text: '描述一次您解决复杂问题的经历，包括过程和结果', category: '能力评估' },
    { id: 4, text: '您为什么想加入我们公司？对这个岗位有什么理解？', category: '动机考察' },
    { id: 5, text: '您未来3-5年的职业规划是什么？', category: '职业发展' }
  ];

  const startInterview = () => {
    if (role) {
      setShowInterview(true);
      setCurrentQ(0);
      setAnswers([]);
      setCurrentAnswer('');
    }
  };

  const handleSubmitAnswer = () => {
    if (currentAnswer.trim()) {
      const newAnswers = [...answers, currentAnswer];
      setAnswers(newAnswers);
      setCurrentAnswer('');

      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        // Interview completed
      }
    }
  };

  const getAIFeedback = (questionId: number, answer: string): string[] => {
    const feedbacks = [
      '回答结构清晰，逻辑性强',
      '能够结合实际经验说明',
      '表达流畅，重点突出',
      '建议增加具体数据支撑',
      '可以更多展示团队协作能力',
      '尝试用STAR法则组织回答'
    ];

    return feedbacks.slice(0, 3 + Math.floor(Math.random() * 2));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* 标题 */}
        <div className="text-center pt-2 sm:pt-4 pb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-3 sm:mb-4 shadow-lg">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AI求职顾问
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">AI模拟面试 · 简历优化 · 职业规划</p>
        </div>

        {/* 功能卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100">
            <div className="text-3xl mb-2">🎤</div>
            <h3 className="font-bold text-gray-900 mb-1">模拟面试</h3>
            <p className="text-sm text-gray-600">真实场景演练，提升面试技巧</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100">
            <div className="text-3xl mb-2">📝</div>
            <h3 className="font-bold text-gray-900 mb-1">简历优化</h3>
            <p className="text-sm text-gray-600">AI分析简历，提供专业建议</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-bold text-gray-900 mb-1">职业规划</h3>
            <p className="text-sm text-gray-600">定制化职业发展路径</p>
          </div>
        </div>

        {/* 开始面试 */}
        {!showInterview ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">🎤 开始模拟面试</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">应聘岗位</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="例如：前端工程师、产品经理、数据分析师..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">💡 面试说明</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 共5道经典面试题目</li>
                  <li>• AI会根据您的回答提供即时反馈</li>
                  <li>• 建议使用STAR法则组织回答</li>
                  <li>• 每题建议回答时长2-3分钟</li>
                </ul>
              </div>

              <button
                onClick={startInterview}
                disabled={!role}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
              >
                开始面试
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            {/* 进度条 */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">面试进行中</h2>
                <span className="text-sm text-gray-500">
                  问题 {currentQ + 1}/{questions.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {currentQ < questions.length && answers.length === currentQ ? (
              <div className="space-y-4">
                {/* 问题显示 */}
                <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      Q{currentQ + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-blue-600 font-medium mb-1">
                        {questions[currentQ].category}
                      </p>
                      <p className="font-semibold text-gray-900 mb-1">面试官：</p>
                      <p className="text-gray-700">{questions[currentQ].text}</p>
                    </div>
                  </div>
                </div>

                {/* 答题区域 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    您的回答
                  </label>
                  <textarea
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder="请输入您的回答... 建议使用STAR法则：Situation（情境）、Task（任务）、Action（行动）、Result（结果）"
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500">
                      已输入 {currentAnswer.length} 字
                    </p>
                    <p className="text-xs text-gray-500">
                      提示：Ctrl + Enter 快速提交
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleSubmitAnswer}
                  disabled={!currentAnswer.trim()}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
                >
                  {currentQ < questions.length - 1 ? '提交并继续下一题' : '提交并完成面试'}
                </button>
              </div>
            ) : currentQ >= questions.length || answers.length === questions.length ? (
              /* 面试完成 */
              <div className="text-center py-4">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">面试完成！</h3>
                <p className="text-gray-600 mb-6">AI正在分析您的回答...</p>

                {/* AI评估报告 */}
                <div className="space-y-4 text-left">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-2xl">📊</span>
                      <span>综合评估</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">总体表现</p>
                        <p className="text-2xl font-bold text-green-600">85分</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">推荐指数</p>
                        <p className="text-2xl font-bold text-blue-600">⭐⭐⭐⭐</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span>回答结构清晰，逻辑性强</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span>能够结合实际经验说明</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span>表达流畅，重点突出</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-600 mt-0.5">→</span>
                        <span>建议增加数据支撑，更有说服力</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-600 mt-0.5">→</span>
                        <span>可以更多展示团队协作能力</span>
                      </li>
                    </ul>
                  </div>

                  {/* 各题详细反馈 */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-3">📝 逐题反馈</h4>
                    <div className="space-y-3">
                      {questions.map((q, idx) => (
                        <div key={q.id} className="border-l-2 border-blue-500 pl-3">
                          <p className="text-sm font-semibold text-gray-900 mb-1">
                            Q{idx + 1}: {q.category}
                          </p>
                          <p className="text-xs text-gray-600 mb-2">{answers[idx]?.substring(0, 100)}...</p>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                              得分: {75 + Math.floor(Math.random() * 20)}
                            </span>
                            <span className="text-gray-500">
                              {getAIFeedback(q.id, answers[idx] || '')[0]}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowInterview(false);
                    setRole('');
                    setCurrentQ(0);
                    setAnswers([]);
                  }}
                  className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
                >
                  重新开始面试
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </main>
  );
}
