import { lessonRepository } from "@/lib/supabase/client";
import { slideRepository } from "@/lib/microcms/client";
import StudyClient from "@/app/study/StudyClient";

type Props = {
  searchParams: { lessonId?: string };
};

export const revalidate = 0; // キャッシュを無効化

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
