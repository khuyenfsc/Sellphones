import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { XCircle } from "lucide-react";

export default function CreateCategoryModal({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Tạo URL xem trước khi chọn file
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleCreate = async () => {
    if (!name.trim()) {
      setError("Tên danh mục không được để trống");
      return;
    }
    if (!code.trim()) {
      setError("Mã danh mục không được để trống");
      return;
    }
    if (/\s/.test(code)) {
      setError("Mã danh mục không được chứa khoảng trắng");
      return;
    }

    setLoading(true);
    setError("");

    const categoryData = { name: name.trim(), code: code.trim() };

    await onCreate(categoryData, file);
    setLoading(false);
    onClose();

    setName("");
    setCode("");
    setFile(null);
    setPreview(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Nền mờ */}
          <motion.div
            className="fixed inset-0 bg-black z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed top-0 right-0 h-full w-[450px] bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <h2 className="text-xl font-semibold mb-6 text-white">Tạo danh mục mới</h2>

            <div className="space-y-5">
              {/* Tên danh mục */}
              <div>
                <label className="text-gray-300 block mb-1">Tên danh mục</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tên danh mục"
                />
              </div>

              {/* Mã danh mục */}
              <div>
                <label className="text-gray-300 block mb-1">Mã danh mục</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  placeholder="Nhập mã (ví dụ: LT, PC, ...)"
                />
              </div>

              {/* Upload Icon (giống Brand) */}
              <div>
                <label className="text-gray-300 block mb-2">Icon danh mục</label>
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
                        onClick={() => {
                          setFile(null);
                          setPreview(null);
                        }}
                        className="flex items-center gap-1 text-sm text-red-500 hover:text-red-400 transition"
                      >
                        <XCircle size={16} /> Xóa icon
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm mb-2">Chưa chọn icon</p>
                  )}
                  <label
                    htmlFor="fileUpload"
                    className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition mt-2"
                  >
                    {file ? "Đổi icon" : "Chọn icon"}
                  </label>
                  <input
                    id="fileUpload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0] || null)}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Hiển thị lỗi */}
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

              {/* Nút hành động */}
              <button
                onClick={handleCreate}
                disabled={loading}
                className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Đang tạo..." : "Tạo danh mục"}
              </button>

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
