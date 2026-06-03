'use client';

import { useState } from 'react';

interface VocalAnalysis {
  pitch: number;
  pitchAccuracy: number;
  rhythm: number;
  tone: number;
  breath: number;
  overall: number;
}

interface Exercise {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  duration: string;
  description: string;
  benefits: string[];
}

interface LessonProgress {
  totalLessons: number;
  completedLessons: number;
  totalPracticeTime: number;
  averageScore: number;
}

export default function Home() {
  const [view, setView] = useState<'home' | 'practice' | 'analysis' | 'lessons'>('home');
  const [recording, setRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);

  const mockAnalysis: VocalAnalysis = {
    pitch: 85,
    pitchAccuracy: 82,
    rhythm: 88,
    tone: 79,
    breath: 75,
    overall: 82
  };

  const mockExercises: Exercise[] = [
    {
      id: '1',
      name: '音阶练习',
      category: '基础训练',
      difficulty: '初级',
      duration: '10分钟',
      description: 'Do-Re-Mi-Fa-Sol-La-Si-Do 音阶上下行练习',
      benefits: ['提升音准', '扩展音域', '增强控制力']
    },
    {
      id: '2',
      name: '呼吸控制',
      category: '呼吸训练',
      difficulty: '初级',
      duration: '15分钟',
      description: '腹式呼吸训练，学习正确的气息支撑',
      benefits: ['增加肺活量', '稳定气息', '延长持音']
    },
    {
      id: '3',
      name: '颤音练习',
      category: '技巧训练',
      difficulty: '中级',
      duration: '20分钟',
      description: '学习和掌握自然流畅的颤音技巧',
      benefits: ['美化音色', '增添情感', '提升表现力']
    },
    {
      id: '4',
      name: '高音突破',
      category: '音域拓展',
      difficulty: '高级',
      duration: '25分钟',
      description: '科学方法突破高音瓶颈，扩展音域',
      benefits: ['扩展音域', '稳定高音', '避免声带损伤']
    }
  ];

  const mockProgress: LessonProgress = {
    totalLessons: 24,
    completedLessons: 15,
    totalPracticeTime: 780,
    averageScore: 82
  };

  const startRecording = () => {
    setRecording(true);
    setTimeout(() => {
      setRecording(false);
      setHasRecording(true);
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 85) return 'from-green-500 to-emerald-600';
    if (score >= 70) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '初级':
        return 'bg-green-100 text-green-700';
      case '中级':
        return 'bg-yellow-100 text-yellow-700';
      case '高级':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* 标题 */}
        <div className="text-center pt-2 sm:pt-4 pb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-3 sm:mb-4 shadow-lg">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            AI声乐教练
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">AI智能分析 · 专业指导 · 科学训练</p>
        </div>

        {/* 导航 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-2 border border-gray-100">
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => setView('home')}
              className={`py-3 px-2 rounded-xl font-semibold text-sm transition-all ${
                view === 'home'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🏠 首页
            </button>
            <button
              onClick={() => setView('practice')}
              className={`py-3 px-2 rounded-xl font-semibold text-sm transition-all ${
                view === 'practice'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🎤 练习
            </button>
            <button
              onClick={() => setView('analysis')}
              className={`py-3 px-2 rounded-xl font-semibold text-sm transition-all ${
                view === 'analysis'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              📊 分析
            </button>
            <button
              onClick={() => setView('lessons')}
              className={`py-3 px-2 rounded-xl font-semibold text-sm transition-all ${
                view === 'lessons'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              📚 课程
            </button>
          </div>
        </div>

        {view === 'home' && (
          <>
            {/* 学习进度 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📈 学习进度</h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">完成课程</p>
                  <p className="text-2xl font-bold text-indigo-600">{mockProgress.completedLessons}/{mockProgress.totalLessons}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">练习时长</p>
                  <p className="text-2xl font-bold text-purple-600">{mockProgress.totalPracticeTime}分</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">平均得分</p>
                  <p className="text-2xl font-bold text-pink-600">{mockProgress.averageScore}分</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">连续练习</p>
                  <p className="text-2xl font-bold text-orange-600">12天</p>
                </div>
              </div>

              <div className="bg-gray-100 rounded-full h-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all"
                  style={{ width: `${(mockProgress.completedLessons / mockProgress.totalLessons) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                已完成 {Math.round((mockProgress.completedLessons / mockProgress.totalLessons) * 100)}%
              </p>
            </div>

            {/* 功能卡片 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-bold text-gray-900 mb-1">AI实时分析</h3>
                <p className="text-sm text-gray-600">实时检测音准、节奏、音色</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100">
                <div className="text-3xl mb-2">📖</div>
                <h3 className="font-bold text-gray-900 mb-1">专业课程</h3>
                <p className="text-sm text-gray-600">系统化声乐训练课程</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100">
                <div className="text-3xl mb-2">💪</div>
                <h3 className="font-bold text-gray-900 mb-1">个性化训练</h3>
                <p className="text-sm text-gray-600">根据你的水平定制练习</p>
              </div>
            </div>

            {/* 今日推荐 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">🌟 今日推荐练习</h2>

              <div className="space-y-3">
                {mockExercises.slice(0, 2).map((exercise) => (
                  <div
                    key={exercise.id}
                    className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{exercise.name}</h3>
                        <p className="text-xs text-gray-600">{exercise.category} · {exercise.duration}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(exercise.difficulty)}`}>
                        {exercise.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{exercise.description}</p>
                    <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 active:scale-95">
                      开始练习
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {view === 'practice' && (
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">🎤 录音练习</h2>

              <div className="flex flex-col items-center justify-center py-8">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 transition-all ${
                  recording
                    ? 'bg-gradient-to-br from-red-500 to-pink-600 animate-pulse shadow-lg'
                    : 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md'
                }`}>
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>

                {recording ? (
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900 mb-2">录音中...</p>
                    <p className="text-sm text-gray-600">AI正在实时分析您的声音</p>
                  </div>
                ) : hasRecording ? (
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900 mb-2">录音完成</p>
                    <p className="text-sm text-gray-600">查看分析结果或重新录制</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900 mb-2">准备开始</p>
                    <p className="text-sm text-gray-600">点击下方按钮开始录音练习</p>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  {!recording && !hasRecording && (
                    <button
                      onClick={startRecording}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
                    >
                      开始录音
                    </button>
                  )}
                  {hasRecording && (
                    <>
                      <button
                        onClick={() => setView('analysis')}
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
                      >
                        查看分析
                      </button>
                      <button
                        onClick={() => setHasRecording(false)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                      >
                        重新录制
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200 mt-6">
                <h4 className="font-semibold text-gray-900 mb-2">💡 练习提示</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 选择一个安静的环境进行录音</li>
                  <li>• 保持麦克风距离适中（15-20cm）</li>
                  <li>• 放松身体，使用腹式呼吸</li>
                  <li>• 建议每天练习20-30分钟</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">🎵 练习曲目</h2>

              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-300 transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">告白气球</h3>
                      <p className="text-xs text-gray-600">周杰伦 · 流行</p>
                    </div>
                    <button className="w-10 h-10 bg-indigo-500 hover:bg-indigo-600 rounded-full flex items-center justify-center text-white transition-all">
                      ▶
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-300 transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">稻香</h3>
                      <p className="text-xs text-gray-600">周杰伦 · 流行</p>
                    </div>
                    <button className="w-10 h-10 bg-indigo-500 hover:bg-indigo-600 rounded-full flex items-center justify-center text-white transition-all">
                      ▶
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-300 transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">演员</h3>
                      <p className="text-xs text-gray-600">薛之谦 · 抒情</p>
                    </div>
                    <button className="w-10 h-10 bg-indigo-500 hover:bg-indigo-600 rounded-full flex items-center justify-center text-white transition-all">
                      ▶
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'analysis' && (
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📊 唱功分析报告</h2>

              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 mb-3">
                  <div>
                    <p className={`text-4xl font-bold ${getScoreColor(mockAnalysis.overall)}`}>
                      {mockAnalysis.overall}
                    </p>
                    <p className="text-xs text-gray-600">综合得分</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">继续加油，你已经超过68%的用户！</p>
              </div>

              <div className="space-y-4">
                {[
                  { label: '音准', value: mockAnalysis.pitch, icon: '🎯' },
                  { label: '音准稳定性', value: mockAnalysis.pitchAccuracy, icon: '📐' },
                  { label: '节奏感', value: mockAnalysis.rhythm, icon: '🥁' },
                  { label: '音色', value: mockAnalysis.tone, icon: '🎨' },
                  { label: '气息控制', value: mockAnalysis.breath, icon: '💨' }
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span>{item.icon}</span>
                        <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      </div>
                      <span className={`text-sm font-bold ${getScoreColor(item.value)}`}>
                        {item.value}分
                      </span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${getScoreGradient(item.value)} rounded-full transition-all`}
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">💡 改进建议</h2>

              <div className="space-y-3">
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">节奏感优秀</h4>
                      <p className="text-sm text-gray-700">你的节奏把握很准确，继续保持这个水平</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                      !
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">气息控制需加强</h4>
                      <p className="text-sm text-gray-700 mb-2">建议增加腹式呼吸训练，延长持音时间</p>
                      <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-700">
                        查看呼吸训练课程 →
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      i
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">音色有提升空间</h4>
                      <p className="text-sm text-gray-700 mb-2">尝试多做共鸣腔体训练，让声音更加圆润饱满</p>
                      <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-700">
                        查看音色训练课程 →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'lessons' && (
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📚 全部课程</h2>

              <div className="grid gap-4">
                {mockExercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-gray-900">{exercise.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(exercise.difficulty)}`}>
                            {exercise.difficulty}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{exercise.category} · {exercise.duration}</p>
                        <p className="text-sm text-gray-700 mb-3">{exercise.description}</p>

                        <div>
                          <p className="text-xs text-gray-500 mb-2">训练效果：</p>
                          <div className="flex flex-wrap gap-2">
                            {exercise.benefits.map((benefit, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium"
                              >
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 active:scale-95 whitespace-nowrap">
                        开始学习
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">🎓 学习路径</h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    ✓
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">阶段一：基础入门</h4>
                    <p className="text-sm text-gray-600">掌握正确的发声方法和呼吸技巧</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">阶段二：技巧提升</h4>
                    <p className="text-sm text-gray-600">学习颤音、转音等进阶技巧</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">阶段三：音域拓展</h4>
                    <p className="text-sm text-gray-600">科学方法扩展音域，突破高音</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    4
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">阶段四：情感表达</h4>
                    <p className="text-sm text-gray-600">掌握情感处理和演唱表现力</p>
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
