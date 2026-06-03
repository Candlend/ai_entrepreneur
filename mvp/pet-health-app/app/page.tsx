'use client';

import { useState } from 'react';

interface HealthRecord {
  id: string;
  petName: string;
  symptoms: string;
  aiAnalysis: string;
  recommendations: string[];
  timestamp: Date;
}

export default function Home() {
  const [petName, setPetName] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);

  const handleAnalyze = async () => {
    if (!petName || !symptoms) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      const newRecord: HealthRecord = {
        id: Date.now().toString(),
        petName,
        symptoms,
        aiAnalysis: generateMockAnalysis(symptoms),
        recommendations: generateMockRecommendations(symptoms),
        timestamp: new Date()
      };

      setHealthRecords([newRecord, ...healthRecords]);
      setPetName('');
      setSymptoms('');
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        <div className="text-center pt-2 sm:pt-4 pb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full mb-3 sm:mb-4 shadow-lg">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            宠物健康助手
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">AI智能症状分析 · 专业健康建议 · 医院推荐</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100">
            <div className="text-3xl mb-2">🏥</div>
            <h3 className="font-bold text-gray-900 mb-1">AI症状分析</h3>
            <p className="text-sm text-gray-600">智能分析宠物症状，提供初步健康评估</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100">
            <div className="text-3xl mb-2">💊</div>
            <h3 className="font-bold text-gray-900 mb-1">健康建议</h3>
            <p className="text-sm text-gray-600">根据症状提供专业护理和就医建议</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-100">
            <div className="text-3xl mb-2">📍</div>
            <h3 className="font-bold text-gray-900 mb-1">医院推荐</h3>
            <p className="text-sm text-gray-600">推荐附近专业宠物医院和医生</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">🩺 健康咨询</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">宠物名字</label>
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="例如：旺财"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">症状描述</label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="请详细描述宠物的症状，例如：食欲不振、精神萎靡、呕吐等..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !petName || !symptoms}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
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
        </div>

        {healthRecords.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📋 健康记录</h2>

            <div className="space-y-4">
              {healthRecords.map((record) => (
                <div key={record.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">🐾 {record.petName}</h3>
                      <p className="text-xs text-gray-500">{record.timestamp.toLocaleString('zh-CN')}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">症状：</p>
                    <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">{record.symptoms}</p>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">AI分析：</p>
                    <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">{record.aiAnalysis}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">建议：</p>
                    <ul className="space-y-1">
                      {record.recommendations.map((rec, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {healthRecords.length === 0 && (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-md p-8 sm:p-12 border border-gray-100 text-center">
            <div className="text-6xl sm:text-7xl mb-4">🐶</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">还没有健康记录</h3>
            <p className="text-sm sm:text-base text-gray-500">输入宠物症状，AI会为您提供专业分析和建议</p>
          </div>
        )}
      </div>
    </main>
  );
}

function generateMockAnalysis(symptoms: string): string {
  const analyses = [
    '根据您描述的症状，宠物可能出现了消化系统不适。这种情况通常是由于饮食不当、食物过敏或轻微的肠胃炎引起的。',
    '从症状来看，宠物可能处于轻度脱水状态，建议密切观察并确保充足的水分摄入。',
    '这些症状可能提示呼吸道感染的早期迹象，建议保持环境温暖干燥，避免剧烈运动。',
    '宠物表现出的症状可能与压力或环境变化有关，建议给予更多陪伴和安抚。'
  ];
  return analyses[Math.floor(Math.random() * analyses.length)];
}

function generateMockRecommendations(symptoms: string): string[] {
  return [
    '观察24小时，记录症状变化',
    '保持充足的水分供应',
    '暂时改为清淡易消化的食物',
    '如症状持续或加重，请立即就医',
    '保持环境清洁舒适'
  ];
}
