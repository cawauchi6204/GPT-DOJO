"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { courseRepository } from "@/lib/supabase/client";
import type { Database } from "@/database.types";

type Course = Database["public"]["Tables"]["courses"]["Row"];

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseRepository.getEnrolledCourses();
        setCourses(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "データの読み込みに失敗しました");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const formatPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined) return "無料";
    if (price === 0) return "無料";
    return `¥${price.toLocaleString()}`;
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
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">マイダッシュボード</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* 進行中のコース */}
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">進行中のコース</h2>
              <Link
                href={`/courses/${course.id}`}
                className="block hover:bg-gray-50 -m-4 md:-m-6 p-4 md:p-6 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-lg flex-shrink-0">
                    <img
                      src={course.thumbnail_url || "/images/lesson-icon.png"}
                      alt="コースサムネイル"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{course.title}</h3>
                    <div className="text-sm md:text-base text-gray-600">
                      <div className="mb-2">進捗率: 10%</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#19c37d] h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}

          {/* 最近の活動 */}
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">最近の活動</h2>
            <div className="space-y-3 md:space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">{course.title}を開始</div>
                    <div className="text-sm text-gray-500">2時間前</div>
                  </div>
                </div>
              ))}

              {courses.length === 0 && (
                <div className="text-sm md:text-base text-gray-600">
                  まだ活動履歴がありません
                </div>
              )}
            </div>
          </div>

          {/* おすすめのコース */}
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">おすすめのコース</h2>
            <div className="text-sm md:text-base text-gray-600">
              新しいコースを準備中です。お楽しみに!
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}