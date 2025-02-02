"use client";

import { useState, useEffect, useRef } from "react";
import Layout from "@/components/layout/Layout";
import SlideModal from "@/components/course/SlideModal";
import type { Slides } from "@/types/microcms";
import type { Database } from "@/database.types";

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

export default function StudyClient({ lesson, slides, error }: StudyClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);
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

  if (error) {
    return (
      <Layout hideFooter={true}>
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
    <Layout hideFooter={true}>
      <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] relative">
        {/* 左側:説明エリア */}
        <div className="w-full md:w-[30%] lg:w-[20%] bg-gray-50 flex flex-col">
          <div className="flex-1 p-4 md:p-6 overflow-hidden">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-xl md:text-2xl font-bold mb-4">
                {lesson.title}
              </h1>
              <div className="prose prose-sm md:prose">
                <p className="mb-4">{lesson.description}</p>
                <div className="mt-6 md:mt-8 p-3 md:p-4 bg-gray-100 rounded-lg">
                  <h2 className="font-semibold mb-2">見本</h2>
                  <code className="block bg-white p-2 md:p-3 rounded text-sm md:text-base">
                    {lesson.content}
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* スライドを見るボタン */}
          {slides && slides.slide.length > 0 && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="h-[50px] w-full bg-[#19c37d] text-white hover:bg-[#1a8870] transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
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
        <div className="w-full md:w-[70%] lg:w-[80%] flex-1 bg-[#1a1a1a] flex flex-col overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* メッセージ表示エリア */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4">
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
                      message.role === "system" ? "bg-[#19c37d]" : "bg-blue-500"
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
          <div className="border-t border-gray-800 bg-[#1a1a1a] p-3 md:p-4">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-[#2a2a2a] text-white rounded-lg pl-3 md:pl-4 pr-10 md:pr-12 py-2 md:py-3 resize-none border border-gray-700 focus:border-gray-500 focus:ring-0 focus:outline-none text-sm md:text-base"
                rows={1}
                placeholder="分析結果を入力してください..."
                style={{ minHeight: "44px", maxHeight: "200px" }}
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
                className="absolute right-2 bottom-1.5 text-gray-400 hover:text-white p-1 rounded transition-colors disabled:opacity-50"
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

      {/* スライドモーダル */}
      {slides && slides.slide.length > 0 && (
        <SlideModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          slides={slides}
        />
      )}
    </Layout>
  );
}