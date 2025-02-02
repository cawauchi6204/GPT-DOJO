"use client";

import Link from "next/link";

interface NextLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  nextLesson: any;
  nextCourse: any;
}

export default function NextLessonModal({
  isOpen,
  onClose,
  nextLesson,
  nextCourse,
}: NextLessonModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">
          {nextLesson ? "次のレッスンへ進みましょう！" : "コース完了！"}
        </h2>

        {nextLesson ? (
          <>
            <p className="mb-4">次のレッスン: {nextLesson.title}</p>
            <Link
              href={`/study/${nextLesson.id}`}
              className="block w-full bg-[#19c37d] text-white text-center py-3 rounded-lg hover:bg-[#1a8870] transition-colors"
            >
              次のレッスンへ
            </Link>
          </>
        ) : nextCourse ? (
          <>
            <p className="mb-4">次のコース: {nextCourse.title}</p>
            <Link
              href={`/courses/${nextCourse.id}`}
              className="block w-full bg-[#19c37d] text-white text-center py-3 rounded-lg hover:bg-[#1a8870] transition-colors"
            >
              次のコースへ
            </Link>
          </>
        ) : (
          <p className="mb-4">
            全てのコースを完了しました！おめでとうございます！
          </p>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          閉じる
        </button>
      </div>
    </div>
  );
}
