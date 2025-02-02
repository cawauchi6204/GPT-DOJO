"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slides } from "@/types/microcms";

interface SlideModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: Slides;
}

const transitions = {
  slide: {
    initial: { opacity: 1, x: "100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 1, x: "-100%" },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
};

export default function SlideModal({
  isOpen,
  onClose,
  slides,
}: SlideModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentSlide < slides.slide.length - 1) {
        setCurrentSlide(currentSlide + 1);
      } else if (e.key === "ArrowLeft" && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      } else if (e.key === "Enter" && currentSlide === slides.slide.length - 1) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, slides, onClose]);

  if (!isOpen) return null;

  const currentSlideData = slides.slide[currentSlide];
  const isLastSlide = currentSlide === slides.slide.length - 1;

  const renderSlideContent = () => {
    return (
      <div 
        className="slide-content"
        dangerouslySetInnerHTML={{ __html: currentSlideData.content }}
      />
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className={`w-[98%] h-[90vh] md:h-[800px] rounded-lg relative bg-white text-black`}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 text-current hover:text-gray-600 z-10 p-2 md:p-0"
        >
          <svg
            className="w-6 h-6 md:w-6 md:h-6"
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
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={transitions.slide.initial}
                animate={transitions.slide.animate}
                exit={transitions.slide.exit}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="h-full items-start flex justify-center p-4 md:p-12"
              >
                <div className="w-full max-w-6xl">{renderSlideContent()}</div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center px-4 md:px-8 py-4 md:py-6  bg-inherit">
            <button
              onClick={() => setCurrentSlide(currentSlide - 1)}
              className={`p-3 md:p-2 rounded text-base md:text-base ${
                currentSlide === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-current hover:bg-gray-200/20"
              }`}
              disabled={currentSlide === 0}
            >
              ← 前へ
            </button>
            <div className="text-current text-base md:text-base">
              {currentSlide + 1} / {slides.slide.length}
            </div>
            <button
              onClick={() => {
                if (isLastSlide) {
                  onClose();
                } else {
                  setCurrentSlide(currentSlide + 1);
                }
              }}
              className="p-3 md:p-2 rounded text-current hover:bg-gray-200/20 text-base md:text-base"
            >
              {isLastSlide ? "演習に進む →" : "次へ →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
