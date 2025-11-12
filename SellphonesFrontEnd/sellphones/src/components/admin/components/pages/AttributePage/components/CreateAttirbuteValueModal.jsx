import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function CreateAttributeValueModal({ isOpen, onClose, onCreate }) {
  const [stringValue, setStringValue] = useState("");
  const [numericValue, setNumericValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // state lưu lỗi

  const handleCreate = async () => {
    // Validate
    if (!stringValue.trim()) {
      setError("Giá trị string không được để trống");
      return;
    }

    setLoading(true);
    setError(""); // reset lỗi
    await onCreate({
      strVal: stringValue.trim(),
      numericVal: numericValue ? Number(numericValue) : null,
    });
    setLoading(false);
    onClose();
    setStringValue(""); // reset input
    setNumericValue("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Lớp nền đen mờ */}
          <motion.div
            className="fixed inset-0 bg-black z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal trượt từ phải sang */}
          <motion.div
            className="fixed top-0 right-0 h-full w-[400px] bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <h2 className="text-xl font-semibold mb-6 text-white">
              Thêm giá trị mới cho thuộc tính
            </h2>

            <div className="space-y-4">
              {/* Giá trị string */}
              <div>
                <label className="text-gray-300 block mb-1">Giá trị (string)</label>
                <input
                  type="text"
                  value={stringValue}
                  onChange={(e) => {
                    setStringValue(e.target.value);
                    if (error) setError(""); // xóa lỗi khi người dùng nhập
                  }}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập giá trị string"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>

              {/* Giá trị numeric (optional) */}
              <div>
                <label className="text-gray-300 block mb-1">
                  Giá trị (numeric) <span className="text-gray-500">(Tùy chọn)</span>
                </label>
                <input
                  type="number"
                  value={numericValue}
                  onChange={(e) => setNumericValue(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập giá trị số (nếu có)"
                />
              </div>

              {/* Nút tạo */}
              <button
                onClick={handleCreate}
                disabled={loading}
                className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Đang tạo..." : "Thêm giá trị"}
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
