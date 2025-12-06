import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import PromotionSearchModal from "./PromotionSearchModal"; 

export default function PromotionList({ variant, setVariant }) {
    const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);

    const handleAddPromotion = (promotion) => {
        setVariant(prev => ({
            ...prev,
            promotions: [...(prev.promotions || []), promotion],
        }));

        setIsPromoModalOpen(false);
    };

    const handleDeletePromotion = (id) => {
        setVariant(prev => ({
            ...prev,
            promotions: prev.promotions.filter(p => p.id !== id),
        }));
    };

    return (
        <div className="bg-slate-900 rounded-lg p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Khuyến mãi</h2>

                <button
                    className="flex items-center gap-2 px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 text-sm"
                    onClick={() => setIsPromoModalOpen(true)}
                >
                    <Plus size={16} /> Thêm
                </button>
            </div>

            {/* List */}
            <div className="space-y-3">
                {variant.promotions?.map((promo) => (
                    <div
                        key={promo.id}
                        className="flex items-center justify-between bg-slate-800 p-3 rounded-lg group"
                    >
                        <span className="text-slate-200 text-sm">{promo.name}</span>

                        <button
                            className="opacity-0 group-hover:opacity-100 transition text-red-400 hover:text-red-300"
                            onClick={() => handleDeletePromotion(promo.id)}
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal chọn Promotion */}
            <PromotionSearchModal
                isOpen={isPromoModalOpen}
                onClose={() => setIsPromoModalOpen(false)}
                onSelectPromotion={handleAddPromotion}
            />
        </div>
    );
}
