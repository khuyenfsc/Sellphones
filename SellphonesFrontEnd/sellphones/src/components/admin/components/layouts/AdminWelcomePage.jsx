export default function AdminWelcomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Chào mừng đến với trang quản trị!
          </h1>
          <p className="text-gray-400">
            Hãy chọn chức năng ở menu bên trái để bắt đầu quản lý hệ thống.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-3">📌 Giới thiệu nhanh</h2>
        <p className="text-gray-300 leading-relaxed">
          Đây là trang dành cho quản trị viên. Bạn có thể quản lý sản phẩm, đơn hàng, người dùng,
          thống kê và nhiều chức năng khác thông qua sidebar bên trái.
        </p>
      </div>
    </div>
  );
}
