'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Slide {
  title: string;
  content: string;
  code?: string;
  preview?: string;
  isLastSlide?: boolean;
  type?: 'title' | 'content' | 'code' | 'image' | 'end';
  style?: {
    background_color?: string;
    theme?: 'light' | 'dark';
    layout?: string;
  };
  transition?: 'slide' | 'fade';
  thumbnail_url?: string;
}

interface SlideModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: Slide[];
}

const transitions = {
  slide: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
};

export default function SlideModal({ isOpen, onClose, slides }: SlideModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentSlide < slides.length - 1) {
        setCurrentSlide(currentSlide + 1);
      } else if (e.key === 'ArrowLeft' && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      } else if (e.key === 'Enter' && slides[currentSlide].isLastSlide) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, slides, onClose]);

  if (!isOpen) return null;

  const currentSlideData = slides[currentSlide];
  const transitionType = currentSlideData.transition || 'slide';
  const slideStyle = currentSlideData.style || {};
  const theme = slideStyle.theme || 'light';

  const renderSlideContent = () => {
    if (currentSlideData.type === 'end') {
      return (
        <div className="h-full flex flex-col items-center justify-center text-center p-4 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
            ここでスライドは終わりです。
          </h2>
          <p className="text-lg md:text-xl mb-8 md:mb-12">
            演習に進みましょう!
          </p>
          <button
            onClick={onClose}
            className="bg-[#19c37d] text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-[#1a8870] transition-colors flex items-center gap-2"
          >
            演習に進む (Enter)
            <span className="text-xl md:text-2xl">▶</span>
          </button>
        </div>
      );
    }

    switch (currentSlideData.type) {
      case 'title':
        return (
          <div className="text-center p-4 md:p-8">
            <h1
              className="text-3xl md:text-4xl font-bold mb-4 md:mb-6"
              dangerouslySetInnerHTML={{ __html: currentSlideData.title }}
            />
            <div
              className="text-lg md:text-xl"
              dangerouslySetInnerHTML={{ __html: currentSlideData.content }}
            />
          </div>
        );
      case 'code':
        return (
          <div className="p-4 md:p-8">
            <h2
              className="text-xl md:text-2xl font-bold mb-3 md:mb-4"
              dangerouslySetInnerHTML={{ __html: currentSlideData.title }}
            />
            <div
              className="mb-4 md:mb-6"
              dangerouslySetInnerHTML={{ __html: currentSlideData.content }}
            />
            <div className="bg-[#1e1e1e] text-white p-3 md:p-4 rounded-lg">
              <pre className="font-mono text-sm md:text-base overflow-x-auto">
                <code>{currentSlideData.code}</code>
              </pre>
            </div>
          </div>
        );
      case 'image':
        return (
          <div className="text-center p-4 md:p-8">
            <h2
              className="text-xl md:text-2xl font-bold mb-3 md:mb-4"
              dangerouslySetInnerHTML={{ __html: currentSlideData.title }}
            />
            {currentSlideData.thumbnail_url && (
              <img
                src={currentSlideData.thumbnail_url}
                alt={currentSlideData.title}
                className="mx-auto max-w-full h-auto rounded-lg"
              />
            )}
            <div
              className="mt-4 md:mt-6"
              dangerouslySetInnerHTML={{ __html: currentSlideData.content }}
            />
          </div>
        );
      default:
        return (
          <div className="p-4 md:p-8">
            <h2
              className="text-xl md:text-2xl font-bold mb-3 md:mb-4"
              dangerouslySetInnerHTML={{ __html: currentSlideData.title }}
            />
            <div
              className="mb-4 md:mb-6"
              dangerouslySetInnerHTML={{ __html: currentSlideData.content }}
            />
            {currentSlideData.code && (
              <div className="bg-[#1e1e1e] text-white p-3 md:p-4 rounded-lg">
                <pre className="font-mono text-sm md:text-base overflow-x-auto">
                  <code>{currentSlideData.code}</code>
                </pre>
              </div>
            )}
            {currentSlideData.preview && (
              <div className="mt-4 md:mt-6 bg-white rounded-lg p-3 md:p-4 shadow-lg">
                <div className="flex items-center mb-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="ml-2 text-xs md:text-sm text-gray-500">プレビュー</span>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: currentSlideData.preview }}
                  className="preview-content text-sm md:text-base"
                />
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        className={`w-full max-h-[90vh] md:max-h-[80vh] rounded-lg relative overflow-hidden ${
          theme === 'dark' ? 'bg-[#1e1e1e] text-white' : 'bg-[#e6f3ff] text-gray-900'
        }`}
        style={{
          backgroundColor: slideStyle.background_color,
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 text-current hover:text-gray-600 z-10"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Slide content */}
        <div className="h-full flex">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={transitions[transitionType].initial}
              animate={transitions[transitionType].animate}
              exit={transitions[transitionType].exit}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <div className="max-w-4xl mx-auto">
                {renderSlideContent()}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-between px-4 md:px-8">
          <button
            onClick={() => setCurrentSlide(currentSlide - 1)}
            className={`p-2 rounded text-sm md:text-base ${
              currentSlide === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-current hover:bg-gray-200/20'
            }`}
            disabled={currentSlide === 0}
          >
            ← 前へ
          </button>
          <div className="text-current text-sm md:text-base">
            {currentSlide + 1} / {slides.length}
          </div>
          <button
            onClick={() => {
              if (currentSlideData.type === 'end') {
                onClose();
              } else {
                setCurrentSlide(currentSlide + 1);
              }
            }}
            className="p-2 rounded text-current hover:bg-gray-200/20 text-sm md:text-base"
            disabled={currentSlide === slides.length - 1}
          >
            {currentSlideData.type === 'end' ? '演習に進む →' : '次へ →'}
          </button>
        </div>
      </div>
    </div>
  );
}