// VariantAttributeList.jsx
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import AttributeSearchModal from "./AttributeSearchModal";

export default function VariantAttributeList({ variant, setVariant }) {
    const [modalAttr, setModalAttr] = useState(null);
    const [isAttributeSearchModalOpen, setIsAttributeSearchModalOpen] = useState(false);

    const handleAddAttributeValue = ({ attribute, value }) => {
        setVariant(prev => {
            const existingIndex = prev.attributeValues.findIndex(av => av.attribute.id === attribute.id);

            let newAttributeValues = [...prev.attributeValues];

            if (existingIndex >= 0) {
                // Attribute đã tồn tại → cập nhật giá trị
                newAttributeValues[existingIndex] = {
                    ...newAttributeValues[existingIndex],
                    id: value.id,
                    strVal: value.strVal,
                    numericVal: value.numericVal,
                    attribute: attribute
                };
            } else {
                // Attribute chưa có → push mới
                newAttributeValues.push({
                    id: value.id,
                    strVal: value.strVal,
                    numericVal: value.numericVal,
                    attribute: attribute
                });
            }

            return {
                ...prev,
                attributeValues: newAttributeValues
            };
        });

        // Cập nhật list id gửi lên server
        setAttributeValueIds(prev => {
            if (!prev.includes(value.id)) return [...prev, value.id];
            return prev;
        });
    };

    const handleDeleteAttribute = (valueId) => {
        setVariant(prev => ({
            ...prev,
            attributeValues: prev.attributeValues.filter(a => a.id !== valueId)
        }));

        setAttributeValueIds(prev => prev.filter(id => id !== valueId));
    };


    return (
        <div className="bg-slate-900 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Thuộc tính chi tiết</h2>

                <button
                    className="flex items-center gap-2 px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 text-sm"
                    onClick={() => {
                        setModalAttr(null);
                        setIsAttributeSearchModalOpen(true)
                    }}
                >
                    <Plus size={16} /> Thêm thuộc tính
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {variant.attributeValues?.map((attr) => (
                    <div key={attr.id} className="bg-slate-800 p-3 rounded-lg relative">

                        <div className="text-slate-400 text-sm">{attr.attribute.name}</div>
                        <div className="text-white font-medium mt-1">{attr.strVal}</div>
                        <div className="text-slate-500 text-xs mt-1">
                            Giá trị số: {attr.numericVal}
                        </div>

                        <button
                            className="absolute top-2 right-10 p-1 rounded hover:bg-slate-700"
                            onClick={() => {
                                setModalAttr(attr)
                                setIsAttributeSearchModalOpen(true);
                            }}
                        >
                            <Pencil size={16} />
                        </button>

                        <button
                            className="absolute top-2 right-2 p-1 rounded hover:bg-slate-700"
                            onClick={() => handleDeleteAttribute(attr.id)}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>

            <AttributeSearchModal
                isOpen={isAttributeSearchModalOpen}
                onClose={() => setIsAttributeSearchModalOpen(false)}
                onSelectAttributeValue={handleAddAttributeValue}
                initialAttributeValue={modalAttr}
            />
        </div>
    );
}
