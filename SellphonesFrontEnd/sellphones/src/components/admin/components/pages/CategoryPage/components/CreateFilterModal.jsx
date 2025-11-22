import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import AttributePickModal from "./AttributePickModal"; 

export default function CreateFilterModal({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isAttrModalOpen, setIsAttrModalOpen] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState(null);

  const handleCreate = async () => {
    if (!name.trim()) {
      setError("Tên filter không được để trống");
      return;
    }

    if (!selectedAttribute) {
      setError("Bạn phải chọn attribute");
      return;
    }

    setLoading(true);
    setError("");

    await onCreate({
      name: name.trim(),
      attributeId: selectedAttribute.id,
    });

    setLoading(false);
    onClose();
    setName("");
    setSelectedAttribute(null);
  };

  return (
    <>
      {/* ======= Create Filter Modal ======= */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background */}
            <motion.div
              className="fixed inset-0 bg-black z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* Main Modal */}
            <motion.div
              className="fixed top-0 right-0 h-full w-[400px] bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <h2 className="text-xl font-semibold mb-6 text-white">
                Tạo Filter mới
              </h2>

              <div className="space-y-5">

                {/* Tên Filter */}
                <div>
                  <label className="text-gray-300 block mb-1">Tên Filter</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập tên filter"
                  />
                </div>

                {/* Attribute */}
                <div>
                  <label className="text-gray-300 block mb-1">Thuộc tính</label>
                  <button
                    onClick={() => setIsAttrModalOpen(true)}
                    className="w-full px-3 py-2 bg-gray-800 rounded text-white hover:bg-gray-700"
                  >
                    {selectedAttribute ? (
                      <span>{selectedAttribute.name}</span>
                    ) : (
                      <span>Chọn attribute</span>
                    )}
                  </button>
                </div>

                {/* Error */}
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

                {/* Create */}
                <button
                  onClick={handleCreate}
                  disabled={loading}
                  className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? "Đang tạo..." : "Tạo Filter"}
                </button>

                {/* Close */}
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

      <AttributePickModal
        isOpen={isAttrModalOpen}
        onClose={() => setIsAttrModalOpen(false)}
        onPick={(attr) => {
          setSelectedAttribute(attr);
          setIsAttrModalOpen(false);
        }}
      />
    </>
  );
}
