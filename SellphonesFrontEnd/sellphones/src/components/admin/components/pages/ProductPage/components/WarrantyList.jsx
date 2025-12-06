import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import WarrantySearchModal from "./WarrantySearchModal"; 

export default function WarrantyList({ variant, setVariant }) {
    const [isWarrantyModalOpen, setIsWarrantyModalOpen] = useState(false);

    const handleAddWarranty = (warranty) => {
        setVariant(prev => ({
            ...prev,
            warranties: [...(prev.warranties || []), warranty],
        }));

        setIsWarrantyModalOpen(false);
    };

    const handleDeleteWarranty = (id) => {
        setVariant(prev => ({
            ...prev,
            warranties: prev.warranties.filter(w => w.id !== id),
        }));
    };

    return (
        <div className="bg-slate-900 rounded-lg p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Bảo hành</h2>

                <button
                    className="flex items-center gap-2 px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 text-sm"
                    onClick={() => setIsWarrantyModalOpen(true)}
                >
                    <Plus size={16} /> Thêm
                </button>
            </div>

            {/* List */}
            <div className="space-y-3">
                {variant.warranties?.map((warranty) => (
                    <div
                        key={warranty.id}
                        className="bg-slate-800 p-3 rounded-lg group"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="text-white font-medium text-sm">
                                    {warranty.name}
                                </div>

                                <div className="text-slate-400 text-xs mt-1">
                                    {warranty.description}
                                </div>

                                <div className="flex items-center gap-3 mt-2">
                                    <span className="text-blue-400 text-xs">
                                        {warranty.months} tháng
                                    </span>

                                    <span className="text-green-400 text-xs font-medium">
                                        {warranty.price > 0
                                            ? `${warranty.price.toLocaleString("vi-VN")} ₫`
                                            : "Miễn phí"}
                                    </span>
                                </div>
                            </div>

                            <button
                                className="opacity-0 group-hover:opacity-100 transition text-red-400 hover:text-red-300"
                                onClick={() => handleDeleteWarranty(warranty.id)}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal chọn bảo hành */}
            <WarrantySearchModal
                isOpen={isWarrantyModalOpen}
                onClose={() => setIsWarrantyModalOpen(false)}
                onSelectWarranty={handleAddWarranty}
            />
        </div>
    );
}
