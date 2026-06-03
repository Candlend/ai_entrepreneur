'use client';

import { useState } from 'react';

interface Profile {
  id: string;
  name: string;
  age: number;
  city: string;
  interests: string[];
  personality: string;
  matchScore: number;
}

interface UserProfile {
  age: number;
  gender: string;
  city: string;
  interests: string[];
  lookingFor: string;
}

export default function Home() {
  const [step, setStep] = useState<'intro' | 'profile' | 'matches'>('intro');
  const [profile, setProfile] = useState<UserProfile>({
    age: 25,
    gender: '',
    city: '',
    interests: [],
    lookingFor: ''
  });
  const [matches, setMatches] = useState<Profile[]>([]);

  const interestOptions = [
    '🎬 电影', '📚 阅读', '🎵 音乐', '✈️ 旅行',
    '🏃 运动', '🎨 艺术', '🍳 美食', '🎮 游戏',
    '📷 摄影', '🧘 瑜伽', '🏊 游泳', '🎭 戏剧'
  ];

  const generateMatches = () => {
    const mockMatches: Profile[] = [
      {
        id: '1',
        name: '李梦瑶',
        age: 26,
        city: '北京',
        interests: ['电影', '旅行', '美食'],
        personality: '活泼开朗，热爱生活',
        matchScore: 92
      },
      {
        id: '2',
        name: '王晓雪',
        age: 24,
        city: '上海',
        interests: ['音乐', '艺术', '读书'],
        personality: '文艺温柔，喜欢安静',
        matchScore: 88
      },
      {
        id: '3',
        name: '张欣怡',
        age: 27,
        city: '深圳',
        interests: ['运动', '旅行', '摄影'],
        personality: '阳光积极，热爱运动',
        matchScore: 85
      },
      {
        id: '4',
        name: '陈雨婷',
        age: 25,
        city: '杭州',
        interests: ['美食', '瑜伽', '电影'],
        personality: '优雅知性，注重生活品质',
        matchScore: 82
      }
    ];

    setMatches(mockMatches);
    setStep('matches');
  };

  const toggleInterest = (interest: string) => {
    const cleanInterest = interest.replace(/[^一-龥]/g, '');
    if (profile.interests.includes(cleanInterest)) {
      setProfile({
        ...profile,
        interests: profile.interests.filter(i => i !== cleanInterest)
      });
    } else if (profile.interests.length < 6) {
      setProfile({
        ...profile,
        interests: [...profile.interests, cleanInterest]
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* 标题 */}
        <div className="text-center pt-2 sm:pt-4 pb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full mb-3 sm:mb-4 shadow-lg">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            AI缘分助手
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">AI智能匹配 · 找到最适合的另一半</p>
        </div>

        {step === 'intro' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100">
                <div className="text-3xl mb-2">🤖</div>
                <h3 className="font-bold text-gray-900 mb-1">AI智能匹配</h3>
                <p className="text-sm text-gray-600">基于性格、兴趣的精准匹配</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100">
                <div className="text-3xl mb-2">💝</div>
                <h3 className="font-bold text-gray-900 mb-1">真实认证</h3>
                <p className="text-sm text-gray-600">实名认证，保障交友安全</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100">
                <div className="text-3xl mb-2">💬</div>
                <h3 className="font-bold text-gray-900 mb-1">高效沟通</h3>
                <p className="text-sm text-gray-600">AI破冰话题，轻松开启聊天</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">💖 开始寻找缘分</h2>
              <p className="text-gray-600 mb-6">
                填写您的个人信息，AI会帮您找到最合适的伴侣。我们的算法基于心理学研究，分析性格、价值观和生活方式，为您推荐匹配度高的用户。
              </p>
              <button
                onClick={() => setStep('profile')}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
              >
                创建个人资料
              </button>
            </div>
          </>
        )}

        {step === 'profile' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📝 完善个人资料</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">年龄</label>
                  <input
                    type="number"
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 25 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">性别</label>
                  <select
                    value={profile.gender}
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">请选择</option>
                    <option value="male">男</option>
                    <option value="female">女</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">所在城市</label>
                <input
                  type="text"
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  placeholder="例如：北京"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  兴趣爱好（最多选择6个）
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {interestOptions.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        profile.interests.includes(interest.replace(/[^一-龥]/g, ''))
                          ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  已选择 {profile.interests.length}/6
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">寻找对象类型</label>
                <textarea
                  value={profile.lookingFor}
                  onChange={(e) => setProfile({ ...profile, lookingFor: e.target.value })}
                  placeholder="描述您理想中的另一半..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('intro')}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-200"
                >
                  返回
                </button>
                <button
                  onClick={generateMatches}
                  disabled={!profile.gender || !profile.city || profile.interests.length === 0}
                  className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
                >
                  开始匹配
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'matches' && (
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">💝 为您推荐</h2>
                <button
                  onClick={() => setStep('profile')}
                  className="text-sm text-rose-600 hover:text-rose-700 font-medium"
                >
                  修改资料
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                基于您的兴趣和偏好，AI为您找到了 {matches.length} 位高匹配度用户
              </p>
            </div>

            {matches.map((match) => (
              <div
                key={match.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-rose-200 to-pink-300 rounded-full flex items-center justify-center text-4xl sm:text-5xl">
                      👤
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{match.name}</h3>
                        <p className="text-sm text-gray-600">
                          {match.age}岁 · {match.city}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-rose-600">{match.matchScore}%</div>
                        <p className="text-xs text-gray-500">匹配度</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-700 mb-2">{match.personality}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-2">共同兴趣：</p>
                      <div className="flex flex-wrap gap-2">
                        {match.interests.map((interest, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-medium"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                        💬 打个招呼
                      </button>
                      <button className="px-4 py-2 border-2 border-rose-500 text-rose-600 hover:bg-rose-50 font-semibold rounded-lg transition-all duration-200">
                        ⭐ 收藏
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="text-center py-4">
              <button
                onClick={generateMatches}
                className="bg-white/80 hover:bg-white text-rose-600 font-semibold py-3 px-6 rounded-xl border border-rose-200 hover:border-rose-300 transition-all duration-200"
              >
                查看更多推荐
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
