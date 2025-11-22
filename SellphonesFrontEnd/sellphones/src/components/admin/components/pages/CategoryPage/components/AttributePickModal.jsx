import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import { toast } from "react-toastify";
import AdminAttributeService from "../../../../service/AdminAttributeService";

export default function AttributePickModal({
    isOpen,
    onClose,
    onPick,
    initialAttribute
}) {
    const [query, setQuery] = useState("");
    const [attributes, setAttributes] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const pageSize = 2;
    const [loading, setLoading] = useState(false);

    const resetAll = () => {
        setQuery("");
        setAttributes([]);
        setTotal(0);
        setPage(0);
    };

    const loadAttributes = async (page = 0, keyword = null, append = false) => {
        setLoading(true);
        try {
            const res = await AdminAttributeService.getAttributes({
                keyword: keyword || null,
                page,
                size: pageSize,
            });

            if (res.success) {
                if (append) {
                    setAttributes(prev => [...prev, ...(res.data.result || [])]);
                } else {
                    setAttributes(res.data.result || []);
                }
                setTotal(res.data.total || 0);
                setPage(page);
            } else {
                toast.error(res.message || "Không thể tải danh sách attribute");
            }
        } catch {
            toast.error("Lỗi khi tải danh sách attribute");
        }
        setLoading(false);
    };

    const loadMore = () => {
        if (attributes.length >= total) return;
        loadAttributes(page + 1, query.trim() ? query.trim() : null, true);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            loadAttributes(0, query.trim() ? query.trim() : null, false);
        }
    };

    const clearInput = () => {
        setQuery("");
        loadAttributes(0, null, false);
    };

    const handleSelect = (attr) => {
        onPick(attr);
        resetAll();
    };

    useEffect(() => {
        if (isOpen) {
            resetAll();
            if (initialAttribute) {
                // load lại danh sách để highlight nếu cần
                loadAttributes(0, initialAttribute.name, false);
            } else {
                loadAttributes(0, null, false);
            }
        }
    }, [isOpen, initialAttribute]);

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
                            Chọn Attribute
                        </h2>

                        {/* Search */}
                        <div className="mb-4 relative">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                placeholder="Nhập tên attribute và Enter..."
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
                                <div className="space-y-1 max-h-[70vh] overflow-auto">
                                    {attributes.map(attr => (
                                        <div
                                            key={attr.id}
                                            className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded cursor-pointer"
                                            onClick={() => handleSelect(attr)}
                                        >
                                            {attr.name}
                                        </div>
                                    ))}
                                </div>

                                {/* Load more */}
                                {total > attributes.length && (
                                    <div className="mt-2 text-right">
                                        <span
                                            className="text-blue-400 text-sm hover:underline cursor-pointer"
                                            onClick={loadMore}
                                        >
                                            Xem thêm {total - attributes.length} attribute...
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
