import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { XCircle } from "lucide-react";

export default function EditBannerModal({ isOpen, onClose, onUpdate, onDelete, banner }) {
  const [name, setName] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [status, setStatus] = useState("ACTIVE"); // mặc định ACTIVE
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const statusOptions = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
  };

  // Khi mở modal -> load dữ liệu banner
  useEffect(() => {
    if (isOpen && banner) {
      setName(banner.name || "");
      setTargetUrl(banner.targetUrl || "");
      setStatus(banner.status || "ACTIVE");
      setPreview(banner.image || null);
      setFile(null);
      setError("");
    }
  }, [isOpen, banner]);

  // Nếu chọn ảnh mới, tạo preview local
  useEffect(() => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleRemoveImage = () => {
    setFile(null);
    setPreview(null);
  };

  const handleUpdate = async () => {
    if (!name.trim()) {
      setError("Tên banner không được để trống");
      return;
    }

    setLoading(true);
    setError("");

    const updatedBanner = {
      name: name.trim(),
      targetUrl: targetUrl.trim(),
      status,
    };

    await onUpdate(banner.id, updatedBanner, file);

    setLoading(false);
    onClose();
  };

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Xác nhận xóa banner",
      text: "Bạn có chắc muốn xóa banner này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (confirm.isConfirmed && onDelete) {
      await onDelete(banner.id);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed top-0 right-0 h-full w-[400px] bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <h2 className="text-xl font-semibold mb-6 text-white">Chỉnh sửa banner</h2>

            <div className="space-y-5">
              {/* Tên banner */}
              <div>
                <label className="text-gray-300 block mb-1">Tên banner</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError("");
                  }}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tên banner"
                />
              </div>

              {/* Target URL */}
              <div>
                <label className="text-gray-300 block mb-1">Target URL</label>
                <input
                  type="text"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập URL khi click banner"
                />
              </div>

              {/* Status */}
              <div>
                <label className="text-gray-300 block mb-1">Trạng thái</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(statusOptions).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Ảnh banner */}
              <div>
                <label className="text-gray-300 block mb-2">Ảnh banner</label>
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

                  <label
                    htmlFor="fileUploadBannerEdit"
                    className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition mt-2"
                  >
                    {file ? "Đổi ảnh" : "Chọn ảnh mới"}
                  </label>
                  <input
                    id="fileUploadBannerEdit"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0] || null)}
                    className="hidden"
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

              {/* Nút cập nhật */}
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? "Đang cập nhật..." : "Cập nhật banner"}
              </button>

              {/* Nút xóa */}
              <button
                onClick={handleDelete}
                className="mt-2 w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Xóa banner
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
