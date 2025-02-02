"use client";

interface NextLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  nextLesson: {
    id: string;
    title: string;
    description: string | null;
  };
}

export default function NextLessonModal({
  isOpen,
  onClose,
  nextLesson,
}: NextLessonModalProps) {
  if (!isOpen) return null;

  const handleNextLesson = () => {
    window.location.href = `/study?lessonId=${nextLesson.id}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="w-[90%] max-w-lg bg-white rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-4">次のレッスン</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{nextLesson.title}</h3>
          <p className="text-gray-600">{nextLesson.description || "説明がありません"}</p>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            後で
          </button>
          <button
            onClick={handleNextLesson}
            className="px-6 py-2 bg-[#19c37d] text-white rounded-lg hover:bg-[#1a8870] transition-colors"
          >
            次のレッスンへ進む
          </button>
        </div>
      </div>
    </div>
  );
}