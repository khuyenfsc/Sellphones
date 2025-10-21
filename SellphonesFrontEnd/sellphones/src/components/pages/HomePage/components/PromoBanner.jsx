import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PromoBanner = () => {
  const banners = [
    {
      id: 1,
      title: "🍎 iPad Pro",
      subtitle1: "Hiệu năng AI tiên tiến",
      subtitle2: "và năng lực thay đổi cuộc chơi.",
      bg: "from-gray-900 to-gray-800",
    },
    {
      id: 2,
      title: "📱 iPhone 16 Pro",
      subtitle1: "Hiệu năng vượt trội với chip A18 Pro",
      subtitle2: "Thiết kế titan sang trọng.",
      bg: "from-blue-900 to-indigo-800",
    },
    {
      id: 3,
      title: "💻 MacBook M4",
      subtitle1: "Chip M4 cực mạnh cho hiệu năng đột phá",
      subtitle2: "Mỏng hơn, nhẹ hơn, pin lâu hơn.",
      bg: "from-slate-800 to-gray-700",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide((prev) =>
      prev === banners.length - 1 ? 0 : prev + 1
    );
  };

  const banner = banners[currentSlide];

  return (
    <main className="flex-1">
      {/* Hero Banner */}
      <div
        className={`relative bg-gradient-to-br ${banner.bg} rounded-lg overflow-hidden mb-6 shadow-lg transition-all duration-700`}
      >
        <div className="relative h-96 flex flex-col items-center justify-center text-white px-8 text-center">
          <div className="text-5xl font-bold mb-4">{banner.title}</div>
          <div className="text-2xl mb-2">{banner.subtitle1}</div>
          <div className="text-2xl mb-8">{banner.subtitle2}</div>
          <button className="border-2 border-white px-8 py-3 rounded-full hover:bg-white hover:text-gray-900 transition font-semibold">
            Đăng ký nhận tin
          </button>
        </div>

        {/* Prev / Next buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 transition"
        >
          <ChevronLeft className="text-white" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 transition"
        >
          <ChevronRight className="text-white" />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full cursor-pointer transition ${
                idx === currentSlide ? "bg-white" : "bg-white/40"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default PromoBanner;
