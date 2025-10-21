import { Gift, Tag, Laptop, Smartphone } from "lucide-react";

export default function RightSidebar({ promos }) {
  return (
    <aside className="w-80 flex-shrink-0">
      {/* Smember Welcome */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl">👋</div>
          <div>
            <div className="font-semibold text-gray-800">
              Chào mừng bạn đến với SellphoneS
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Đăng nhập để không bỏ lỡ các ưu đãi hấp dẫn.
            </div>
          </div>
        </div>
        <div className="flex gap-2 mb-3">
          <button className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg text-sm hover:bg-red-50 transition font-semibold">
            Đăng nhập
          </button>
          <button className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm hover:bg-red-600 transition font-semibold">
            Đăng ký
          </button>
        </div>
    
      </div>

      {/* Education Offers */}
      <div className="bg-blue-50 rounded-lg p-4 mb-4 shadow-sm">
        <div className="font-semibold mb-3 text-gray-800">Ưu đãi cho giáo dục</div>
        <button className="w-full bg-white border border-gray-300 py-2 rounded-lg text-sm mb-2 hover:bg-gray-50 transition font-semibold">
          Đăng ký nhận ưu đãi
        </button>
        <div className="text-sm text-red-500 flex items-center gap-2 mb-2 hover:text-red-600 transition cursor-pointer">
          <Tag size={16} />
          Tựu trường lên cấp - Máy mới lên đời
        </div>
        <div className="text-sm text-red-500 flex items-center gap-2 hover:text-red-600 transition cursor-pointer">
          <Laptop size={16} />
          Laptop giảm thêm đến 500K
        </div>
      </div>

      {/* Hot Deals */}
      <div className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg p-4 text-white shadow-sm">
        <div className="font-semibold mb-3">Thu cũ lên đời giá hời</div>
        {promos.map((promo, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm mb-2">
            <Smartphone size={16} />
            <span>
              {promo.title} <strong>{promo.value}</strong>
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}
