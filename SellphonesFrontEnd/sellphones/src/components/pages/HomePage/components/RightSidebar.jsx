import { Gift, Tag, Laptop, Smartphone } from "lucide-react";
import React, { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";

export default function RightSidebar({ promos }) {
  const { user, loading } = useContext(AuthContext);

  return (
    <aside className="w-80 flex-shrink-0">
      {/* Smember Welcome */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl">👋</div>
          <div>
            {loading ? (
              <>
                <div className="font-semibold text-gray-800">Đang tải...</div>
              </>
            ) : user ? (
              <>
                <div className="font-semibold text-gray-800">
                  Chào mừng {user?.user.fullName?.split(" ").slice(-1)[0]} đến với SellphoneS 🎉
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Rất vui khi bạn quay lại!
                </div>
              </>
            ) : (
              <>
                <div className="font-semibold text-gray-800">
                  Chào mừng bạn đến với SellphoneS
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Đăng nhập để không bỏ lỡ các ưu đãi hấp dẫn.
                </div>
              </>
            )}
          </div>
        </div>

        {/* Nếu chưa đăng nhập thì hiển thị 2 nút */}
        {!loading && !user && (
          <div className="flex gap-2 mb-3">
            <a
              href="/login"
              className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg text-sm hover:bg-red-50 transition font-semibold text-center"
            >
              Đăng nhập
            </a>
            <a
              href="/register"
              className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm hover:bg-red-600 transition font-semibold text-center"
            >
              Đăng ký
            </a>
          </div>
        )}
      </div>

      {/* Ưu đãi đặc biệt */}
      <div className="bg-yellow-50 rounded-lg p-4 mb-4 shadow-sm">
        <div className="font-semibold mb-3 text-gray-800">Ưu đãi đặc biệt</div>

      

        <div className="text-sm text-red-500 flex items-center gap-2 mb-2 hover:text-red-600 transition cursor-pointer">
          <Tag size={16} />
          Giảm giá cực sốc - Mua ngay kẻo lỡ!
        </div>

        <div className="text-sm text-red-500 flex items-center gap-2 hover:text-red-600 transition cursor-pointer">
          <Laptop size={16} />
          Điện thoại, laptop giảm thêm đến 2 triệu
        </div>
      </div>

      {/* Hot Deals */}
      <div className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg p-4 text-white shadow-sm">
        <div className="font-semibold mb-3">
          Ưu đãi cực sốc – Mua ngay kẻo lỡ!
        </div>
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
