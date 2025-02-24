"use client";

import { useState, useEffect, useRef } from "react";
import Layout from "@/components/layout/Layout";
import SlideModal from "@/components/course/SlideModal";
import NextLessonModal from "@/components/course/NextLessonModal";
import type { Slides } from "@/types/microcms";
import type { Database } from "@/database.types";
import { lessonRepository } from "@/lib/supabase/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import Image from "next/image";
import ReactConfetti from "react-confetti";

type Message = {
  id: string;
  role: "user" | "system";
  content: string;
};

type Lesson = Database["public"]["Tables"]["lessons"]["Row"] & {
  course?: Database["public"]["Tables"]["courses"]["Row"] | null;
};

interface StudyClientProps {
  lesson?: Lesson;
  slides?: Slides;
  error?: {
    title: string;
    message: string;
  };
}

export default function StudyClient({
  lesson,
  slides,
  error,
}: StudyClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isNextLessonModalOpen, setIsNextLessonModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [nextLesson, setNextLesson] = useState<Lesson | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (lesson) {
      lessonRepository.getNextLesson(lesson.id).then((nextLesson) => {
        setNextLesson(nextLesson);
      });
    }
  }, [lesson]);

  // エスケープキーでスライドを閉じる
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  // 花吹雪を3秒後に消すための useEffect
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsStreaming(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messages.concat(userMessage).map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      if (!response.ok) throw new Error("API request failed");
      if (!response.body) throw new Error("Response body is null");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      const assistantMessageId = Date.now().toString();
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: "system",
          content: "",
        },
      ]);

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const text = decoder.decode(value);
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: msg.content + text }
                : msg
            )
          );
          scrollToBottom();
        }
      } finally {
        reader.releaseLock();
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "system",
          content: "エラーが発生しました。もう一度お試しください。",
        },
      ]);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleSlideModalClose = () => {
    setIsModalOpen(false);
  };

  if (error) {
    return (
      <Layout hideHeader={true} hideFooter={true}>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-red-600">
            <h2 className="text-2xl font-bold mb-2">{error.title}</h2>
            <p>{error.message}</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!lesson) {
    return null;
  }

  return (
    <Layout hideHeader={true} hideFooter={true}>
      {showConfetti && (
        <ReactConfetti
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1000,
          }}
          numberOfPieces={2200}
          recycle={false}
          colors={["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"]}
          initialVelocityX={20}
          initialVelocityY={10}
          gravity={0.3}
          wind={0}
          confettiSource={{
            x: 0,
            y: 0,
            w: window.innerWidth,
            h: 0,
          }}
        />
      )}
      <div className="flex flex-col h-screen overflow-hidden">
        {/* パンくずリスト */}
        <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link
              href="/"
              className="mr-2 flex items-center text-xl md:text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
            >
              <span>GPT Dojo</span>
              <Image
                src="/images/dog_mono.png"
                alt="GPT Dojo"
                width={50}
                height={50}
                className="ml-2 mb-2"
              />
            </Link>
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-gray-600">{lesson.course?.title}</span>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="text-gray-900 font-medium">{lesson.title}</span>
            </div>
          </div>
        </div>
        {/* メインコンテンツ */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* 左側:説明エリア */}
          <div className="h-[40%] md:h-auto w-full md:w-[30%] bg-gray-50 flex flex-col overflow-y-auto">
            <div className="flex-1 p-4 md:p-6">
              <div className="max-w-2xl mx-auto">
                <div className="prose prose-sm md:prose">
                  <div className="bg-white p-2 md:p-3 rounded">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      className="text-sm md:text-base"
                      components={{
                        p: ({ ...props }) => (
                          <p className="mb-4 last:mb-0" {...props} />
                        ),
                        h1: ({ ...props }) => (
                          <h1 className="text-2xl font-bold mb-4" {...props} />
                        ),
                        h2: ({ ...props }) => (
                          <h2 className="text-xl font-bold mb-3" {...props} />
                        ),
                        h3: ({ ...props }) => (
                          <h3 className="text-lg font-bold mb-2" {...props} />
                        ),
                        ul: ({ ...props }) => (
                          <ul className="list-disc pl-6 mb-4" {...props} />
                        ),
                        ol: ({ ...props }) => (
                          <ol className="list-decimal pl-6 mb-4" {...props} />
                        ),
                        li: ({ ...props }) => (
                          <li className="mb-1" {...props} />
                        ),
                        code: ({ children, ...props }) => {
                          const handleCopy = (text: string) => {
                            navigator.clipboard
                              .writeText(text.trimEnd())
                              .then(() => {
                                // オプション: コピー成功時のフィードバックを実装できます
                              });
                          };

                          return (
                            <div className="relative">
                              <code
                                className="block bg-gray-100 p-4 rounded-lg mb-4 whitespace-pre-wrap break-words"
                                {...props}
                              >
                                {children}
                              </code>
                              <button
                                onClick={() => handleCopy(String(children))}
                                className="absolute top-2 right-2 p-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                                aria-label="コードをコピー"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-gray-600"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                                  />
                                </svg>
                              </button>
                            </div>
                          );
                        },
                        pre: ({ ...props }) => (
                          <pre
                            className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto break-all"
                            {...props}
                          />
                        ),
                        blockquote: ({ ...props }) => (
                          <blockquote
                            className="border-l-4 border-gray-300 pl-4 italic mb-4"
                            {...props}
                          />
                        ),
                      }}
                    >
                      {lesson.content || ""}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* できた!ボタン */}
                <button
                  className="w-full mt-6 bg-[#19c37d] text-white py-3 rounded-lg hover:bg-[#1a8870] transition-colors font-bold"
                  onClick={() => {
                    setShowConfetti(true);
                    setIsModalOpen(false);
                    if (nextLesson) {
                      setIsNextLessonModalOpen(true);
                    }
                  }}
                >
                  できた!
                </button>
              </div>
            </div>

            {/* スライドを見るボタン */}
            {slides && slides.slide.length > 0 && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="h-[50px] w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 sticky bottom-0"
              >
                スライドを見る
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-5 md:w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* 右側:ChatGPTスタイルのインターフェース */}
          <div className="h-[60%] md:h-auto w-full md:w-[70%] flex-1 bg-[#1a1a1a] flex flex-col overflow-hidden">
            {/* メッセージ表示エリア */}
            <div className="flex-[2] md:flex-1 overflow-y-auto p-3 md:p-4">
              <div className="max-w-3xl mx-auto space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-2 ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* アイコン */}
                    <div
                      className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === "system"
                          ? "bg-[#19c37d]"
                          : "bg-blue-500"
                      }`}
                    >
                      <span className="text-sm md:text-base">
                        {message.role === "system" ? "AI" : "U"}
                      </span>
                    </div>

                    {/* メッセージ */}
                    <div
                      className={`max-w-[80%] ${
                        message.role === "user" ? "bg-blue-500" : "bg-[#2a2a2a]"
                      } rounded-2xl px-3 md:px-4 py-2 text-white relative`}
                    >
                      {/* 吹き出しの三角形 */}
                      <div
                        className={`absolute top-3 w-2 h-2 transform rotate-45 ${
                          message.role === "user"
                            ? "right-[-4px] bg-blue-500"
                            : "left-[-4px] bg-[#2a2a2a]"
                        }`}
                      ></div>
                      <div className="whitespace-pre-wrap text-sm md:text-base">
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* 入力エリア */}
            <div className="flex-1 md:flex-none border-t border-gray-800 bg-[#1a1a1a] p-3 md:p-4">
              <form
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto relative"
              >
                <textarea
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    // テキストエリアの高さを動的に調整
                    e.target.style.height = "auto";
                    const newHeight = Math.min(e.target.scrollHeight, 132); // 132px = 2行(44px) + 3行分(88px)
                    e.target.style.height = `${Math.max(44, newHeight)}px`; // 最小2行(44px)
                  }}
                  className="w-full bg-[#2a2a2a] text-white rounded-lg pl-3 md:pl-4 pr-10 md:pr-12 py-2 md:py-3 resize-none border border-gray-700 focus:border-gray-500 focus:ring-0 focus:outline-none text-base"
                  rows={2}
                  placeholder="GPT DOJOが世の中で流行る方法を考えてください"
                  style={{
                    height: "44px", // 初期値は2行分
                    maxHeight: "132px", // 最大5行分
                    fontSize: "16px",
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (e.shiftKey) {
                        if (!input.trim() || isStreaming) return;
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }
                  }}
                  disabled={isStreaming}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1 rounded transition-colors disabled:opacity-50"
                  disabled={!input.trim() || isStreaming}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 20 20"
                    className="h-4 w-4 md:h-5 md:w-5 rotate-90"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                </button>
              </form>
              <div className="max-w-3xl mx-auto mt-2 text-xs text-center text-gray-500">
                Shift + Enterキーで送信 / Enterで改行
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* スライドモーダル */}
      {slides && slides.slide.length > 0 && (
        <SlideModal
          isOpen={isModalOpen}
          onClose={handleSlideModalClose}
          slides={slides}
        />
      )}

      {/* 次のレッスンモーダル */}
      {nextLesson && (
        <NextLessonModal
          isOpen={isNextLessonModalOpen}
          onClose={() => setIsNextLessonModalOpen(false)}
          nextLesson={nextLesson}
        />
      )}
    </Layout>
  );
}
