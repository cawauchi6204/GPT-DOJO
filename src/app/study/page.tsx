'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import SlideModal from '@/components/course/SlideModal';

const slides = [
  {
    title: 'HTMLの仕組み',
    content: 'まずはHTMLについて勉強していきましょう。HTMLでは、テキストに「タグ」と呼ばれる印を付けていきます。図のようにテキストをタグで囲むことにより、テキストが「見出し」や「リンク」といった意味をもつことになります。',
    code: '<h1>プログラミングの世界へようこそ</h1>\n<a>Progate</a>',
    preview: '<h1>プログラミングの世界へようこそ</h1><a href="#">Progate</a>'
  },
  {
    title: 'タグの基本',
    content: 'HTMLのタグは、開始タグと終了タグでテキストを囲みます。開始タグは<>で、終了タグは</>で囲まれています。',
    code: '<h1>Hello World</h1>',
    preview: '<h1>Hello World</h1>'
  },
  {
    title: '実践演習',
    content: 'では、実際にHTMLタグを使ってテキストを装飾してみましょう。右側のエディタに、指示されたタグを入力してください。',
    code: '<!-- ここにコードを入力してください -->',
    preview: '結果がここに表示されます'
  }
];

export default function Study() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);

  const handleSubmit = async () => {
    if (!userInput.trim()) return;

    // ユーザーの入力をメッセージリストに追加
    setMessages(prev => [...prev, { role: 'user', content: userInput }]);
    
    // ChatGPTのような応答をシミュレート
    setTimeout(() => {
      let response = '';
      if (userInput.includes('<h1>') && userInput.includes('</h1>')) {
        response = 'よく書けています！HTMLのタグを正しく使えていますね。次のステップに進みましょう。';
      } else {
        response = 'HTMLのタグを使って文字を囲んでみましょう。<h1>タグと</h1>タグで囲むことで、見出しとして表示されます。';
      }
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response
      }]);
    }, 500);

    setUserInput('');
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-64px)]">
        {/* 左側：説明エリア */}
        <div className="w-1/2 bg-gray-50 p-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">HTMLに触れてみよう！</h1>
            <div className="prose">
              <p className="mb-4">
                では早速HTMLに触れてみましょう。「エディタ」に、コードを入力していきます。
                「プレビュー」が、その結果です。
              </p>
              <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                <h2 className="font-semibold mb-2">見本</h2>
                <code className="block bg-white p-3 rounded">
                  {'<h1>Hello World</h1>'}
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
                  message.role === 'assistant' ? 'bg-[#444654]' : ''
                } p-4 rounded`}
              >
                <div className={`flex-1 text-white whitespace-pre-wrap`}>
                  {message.content}
                </div>
              </div>
            ))}
            {userInput && (
              <div className="bg-[#444654] p-4 rounded">
                <div className="bg-white rounded p-4">
                  <div dangerouslySetInnerHTML={{ __html: userInput }} />
                </div>
              </div>
            )}
          </div>

          {/* 入力エリア */}
          <div className="border-t border-gray-600 p-4">
            <div className="max-w-3xl mx-auto flex gap-4">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 bg-[#40414f] text-white rounded-lg p-3 resize-none"
                rows={3}
                placeholder="HTMLコードを入力してください..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
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
      <SlideModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        slides={slides}
      />
    </Layout>
  );
}