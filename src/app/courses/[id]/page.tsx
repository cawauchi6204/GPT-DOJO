import { courseRepository, lessonRepository } from "@/lib/supabase/client";
import Layout from "@/components/layout/Layout";
import type { Database } from "@/database.types";

type Props = {
  params: { id: string };
};

type Lesson = Database["public"]["Tables"]["lessons"]["Row"];

export default async function CoursePage({ params }: Props) {
  const [course, lessons] = await Promise.all([
    courseRepository.getCourseById(params.id),
    lessonRepository.getLessonsByCourseId(params.id),
  ]);

  if (!course) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                コースが見つかりません
              </h1>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* コースヘッダー */}
            <div className="relative h-64 bg-gray-200">
              {course.thumbnail_url && (
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                <p className="text-lg">{course.description}</p>
              </div>
            </div>

            {/* コース情報 */}
            <div className="p-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">コース概要</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">難易度</div>
                    <div className="font-medium">{course.level}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">レッスン数</div>
                    <div className="font-medium">{lessons.length} レッスン</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">所要時間</div>
                    <div className="font-medium">{course.duration} 時間</div>
                  </div>
                </div>
              </div>

              {/* レッスン一覧 */}
              <div>
                <h2 className="text-2xl font-bold mb-4">レッスン一覧</h2>
                <div className="space-y-4">
                  {lessons.map((lesson: Lesson, index: number) => (
                    <a
                      key={lesson.id}
                      href={`/study?lessonId=${lesson.id}`}
                      className="block bg-gray-50 hover:bg-gray-100 transition-colors p-4 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-[#19c37d] text-white rounded-full flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium">{lesson.title}</h3>
                          <p className="text-sm text-gray-500">
                            {lesson.description}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}