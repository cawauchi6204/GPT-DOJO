"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { courseRepository } from "@/lib/supabase/client";
import type { Database } from "@/database.types";

type Course = Database["public"]["Tables"]["courses"]["Row"];

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseRepository.getAllCourses();
        setCourses(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "コースの読み込みに失敗しました");
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
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">コース一覧</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 md:p-6"
            >
              <div className="aspect-video bg-gray-100 rounded-lg mb-4">
                <img
                  src={course.thumbnail_url || "/images/lesson-icon.png"}
                  alt={`${course.title}のサムネイル`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h2 className="text-lg md:text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                {course.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm md:text-base text-gray-500">
                  {course.lesson_count || 0}レッスン
                </span>
                <span className="text-sm md:text-base text-[#19c37d] font-medium">
                  {formatPrice(course.price)}
                </span>
              </div>
            </Link>
          ))}

          {courses.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6 opacity-50">
              <div className="aspect-video bg-gray-100 rounded-lg mb-4"></div>
              <h2 className="text-lg md:text-xl font-semibold mb-2">コースがありません</h2>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                新しいコースを準備中です。お楽しみに!
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}