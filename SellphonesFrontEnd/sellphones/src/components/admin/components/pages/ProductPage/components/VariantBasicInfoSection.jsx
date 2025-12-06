import { XCircle } from "lucide-react";
import React, {useState } from "react";

export default function VariantBasicInfoSection({
    variant, setVariant, errors, setImageFile, attributes
}) {
    const [previewImage, setPreviewImage] = useState("");
    const [values, setValues] = useState([]);
    const handleValueChange = (index, value) => {
        const updated = [...values];
        updated[index] = value;
        setValues(updated);
    };

    const handleInputChange = (field, value) => {
        setVariant((prev) => ({
            ...prev,
            [field]: value,
        }));
    };


    return (
        <div className="bg-slate-900 rounded-lg p-6 flex flex-col gap-4">
            <h2 className="text-lg font-semibold mb-2">Thông tin cơ bản</h2>

            {/* Tên phiên bản */}
            <div>
                <label className="text-slate-400">Tên phiên bản:</label>
                <input
                    type="text"
                    className="bg-slate-800 p-2 rounded w-full mt-1"
                    value={variant.productVariantName || ""}
                    onChange={(e) => handleInputChange("productVariantName", e.target.value)}
                />
                {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
            </div>

            {/* SKU */}
            <div>
                <label className="text-slate-400">SKU:</label>
                <input
                    type="text"
                    className="bg-slate-800 p-2 rounded w-full mt-1 opacity-60 cursor-not-allowed"
                    value={variant.sku || ""}
                    readOnly
                />
            </div>

            {/* Giá */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-slate-400">Giá gốc (₫):</label>
                    <input
                        type="number"
                        className="bg-slate-800 p-2 rounded w-full mt-1"
                        value={variant.rootPrice || ""}
                        onChange={(e) => handleInputChange("rootPrice", Number(e.target.value))}
                    />
                    {errors.rootPrice && (
                        <p className="text-red-400 text-sm mt-1">{errors.rootPrice}</p>
                    )}
                </div>

                <div>
                    <label className="text-slate-400">Giá hiện tại (₫):</label>
                    <input
                        type="number"
                        className="bg-slate-800 p-2 rounded w-full mt-1"
                        value={variant.currentPrice || ""}
                        onChange={(e) => handleInputChange("currentPrice", Number(e.target.value))}
                    />
                    {errors.currentPrice && (
                        <p className="text-red-400 text-sm mt-1">{errors.currentPrice}</p>
                    )}
                </div>
            </div>

            {/* Tồn kho */}
            <div>
                <label className="text-slate-400">Tồn kho:</label>
                <input
                    type="number"
                    className="bg-slate-800 p-2 rounded w-full mt-1 opacity-60 cursor-not-allowed"
                    value={variant.stock ?? 0}
                    readOnly
                />
            </div>

            {/* Thuộc tính phiên bản */}
            <div className="mt-4 p-3 border border-slate-700 rounded-lg">
                <h3 className="text-slate-400 font-semibold mb-2">
                    Giá trị thuộc tính (dùng để chia các phiên bản)
                </h3>

                {attributes.map((att, index) => (
                    <div key={index} className="mb-3">
                        <label className="text-slate-300">{att}:</label>
                        <input
                            type="text"
                            className={`bg-slate-800 p-2 rounded w-full mt-1 ${errors.variantAttributes ? "border border-red-500" : ""
                                }`}
                            value={values[index]}
                            onChange={(e) => handleValueChange(index, e.target.value)}
                        />
                    </div>
                ))}

                {errors.variantAttributes && (
                    <p className="text-red-500 text-sm mt-1">{errors.variantAttributes}</p>
                )}
            </div>

            {/* Trạng thái */}
            <div className="mt-4">
                <label className="text-slate-400">Trạng thái:</label>
                <div
                    onClick={() =>
                        handleInputChange(
                            "status",
                            variant.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
                        )
                    }
                    className={`mt-1 w-12 h-6 flex items-center rounded-full cursor-pointer transition
                        ${variant.status === "ACTIVE"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                >
                    <div
                        className={`w-5 h-5 bg-white rounded-full shadow transform transition
                            ${variant.status === "ACTIVE"
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                    ></div>
                </div>
                <span className="text-sm text-slate-400 mt-1 block">
                    {variant.status === "ACTIVE" ? "Đang hoạt động" : "Ngừng kinh doanh"}
                </span>
            </div>

            {/* Ảnh phiên bản */}
            <div className="mt-4">
                <label className="text-slate-400 mb-1 block">Ảnh biến thể:</label>
                <div className="relative w-40 h-40 group rounded-lg overflow-hidden">
                    {previewImage || variant.variantImage ? (
                        <>
                            <img
                                src={previewImage || variant.variantImage}
                                alt="Variant"
                                className="w-40 h-40 object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
                            />
                            <button
                                onClick={() => {
                                    setPreviewImage("");
                                    setImageFile(null);
                                    handleInputChange("variantImage", null);
                                }}
                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition rounded-full p-1 border border-red-400/50 bg-red-500/20 hover:bg-red-500/30 text-white"
                            >
                                <XCircle size={20} />
                            </button>
                        </>
                    ) : (
                        <div className="w-40 h-40 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">
                            Chưa có ảnh
                        </div>
                    )}
                </div>

                <label className="mt-2 inline-block bg-blue-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-700">
                    {previewImage || variant.variantImage ? "Đổi ảnh" : "Thêm ảnh"}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setImageFile(file);
                                setPreviewImage(URL.createObjectURL(file));
                            }
                        }}
                    />
                </label>

                {errors.image && (
                    <p className="text-red-400 text-sm mt-1">{errors.image}</p>
                )}
            </div>
        </div>
    );
}
