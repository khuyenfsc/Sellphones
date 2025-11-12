import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { XCircle } from "lucide-react";

export default function EditBrandModal({ isOpen, onClose, onUpdate, onDelete, brand }) {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // URL preview: có thể là từ server hoặc local
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Khi mở modal -> tải dữ liệu brand
  useEffect(() => {
    if (isOpen && brand) {
      setName(brand.name || "");
      setPreview(brand.brandIcon || null); // brandIcon là URL ảnh từ server
      setFile(null);
      setError("");
    }
  }, [isOpen, brand]);

  // Nếu chọn ảnh mới thì tạo URL preview local
  useEffect(() => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  // Xóa ảnh (cả file mới lẫn preview)
  const handleRemoveImage = () => {
    setFile(null);
    setPreview(null);
  };

  // Gửi cập nhật
  const handleUpdate = async () => {
    if (!name.trim()) {
      setError("Tên thương hiệu không được để trống");
      return;
    }

    setLoading(true);
    setError("");

    // Dữ liệu cơ bản
    const updatedBrand = { name: name.trim() };

    // Gửi id, dữ liệu, và file (nếu có)
    await onUpdate(brand.id, updatedBrand, file);

    setLoading(false);
    onClose();
  };

  // Xóa thương hiệu
  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Xác nhận xóa thương hiệu",
      text: "Bạn có chắc muốn xóa thương hiệu này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (confirm.isConfirmed && onDelete) {
      await onDelete(brand.id);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Lớp nền mờ */}
          <motion.div
            className="fixed inset-0 bg-black z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal chỉnh sửa */}
          <motion.div
            className="fixed top-0 right-0 h-full w-[400px] bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <h2 className="text-xl font-semibold mb-6 text-white">Chỉnh sửa thương hiệu</h2>

            <div className="space-y-5">
              {/* Tên thương hiệu */}
              <div>
                <label className="text-gray-300 block mb-1">Tên thương hiệu</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError("");
                  }}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tên thương hiệu"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>

              {/* Ảnh thương hiệu */}
              <div>
                <label className="text-gray-300 block mb-2">Ảnh thương hiệu</label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-lg p-4 bg-gray-800 hover:border-blue-500 transition">
                  {preview ? (
                    <div className="relative flex flex-col items-center">
                      <img
                        src={preview}
                        alt="Xem trước"
                        className="w-32 h-32 object-cover rounded-md mb-3 border border-gray-600"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="flex items-center gap-1 text-sm text-red-500 hover:text-red-400 transition"
                      >
                        <XCircle size={16} /> Xóa ảnh
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm mb-2">Chưa có ảnh</p>
                  )}

                  {/* Input chọn ảnh */}
                  <label
                    htmlFor="fileUploadEdit"
                    className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition mt-2"
                  >
                    {file ? "Đổi ảnh" : "Chọn ảnh mới"}
                  </label>
                  <input
                    id="fileUploadEdit"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0] || null)}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Nút cập nhật */}
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? "Đang cập nhật..." : "Cập nhật thương hiệu"}
              </button>

              {/* Nút xóa */}
              <button
                onClick={handleDelete}
                className="mt-2 w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Xóa thương hiệu
              </button>

              {/* Nút đóng */}
              <button
                onClick={onClose}
                className="mt-2 w-full px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 transition"
              >
                Đóng
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
