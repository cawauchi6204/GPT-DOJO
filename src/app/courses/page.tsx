import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { courseRepository } from "@/lib/supabase/client";
import Image from "next/image";

export const metadata: Metadata = {
  title: "コース一覧",
  description: "GPT DOJOで提供している全てのコースの一覧です。プロンプトエンジニアリングを学んで、AIを味方につけましょう。",
};

async function fetchCourses() {
  try {
    const courses = await courseRepository.getAllCourses();
    return courses || [];
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

export default async function Courses() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return (
        <Layout>
          <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h1 className="text-red-800 font-semibold mb-2">認証エラー</h1>
              <p className="text-red-600">このページにアクセスするにはログインが必要です</p>
            </div>
          </div>
        </Layout>
      );
    }

    const courses = await fetchCourses();

    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
            コース一覧
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 md:p-6"
              >
                <div className="aspect-video rounded-lg mb-4 relative">
                  <Image
                    src={course.thumbnail_url || "/images/lesson-icon.png"}
                    alt={`${course.title}のサムネイル`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h2 className="text-lg md:text-xl font-semibold mb-2">
                  {course.title}
                </h2>
                <p className="text-sm md:text-base text-gray-600 mb-4">
                  {course.description}
                </p>
              </Link>
            ))}

            {courses.length === 0 && (
              <div className="bg-white rounded-lg shadow-md p-4 md:p-6 opacity-50">
                <div className="aspect-video bg-gray-100 rounded-lg mb-4"></div>
                <h2 className="text-lg md:text-xl font-semibold mb-2">
                  コースがありません
                </h2>
                <p className="text-sm md:text-base text-gray-600 mb-4">
                  新しいコースを準備中です。お楽しみに!
                </p>
              </div>
            )}
          </div>
        </div>
      </Layout>
    );
  } catch (error) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h1 className="text-red-800 font-semibold mb-2">エラーが発生しました</h1>
            <p className="text-red-600">
              {error instanceof Error ? error.message : "ページの読み込みに失敗しました"}
            </p>
          </div>
        </div>
      </Layout>
    );
  }
}
