import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import { toast } from "react-toastify";
import AdminGiftProductService from "../../../../service/AdminGiftProductService";

export default function GiftProductSearchModal({
    isOpen,
    onClose,
    onSelectGift,
    initialGiftProduct
}) {
    const [query, setQuery] = useState("");

    const [giftProducts, setGiftProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const pageSize = 10;

    const [loading, setLoading] = useState(false);

    const resetAll = () => {
        setQuery("");
        setGiftProducts([]);
        setTotal(0);
        setPage(0);
    };

    const loadGiftProducts = async (page = 0, keyword = null, append = false) => {
        setLoading(true);
        try {
            const res = await AdminGiftProductService.getGiftProducts({
                keyword: keyword || null,
                page,
                size: pageSize,
            });

            if (res.success) {
                if (append) {
                    setGiftProducts(prev => [...prev, ...(res.data.result || [])]);
                } else {
                    setGiftProducts(res.data.result || []);
                }
                setTotal(res.data.total || 0);
                setPage(page);
            } else {
                toast.error(res.message || "Không thể tải danh sách quà tặng");
            }
        } catch {
            toast.error("Lỗi khi tải danh sách quà tặng");
        }
        setLoading(false);
    };

    const loadMore = () => {
        if (giftProducts.length >= total) return;
        loadGiftProducts(page + 1, query.trim() !== "" ? query.trim() : null, true);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            loadGiftProducts(0, query.trim() !== "" ? query.trim() : null, false);
        }
    };

    const clearInput = () => {
        setQuery("");
        loadGiftProducts(0, null, false);
    };

    const handleSelectGift = (gift) => {
        onSelectGift(gift);
        resetAll();
    };

    useEffect(() => {
        if (isOpen) {
            resetAll();

            if (initialGiftProduct) {
                // load dữ liệu theo initialGiftProduct (nếu muốn highlight sau này)
            }

            loadGiftProducts(0, null, false);
        }
    }, [isOpen, initialGiftProduct]);

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
                        className="fixed top-0 right-0 h-full w-[360px] bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >

                        <h2 className="text-xl font-semibold mb-4 text-white">
                            Tìm kiếm Gift Product
                        </h2>

                        <div className="mb-4 relative">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                placeholder="Nhập tên gift product và Enter..."
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

                        {/* Danh sách */}
                        <div className="space-y-2 max-h-[70vh] overflow-auto">
                            {giftProducts.map(gift => (
                                <div
                                    key={gift.id}
                                    className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded cursor-pointer"
                                    onClick={() => handleSelectGift(gift)}
                                >
                                    <div className="font-semibold">{gift.name}</div>
                                    <div className="text-sm text-gray-400">
                                        Mã: {gift.code}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load more */}
                        {total > giftProducts.length && (
                            <div className="mt-3 text-right">
                                <span
                                    className="text-blue-400 text-sm hover:underline cursor-pointer"
                                    onClick={loadMore}
                                >
                                    Xem thêm {total - giftProducts.length} sản phẩm...
                                </span>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
