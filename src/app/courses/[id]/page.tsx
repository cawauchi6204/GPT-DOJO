'use client';

import Layout from '@/components/layout/Layout';
import PreviewPane from '@/components/course/PreviewPane';
import { useState } from 'react';

// ダミーデータ
const lessonContent = {
  title: 'HTMLに触れてみよう！',
  description: `
では早速HTMLに触れてみましょう。
「エディタ」に、コードを入力していきます。「プレビュー」が、その結果です。

「Hello World」というテキストを

・開始タグ <h1>
・終了タグ </h1>

で囲んでください。

「見本」のようになりましたか？
終わったら、「できた！」をクリックしてください。
  `,
  expectedOutput: '<h1>Hello World</h1>',
};

export default function CourseDetail() {
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

  const handleReset = () => {
    setUserInput('');
    setMessages([]);
  };

  const handleShowAnswer = () => {
    setUserInput(lessonContent.expectedOutput);
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-64px)]">
        {/* 左側：レッスン説明 */}
        <div className="w-1/2 bg-gray-50 p-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">{lessonContent.title}</h1>
            <div className="prose">
              {lessonContent.description.split('\n').map((line, index) => (
                <p key={index} className="mb-4">{line}</p>
              ))}
            </div>
            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <h2 className="font-semibold mb-2">見本</h2>
              <code className="block bg-white p-3 rounded">
                {lessonContent.expectedOutput}
              </code>
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
                <PreviewPane htmlContent={userInput} />
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
            <div className="flex justify-between mt-4 max-w-3xl mx-auto">
              <button 
                onClick={handleReset}
                className="text-gray-400 hover:text-white transition-colors"
              >
                リセット
              </button>
              <button 
                onClick={handleShowAnswer}
                className="text-gray-400 hover:text-white transition-colors"
              >
                答えを見る
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}