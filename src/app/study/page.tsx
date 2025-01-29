"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import SlideModal from "@/components/course/SlideModal";
import { lessonRepository, progressRepository } from "@/lib/supabase/client";
import type { Database } from "@/database.types";

type Lesson = Database["public"]["Tables"]["lessons"]["Row"] & {
  course?: Database["public"]["Tables"]["courses"]["Row"] | null;
  slides?: Database["public"]["Tables"]["slides"]["Row"][];
};

export default function Study({
  searchParams,
}: {
  searchParams: { lessonId?: string };
}) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      if (!searchParams.lessonId) {
        setError("レッスンIDが指定されていません");
        setIsLoading(false);
        return;
      }

      try {
        const data = await lessonRepository.getLessonById(
          searchParams.lessonId
        );
        setLesson(data as Lesson);
        if (data?.course_id) {
          // ユーザーの進捗を更新（実際の実装ではユーザーIDを使用）
          await progressRepository.updateProgress(
            "dummy-user-id",
            data.course_id,
            data.id,
            {
              status: "in_progress",
              progress_percentage: 0,
            }
          );
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "レッスンの読み込みに失敗しました"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchLesson();
  }, [searchParams.lessonId]);

  const handleSubmit = async () => {
    if (!userInput.trim() || !lesson?.course_id) return;

    // ユーザーの入力をメッセージリストに追加
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);

    // ChatGPTのような応答をシミュレート
    setTimeout(() => {
      let response = "";
      if (
        userInput.toLowerCase().includes("segmentation") &&
        userInput.toLowerCase().includes("targeting") &&
        userInput.toLowerCase().includes("positioning")
      ) {
        response =
          "よく書けています！STP分析の3つの要素を正しく理解できていますね。次のステップに進みましょう。";

        // 進捗を更新
        if (lesson.course_id) {
          progressRepository.updateProgress(
            "dummy-user-id",
            lesson.course_id,
            lesson.id,
            {
              status: "in_progress",
              progress_percentage: 50,
            }
          );
        }
      } else {
        response =
          "STP分析の3つの要素（Segmentation、Targeting、Positioning）について考えてみましょう。それぞれの要素が市場分析でどのような役割を果たすか、整理してみてください。";
      }
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response,
        },
      ]);
    }, 500);

    setUserInput("");
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    );
  }

  if (error || !lesson) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-red-600">
            <h2 className="text-2xl font-bold mb-2">エラーが発生しました</h2>
            <p>{error || "レッスンが見つかりません"}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex h-[calc(100vh-64px)]">
        {/* 左側：説明エリア */}
        <div className="w-1/2 bg-gray-50 p-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
            <div className="prose">
              <p className="mb-4">{lesson.description}</p>
              <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                <h2 className="font-semibold mb-2">見本</h2>
                <code className="block bg-white p-3 rounded">
                  {lesson.content}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* 右側：ChatGPTスタイルのインターフェース */}
        <div className="w-1/2 bg-[#343541] flex flex-col">
          {/* メッセージ表示エリア */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "assistant" ? "bg-[#444654]" : ""
                } p-4 rounded`}
              >
                <div className={`flex-1 text-white whitespace-pre-wrap`}>
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          {/* 入力エリア */}
          <div className="border-t border-gray-600 p-4">
            <div className="max-w-3xl mx-auto flex gap-4">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 bg-[#40414f] text-white rounded-lg p-3 resize-none"
                rows={3}
                placeholder="分析結果を入力してください..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              <button
                onClick={handleSubmit}
                className="bg-[#19c37d] text-white px-4 py-2 rounded-lg hover:bg-[#1a8870] transition-colors"
              >
                送信
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* スライドモーダル */}
      {lesson.slides && (
        <SlideModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          slides={lesson.slides.map((slide) => ({
            title: slide.title,
            content: slide.content || "",
            code: slide.code_example || undefined,
            preview: slide.preview_content || undefined,
            isLastSlide: slide.order_index === (lesson.slides?.length || 0) - 1,
          }))}
        />
      )}
    </Layout>
  );
}
