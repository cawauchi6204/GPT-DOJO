// import Layout from "@/components/layout/Layout";
import Link from "next/link";
import Image from "next/image";
import { courseRepository } from "@/lib/supabase/client";

// サーバーコンポーネントとしてデータフェッチを行う
export default async function Home() {
  // // 認証済みの場合はコース一覧にリダイレクト
  // データフェッチ
  const featuredCourses = await courseRepository.getFeaturedCourses();

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* ヒーローセクション */}
      <div className="py-12 md:py-20">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            今日から生成AIを味方にしよう
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto">
            GPT
            Dojoは、ChatGPTの使い方をハンズオン形式で学べるオンライン学習プラットフォームです。
            初心者から上級者まで、ステップバイステップで学習できます。
          </p>
          <p className="text-lg md:text-xl text-[#19c37d] font-semibold mb-2">
            今なら完全無料
          </p>
          <Link
            href="/study?lessonId=6bd27ae7-ac04-46ce-a8ed-61e02a951040"
            className="inline-block bg-[#19c37d] text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-lg md:text-xl font-semibold hover:bg-[#1a8870] transition-colors"
          >
            体験してみる
          </Link>
        </div>
      </div>

      {/* おすすめコース */}
      {featuredCourses && featuredCourses.length > 0 && (
        <div className="py-12 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            おすすめのコース
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featuredCourses.map((course) => (
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
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="text-[#19c37d] font-medium">今すぐ始める →</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 特徴セクション */}
      <div className="py-12 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
          GPT Dojoの特徴
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#19c37d] text-white rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-6 h-6 md:w-8 md:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-center mb-2">
              ステップバイステップ
            </h3>
            <p className="text-gray-600 text-center">
              初心者でも分かりやすく、順を追って学習できます。
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#19c37d] text-white rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-6 h-6 md:w-8 md:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-center mb-2">
              インタラクティブ
            </h3>
            <p className="text-gray-600 text-center">
              実践的な演習で、実際に使いながら学べます。
            </p>
          </div>

          {/* <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#19c37d] text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-center mb-2">
                コミュニティ
              </h3>
              <p className="text-gray-600 text-center">
                他の学習者と交流しながら、知識を深められます。
              </p>
            </div> */}
        </div>
      </div>

      {/* CTAセクション */}
      <div className="py-12 md:py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
          さあ、始めましょう
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto">
          今だけ完全無料のコースで、生成AIの学習を始めることができます。
        </p>
        <Link
          href="/study?lessonId=6bd27ae7-ac04-46ce-a8ed-61e02a951040"
          className="inline-block bg-[#19c37d] text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-lg md:text-xl font-semibold hover:bg-[#1a8870] transition-colors"
        >
          体験してみる
        </Link>
      </div>
    </div>
  );
}
