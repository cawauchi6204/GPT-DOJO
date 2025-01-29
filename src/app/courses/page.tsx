'use client';

import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/navigation';

const courses = [
  {
    id: 'marketing-basic',
    title: 'マーケティング基礎講座',
    description: 'マーケティングの基本概念や4Pの考え方、顧客分析の手法など、マーケティングの基礎を学びます。',
    level: '初級',
    category: 'ビジネス',
    duration: '約4時間',
    lessons: 12,
  },
  {
    id: 'business-application',
    title: 'ビジネス活用実践',
    description: '業務効率化やマーケティングなど、ビジネスでの実践的な活用方法を学びます。',
    level: '中級',
    category: 'ビジネス',
    duration: '約6時間',
    lessons: 15,
  },
  {
    id: 'prompt-engineering',
    title: 'プロンプトエンジニアリング',
    description: 'より高度な指示の出し方や、複雑なタスクの実現方法を学びます。',
    level: '上級',
    category: '専門',
    duration: '約8時間',
    lessons: 20,
  },
];

const categories = ['すべて', '基礎', 'ビジネス', '専門', 'クリエイティブ', 'データ', '教育'];

export default function Courses() {
  const router = useRouter();

  const handleStartLearning = (courseId: string) => {
    router.push(`/courses/${courseId}`);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">コース一覧</h1>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">カテゴリー</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-full border border-gray-300 hover:border-indigo-600 hover:text-indigo-600"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-sm rounded">
                    {course.level}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="mr-4">🕒 {course.duration}</span>
                  <span>📚 {course.lessons}レッスン</span>
                </div>
                <button
                  onClick={() => handleStartLearning(course.id)}
                  className="block w-full text-center bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
                >
                  学習を始める
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}