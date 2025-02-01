"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import SlideModal from "@/components/course/SlideModal";
import { lessonRepository } from "@/lib/supabase/client";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        console.log("🚀 ~ fetchLesson ~ data:", data)
        // スライドを order_index でソート
        if (data?.slides) {
          data.slides = data.slides.sort(
            (a, b) => a.order_index - b.order_index
          );
        }
        setLesson(data as Lesson);
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
    if (!userInput.trim()) return;

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
          "よく書けています!STP分析の3つの要素を正しく理解できていますね。次のステップに進みましょう。";
      } else {
        response =
          "STP分析の3つの要素(Segmentation、Targeting、Positioning)について考えてみましょう。それぞれの要素が市場分析でどのような役割を果たすか、整理してみてください。";
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
      <Layout hideFooter={true}>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    );
  }

  if (error || !lesson) {
    return (
      <Layout hideFooter={true}>
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
    <Layout hideFooter={true}>
      <div className="flex h-[calc(100vh-64px)] relative">
        {/* 左側:説明エリア */}
        <div className="w-1/2 bg-gray-50 p-6 overflow-hidden">
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

        {/* 右側:ChatGPTスタイルのインターフェース */}
        <div className="w-1/2 bg-[#343541] flex flex-col">
          {/* メッセージ表示エリア */}
          <div className="flex-1 overflow-hidden p-4 space-y-4">
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

        {/* スライドを見るボタン */}
        {lesson.slides && lesson.slides.length > 0 && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#19c37d] text-white px-6 py-2 rounded-full shadow-lg hover:bg-[#1a8870] transition-colors flex items-center gap-2"
          >
            スライドを見る
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      {/* スライドモーダル */}
      {lesson.slides && lesson.slides.length > 0 && (
        <SlideModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          slides={lesson.slides.map((slide) => ({
            title: slide.title,
            content: slide.content || "",
            code: slide.code_example || undefined,
            preview: slide.preview_content || undefined,
            isLastSlide: false,
          }))}
        />
      )}
    </Layout>
  );
}
