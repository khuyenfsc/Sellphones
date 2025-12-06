import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import GiftProductSearchModal from "./GiftProductSearchModal";

export default function GiftProductList({ variant, setVariant }) {
    const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);

    const handleAddGift = (gift) => {
        setVariant(prev => ({
            ...prev,
            giftProducts: [...prev.giftProducts, gift]
        }));

        setIsGiftModalOpen(false);
    };

    const handleDeleteGift = (id) => {
        setVariant(prev => ({
            ...prev,
            giftProducts: prev.giftProducts.filter(g => g.id !== id)
        }));
    };

    return (
        <div className="bg-slate-900 rounded-lg p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Quà tặng kèm</h2>

                <button
                    className="flex items-center gap-2 px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 text-sm"
                    onClick={() => setIsGiftModalOpen(true)}
                >
                    <Plus size={16} /> Thêm quà tặng
                </button>
            </div>

            {/* List */}
            <div className="space-y-3">
                {variant.giftProducts?.map((gift) => (
                    <div
                        key={gift.id}
                        className="flex items-center gap-3 bg-slate-800 p-3 rounded-lg group"
                    >
                        <img
                            src={gift.thumbnail}
                            alt={gift.name}
                            className="w-16 h-16 object-cover rounded"
                        />

                        <div className="flex-1">
                            <div className="text-white font-medium">{gift.name}</div>
                            <div className="text-slate-400 text-sm">
                                {gift.price > 0
                                    ? `${gift.price.toLocaleString("vi-VN")} ₫`
                                    : "Miễn phí"}
                            </div>
                        </div>

                        <button
                            className="opacity-0 group-hover:opacity-100 transition text-red-400 hover:text-red-300"
                            onClick={() => handleDeleteGift(gift.id)}
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>

            <GiftProductSearchModal
                isOpen={isGiftModalOpen}
                onClose={() => setIsGiftModalOpen(false)}
                onSelectGift={handleAddGift}
            />
        </div>
    );
}
