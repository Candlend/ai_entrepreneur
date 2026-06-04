'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface StyleRecommendation {
  id: string;
  image: string;
  analysis: {
    bodyType: string;
    skinTone: string;
    style: string;
  };
  recommendations: {
    tops: string[];
    bottoms: string[];
    shoes: string[];
    accessories: string[];
  };
  colors: string[];
  occasions: {
    formal: string[];
    casual: string[];
    date: string[];
  };
  seasons: {
    spring: string[];
    summer: string[];
    autumn: string[];
    winter: string[];
  };
  brands: {
    luxury: string[];
    midRange: string[];
    affordable: string[];
  };
  examples: string[];
}

interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  color: string;
  season: string;
  occasion: string;
  image: string;
}

type ViewType = 'analyze' | 'wardrobe' | 'occasions' | 'seasons' | 'brands' | 'examples';

export default function Home() {
  const [view, setView] = useState<ViewType>('analyze');
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendation, setRecommendation] = useState<StyleRecommendation | null>(null);

  // 衣橱管理
  const [wardrobeItems, setWardrobeItems] = useState<WardrobeItem[]>([
    { id: '1', name: '白色衬衫', category: '上装', color: '白色', season: '四季', occasion: '正式', image: '👔' },
    { id: '2', name: '牛仔裤', category: '下装', color: '蓝色', season: '四季', occasion: '休闲', image: '👖' },
    { id: '3', name: '小白鞋', category: '鞋子', color: '白色', season: '春夏', occasion: '休闲', image: '👟' },
    { id: '4', name: '黑色西装', category: '上装', color: '黑色', season: '秋冬', occasion: '正式', image: '🥋' }
  ]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setRecommendation(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    multiple: false
  });

  const handleAnalyze = () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      setRecommendation({
        id: Date.now().toString(),
        image: image!,
        analysis: {
          bodyType: ['梨形身材', '苹果型身材', '沙漏型身材', 'H型身材'][Math.floor(Math.random() * 4)],
          skinTone: ['冷色调', '暖色调', '中性色调'][Math.floor(Math.random() * 3)],
          style: ['休闲风', '职业装', '运动风', '街头风'][Math.floor(Math.random() * 4)]
        },
        recommendations: {
          tops: ['修身衬衫', 'V领毛衣', '宽松T恤'],
          bottoms: ['高腰阔腿裤', 'A字裙', '直筒牛仔裤'],
          shoes: ['小白鞋', '乐福鞋', '运动鞋'],
          accessories: ['简约项链', '复古眼镜', '帆布包']
        },
        colors: ['#2C3E50', '#E74C3C', '#F39C12', '#27AE60'],
        occasions: {
          formal: ['西装套装 + 高跟鞋', '连衣裙 + 精致配饰', '衬衫 + 西裤'],
          casual: ['T恤 + 牛仔裤', '针织衫 + 休闲裤', '卫衣 + 运动裤'],
          date: ['优雅连衣裙', '修身衬衫 + 短裙', '针织开衫 + 阔腿裤']
        },
        seasons: {
          spring: ['薄外套 + T恤', '衬衫 + 牛仔裤', '针织衫'],
          summer: ['清爽T恤', '连衣裙', '短裤 + 背心'],
          autumn: ['风衣 + 毛衣', '夹克 + 衬衫', '长袖上衣'],
          winter: ['羽绒服 + 毛衣', '大衣 + 围巾', '厚外套']
        },
        brands: {
          luxury: ['Gucci', 'Prada', 'Chanel'],
          midRange: ['Zara', 'H&M', 'Uniqlo'],
          affordable: ['优衣库', '网易严选', '淘宝精选']
        },
        examples: ['👔👖👟', '👗👠💼', '👕🩳👟', '🧥👖👢']
      });
      setIsAnalyzing(false);
      setView('analyze');
    }, 2000);
  };

  const addWardrobeItem = () => {
    const name = prompt('衣物名称：');
    const category = prompt('类别（上装/下装/鞋子/配饰）：');

    if (name && category) {
      setWardrobeItems([...wardrobeItems, {
        id: Date.now().toString(),
        name,
        category,
        color: '未知',
        season: '四季',
        occasion: '休闲',
        image: '👔'
      }]);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
        {/* 标题 */}
        <div className="text-center pt-2 sm:pt-4 pb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-3 sm:mb-4 shadow-lg">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            AI穿搭助手
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">智能分析 · 专业搭配 · 风格管理</p>
        </div>

        {/* 导航标签 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-2 border border-gray-100 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {[
              { id: 'analyze' as ViewType, label: '📸 AI分析' },
              { id: 'wardrobe' as ViewType, label: '👔 衣橱' },
              { id: 'occasions' as ViewType, label: '🎯 场合' },
              { id: 'seasons' as ViewType, label: '🌸 季节' },
              { id: 'brands' as ViewType, label: '🏷️ 品牌' },
              { id: 'examples' as ViewType, label: '✨ 示例' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setView(tab.id)}
                className={`py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
                  view === tab.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* AI分析视图 */}
        {view === 'analyze' && (
          <>
            {!image && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📤 上传照片</h2>

                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                    isDragActive
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-300 hover:border-pink-400 hover:bg-gray-50'
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-base sm:text-lg font-semibold text-gray-700">
                        {isDragActive ? '放开上传照片' : '拖拽照片到这里'}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">或点击选择照片</p>
                      <p className="text-xs text-gray-400 mt-2">支持 JPG、PNG、WEBP 格式</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {image && !recommendation && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📸 照片预览</h2>

                <div className="relative max-w-md mx-auto">
                  <img src={image} alt="上传的照片" className="w-full rounded-xl shadow-lg" />
                  <button
                    onClick={() => setImage(null)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? (
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
            )}

            {recommendation && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">✨ 穿搭推荐</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <img src={recommendation.image} alt="分析照片" className="w-full rounded-xl shadow-md" />
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-3">📊 AI分析结果</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">身材类型：</span>
                          <span className="font-semibold text-gray-900">{recommendation.analysis.bodyType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">肤色色调：</span>
                          <span className="font-semibold text-gray-900">{recommendation.analysis.skinTone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">推荐风格：</span>
                          <span className="font-semibold text-gray-900">{recommendation.analysis.style}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <h3 className="font-bold text-gray-900 mb-3">🎨 配色方案</h3>
                      <div className="flex gap-3">
                        {recommendation.colors.map((color, idx) => (
                          <div key={idx} className="flex flex-col items-center gap-1">
                            <div
                              className="w-12 h-12 rounded-lg shadow-md"
                              style={{ backgroundColor: color }}
                            ></div>
                            <span className="text-xs text-gray-600">{color}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setImage(null);
                    setRecommendation(null);
                  }}
                  className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
                >
                  📸 上传新照片
                </button>
              </div>
            )}
          </>
        )}

        {/* 衣橱管理视图 */}
        {view === 'wardrobe' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">👔 我的衣橱</h2>
              <button
                onClick={addWardrobeItem}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
              >
                + 添加衣物
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {wardrobeItems.map((item) => (
                <div key={item.id} className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 border border-pink-200 hover:shadow-lg transition-all">
                  <div className="text-5xl text-center mb-2">{item.image}</div>
                  <h3 className="font-bold text-gray-900 text-center mb-1">{item.name}</h3>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>类别: {item.category}</p>
                    <p>颜色: {item.color}</p>
                    <p>季节: {item.season}</p>
                    <p>场合: {item.occasion}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-gray-700">
                💡 <strong>提示:</strong> 添加您的衣物到衣橱，AI将为您智能匹配穿搭
              </p>
            </div>
          </div>
        )}

        {/* 场合推荐视图 */}
        {view === 'occasions' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">🎯 场合穿搭推荐</h2>

            {recommendation ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>💼</span>
                    <span>正式场合</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {recommendation.occasions.formal.map((outfit, idx) => (
                      <div key={idx} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                        <p className="text-sm text-gray-700">{outfit}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>😎</span>
                    <span>休闲场合</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {recommendation.occasions.casual.map((outfit, idx) => (
                      <div key={idx} className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                        <p className="text-sm text-gray-700">{outfit}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>💕</span>
                    <span>约会场合</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {recommendation.occasions.date.map((outfit, idx) => (
                      <div key={idx} className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-200">
                        <p className="text-sm text-gray-700">{outfit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">请先进行AI分析</h3>
                <p className="text-sm text-gray-500 mb-4">上传照片后，AI将为您推荐不同场合的穿搭</p>
                <button
                  onClick={() => setView('analyze')}
                  className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  前往分析
                </button>
              </div>
            )}
          </div>
        )}

        {/* 季节推荐视图 */}
        {view === 'seasons' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">🌸 四季穿搭推荐</h2>

            {recommendation ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>🌸</span>
                    <span>春季穿搭</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {recommendation.seasons.spring.map((outfit, idx) => (
                      <div key={idx} className="p-4 bg-gradient-to-br from-green-50 to-lime-50 rounded-xl border border-green-200">
                        <p className="text-sm text-gray-700">{outfit}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>☀️</span>
                    <span>夏季穿搭</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {recommendation.seasons.summer.map((outfit, idx) => (
                      <div key={idx} className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                        <p className="text-sm text-gray-700">{outfit}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>🍂</span>
                    <span>秋季穿搭</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {recommendation.seasons.autumn.map((outfit, idx) => (
                      <div key={idx} className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                        <p className="text-sm text-gray-700">{outfit}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>❄️</span>
                    <span>冬季穿搭</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {recommendation.seasons.winter.map((outfit, idx) => (
                      <div key={idx} className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                        <p className="text-sm text-gray-700">{outfit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🌸</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">请先进行AI分析</h3>
                <p className="text-sm text-gray-500 mb-4">上传照片后，AI将为您推荐四季穿搭</p>
                <button
                  onClick={() => setView('analyze')}
                  className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  前往分析
                </button>
              </div>
            )}
          </div>
        )}

        {/* 品牌推荐视图 */}
        {view === 'brands' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">🏷️ 品牌推荐</h2>

            {recommendation ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>💎</span>
                    <span>奢侈品牌</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {recommendation.brands.luxury.map((brand, idx) => (
                      <div key={idx} className="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl border-2 border-yellow-300 text-center hover:shadow-lg transition-all">
                        <p className="font-bold text-gray-900">{brand}</p>
                        <p className="text-xs text-gray-600 mt-1">高端定位</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>🎯</span>
                    <span>中端品牌</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {recommendation.brands.midRange.map((brand, idx) => (
                      <div key={idx} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-300 text-center hover:shadow-lg transition-all">
                        <p className="font-bold text-gray-900">{brand}</p>
                        <p className="text-xs text-gray-600 mt-1">性价比高</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>💰</span>
                    <span>平价品牌</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {recommendation.brands.affordable.map((brand, idx) => (
                      <div key={idx} className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-300 text-center hover:shadow-lg transition-all">
                        <p className="font-bold text-gray-900">{brand}</p>
                        <p className="text-xs text-gray-600 mt-1">经济实惠</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏷️</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">请先进行AI分析</h3>
                <p className="text-sm text-gray-500 mb-4">上传照片后，AI将为您推荐适合的品牌</p>
                <button
                  onClick={() => setView('analyze')}
                  className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  前往分析
                </button>
              </div>
            )}
          </div>
        )}

        {/* 搭配示例视图 */}
        {view === 'examples' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">✨ 搭配示例</h2>

            {recommendation ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  {recommendation.examples.map((example, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-200 hover:shadow-lg transition-all">
                      <div className="text-5xl text-center mb-2">{example}</div>
                      <p className="text-xs text-gray-600 text-center">搭配 {idx + 1}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                  <h3 className="font-bold text-gray-900 mb-3">💡 搭配技巧</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500">•</span>
                      <span>上下装颜色搭配：同色系或撞色搭配都能展现个性</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500">•</span>
                      <span>配饰点缀：一件精致配饰可以提升整体造型</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500">•</span>
                      <span>鞋子选择：根据场合选择合适的鞋款</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500">•</span>
                      <span>季节考量：根据气温和季节调整搭配</span>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✨</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">请先进行AI分析</h3>
                <p className="text-sm text-gray-500 mb-4">上传照片后，AI将为您生成搭配示例</p>
                <button
                  onClick={() => setView('analyze')}
                  className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  前往分析
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

