import { Metadata } from "next";
import { lessonRepository } from "@/lib/supabase/client";
import { slideRepository } from "@/lib/microcms/client";
import StudyClient from "@/app/study/StudyClient";

type Props = {
  searchParams: { lessonId?: string };
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  if (!searchParams.lessonId) {
    return {
      title: "GPT DOJO | プロンプトページ",
      description: "プロンプト学習のプロンプトページです",
    };
  }

  try {
    const lesson = await lessonRepository.getLessonById(searchParams.lessonId);
    return {
      title: lesson?.title || "レッスン",
      description: lesson?.description || "プロンプト学習のレッスンページです",
      openGraph: {
        title: lesson?.title || "レッスン",
        description: lesson?.description || "プロンプト学習のレッスンページです",
        images: [
          {
            url: lesson?.course?.thumbnail_url || "/images/lesson-icon.png",
            width: 1200,
            height: 630,
            alt: lesson?.title || "レッスン",
          },
        ],
        type: "article",
        siteName: "GPT DOJO",
        locale: "ja_JP",
      },
      twitter: {
        card: "summary_large_image",
        title: lesson?.title || "レッスン",
        description: lesson?.description || "プロンプト学習のレッスンページです",
        images: [lesson?.course?.thumbnail_url || "/images/lesson-icon.png"],
      },
    };
  } catch (error) {
    return {
      title: "レッスン",
      description: "プロンプト学習のレッスンページです",
    };
  }
}

export default async function StudyPage({ searchParams }: Props) {
  if (!searchParams.lessonId) {
    return (
      <StudyClient
        error={{
          title: "エラーが発生しました",
          message: "レッスンIDが指定されていません",
        }}
      />
    );
  }

  try {
    const [lesson, slides] = await Promise.all([
      lessonRepository.getLessonById(searchParams.lessonId),
      slideRepository.getSlidesByLessonId(searchParams.lessonId),
    ]);

    return <StudyClient lesson={lesson} slides={slides} />;
  } catch (error) {
    return (
      <StudyClient
        error={{
          title: "エラーが発生しました",
          message:
            error instanceof Error
              ? error.message
              : "レッスンの読み込みに失敗しました",
        }}
      />
    );
  }
}
