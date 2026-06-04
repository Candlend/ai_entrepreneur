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
  avatar: string;
  bio: string;
  photos: number;
}

interface UserProfile {
  age: number;
  gender: string;
  city: string;
  interests: string[];
  lookingFor: string;
  avatar: string;
  bio: string;
  photos: File[];
}

interface Message {
  id: string;
  from: 'user' | 'match';
  text: string;
  time: string;
}

interface DateLocation {
  name: string;
  category: string;
  description: string;
  suitable: string;
  address: string;
}

type ViewType = 'home' | 'profile' | 'matches' | 'chat' | 'dating' | 'settings';

export default function Home() {
  const [view, setView] = useState<ViewType>('home');
  const [profile, setProfile] = useState<UserProfile>({
    age: 25,
    gender: '',
    city: '',
    interests: [],
    lookingFor: '',
    avatar: '',
    bio: '',
    photos: []
  });
  const [matches, setMatches] = useState<Profile[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Profile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [icebreakers, setIcebreakers] = useState<string[]>([]);
  const [dateLocations, setDateLocations] = useState<DateLocation[]>([]);
  const [privacySettings, setPrivacySettings] = useState({
    showPhotos: true,
    showLocation: true,
    showOnline: true,
    allowMessages: 'matched'
  });

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
        matchScore: 92,
        avatar: '👩',
        bio: '热爱旅行和美食，喜欢尝试新鲜事物。周末喜欢看电影或者和朋友聚会。',
        photos: 5
      },
      {
        id: '2',
        name: '王晓雪',
        age: 24,
        city: '上海',
        interests: ['音乐', '艺术', '读书'],
        personality: '文艺温柔，喜欢安静',
        matchScore: 88,
        avatar: '👩‍🎨',
        bio: '独立设计师，喜欢音乐和艺术。闲暇时光喜欢泡在咖啡馆读书。',
        photos: 6
      },
      {
        id: '3',
        name: '张欣怡',
        age: 27,
        city: '深圳',
        interests: ['运动', '旅行', '摄影'],
        personality: '阳光积极，热爱运动',
        matchScore: 85,
        avatar: '👩‍💼',
        bio: '健身达人，热爱户外运动。喜欢用镜头记录生活中的美好瞬间。',
        photos: 8
      },
      {
        id: '4',
        name: '陈雨婷',
        age: 25,
        city: '杭州',
        interests: ['美食', '瑜伽', '电影'],
        personality: '优雅知性，注重生活品质',
        matchScore: 82,
        avatar: '👩‍🍳',
        bio: '美食博主，热爱烹饪和品尝美食。坚持瑜伽多年，追求身心平衡。',
        photos: 7
      }
    ];

    setMatches(mockMatches);
    setView('matches');
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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + profile.photos.length <= 6) {
      setProfile({
        ...profile,
        photos: [...profile.photos, ...files]
      });
    }
  };

  const removePhoto = (index: number) => {
    setProfile({
      ...profile,
      photos: profile.photos.filter((_, i) => i !== index)
    });
  };

  const startChat = (match: Profile) => {
    setSelectedMatch(match);
    setMessages([
      {
        id: '1',
        from: 'match',
        text: `你好！很高兴认识你 😊`,
        time: '10:30'
      }
    ]);

    const mockIcebreakers = [
      `我看到你也喜欢${match.interests[0]}，最近有什么推荐吗？`,
      `你在${match.city}住了多久？有什么好玩的地方推荐吗？`,
      `${match.interests[1]}真是个不错的爱好！你是怎么开始的？`,
      `周末有什么计划吗？要不要一起去${match.interests[0]}？`
    ];
    setIcebreakers(mockIcebreakers);
    setView('chat');
  };

  const sendMessage = (text?: string) => {
    const messageText = text || currentMessage;
    if (messageText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        from: 'user',
        text: messageText,
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setCurrentMessage('');

      setTimeout(() => {
        const replyMessage: Message = {
          id: (Date.now() + 1).toString(),
          from: 'match',
          text: '哈哈，听起来不错！我们可以约个时间见面聊聊 😊',
          time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, replyMessage]);
      }, 1500);
    }
  };

  const generateDateLocations = () => {
    const locations: DateLocation[] = [
      {
        name: '三里屯太古里',
        category: '🛍️ 购物美食',
        description: '时尚潮流地标，汇聚国际品牌和特色餐厅',
        suitable: '适合初次见面，轻松自在的氛围',
        address: '北京市朝阳区三里屯路19号'
      },
      {
        name: '朝阳公园',
        category: '🌳 户外休闲',
        description: '城市绿肺，可以散步、骑行、划船',
        suitable: '适合喜欢户外活动的情侣',
        address: '北京市朝阳区农展南路1号'
      },
      {
        name: '国家大剧院',
        category: '🎭 文艺演出',
        description: '欣赏高雅艺术，感受文化氛围',
        suitable: '适合有共同艺术爱好的情侣',
        address: '北京市西城区西长安街2号'
      },
      {
        name: '南锣鼓巷',
        category: '🏮 古风街区',
        description: '老北京胡同，特色小吃和文艺小店',
        suitable: '适合喜欢传统文化和拍照的情侣',
        address: '北京市东城区南锣鼓巷'
      }
    ];
    setDateLocations(locations);
    setView('dating');
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

        {/* 导航标签 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-2 border border-gray-100 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {[
              { id: 'home' as ViewType, label: '🏠 首页' },
              { id: 'profile' as ViewType, label: '👤 资料' },
              { id: 'matches' as ViewType, label: '💝 匹配' },
              { id: 'chat' as ViewType, label: '💬 聊天' },
              { id: 'dating' as ViewType, label: '📍 约会' },
              { id: 'settings' as ViewType, label: '⚙️ 隐私' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setView(tab.id)}
                className={`py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
                  view === tab.id
                    ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md'
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
                onClick={() => setView('profile')}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
              >
                创建个人资料
              </button>
            </div>
          </>
        )}

        {/* 资料视图 */}
        {view === 'profile' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📝 完善个人资料</h2>

            <div className="space-y-4">
              {/* 照片上传 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  上传照片（最多6张）
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {profile.photos.map((photo, idx) => (
                    <div key={idx} className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`照片${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removePhoto(idx)}
                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {profile.photos.length < 6 && (
                    <label className="aspect-square bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <span className="text-3xl text-gray-400">📷</span>
                    </label>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  已上传 {profile.photos.length}/6 张照片
                </p>
              </div>

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

              {/* 个人介绍 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  个人介绍
                </label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="介绍一下你自己，让别人更了解你..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {profile.bio.length}/200 字
                </p>
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

              <button
                onClick={generateMatches}
                disabled={!profile.gender || !profile.city || profile.interests.length === 0}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
              >
                开始匹配
              </button>
            </div>
          </div>
        )}

        {/* 匹配视图 */}
        {view === 'matches' && (
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">💝 为您推荐</h2>
                <button
                  onClick={() => setView('profile')}
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
                      {match.avatar}
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{match.name}</h3>
                        <p className="text-sm text-gray-600">
                          {match.age}岁 · {match.city}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {match.photos}张照片
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-rose-600">{match.matchScore}%</div>
                        <p className="text-xs text-gray-500">匹配度</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-700 mb-2">{match.personality}</p>
                      <p className="text-sm text-gray-600 line-clamp-2">{match.bio}</p>
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
                      <button
                        onClick={() => startChat(match)}
                        className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                      >
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

        {/* 聊天视图 */}
        {view === 'chat' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {selectedMatch ? (
              <>
                {/* 聊天头部 */}
                <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-4 text-white">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setView('matches')}
                      className="text-white hover:text-rose-100"
                    >
                      ← 返回
                    </button>
                    <div className="text-3xl">{selectedMatch.avatar}</div>
                    <div className="flex-1">
                      <h3 className="font-bold">{selectedMatch.name}</h3>
                      <p className="text-xs text-rose-100">在线</p>
                    </div>
                  </div>
                </div>

                {/* 破冰话题建议 */}
                {icebreakers.length > 0 && messages.length <= 1 && (
                  <div className="bg-blue-50 border-b border-blue-200 p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">💡 AI破冰话题建议</h4>
                    <div className="space-y-2">
                      {icebreakers.slice(0, 3).map((icebreaker, idx) => (
                        <button
                          key={idx}
                          onClick={() => sendMessage(icebreaker)}
                          className="w-full text-left text-sm bg-white hover:bg-blue-50 text-gray-700 px-3 py-2 rounded-lg border border-blue-200 transition-colors"
                        >
                          {icebreaker}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 聊天消息 */}
                <div className="h-96 overflow-y-auto p-4 space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs sm:max-w-sm px-4 py-2 rounded-2xl ${
                          message.from === 'user'
                            ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.from === 'user' ? 'text-rose-100' : 'text-gray-500'
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 输入框 */}
                <div className="border-t border-gray-200 p-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="输入消息..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => sendMessage()}
                      disabled={!currentMessage.trim()}
                      className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200"
                    >
                      发送
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <p className="text-4xl mb-4">💬</p>
                <p>选择一个匹配对象开始聊天</p>
                <button
                  onClick={() => setView('matches')}
                  className="mt-4 text-rose-600 hover:text-rose-700 font-medium"
                >
                  去查看匹配列表
                </button>
              </div>
            )}
          </div>
        )}

        {/* 约会地点推荐视图 */}
        {view === 'dating' && (
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📍 约会地点推荐</h2>
              <p className="text-sm text-gray-600 mb-4">
                基于您的兴趣和约会对象的偏好，AI为您推荐以下约会地点
              </p>

              {dateLocations.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-4xl mb-4">🗺️</p>
                  <p className="text-gray-600 mb-4">还没有约会地点推荐</p>
                  <button
                    onClick={generateDateLocations}
                    className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    获取推荐
                  </button>
                </div>
              ) : null}
            </div>

            {dateLocations.map((location, idx) => (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-200 rounded-xl flex items-center justify-center text-2xl">
                    {location.category.split(' ')[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{location.name}</h3>
                        <p className="text-sm text-gray-600">{location.category}</p>
                      </div>
                      <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-medium">
                        推荐
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{location.description}</p>
                    <div className="bg-blue-50 rounded-lg p-3 mb-2">
                      <p className="text-xs text-blue-900">
                        <span className="font-semibold">💡 适合场景：</span>
                        {location.suitable}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">
                      📍 {location.address}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                        查看详情
                      </button>
                      <button className="px-4 py-2 border-2 border-rose-500 text-rose-600 hover:bg-rose-50 font-semibold rounded-lg transition-all duration-200">
                        导航
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 隐私设置视图 */}
        {view === 'settings' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">⚙️ 隐私设置</h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h3 className="font-semibold text-gray-900">显示照片</h3>
                  <p className="text-sm text-gray-600">允许其他用户查看您的照片</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacySettings.showPhotos}
                    onChange={(e) => setPrivacySettings({ ...privacySettings, showPhotos: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h3 className="font-semibold text-gray-900">显示位置</h3>
                  <p className="text-sm text-gray-600">显示您的大致位置信息</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacySettings.showLocation}
                    onChange={(e) => setPrivacySettings({ ...privacySettings, showLocation: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h3 className="font-semibold text-gray-900">显示在线状态</h3>
                  <p className="text-sm text-gray-600">让其他用户看到您是否在线</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacySettings.showOnline}
                    onChange={(e) => setPrivacySettings({ ...privacySettings, showOnline: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                </label>
              </div>

              <div className="py-3">
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900">谁可以给我发消息</h3>
                  <p className="text-sm text-gray-600">控制谁可以主动联系您</p>
                </div>
                <div className="space-y-2">
                  {[
                    { value: 'everyone', label: '所有人' },
                    { value: 'matched', label: '仅匹配用户' },
                    { value: 'none', label: '不允许' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 p-3 border border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="allowMessages"
                        value={option.value}
                        checked={privacySettings.allowMessages === option.value}
                        onChange={(e) => setPrivacySettings({ ...privacySettings, allowMessages: e.target.value })}
                        className="w-4 h-4 text-rose-600 focus:ring-rose-500"
                      />
                      <span className="text-sm text-gray-900">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span>🔒</span>
                  <span>安全提示</span>
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 不要向陌生人透露个人敏感信息</li>
                  <li>• 首次见面选择公共场所</li>
                  <li>• 告知朋友或家人约会计划</li>
                  <li>• 如遇可疑行为请及时举报</li>
                </ul>
              </div>

              <button
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
              >
                保存设置
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
