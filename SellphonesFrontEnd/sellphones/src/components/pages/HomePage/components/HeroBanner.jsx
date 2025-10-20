import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroBanner = ({ currentSlide, setCurrentSlide }) => {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden mb-6 shadow-lg">
      <div className="relative h-96 flex flex-col items-center justify-center text-white px-8">
        <div className="text-5xl font-bold mb-4">🍎 iPad Pro</div>
        <div className="text-2xl mb-2 text-center">Hiệu năng AI tiên tiến</div>
        <div className="text-2xl mb-8 text-center">và năng lực thay đổi cuộc chơi.</div>
        <button className="border-2 border-white px-8 py-3 rounded-full hover:bg-white hover:text-gray-900 transition font-semibold">
          Đăng ký nhận tin
        </button>
      </div>

      {/* Nút điều hướng trái */}
      <button
        onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 transition"
      >
        <ChevronLeft className="text-white" />
      </button>

      {/* Nút điều hướng phải */}
      <button
        onClick={() => setCurrentSlide(currentSlide + 1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 transition"
      >
        <ChevronRight className="text-white" />
      </button>
    </div>
  );
};

export default HeroBanner;
