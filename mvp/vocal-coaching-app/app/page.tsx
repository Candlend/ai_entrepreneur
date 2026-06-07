'use client';

import { useState, useEffect, useRef } from 'react';

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

interface Recording {
  id: string;
  name: string;
  date: string;
  duration: string;
  score: number;
}

interface CheckIn {
  date: string;
  minutes: number;
  exercises: number;
}

interface PKBattle {
  id: string;
  opponent: string;
  song: string;
  status: 'ongoing' | 'won' | 'lost';
  myScore: number;
  opponentScore: number;
  endTime: string;
}

type ViewType = 'home' | 'practice' | 'analysis' | 'share' | 'checkin' | 'pk' | 'settings';

export default function Home() {
  const [view, setView] = useState<ViewType>('home');
  const [recording, setRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [currentRecording, setCurrentRecording] = useState<Recording | null>(null);
  const [playing, setPlaying] = useState(false);
  const [playProgress, setPlayProgress] = useState(0);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [todayPracticed, setTodayPracticed] = useState(false);
  const [streak, setStreak] = useState(7);
  const [pkBattles, setPKBattles] = useState<PKBattle[]>([]);
  const [pitchData, setPitchData] = useState<number[]>([]);
  const [apiEnabled, setApiEnabled] = useState(false);
  const [apiProvider, setApiProvider] = useState('');
  const recordingTimer = useRef<NodeJS.Timeout | null>(null);
  const playTimer = useRef<NodeJS.Timeout | null>(null);
  const pitchTimer = useRef<NodeJS.Timeout | null>(null);

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

  // Generate mock recordings
  const generateRecordings = () => {
    const mockRecordings: Recording[] = [
      {
        id: '1',
        name: '音阶练习 - 2026-06-07',
        date: '2026-06-07 09:30',
        duration: '3:25',
        score: 85
      },
      {
        id: '2',
        name: '告白气球 - 2026-06-06',
        date: '2026-06-06 14:20',
        duration: '4:12',
        score: 78
      },
      {
        id: '3',
        name: '呼吸控制 - 2026-06-05',
        date: '2026-06-05 10:15',
        duration: '2:48',
        score: 82
      }
    ];
    setRecordings(mockRecordings);
  };

  // Generate check-in data
  const generateCheckIns = () => {
    const mockCheckIns: CheckIn[] = [
      { date: '2026-06-07', minutes: 25, exercises: 3 },
      { date: '2026-06-06', minutes: 30, exercises: 4 },
      { date: '2026-06-05', minutes: 20, exercises: 2 },
      { date: '2026-06-04', minutes: 35, exercises: 5 },
      { date: '2026-06-03', minutes: 15, exercises: 2 },
      { date: '2026-06-02', minutes: 28, exercises: 3 },
      { date: '2026-06-01', minutes: 22, exercises: 3 }
    ];
    setCheckIns(mockCheckIns);
  };

  // Generate PK battles
  const generatePKBattles = () => {
    const mockBattles: PKBattle[] = [
      {
        id: '1',
        opponent: '小明',
        song: '告白气球',
        status: 'ongoing',
        myScore: 82,
        opponentScore: 78,
        endTime: '2026-06-07 20:00'
      },
      {
        id: '2',
        opponent: '小红',
        song: '演员',
        status: 'won',
        myScore: 88,
        opponentScore: 85,
        endTime: '2026-06-06 18:00'
      },
      {
        id: '3',
        opponent: '小刚',
        song: '稻香',
        status: 'lost',
        myScore: 75,
        opponentScore: 82,
        endTime: '2026-06-05 16:30'
      }
    ];
    setPKBattles(mockBattles);
  };

  // Real-time pitch detection simulation
  useEffect(() => {
    if (recording) {
      pitchTimer.current = setInterval(() => {
        setPitchData(prev => {
          const newData = [...prev, 50 + Math.random() * 50];
          return newData.slice(-20);
        });
      }, 200);
    } else {
      if (pitchTimer.current) {
        clearInterval(pitchTimer.current);
      }
      setPitchData([]);
    }
    return () => {
      if (pitchTimer.current) clearInterval(pitchTimer.current);
    };
  }, [recording]);

  const startRecording = () => {
    setRecording(true);
    recordingTimer.current = setTimeout(() => {
      setRecording(false);
      setHasRecording(true);
      const newRecording: Recording = {
        id: Date.now().toString(),
        name: `录音 - ${new Date().toLocaleString('zh-CN')}`,
        date: new Date().toLocaleString('zh-CN'),
        duration: '3:25',
        score: 80 + Math.floor(Math.random() * 15)
      };
      setRecordings(prev => [newRecording, ...prev]);
      setCurrentRecording(newRecording);
    }, 5000);
  };

  const playRecording = (recording: Recording) => {
    if (playing && currentRecording?.id === recording.id) {
      setPlaying(false);
      if (playTimer.current) clearInterval(playTimer.current);
      setPlayProgress(0);
    } else {
      setCurrentRecording(recording);
      setPlaying(true);
      setPlayProgress(0);
      playTimer.current = setInterval(() => {
        setPlayProgress(prev => {
          if (prev >= 100) {
            setPlaying(false);
            if (playTimer.current) clearInterval(playTimer.current);
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }
  };

  const checkInToday = () => {
    if (!todayPracticed) {
      const today = new Date().toISOString().split('T')[0];
      const newCheckIn: CheckIn = {
        date: today,
        minutes: 25,
        exercises: 3
      };
      setCheckIns(prev => [newCheckIn, ...prev]);
      setTodayPracticed(true);
      setStreak(prev => prev + 1);
    }
  };

  const shareRecording = (platform: string) => {
    alert(`正在分享到${platform}...`);
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

  const getPKStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-blue-100 text-blue-700';
      case 'won':
        return 'bg-green-100 text-green-700';
      case 'lost':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPKStatusText = (status: string) => {
    switch (status) {
      case 'ongoing':
        return '进行中';
      case 'won':
        return '胜利';
      case 'lost':
        return '失败';
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

        {/* 导航标签 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-2 border border-gray-100 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {[
              { id: 'home' as ViewType, label: '🏠 首页' },
              { id: 'practice' as ViewType, label: '🎤 练习' },
              { id: 'analysis' as ViewType, label: '📊 分析' },
              { id: 'share' as ViewType, label: '📤 分享' },
              { id: 'checkin' as ViewType, label: '📅 打卡' },
              { id: 'pk' as ViewType, label: '⚔️ PK' },
              { id: 'settings' as ViewType, label: '⚙️ 设置' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setView(tab.id);
                  if (tab.id === 'share' && recordings.length === 0) {
                    generateRecordings();
                  }
                  if (tab.id === 'checkin' && checkIns.length === 0) {
                    generateCheckIns();
                  }
                  if (tab.id === 'pk' && pkBattles.length === 0) {
                    generatePKBattles();
                  }
                }}
                className={`py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
                  view === tab.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
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
            {/* 学习进度 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📈 学习进度</h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">完成练习</p>
                  <p className="text-2xl font-bold text-indigo-600">15/24</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">练习时长</p>
                  <p className="text-2xl font-bold text-purple-600">780分</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">平均得分</p>
                  <p className="text-2xl font-bold text-pink-600">82分</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">连续打卡</p>
                  <p className="text-2xl font-bold text-orange-600">{streak}天</p>
                </div>
              </div>

              <div className="bg-gray-100 rounded-full h-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all"
                  style={{ width: '62.5%' }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">已完成 62.5%</p>
            </div>

            {/* 功能卡片 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-bold text-gray-900 mb-1">实时音准检测</h3>
                <p className="text-sm text-gray-600">AI实时分析音准变化</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100">
                <div className="text-3xl mb-2">📤</div>
                <h3 className="font-bold text-gray-900 mb-1">作品分享</h3>
                <p className="text-sm text-gray-600">分享录音到社交平台</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100">
                <div className="text-3xl mb-2">⚔️</div>
                <h3 className="font-bold text-gray-900 mb-1">PK对战</h3>
                <p className="text-sm text-gray-600">与好友一起唱歌比拼</p>
              </div>
            </div>

            {/* 今日推荐练习 */}
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
                    <button
                      onClick={() => setView('practice')}
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 active:scale-95"
                    >
                      开始练习
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 练习视图 */}
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
                  <div className="text-center mb-4">
                    <p className="text-xl font-bold text-gray-900 mb-2">录音中...</p>
                    <p className="text-sm text-gray-600">AI正在实时分析您的声音</p>
                  </div>
                ) : hasRecording ? (
                  <div className="text-center mb-4">
                    <p className="text-xl font-bold text-gray-900 mb-2">录音完成</p>
                    <p className="text-sm text-gray-600">查看分析结果或重新录制</p>
                  </div>
                ) : (
                  <div className="text-center mb-4">
                    <p className="text-xl font-bold text-gray-900 mb-2">准备开始</p>
                    <p className="text-sm text-gray-600">点击下方按钮开始录音练习</p>
                  </div>
                )}

                {/* 实时音准可视化 */}
                {recording && pitchData.length > 0 && (
                  <div className="w-full bg-gray-100 rounded-xl p-4 mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">🎯 实时音准检测</p>
                    <div className="h-24 flex items-end justify-between gap-1">
                      {pitchData.map((pitch, index) => (
                        <div
                          key={index}
                          className="flex-1 bg-gradient-to-t from-indigo-500 to-purple-600 rounded-t transition-all"
                          style={{ height: `${pitch}%` }}
                        ></div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">音准: {pitchData[pitchData.length - 1]?.toFixed(0)}%</p>
                  </div>
                )}

                <div className="flex gap-3">
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
                        onClick={() => {
                          setHasRecording(false);
                          setCurrentRecording(null);
                        }}
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

            {/* 练习曲目 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">🎵 练习曲目</h2>

              <div className="space-y-3">
                {['告白气球', '稻香', '演员'].map((song, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-300 transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900">{song}</h3>
                        <p className="text-xs text-gray-600">流行 · 中等难度</p>
                      </div>
                      <button className="w-10 h-10 bg-indigo-500 hover:bg-indigo-600 rounded-full flex items-center justify-center text-white transition-all">
                        ▶
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 分析视图 */}
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 作品分享视图 */}
        {view === 'share' && (
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📤 我的录音作品</h2>

              {recordings.length > 0 ? (
                <div className="space-y-3">
                  {recordings.map((recording) => (
                    <div key={recording.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900">{recording.name}</h3>
                          <p className="text-xs text-gray-600">{recording.date} · {recording.duration}</p>
                        </div>
                        <div className={`text-2xl font-bold ${getScoreColor(recording.score)}`}>
                          {recording.score}
                        </div>
                      </div>

                      {currentRecording?.id === recording.id && playing && (
                        <div className="mb-3">
                          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all"
                              style={{ width: `${playProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <button
                          onClick={() => playRecording(recording)}
                          className="flex-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold py-2 px-4 rounded-lg transition-all"
                        >
                          {playing && currentRecording?.id === recording.id ? '⏸ 暂停' : '▶ 播放'}
                        </button>
                        <button
                          onClick={() => setView('analysis')}
                          className="flex-1 bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold py-2 px-4 rounded-lg transition-all"
                        >
                          📊 查看分析
                        </button>
                      </div>

                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs font-semibold text-gray-700 mb-2">分享到：</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => shareRecording('微信')}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-lg text-sm transition-all"
                          >
                            💬 微信
                          </button>
                          <button
                            onClick={() => shareRecording('抖音')}
                            className="flex-1 bg-black hover:bg-gray-800 text-white font-semibold py-2 px-3 rounded-lg text-sm transition-all"
                          >
                            🎵 抖音
                          </button>
                          <button
                            onClick={() => shareRecording('微博')}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-lg text-sm transition-all"
                          >
                            📱 微博
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">🎤</div>
                  <p className="text-gray-600">还没有录音作品</p>
                  <button
                    onClick={() => setView('practice')}
                    className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all"
                  >
                    开始录音
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 打卡视图 */}
        {view === 'checkin' && (
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📅 每日打卡</h2>

              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-orange-100 to-red-100 mb-3">
                  <div>
                    <p className="text-4xl font-bold text-orange-600">{streak}</p>
                    <p className="text-xs text-gray-600">连续天数</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">坚持练习，养成好习惯！</p>

                <button
                  onClick={checkInToday}
                  disabled={todayPracticed}
                  className={`${
                    todayPracticed
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white'
                  } font-semibold py-3 px-6 rounded-xl shadow-md transition-all`}
                >
                  {todayPracticed ? '✓ 今日已打卡' : '📅 立即打卡'}
                </button>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200 mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">📊 本周统计</h4>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-2xl font-bold text-indigo-600">{checkIns.length}</p>
                    <p className="text-xs text-gray-600">打卡天数</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-600">
                      {checkIns.reduce((sum, c) => sum + c.minutes, 0)}
                    </p>
                    <p className="text-xs text-gray-600">练习分钟</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-pink-600">
                      {checkIns.reduce((sum, c) => sum + c.exercises, 0)}
                    </p>
                    <p className="text-xs text-gray-600">完成练习</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📜 打卡记录</h2>

              {checkIns.length > 0 ? (
                <div className="space-y-2">
                  {checkIns.map((checkin, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                          ✓
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{checkin.date}</p>
                          <p className="text-xs text-gray-600">{checkin.exercises}个练习 · {checkin.minutes}分钟</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">📅</div>
                  <p className="text-gray-600">还没有打卡记录</p>
                </div>
              )}
            </div>
          </div>
        )}


        {/* PK对战视图 */}
        {view === 'pk' && (
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">⚔️ PK对战</h2>
                <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all">
                  + 发起对战
                </button>
              </div>

              {pkBattles.length > 0 ? (
                <div className="space-y-3">
                  {pkBattles.map((battle) => (
                    <div key={battle.id} className="bg-white rounded-xl border-2 border-gray-200 p-4 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900">{battle.song}</h3>
                          <p className="text-xs text-gray-600">对手：{battle.opponent}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPKStatusColor(battle.status)}`}>
                          {getPKStatusText(battle.status)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className={`p-3 rounded-lg border-2 ${battle.myScore > battle.opponentScore ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                          <p className="text-xs text-gray-500 mb-1">我的得分</p>
                          <p className="text-2xl font-bold text-indigo-600">{battle.myScore}</p>
                          {battle.myScore > battle.opponentScore && battle.status !== 'ongoing' && (
                            <p className="text-xs text-green-600 mt-1">🏆 获胜</p>
                          )}
                        </div>
                        <div className={`p-3 rounded-lg border-2 ${battle.opponentScore > battle.myScore ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
                          <p className="text-xs text-gray-500 mb-1">对手得分</p>
                          <p className="text-2xl font-bold text-purple-600">{battle.opponentScore}</p>
                          {battle.opponentScore > battle.myScore && battle.status !== 'ongoing' && (
                            <p className="text-xs text-red-600 mt-1">💔 失败</p>
                          )}
                        </div>
                      </div>

                      <div className="text-xs text-gray-600 mb-3">
                        {battle.status === 'ongoing' ? `结束时间：${battle.endTime}` : `已结束：${battle.endTime}`}
                      </div>

                      {battle.status === 'ongoing' && (
                        <button className="w-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold py-2 px-4 rounded-lg transition-all">
                          继续对战
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">⚔️</div>
                  <p className="text-gray-600">还没有PK对战记录</p>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span>💡</span>
                <span>PK对战规则</span>
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 选择同一首歌与好友进行对战</li>
                <li>• 系统将根据音准、节奏、音色等维度评分</li>
                <li>• 得分高者获胜，可以赢取勋章和积分</li>
                <li>• 每天可发起3次对战，尽情挑战吧！</li>
              </ul>
            </div>
          </div>
        )}

        {/* API设置视图 */}
        {view === 'settings' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">⚙️ 语音识别API设置</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">服务提供商</label>
                <select
                  value={apiProvider}
                  onChange={(e) => setApiProvider(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">请选择</option>
                  <option value="openai-whisper">OpenAI Whisper</option>
                  <option value="google-cloud">Google Cloud Speech-to-Text</option>
                  <option value="azure">Azure Speech Service</option>
                  <option value="baidu">百度语音识别</option>
                  <option value="tencent">腾讯云语音识别</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API密钥</label>
                <input
                  type="password"
                  placeholder="sk-..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={apiEnabled}
                    onChange={(e) => setApiEnabled(e.target.checked)}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">启用实时语音识别</div>
                    <div className="text-sm text-gray-600">连接API后可实现精准音准检测</div>
                  </div>
                </label>
              </div>

              <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all">
                保存设置
              </button>

              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                <h4 className="font-semibold text-gray-900 mb-2">💡 配置说明</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 配置API后可获得更精准的音准检测</li>
                  <li>• 支持多种主流语音识别服务</li>
                  <li>• API密钥仅存储在本地，确保安全</li>
                  <li>• 未配置时使用模拟数据进行分析</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
