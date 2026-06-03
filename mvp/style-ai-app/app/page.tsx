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
}

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendation, setRecommendation] = useState<StyleRecommendation | null>(null);

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
        colors: ['#2C3E50', '#E74C3C', '#F39C12', '#27AE60']
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
        <div className="text-center pt-2 sm:pt-4 pb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-3 sm:mb-4 shadow-lg">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            AI穿搭助手
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">上传照片 · AI智能分析 · 专业穿搭推荐</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100">
            <div className="text-3xl mb-2">📸</div>
            <h3 className="font-bold text-gray-900 mb-1">智能分析</h3>
            <p className="text-sm text-gray-600">AI识别身材、肤色和个人风格</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100">
            <div className="text-3xl mb-2">👗</div>
            <h3 className="font-bold text-gray-900 mb-1">穿搭推荐</h3>
            <p className="text-sm text-gray-600">专业搭配建议，展现最佳风采</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100">
            <div className="text-3xl mb-2">🎨</div>
            <h3 className="font-bold text-gray-900 mb-1">色彩方案</h3>
            <p className="text-sm text-gray-600">个性化配色，提升整体气质</p>
          </div>
        </div>

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
                  <h3 className="font-bold text-gray-900 mb-3">👕 上装推荐</h3>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.recommendations.tops.map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-3">👖 下装推荐</h3>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.recommendations.bottoms.map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
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
      </div>
    </main>
  );
}

