'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import SlideModal from '@/components/course/SlideModal';

const slides = [
  {
    title: 'マーケティングの基礎',
    content: 'マーケティングとは、顧客のニーズを理解し、それに応える価値を提供するプロセスです。今回は、マーケティングの基本概念について学んでいきましょう。',
    code: `マーケティングの4P

1. Product（製品）
2. Price（価格）
3. Place（流通）
4. Promotion（プロモーション）`,
    preview: `
    <div style="padding: 20px; background: #f5f5f5; border-radius: 8px;">
      <h2 style="color: #333; margin-bottom: 16px;">マーケティングの4P</h2>
      <ul style="list-style-type: none; padding: 0;">
        <li style="margin-bottom: 8px;">✓ Product（製品）</li>
        <li style="margin-bottom: 8px;">✓ Price（価格）</li>
        <li style="margin-bottom: 8px;">✓ Place（流通）</li>
        <li style="margin-bottom: 8px;">✓ Promotion（プロモーション）</li>
      </ul>
    </div>`
  },
  {
    title: 'ターゲット市場の分析',
    content: '効果的なマーケティング戦略を立てるためには、まずターゲット市場を理解する必要があります。STP分析の手法を使って、市場を分析していきましょう。',
    code: `STP分析の3ステップ

1. Segmentation（市場細分化）
2. Targeting（ターゲット選定）
3. Positioning（ポジショニング）`,
    preview: `
    <div style="padding: 20px; background: #f5f5f5; border-radius: 8px;">
      <h2 style="color: #333; margin-bottom: 16px;">STP分析</h2>
      <div style="margin-bottom: 16px;">
        <h3 style="color: #666;">Step 1: Segmentation</h3>
        <p>市場を意味のある単位に分割</p>
      </div>
      <div style="margin-bottom: 16px;">
        <h3 style="color: #666;">Step 2: Targeting</h3>
        <p>最適なターゲット市場を選択</p>
      </div>
      <div>
        <h3 style="color: #666;">Step 3: Positioning</h3>
        <p>競合との差別化を図る</p>
      </div>
    </div>`
  },
  {
    title: '実践演習',
    content: 'では、実際にSTP分析を行ってみましょう。架空の商品について、市場分析を行っていきます。',
    code: `/* 分析例を入力してください */

1. Segmentation:
   - 年齢層
   - 所得層
   - ライフスタイル
   
2. Target Market:
   - 主要ターゲット
   - 市場規模
   
3. Positioning:
   - 独自の価値提案
   - 競合との差別化`,
    preview: '結果がここに表示されます'
  },
  {
    title: 'スライド終了',
    content: 'ここでスライドは終わりです。\n演習に進みましょう！',
    isLastSlide: true
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
      if (userInput.toLowerCase().includes('segmentation') && 
          userInput.toLowerCase().includes('targeting') && 
          userInput.toLowerCase().includes('positioning')) {
        response = 'よく書けています！STP分析の3つの要素を正しく理解できていますね。次のステップに進みましょう。';
      } else {
        response = 'STP分析の3つの要素（Segmentation、Targeting、Positioning）について考えてみましょう。それぞれの要素が市場分析でどのような役割を果たすか、整理してみてください。';
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
            <h1 className="text-2xl font-bold mb-4">マーケティング分析に挑戦！</h1>
            <div className="prose">
              <p className="mb-4">
                STP分析を使って、市場分析を行っていきましょう。
                右側のエディタに、分析結果を入力してください。
              </p>
              <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                <h2 className="font-semibold mb-2">分析例</h2>
                <code className="block bg-white p-3 rounded">
                  {`1. Segmentation（市場細分化）
2. Targeting（ターゲット選定）
3. Positioning（ポジショニング）`}
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