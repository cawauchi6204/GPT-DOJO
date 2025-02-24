import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { lessonRepository } from "@/lib/supabase/client";
import { slideRepository } from "@/lib/microcms/client";
import StudyClient from "@/app/study/StudyClient";

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  if (!searchParams.lessonId) {
    return {
      title: "プロンプトページ",
      description: "プロンプト学習のプロンプトページです",
    };
  }

  try {
    const lesson = await lessonRepository.getLessonById(searchParams.lessonId);
    return {
      title: lesson?.title || "レッスン",
      description: lesson?.description || "プロンプト学習のレッスンページです",
    };
  } catch {
    return {
      title: "プロンプトページ",
      description: "プロンプト学習のプロンプトページです",
    };
  }
}

type Props = {
  searchParams: { lessonId?: string };
};

export const revalidate = 0; // キャッシュを無効化
export default async function StudyPage({ searchParams }: Props) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return (
        <StudyClient
          error={{
            title: "認証エラー",
            message: "このページにアクセスするにはログインが必要です",
          }}
        />
      );
    }

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
              : "ページの読み込みに失敗しました",
        }}
      />
    );
  }
}
