import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, Heart } from "lucide-react";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const current = product.thumbnailProduct?.currentPrice;
  const root = product.thumbnailProduct?.rootPrice;

  // 👉 Tính phần trăm giảm giá
  const discountPercent =
    current && root && root > current
      ? Math.round(((root - current) / root) * 100)
      : null;

  return (

    <div
      key={product.id}
      className="bg-white text-black rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)} // 👈 chuyển hướng khi click
    >
      {/* Product Image */}
      <div className={`relative ${product.bgColor} p-1`}>
        {/* Hiển thị “Giảm X%” nếu có */}
        {discountPercent && (
          <span className="absolute top-1 left-1 bg-red-600 text-white text-[11px] font-semibold px-2 py-1 rounded-md shadow-sm">
            Giảm {discountPercent}%
          </span>
        )}

        {/* Hoặc nếu bạn vẫn muốn ưu tiên discount từ product.discount */}
        {!discountPercent && product.discount && (
          <span className="absolute top-1 left-1 bg-red-600 text-white text-[11px] font-semibold px-2 py-1 rounded-md shadow-sm">
            {product.discount}
          </span>
        )}

        {product.installment && (
          <span className="absolute top-1 right-1 bg-blue-100 text-blue-700 text-[9px] px-1 py-0.5 rounded">
            {product.installment}
          </span>
        )}

        <div className="aspect-square flex items-center justify-center overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-36 h-36 object-cover rounded-md transform transition-transform duration-300 hover:scale-110"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-1.5">
        <h3 className="text-sm font-bold mb-0.5 line-clamp-2 text-gray-900 leading-snug">
          {product.name}
        </h3>


        <div className="mb-0.5 flex items-baseline">
          {current && (
            <span className="text-red-600 font-bold text-sm">
              {Number(current).toLocaleString("vi-VN")}₫
            </span>
          )}
          {root && (
            <span className="text-gray-400 text-[10px] line-through ml-1">
              {Number(root).toLocaleString("vi-VN")}₫
            </span>
          )}
        </div>

        {/* Rating & Favorite */}
        <div className="flex items-center justify-between pt-1 border-t border-gray-100">
          <div className="flex items-center gap-0.5 text-gray-700">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-[11px] font-medium">
              {product.averageRating?.toFixed(1)}
            </span>
          </div>
          <button
            className="text-blue-600 hover:text-blue-700"
            onClick={(e) => e.stopPropagation()} // 👈 tránh click vào tim mà vẫn navigate
          >
            <Heart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
