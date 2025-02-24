import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { courseRepository } from "@/lib/supabase/client";
import Image from "next/image";
import { Database } from "@/database.types";
import { redirect } from "next/navigation";

type Course = Database["public"]["Tables"]["courses"]["Row"];

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

function CourseCard({ course }: { course: Course }) {
  return (
    <Link
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
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-lg md:text-xl font-semibold">
          {course.title}
        </h2>
        <div className={`px-2 py-1 rounded text-sm ${course.is_free ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
          {course.is_free ? '無料' : `¥${course.price?.toLocaleString()}`}
        </div>
      </div>
      <p className="text-sm md:text-base text-gray-600 mb-4">
        {course.description}
      </p>
    </Link>
  );
}

function CourseSection({ title, courses }: { title: string; courses: Course[] }) {
  if (courses.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default async function Courses() {
  try {
    const { userId } = await auth();

    if (!userId) {
      redirect("/sign-in");
    }

    const courses = await fetchCourses();
    const freeCourses = courses.filter(course => course.is_free);
    const paidCourses = courses.filter(course => !course.is_free);

    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
            コース一覧
          </h1>

          <CourseSection title="無料コース" courses={freeCourses} />
          <CourseSection title="有料コース" courses={paidCourses} />

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
