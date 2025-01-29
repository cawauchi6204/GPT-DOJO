'use client';

import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// ダミーデータ
const courseDetails = {
  id: 'marketing-basic',
  title: 'マーケティング',
  subtitle: 'ビジネスの基礎を学ぶ',
  description: 'マーケティングの基礎から実践的な戦略立案まで、ビジネスで必要な知識とスキルを身につけます。',
  lessons: [
    {
      id: 'basic',
      type: '学習レッスン',
      title: 'マーケティング 初級編',
      description: 'マーケティングの基本概念や4Pの考え方、顧客分析の手法など、マーケティングの基礎を学びます。実際のビジネスケースを交えながら、実践的な知識を身につけていきましょう。',
      duration: '2h30m',
      progress: 0,
    },
    {
      id: 'strategy',
      type: '学習レッスン',
      title: 'マーケティング戦略立案',
      description: '市場分析、競合分析、STP戦略の立て方など、実践的なマーケティング戦略の立案方法を学びます。実際のビジネスシーンで活用できるフレームワークやツールの使い方も習得します。',
      duration: '3h45m',
      progress: 0,
    },
    {
      id: 'digital',
      type: '学習レッスン',
      title: 'デジタルマーケティング基礎',
      description: 'SNSマーケティング、コンテンツマーケティング、SEOなど、現代のビジネスに不可欠なデジタルマーケティングの基礎を学びます。',
      duration: '4h00m',
      progress: 0,
    },
    {
      id: 'exercise',
      type: '道場レッスン',
      title: 'マーケティング戦略演習',
      description: '学んだマーケティングの知識を活かして、実際のビジネスケースに取り組みます。市場分析から戦略立案まで、実践的な演習に挑戦しましょう。',
      duration: '3h00m',
      progress: 0,
      isExercise: true,
    }
  ]
};

export default function CourseDetail() {
  const router = useRouter();

  const handleStartLesson = () => {
    router.push('/study');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* コースヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">{courseDetails.title}</h1>
          <p className="text-xl text-gray-600">{courseDetails.subtitle}</p>
        </div>

        {/* レッスン一覧 */}
        <div className="space-y-8">
          {courseDetails.lessons.map((lesson) => (
            <div key={lesson.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex">
                {/* 左側：アイコンと進捗 */}
                <div className="w-64 bg-[#e6f7f5] p-8 flex flex-col items-center justify-center">
                  <div className="relative w-32 h-32 mb-4">
                    <div className="w-full h-full rounded-full border-4 border-[#4bc3c3] flex items-center justify-center">
                      <Image
                        src="/lesson-icon.png"
                        alt="Lesson icon"
                        width={80}
                        height={80}
                        className="opacity-50"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-500">{lesson.progress}%</span>
                    </div>
                  </div>
                </div>

                {/* 右側：レッスン情報 */}
                <div className="flex-1 p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                        lesson.isExercise 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-[#e6f7f5] text-[#4bc3c3]'
                      } mb-2`}>
                        {lesson.type}
                      </span>
                      <h2 className="text-2xl font-bold">{lesson.title}</h2>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <span className="mr-2">🕒</span>
                      <span>{lesson.duration}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">{lesson.description}</p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={handleStartLesson}
                      className="bg-[#4bc3c3] text-white px-6 py-2 rounded hover:bg-[#3da3a3] transition-colors"
                    >
                      レッスンを始める
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      レッスン詳細へ →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* チャレンジセクション */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">チャレンジしてみよう！</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* チャレンジカード */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">道場レッスン</h3>
                <p className="text-gray-600 mb-4">
                  学んだマーケティングの知識を活かして、実際のビジネスケースに挑戦してみましょう。
                </p>
                <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors">
                  チャレンジする
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}