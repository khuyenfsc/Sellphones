import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import { toast } from "react-toastify";
import AdminAttributeService from "../../../../service/AdminAttributeService";

export default function AttributeSearchModal({
    isOpen, onClose, onSelectAttributeValue, initialAttributeValue

}) {
    const [query, setQuery] = useState("");

    // Attribute
    const [attributes, setAttributes] = useState([]);
    const [attrTotal, setAttrTotal] = useState(0);
    const [attrPage, setAttrPage] = useState(0);
    const attrPageSize = 2;

    // Values
    const [selectedAttribute, setSelectedAttribute] = useState(null);
    const [values, setValues] = useState([]);
    const [totalValues, setTotalValues] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 2;

    const [loading, setLoading] = useState(false);

    // -----------------------------
    // RESET
    // -----------------------------
    const resetAll = () => {
        setQuery("");
        setAttributes([]);
        setAttrTotal(0);
        setAttrPage(0);
        setSelectedAttribute(null);
        setValues([]);
        setTotalValues(0);
        setCurrentPage(0);
    };

    // -----------------------------
    // LOAD ATTRIBUTES
    // -----------------------------
    const loadAttributes = async (page = 0, keyword = null, append = false) => {
        setLoading(true);
        try {
            const res = await AdminAttributeService.getAttributes({
                keyword: keyword || null,
                page,
                size: attrPageSize,
            });

            if (res.success) {
                if (append) {
                    setAttributes(prev => [...prev, ...(res.data.result || [])]);
                } else {
                    setAttributes(res.data.result || []);
                }
                setAttrTotal(res.data.total || 0);
                setAttrPage(page);
            } else {
                toast.error(res.message || "Không thể tải danh sách thuộc tính");
            }
        } catch {
            toast.error("Lỗi khi tải danh sách thuộc tính");
        }
        setLoading(false);
    };

    const loadMoreAttributes = () => {
        if (attributes.length >= attrTotal) return;
        loadAttributes(attrPage + 1, query.trim() !== "" ? query.trim() : null, true);
    };

    // -----------------------------
    // LOAD VALUES
    // -----------------------------
    const loadValues = async (attributeId, page = 0, keyword = null, append = false) => {
        setLoading(true);
        try {
            const res = await AdminAttributeService.getAttributeValues({
                attributeId,
                keyword: keyword || null,
                page,
                size: pageSize,
            });

            if (res.success) {
                if (append) {
                    setValues(prev => [...prev, ...(res.data.result || [])]);
                } else {
                    setValues(res.data.result || []);
                }
                setTotalValues(res.data.total || 0);
                setCurrentPage(page);
            } else {
                toast.error(res.message || "Không thể tải giá trị thuộc tính");
            }
        } catch {
            toast.error("Lỗi khi tải giá trị thuộc tính");
        }
        setLoading(false);
    };

    const loadMoreValues = () => {
        if (!selectedAttribute || values.length >= totalValues) return;
        loadValues(selectedAttribute.id, currentPage + 1, query.trim() !== "" ? query.trim() : null, true);
    };

    // -----------------------------
    // HANDLERS
    // -----------------------------
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            if (selectedAttribute) {
                loadValues(selectedAttribute.id, 0, query.trim() !== "" ? query.trim() : null, false);
            } else {
                loadAttributes(0, query.trim() !== "" ? query.trim() : null, false);
            }
        }
    };

    const handleSelectAttribute = (attr) => {
        setSelectedAttribute(attr);
        setQuery("");
        setValues([]);
        setTotalValues(0);
        setCurrentPage(0);
        loadValues(attr.id, 0, null, false);
    };

    const handleSelectValue = (val) => {
        onSelectAttributeValue({ attribute: selectedAttribute, value: val });
        resetAll();
    };

    const clearInput = () => {
        setQuery("");
        if (!selectedAttribute) {
            loadAttributes(0, null, false);
        } else {
            loadValues(selectedAttribute.id, 0, null, false);
        }
    };

    const handleBackToAttributes = () => {
        setSelectedAttribute(null);
        setQuery("");
        setValues([]);
        setTotalValues(0);
        setCurrentPage(0);
    };

    // -----------------------------
    // AUTO LOAD WHEN OPEN
    // -----------------------------
    useEffect(() => {
        if (isOpen) {
            resetAll();

            if (initialAttributeValue) {
                // nếu có attribute truyền vào → mở luôn phần values
                setSelectedAttribute(initialAttributeValue.attribute);
                loadValues(initialAttributeValue.attribute.id, 0, null, false);
            } else {
                // mở bình thường → load danh sách attributes
                loadAttributes(0, null, false);
            }
        }
    }, [isOpen, initialAttributeValue]);

    // -----------------------------
    // RENDER
    // -----------------------------
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
                            {selectedAttribute ? `Giá trị của: ${selectedAttribute.name}` : "Tìm kiếm Attribute"}
                        </h2>

                        {/* INPUT */}
                        <div className="mb-4 relative">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                placeholder={selectedAttribute ? "Nhập tên giá trị và Enter..." : "Nhập tên Attribute và Enter..."}
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

                        {/* BACK BUTTON */}
                        {selectedAttribute && (
                            <div className="mb-2 text-blue-400 text-sm cursor-pointer hover:underline" onClick={handleBackToAttributes}>
                                ← Quay lại danh sách Attribute
                            </div>
                        )}

                        {/* ATTRIBUTE LIST */}
                        {!selectedAttribute && (
                            <div className="mt-2">
                                <div className="space-y-1 max-h-[60vh] overflow-auto">
                                    {attributes.map(attr => (
                                        <div
                                            key={attr.id}
                                            className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded cursor-pointer"
                                            onClick={() => handleSelectAttribute(attr)}
                                        >
                                            {attr.name}
                                        </div>
                                    ))}
                                </div>
                                {attrTotal > attributes.length && (
                                    <div className="mt-2 text-right">
                                        <span className="text-blue-400 text-sm hover:underline cursor-pointer" onClick={loadMoreAttributes}>
                                            Xem thêm {attrTotal - attributes.length} thuộc tính...
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* VALUE LIST */}
                        {selectedAttribute && (
                            <>
                                <div className="space-y-1 max-h-[60vh] overflow-auto">
                                    {values.map(val => (
                                        <div
                                            key={val.id}
                                            className="flex justify-between bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded cursor-pointer"
                                            onClick={() => handleSelectValue(val)}
                                        >
                                            <span>{val.strVal}</span>
                                            {val.numericVal != null && <span className="text-gray-400 text-sm">{val.numericVal}</span>}
                                        </div>
                                    ))}
                                </div>
                                {totalValues > values.length && (
                                    <div className="mt-2 text-right">
                                        <span className="text-blue-400 text-sm hover:underline cursor-pointer" onClick={loadMoreValues}>
                                            Xem thêm {totalValues - values.length} giá trị...
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
