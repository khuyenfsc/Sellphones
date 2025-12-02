import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import AdminSupplierService from "../../../../service/AdminSupplierService"; // service lấy danh sách supplier

function SupplierPickModal({ isOpen, onClose, onPick }) {
  const [query, setQuery] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const [loading, setLoading] = useState(false);

  const resetAll = () => {
    setQuery("");
    setSuppliers([]);
    setTotal(0);
    setPage(0);
  };

  const loadSuppliers = async (page = 0, keyword = null, append = false) => {
    setLoading(true);
    try {
      const res = await AdminSupplierService.getSuppliers({
        keyword: keyword || null,
        page,
        size: pageSize,
      });

      if (res.success) {
        if (append) {
          setSuppliers(prev => [...prev, ...(res.data.result || [])]);
        } else {
          setSuppliers(res.data.result || []);
        }
        setTotal(res.data.total || 0);
        setPage(page);
      }
    } catch (err) {
      console.error("Lỗi khi tải danh sách supplier:", err);
    }
    setLoading(false);
  };

  const loadMore = () => {
    if (suppliers.length >= total) return;
    loadSuppliers(page + 1, query.trim() ? query.trim() : null, true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      loadSuppliers(0, query.trim() ? query.trim() : null, false);
    }
  };

  const clearInput = () => {
    setQuery("");
    loadSuppliers(0, null, false);
  };

  const handleSelect = (supplier) => {
    onPick(supplier);
    resetAll();
  };

  useEffect(() => {
    if (isOpen) {
      resetAll();
      loadSuppliers(0, null, false);
    }
  }, [isOpen]);

  const formatAddress = (address) => {
    if (!address) return "";
    return [address.street, address.ward, address.district, address.province]
      .filter(Boolean)
      .join(", ");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed top-0 right-0 h-full w-[400px] bg-gray-900 z-[70] shadow-xl p-6 overflow-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-white">
              Chọn Supplier
            </h2>

            {/* Search */}
            <div className="mb-4 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tên supplier và Enter..."
              />
              {query && (
                <button
                  onClick={clearInput}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <XCircle size={18} />
                </button>
              )}
            </div>

            {/* Loading */}
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                {/* List */}
                <div className="space-y-2 max-h-[70vh] overflow-auto">
                  {suppliers.map(supplier => (
                    <div
                      key={supplier.id}
                      className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-3 rounded cursor-pointer transition"
                      onClick={() => handleSelect(supplier)}
                    >
                      <div className="font-medium">{supplier.name}</div>
                      <div className="text-sm text-gray-400 mt-1">
                        {formatAddress(supplier.address)}
                      </div>
                      {supplier.phone && (
                        <div className="text-sm text-gray-400">{supplier.phone}</div>
                      )}
                      {supplier.email && (
                        <div className="text-sm text-gray-400">{supplier.email}</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Load more */}
                {total > suppliers.length && (
                  <div className="mt-3 text-right">
                    <span
                      className="text-blue-400 text-sm hover:underline cursor-pointer"
                      onClick={loadMore}
                    >
                      Xem thêm {total - suppliers.length} supplier...
                    </span>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default SupplierPickModal;
