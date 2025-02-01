"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { courseRepository, lessonRepository } from "@/lib/supabase/client";
import type { Database } from "@/database.types";

type Course = Database["public"]["Tables"]["courses"]["Row"];
type Lesson = Database["public"]["Tables"]["lessons"]["Row"];

interface CoursePageProps {
  params: {
    id: string;
  };
}

export default function Course({ params }: CoursePageProps) {
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseAndLessons = async () => {
      try {
        // コース情報を取得
        const courseData = await courseRepository.getCourseById(params.id);
        if (!courseData) {
          setError("コースが見つかりません");
          return;
        }
        setCourse(courseData);

        // レッスン一覧を取得
        const lessonsData = await lessonRepository.getLessonsByCourseId(params.id);
        if (lessonsData) {
          // order_indexでソート
          const sortedLessons = lessonsData.sort((a, b) => a.order_index - b.order_index);
          setLessons(sortedLessons);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "データの読み込みに失敗しました");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseAndLessons();
  }, [params.id]);

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
            <p>{error || "コースが見つかりません"}</p>
          </div>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined) return "無料";
    if (price === 0) return "無料";
    return `¥${price.toLocaleString()}`;
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">
        <div className="mb-6 md:mb-12">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">{course.title}</h1>
          <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
            {course.description}
          </p>
          <div className="flex flex-wrap gap-4 text-sm md:text-base">
            <div className="bg-gray-100 px-3 py-1 rounded-full">
              {lessons.length}レッスン
            </div>
            <div className="bg-[#19c37d] text-white px-3 py-1 rounded-full">
              {formatPrice(course.price)}
            </div>
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          {/* レッスンリスト */}
          {lessons.map((lesson, index) => (
            <div key={lesson.id} className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <Link
                href={`/study?lessonId=${lesson.id}`}
                className="flex items-start gap-4 hover:bg-gray-50 -m-4 md:-m-6 p-4 md:p-6 transition-colors"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#19c37d] text-white rounded-full flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{lesson.title}</h3>
                  <p className="text-sm md:text-base text-gray-600">
                    {lesson.description}
                  </p>
                </div>
              </Link>
            </div>
          ))}

          {lessons.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6 opacity-50">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-400 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">レッスンがありません</h3>
                  <p className="text-sm md:text-base text-gray-600">
                    新しいレッスンを準備中です。お楽しみに!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}