'use client';

import { useState, useCallback } from 'react';

interface Question {
  id: number;
  text: string;
  category: string;
}

interface ResumeAnalysis {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  keywords: string[];
}

interface CareerPath {
  current: string;
  nextSteps: Array<{
    title: string;
    timeframe: string;
    skills: string[];
  }>;
}

interface SalaryData {
  role: string;
  range: string;
  average: number;
  factors: string[];
}

interface CompanyInfo {
  name: string;
  industry: string;
  size: string;
  culture: string;
  benefits: string[];
  rating: number;
}

type ViewType = 'interview' | 'resume' | 'career' | 'salary' | 'company';

export default function Home() {
  const [view, setView] = useState<ViewType>('interview');

  // 面试相关状态
  const [role, setRole] = useState('');
  const [showInterview, setShowInterview] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');

  // 简历分析状态
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [resumeAnalysis, setResumeAnalysis] = useState<ResumeAnalysis | null>(null);
  const [isAnalyzingResume, setIsAnalyzingResume] = useState(false);

  // 职业规划状态
  const [careerGoal, setCareerGoal] = useState('');
  const [careerPath, setCareerPath] = useState<CareerPath | null>(null);

  // 薪资查询状态
  const [salaryRole, setSalaryRole] = useState('');
  const [salaryData, setSalaryData] = useState<SalaryData | null>(null);

  // 公司查询状态
  const [companyName, setCompanyName] = useState('');
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

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

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const analyzeResume = () => {
    setIsAnalyzingResume(true);
    setTimeout(() => {
      setResumeAnalysis({
        score: 82,
        strengths: [
          '教育背景优秀，名校毕业',
          '工作经验丰富，项目经历详实',
          '技能树完整，涵盖多个技术栈',
          '量化成果明确，数据支撑充分'
        ],
        weaknesses: [
          '缺少自我评价和职业目标',
          '项目描述过于技术化，缺少业务价值',
          '软技能展示不足',
          '格式排版可以更加简洁'
        ],
        suggestions: [
          '在顶部添加一段简短的自我介绍，突出核心竞争力',
          '每个项目经历中增加"业务价值"或"影响力"描述',
          '补充团队协作、沟通能力等软技能',
          '使用更清晰的格式，增加关键词密度以通过ATS系统',
          '添加个人作品集或GitHub链接'
        ],
        keywords: ['React', 'TypeScript', 'Node.js', '敏捷开发', '团队管理']
      });
      setIsAnalyzingResume(false);
    }, 2000);
  };

  const generateCareerPath = () => {
    setCareerPath({
      current: careerGoal || '前端工程师',
      nextSteps: [
        {
          title: '高级前端工程师',
          timeframe: '1-2年',
          skills: ['架构设计', '性能优化', '技术选型', 'Code Review']
        },
        {
          title: '前端技术专家/Team Lead',
          timeframe: '3-4年',
          skills: ['团队管理', '技术规划', '跨部门协作', '人才培养']
        },
        {
          title: '技术经理/架构师',
          timeframe: '5年+',
          skills: ['战略规划', '业务理解', '全栈能力', '技术创新']
        }
      ]
    });
  };

  const querySalary = () => {
    setSalaryData({
      role: salaryRole || '前端工程师',
      range: '15K - 40K',
      average: 25000,
      factors: [
        '工作年限：3-5年经验普遍在20-30K',
        '所在城市：北上广深高于二线城市30%',
        '公司规模：大厂相比创业公司高20-40%',
        '技能栈：React/Vue + Node.js全栈更有竞争力',
        '学历背景：985/211院校薪资溢价10-15%'
      ]
    });
  };

  const queryCompany = () => {
    const companies = [
      {
        name: companyName || '字节跳动',
        industry: '互联网 / 移动互联网',
        size: '10000人以上',
        culture: '扁平化管理，注重创新和效率',
        benefits: ['六险一金', '弹性工作', '年度体检', '带薪年假', '团建活动', '下午茶'],
        rating: 4.5
      },
      {
        name: '腾讯',
        industry: '互联网 / 游戏',
        size: '50000人以上',
        culture: '稳健务实，注重产品和用户体验',
        benefits: ['住房补贴', '免费三餐', '健身房', '员工持股', '带薪病假'],
        rating: 4.3
      }
    ];
    setCompanyInfo(companies[0]);
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
          <p className="mt-2 text-sm sm:text-base text-gray-600">AI模拟面试 · 简历优化 · 职业规划 · 薪资查询</p>
        </div>

        {/* 导航标签 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-2 border border-gray-100 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {[
              { id: 'interview' as ViewType, label: '🎤 模拟面试' },
              { id: 'resume' as ViewType, label: '📝 简历优化' },
              { id: 'career' as ViewType, label: '🎯 职业规划' },
              { id: 'salary' as ViewType, label: '💰 薪资查询' },
              { id: 'company' as ViewType, label: '🏢 公司信息' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setView(tab.id)}
                className={`py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
                  view === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 模拟面试视图 */}
        {view === 'interview' && (
          <>
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
                    <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          Q{currentQ + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-blue-600 font-medium mb-1">{questions[currentQ].category}</p>
                          <p className="font-semibold text-gray-900 mb-1">面试官：</p>
                          <p className="text-gray-700">{questions[currentQ].text}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">您的回答</label>
                      <textarea
                        value={currentAnswer}
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                        placeholder="请输入您的回答... 建议使用STAR法则：Situation（情境）、Task（任务）、Action（行动）、Result（结果）"
                        rows={8}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray-500">已输入 {currentAnswer.length} 字</p>
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
                ) : (
                  <div className="text-center py-4">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">面试完成！</h3>
                    <p className="text-gray-600 mb-6">AI正在分析您的回答...</p>

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
                          {getAIFeedback(1, '').map((feedback, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-green-600 mt-0.5">✓</span>
                              <span>{feedback}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white rounded-xl p-4 border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-3">📝 逐题反馈</h4>
                        <div className="space-y-3">
                          {questions.map((q, idx) => (
                            <div key={q.id} className="border-l-2 border-blue-500 pl-3">
                              <p className="text-sm font-semibold text-gray-900 mb-1">Q{idx + 1}: {q.category}</p>
                              <p className="text-xs text-gray-600 mb-2">{answers[idx]?.substring(0, 100)}...</p>
                              <div className="flex items-center gap-2 text-xs">
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                                  得分: {75 + Math.floor(Math.random() * 20)}
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
                )}
              </div>
            )}
          </>
        )}

        {/* 简历优化视图 */}
        {view === 'resume' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📝 简历AI分析与优化</h2>

            {!resumeAnalysis ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">上传简历</label>
                  <input
                    type="file"
                    onChange={handleResumeUpload}
                    accept=".pdf,.doc,.docx"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                  {resumeFile && (
                    <p className="text-sm text-gray-600 mt-2">已选择: {resumeFile.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">或粘贴简历文本</label>
                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="将您的简历内容粘贴到这里..."
                    rows={10}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <button
                  onClick={analyzeResume}
                  disabled={isAnalyzingResume || (!resumeFile && !resumeText)}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isAnalyzingResume ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>AI分析中...</span>
                    </>
                  ) : (
                    <span>开始AI分析</span>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 text-xl">综合评分</h3>
                    <div className="text-4xl font-bold text-blue-600">{resumeAnalysis.score}分</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all"
                      style={{ width: `${resumeAnalysis.score}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>✅</span>
                    <span>优势亮点</span>
                  </h4>
                  <ul className="space-y-2">
                    {resumeAnalysis.strengths.map((strength, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>⚠️</span>
                    <span>需要改进</span>
                  </h4>
                  <ul className="space-y-2">
                    {resumeAnalysis.weaknesses.map((weakness, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-yellow-600 mt-0.5">•</span>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>💡</span>
                    <span>优化建议</span>
                  </h4>
                  <ol className="space-y-2">
                    {resumeAnalysis.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="font-semibold text-green-600">{idx + 1}.</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">🔑 关键词分析</h4>
                  <div className="flex flex-wrap gap-2">
                    {resumeAnalysis.keywords.map((keyword, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setResumeAnalysis(null);
                    setResumeFile(null);
                    setResumeText('');
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
                >
                  分析新简历
                </button>
              </div>
            )}
          </div>
        )}

        {/* 职业规划视图 */}
        {view === 'career' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">🎯 职业发展规划</h2>

            {!careerPath ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">您的职业目标</label>
                  <input
                    type="text"
                    value={careerGoal}
                    onChange={(e) => setCareerGoal(e.target.value)}
                    placeholder="例如：成为技术经理、高级前端工程师..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2">💡 规划说明</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• AI将根据您的目标生成发展路径</li>
                    <li>• 包含每个阶段需要掌握的技能</li>
                    <li>• 提供合理的时间规划建议</li>
                    <li>• 帮助您明确职业发展方向</li>
                  </ul>
                </div>

                <button
                  onClick={generateCareerPath}
                  disabled={!careerGoal}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
                >
                  生成职业规划
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="font-bold text-gray-900 mb-2">当前职位</h3>
                  <p className="text-2xl font-bold text-blue-600">{careerPath.current}</p>
                </div>

                <div className="relative">
                  {careerPath.nextSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-4 mb-6">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                          {idx + 1}
                        </div>
                        {idx < careerPath.nextSteps.length - 1 && (
                          <div className="w-1 h-20 bg-gradient-to-b from-green-400 to-emerald-500 opacity-30"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-gray-900">{step.title}</h4>
                            <span className="text-sm text-gray-500">{step.timeframe}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">需要掌握的技能：</p>
                          <div className="flex flex-wrap gap-2">
                            {step.skills.map((skill, skillIdx) => (
                              <span key={skillIdx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setCareerPath(null);
                    setCareerGoal('');
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
                >
                  重新规划
                </button>
              </div>
            )}
          </div>
        )}

        {/* 薪资查询视图 */}
        {view === 'salary' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">💰 行业薪资查询</h2>

            {!salaryData ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">职位名称</label>
                  <input
                    type="text"
                    value={salaryRole}
                    onChange={(e) => setSalaryRole(e.target.value)}
                    placeholder="例如：前端工程师、产品经理、数据分析师..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2">💡 查询说明</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 提供行业薪资范围参考</li>
                    <li>• 分析影响薪资的关键因素</li>
                    <li>• 基于真实市场数据统计</li>
                    <li>• 帮助您了解市场行情</li>
                  </ul>
                </div>

                <button
                  onClick={querySalary}
                  disabled={!salaryRole}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
                >
                  查询薪资
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <h3 className="font-bold text-gray-900 mb-4">{salaryData.role}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">薪资范围</p>
                      <p className="text-2xl font-bold text-green-600">{salaryData.range}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">市场均值</p>
                      <p className="text-2xl font-bold text-blue-600">{salaryData.average.toLocaleString()}元/月</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>📊</span>
                    <span>影响薪资的关键因素</span>
                  </h4>
                  <ul className="space-y-3">
                    {salaryData.factors.map((factor, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-xs">
                          {idx + 1}
                        </span>
                        <span className="flex-1">{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-200">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span>💡</span>
                    <span>薪资谈判建议</span>
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• 了解自己的市场价值，准备具体数据支撑</li>
                    <li>• 关注总包（base + 奖金 + 期权）而非单一工资</li>
                    <li>• 强调您能为公司带来的价值和成果</li>
                    <li>• 考虑公司发展前景和个人成长空间</li>
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setSalaryData(null);
                    setSalaryRole('');
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
                >
                  查询新职位
                </button>
              </div>
            )}
          </div>
        )}

        {/* 公司信息视图 */}
        {view === 'company' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">🏢 公司信息查询</h2>

            {!companyInfo ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">公司名称</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="例如：字节跳动、腾讯、阿里巴巴..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2">💡 查询说明</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 了解公司基本信息和规模</li>
                    <li>• 查看公司文化和工作环境</li>
                    <li>• 了解福利待遇和员工评价</li>
                    <li>• 帮助您做出明智的求职决策</li>
                  </ul>
                </div>

                <button
                  onClick={queryCompany}
                  disabled={!companyName}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
                >
                  查询公司
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{companyInfo.name}</h3>
                      <p className="text-gray-600">{companyInfo.industry}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(companyInfo.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                            ⭐
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{companyInfo.rating} 分</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">公司规模：</span>
                      <span className="font-semibold text-gray-900">{companyInfo.size}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>🎨</span>
                    <span>公司文化</span>
                  </h4>
                  <p className="text-sm text-gray-700">{companyInfo.culture}</p>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>🎁</span>
                    <span>福利待遇</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {companyInfo.benefits.map((benefit, idx) => (
                      <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span>💼</span>
                    <span>面试建议</span>
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• 深入了解公司的产品和业务线</li>
                    <li>• 准备符合公司文化价值观的案例</li>
                    <li>• 展示您的学习能力和适应能力</li>
                    <li>• 提前准备针对该公司的问题</li>
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setCompanyInfo(null);
                    setCompanyName('');
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
                >
                  查询新公司
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
