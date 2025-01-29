'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/navigation';
import { courseRepository } from '@/lib/supabase/client';
import type { Database } from '@/database.types';

type Course = Database['public']['Tables']['courses']['Row'] & {
  category?: Database['public']['Tables']['course_categories']['Row'] | null;
};

const categories = ['すべて', 'プログラミング基礎', 'フロントエンド開発', 'バックエンド開発'];
const levels = ['すべて', 'beginner', 'intermediate', 'advanced'];

const levelDisplayNames = {
  beginner: '初級',
  intermediate: '中級',
  advanced: '上級'
};

export default function Courses() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [selectedLevel, setSelectedLevel] = useState('すべて');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseRepository.getAllCourses();
        setCourses(data as Course[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : '課題の読み込みに失敗しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleStartLearning = (courseId: string) => {
    router.push(`/courses/${courseId}`);
  };

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'すべて' || course.category?.name === selectedCategory;
    const matchesLevel = selectedLevel === 'すべて' || course.level === selectedLevel;
    return matchesCategory && matchesLevel;
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-red-600">
            <h2 className="text-2xl font-bold mb-2">エラーが発生しました</h2>
            <p>{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

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
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedCategory === category
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-gray-300 hover:border-indigo-600 hover:text-indigo-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">レベル</h2>
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedLevel === level
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-gray-300 hover:border-indigo-600 hover:text-indigo-600'
                  }`}
                >
                  {level === 'すべて' ? level : levelDisplayNames[level as keyof typeof levelDisplayNames]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-sm rounded">
                    {levelDisplayNames[course.level as keyof typeof levelDisplayNames]}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{course.subtitle}</p>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="mr-4">🕒 {Math.floor(course.duration / 60)}時間 {course.duration % 60}分</span>
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