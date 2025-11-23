import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { XCircle } from "lucide-react";

export default function CreateGiftProductModal({
  isOpen,
  onClose,
  onCreate,
}) {
  const [name, setName] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Reset khi mở modal
  useEffect(() => {
    if (isOpen) {
      setName("");
      setStock(0);
      setPrice(0);
      setDescription("");

      setFile(null);
      setPreview(null);
      setError("");
    }
  }, [isOpen]);

  // Preview ảnh mới chọn
  useEffect(() => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleRemoveImage = () => {
    setFile(null);
    setPreview(null);
  };

  // Tạo mới gift product
  const handleCreate = async () => {
    if (!name.trim()) {
      setError("Tên sản phẩm không được để trống");
      return;
    }

    if (!file) {
      setError("Vui lòng chọn ảnh thumbnail");
      return;
    }

    setError("");
    setLoading(true);

    const data = {
      name: name.trim(),
      stock: Number(stock),
      price: Number(price),
      description: description.trim(),
    };

    await onCreate(data, file);

    setLoading(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed top-0 right-0 h-full w-[420px] bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <h2 className="text-xl font-semibold mb-6 text-white">
              Thêm Gift Product
            </h2>

            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="text-gray-300 block mb-1">Tên sản phẩm</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError("");
                  }}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                  placeholder="Nhập tên gift mới"
                />
                {error && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
              </div>

              {/* Stock */}
              <div>
                <label className="text-gray-300 block mb-1">Số lượng</label>
                <input
                  type="number"
                  min={0}
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                />
              </div>

              {/* Price */}
              <div>
                <label className="text-gray-300 block mb-1">Giá</label>
                <input
                  type="number"
                  min={0}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-gray-300 block mb-1">Mô tả</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white resize-none"
                ></textarea>
              </div>

              {/* Thumbnail */}
              <div>
                <label className="text-gray-300 block mb-2">Ảnh Thumbnail</label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-lg p-4 bg-gray-800 hover:border-blue-500 transition">
                  {preview ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={preview}
                        alt="preview"
                        className="w-32 h-32 object-cover rounded-md mb-3 border border-gray-600"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="flex items-center gap-1 text-sm text-red-500 hover:text-red-400"
                      >
                        <XCircle size={16} /> Xóa ảnh
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm mb-2">
                      Chưa chọn ảnh
                    </p>
                  )}

                  <label
                    htmlFor="fileGiftCreate"
                    className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm mt-2"
                  >
                    {file ? "Đổi ảnh" : "Chọn ảnh"}
                  </label>
                  <input
                    id="fileGiftCreate"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0] || null)}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Create */}
              <button
                onClick={handleCreate}
                disabled={loading}
                className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? "Đang tạo..." : "Tạo sản phẩm"}
              </button>

              {/* Close */}
              <button
                onClick={onClose}
                className="mt-2 w-full px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700"
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
