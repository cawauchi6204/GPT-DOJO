import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { courseRepository, lessonRepository } from "@/lib/supabase/client";
// import type { Database } from "@/database.types";

// type Course = Database["public"]["Tables"]["courses"]["Row"];

// // 静的生成のためのパラメータを定義
// export async function generateStaticParams() {
//   const courses: Course[] = await courseRepository.getAllCourses();
//   return courses.map((course) => ({
//     id: course.id,
//   }));
// }

// ページコンポーネントをasync関数に変更
export default async function Course({ params }: { params: { id: string } }) {
  // データフェッチを直接実行
  const course = await courseRepository.getCourseById(params.id);
  const lessonsData = await lessonRepository.getLessonsByCourseId(params.id);
  // const lessons = lessonsData?.sort((a, b) => a.order_index - b.order_index) ?? [];

  if (!course) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-red-600">
            <h2 className="text-2xl font-bold mb-2">エラーが発生しました</h2>
            <p>コースが見つかりません</p>
          </div>
        </div>
      </Layout>
    );
  }

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
              {lessonsData.length}レッスン
            </div>
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          {/* レッスンリスト */}
          {lessonsData.map((lesson, index) => (
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

          {lessonsData.length === 0 && (
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