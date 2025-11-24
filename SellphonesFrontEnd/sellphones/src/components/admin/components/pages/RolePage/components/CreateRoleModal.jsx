import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function CreateRoleModal({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    if (!name.trim()) {
      setError("Tên vai trò không được để trống");
      return;
    }

    setLoading(true);
    setError("");

    await onCreate({
      name: name.trim(),
      description: description.trim(),
    });

    setLoading(false);
    onClose();
    setName("");
    setDescription("");
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
            <h2 className="text-xl font-semibold mb-6 text-white">Tạo vai trò mới</h2>

            <div className="space-y-4">
              <div>
                <label className="text-gray-300 block mb-1">Tên vai trò</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tên vai trò"
                />
              </div>

              <div>
                <label className="text-gray-300 block mb-1">Mô tả</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập mô tả vai trò"
                  rows={3}
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                onClick={handleCreate}
                disabled={loading}
                className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Đang tạo..." : "Tạo vai trò"}
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
