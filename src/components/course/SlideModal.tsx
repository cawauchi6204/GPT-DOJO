'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Slide {
  title: string;
  content: string;
  code?: string;
  preview?: string;
}

interface SlideModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: Slide[];
}

export default function SlideModal({ isOpen, onClose, slides }: SlideModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        previousSlide();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, onClose]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const previousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-[#e6f3ff] w-full max-w-6xl h-[80vh] rounded-lg relative overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 z-10"
        >
          <svg
            className="w-6 h-6"
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
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="flex-1 p-8"
            >
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl">★</span>
                  </div>
                  <h2 className="text-2xl font-bold">{slides[currentSlide].title}</h2>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-lg mb-6">{slides[currentSlide].content}</p>
                    {slides[currentSlide].code && (
                      <div className="bg-[#1e1e1e] text-white p-4 rounded-lg">
                        <pre className="font-mono">
                          <code>{slides[currentSlide].code}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                  {slides[currentSlide].preview && (
                    <div className="bg-white rounded-lg p-4 shadow-lg">
                      <div className="flex items-center mb-2">
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-500">プレビュー</span>
                      </div>
                      <div
                        dangerouslySetInnerHTML={{ __html: slides[currentSlide].preview }}
                        className="preview-content"
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-between px-8">
          <button
            onClick={previousSlide}
            className={`p-2 rounded ${
              currentSlide === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
            disabled={currentSlide === 0}
          >
            ← 前へ
          </button>
          <div className="text-gray-600">
            {currentSlide + 1} / {slides.length}
          </div>
          <button
            onClick={nextSlide}
            className={`p-2 rounded ${
              currentSlide === slides.length - 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
            disabled={currentSlide === slides.length - 1}
          >
            次へ →
          </button>
        </div>
      </div>
    </div>
  );
}