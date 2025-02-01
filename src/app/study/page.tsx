"use client";

import { useState, useEffect, useRef } from "react";
import Layout from "@/components/layout/Layout";
import SlideModal from "@/components/course/SlideModal";
import { lessonRepository } from "@/lib/supabase/client";
import type { Database } from "@/database.types";

type Message = {
  id: string;
  role: 'user' | 'system';
  content: string;
};

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
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
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
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsStreaming(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.concat(userMessage).map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      if (!response.ok) throw new Error('API request failed');
      if (!response.body) throw new Error('Response body is null');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      const assistantMessageId = Date.now().toString();
      setMessages(prev => [...prev, {
        id: assistantMessageId,
        role: 'system',
        content: '',
      }]);

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const text = decoder.decode(value);
          setMessages(prev => prev.map(msg => 
            msg.id === assistantMessageId
              ? { ...msg, content: msg.content + text }
              : msg
          ));
          scrollToBottom();
        }
      } finally {
        reader.releaseLock();
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'system',
        content: 'エラーが発生しました。もう一度お試しください。',
      }]);
    } finally {
      setIsStreaming(false);
    }
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
        <div className="w-[20%] bg-gray-50 p-6 overflow-hidden">
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
        <div className="w-[80%] bg-[#1a1a1a] flex flex-col">
          {/* メッセージ表示エリア */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-2 ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* アイコン */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "system" ? "bg-[#19c37d]" : "bg-blue-500"
                  }`}>
                    {message.role === "system" ? "AI" : "U"}
                  </div>
                  
                  {/* メッセージ */}
                  <div className={`max-w-[80%] ${
                    message.role === "user" ? "bg-blue-500" : "bg-[#2a2a2a]"
                  } rounded-2xl px-4 py-2 text-white relative`}>
                    {/* 吹き出しの三角形 */}
                    <div className={`absolute top-3 w-2 h-2 transform rotate-45 ${
                      message.role === "user" 
                        ? "right-[-4px] bg-blue-500" 
                        : "left-[-4px] bg-[#2a2a2a]"
                    }`}></div>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* 入力エリア */}
          <div className="border-t border-gray-800 bg-[#1a1a1a] p-4">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-[#2a2a2a] text-white rounded-lg pl-4 pr-12 py-3 resize-none border border-gray-700 focus:border-gray-500 focus:ring-0 focus:outline-none"
                rows={1}
                placeholder="分析結果を入力してください..."
                style={{ minHeight: "44px", maxHeight: "200px" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
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
                  className="h-5 w-5 rotate-90"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                  ></path>
                </svg>
              </button>
            </form>
            <div className="max-w-3xl mx-auto mt-2 text-xs text-center text-gray-500">
              Enterキーで送信 / Shift + Enterで改行
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
