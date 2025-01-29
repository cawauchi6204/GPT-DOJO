'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { courseRepository } from '@/lib/supabase/client';
import type { Database } from '@/database.types';

type Course = Database['public']['Tables']['courses']['Row'] & {
  category?: Database['public']['Tables']['course_categories']['Row'] | null;
  lessons?: (Database['public']['Tables']['lessons']['Row'] & {
    slides?: Database['public']['Tables']['slides']['Row'][];
  })[];
};

export default function CourseDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const data = await courseRepository.getCourseById(params.id);
        setCourse(data as Course);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'コースの読み込みに失敗しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseDetails();
  }, [params.id]);

  const handleStartLesson = (lessonId: string) => {
    if (!lessonId) return;
    router.push(`/study?lessonId=${lessonId}`);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    );
  }

  if (error || !course) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-red-600">
            <h2 className="text-2xl font-bold mb-2">エラーが発生しました</h2>
            <p>{error || 'コースが見つかりません'}</p>
          </div>
        </div>
      </Layout>
    );
  }

  // レッスンを順序で並び替え
  const sortedLessons = course.lessons 
    ? [...course.lessons].sort((a, b) => a.order_index - b.order_index)
    : [];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* コースヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
          <p className="text-xl text-gray-600">{course.subtitle}</p>
        </div>

        {/* レッスン一覧 */}
        <div className="space-y-8">
          {sortedLessons.map((lesson) => (
            <div key={lesson.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex">
                {/* 左側：アイコンと進捗 */}
                <div className="w-64 bg-[#e6f7f5] p-8 flex flex-col items-center justify-center">
                  <div className="relative w-32 h-32 mb-4">
                    <div className="w-full h-full rounded-full border-4 border-[#4bc3c3] flex items-center justify-center">
                      <Image
                        src="/images/lesson-icon.png"
                        alt="Lesson icon"
                        width={80}
                        height={80}
                        className="opacity-50"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-500">0%</span>
                    </div>
                  </div>
                </div>

                {/* 右側：レッスン情報 */}
                <div className="flex-1 p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                        lesson.type === 'exercise'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-[#e6f7f5] text-[#4bc3c3]'
                      } mb-2`}>
                        {lesson.type === 'exercise' ? '道場レッスン' : '学習レッスン'}
                      </span>
                      <h2 className="text-2xl font-bold">{lesson.title}</h2>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <span className="mr-2">🕒</span>
                      <span>{lesson.duration}分</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">{lesson.description}</p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleStartLesson(lesson.id)}
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
                  学んだ内容を活かして、実践的な課題に挑戦してみましょう。
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