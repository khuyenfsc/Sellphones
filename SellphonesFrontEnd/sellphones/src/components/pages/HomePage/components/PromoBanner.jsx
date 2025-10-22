import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PromotionBannerService from "../../../../service/PromotionBannerService";

export default function PromotionBannerSlider() {
  const [banners, setBanners] = useState([]);
  const [height, setHeight] = useState("auto");
  const [currentIndex, setCurrentIndex] = useState(0);
  const imgRef = useRef(null);

  // Lấy dữ liệu banner từ API
  useEffect(() => {
    PromotionBannerService.getAll().then((res) => {
      setBanners(res.data.result || []);
    });
  }, []);

  // Tự động chuyển ảnh sau 5 giây
  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners]);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);

  if (banners.length === 0) return <p>Đang tải banner...</p>;

   return (
    <div
      className="relative w-full overflow-hidden bg-black transition-all duration-500"
      style={{ height }}
    >
      {/* Container chứa tất cả ảnh */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {banners.map((banner, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full flex justify-center items-center"
          >
            <a
              href={banner.targetUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex justify-center"
            >
              <img
                ref={index === currentIndex ? imgRef : null}
                src={banner.image}
                alt={banner.name}
                className="w-full h-auto object-contain block"
                onLoad={(e) => {
                  setHeight(e.target.clientHeight + "px");
                }}
              />
            </a>
          </div>
        ))}
      </div>

      {/* Nút chuyển ảnh */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/60 hover:bg-white text-black p-2 rounded-full"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/60 hover:bg-white text-black p-2 rounded-full"
      >
        <ChevronRight />
      </button>

      {/* Dấu chấm nhỏ */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              currentIndex === idx ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};