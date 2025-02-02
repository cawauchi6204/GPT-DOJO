import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { courseRepository } from "@/lib/supabase/client";
import type { Database } from "@/database.types";
import Image from "next/image";

export async function generateStaticProps() {
  try {
    const courses = await courseRepository.getAllCourses();
    return { courses: courses || [] };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return { courses: [] };
  }
}

export default async function Courses() {
  const { courses } = await generateStaticProps();

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
              <div className="flex items-center justify-between">
                <span className="text-sm md:text-base text-gray-500">
                  {course.lesson_count}レッスン
                </span>
              </div>
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
}
