import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { Save, XCircle, Plus, Trash2, PlusCircle, Pencil } from "lucide-react";
import AdminProductService from "../../../service/AdminProductService";
import AttributeSearchModal from "./components/AttributeSearchModal";

const AdminVariantDetailsPage = () => {
    const { variantId } = useParams();
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    const [attributes, setAttributes] = useState([]);
    const [values, setValues] = useState([]);
    const [isAttributeSearchModalOpen, setIsAttributeSearchModalOpen] = useState(false);
    const [modalAttr, setModalAttr] = useState(null);
    const [variant, setVariant] = useState(null);
    const [attributeValueIds, setAttributeValueIds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [variantName, setVariantName] = useState("");
    const [errors, setErrors] = useState({
        name: "",
        sku: "",
        rootPrice: "",
        currentPrice: "",
        stock: "",
        image: "",
        variantAttributes: ""
    });

    const fetchVariant = async () => {
        try {
            const res = await AdminProductService.getProductVariantById(variantId);
            if (res.success) {
                setVariant(res.data);
                setVariantName(res.data?.productVariantName);

            }
        } catch (err) {
            toast.error("Lỗi tải sản phẩm");
        }
    };

    const fetchProduct = async () => {
        try {
            const res = await AdminProductService.getProductById(productId);
            if (res.success) {
                setProduct(res.data);
            }
        } catch (err) {
            toast.error("Lỗi tải sản phẩm");
        }
    };

    useEffect(() => {
        fetchVariant();
    }, [variantId]);

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    useEffect(() => {
        if (!product) return;

        // Split names từ product
        const att = product.variantAttributeNames?.split("-") || [];
        setAttributes(att);

        // Nếu variant tồn tại → điền sẵn giá trị
        if (variant?.variantAttributeValues) {
            const defaultValues = variant.variantAttributeValues.split("-");
            setValues(defaultValues);
        } else {
            // Không có variant → để trống
            setValues(att.map(() => ""));
        }

        // Các logic khác của variant
        if (variant) {
            setPreviewImage(variant.variantImage);

            const ids = variant.attributeValues.map(a => a.id);
            setAttributeValueIds(ids);
        }

    }, [product, variant]);


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

    const validate = () => {
        const newErrors = {
            name: "",
            sku: "",
            rootPrice: "",
            currentPrice: "",
            stock: "",
            image: "",
            variantAttributes: ""
        };

        const hasEmpty = values.some(v => !v || v.trim() === "");
        if (hasEmpty) {
            newErrors.variantAttributes = "Không được để trống bất kỳ giá trị thuộc tính nào.";
        }

        if (!variant.productVariantName?.trim()) {
            newErrors.name = "Tên phiên bản không được để trống.";
        }

        if (!variant.sku?.trim()) {
            newErrors.sku = "SKU không được để trống.";
        }

        if (!variant.rootPrice || variant.rootPrice <= 0) {
            newErrors.rootPrice = "Giá gốc phải lớn hơn 0.";
        }

        if (!variant.currentPrice || variant.currentPrice <= 0) {
            newErrors.currentPrice = "Giá hiện tại phải lớn hơn 0.";
        }

        if (variant.stock < 0) {
            newErrors.stock = "Tồn kho không được âm.";
        }

        if (!previewImage && !variant.variantImage) {
            newErrors.image = "Ảnh biến thể không được để trống.";
        }

        setErrors(newErrors);
        return Object.values(newErrors).every((e) => e === "");
    };

    const handleSave = async () => {
        if (!validate()) {
            Swal.fire({
                icon: "warning",
                title: "Lỗi",
                text: "Vui lòng kiểm tra lại các trường nhập liệu!",
            });
            return;
        }

        const result = await Swal.fire({
            title: "Xác nhận",
            text: "Bạn có chắc muốn lưu thay đổi?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy",
        });

        if (!result.isConfirmed) return;

        setLoading(true);

        try {
            // Map dữ liệu variant sang request format
            const productVariantRequest = {
                productVariantName: variant.productVariantName,
                rootPrice: variant.rootPrice,
                currentPrice: variant.currentPrice,
                status: variant.status,
                variantAttributeValues: values.join("-"),
                promotionIds: variant.promotions?.map(p => p.id) || [],
                giftProductIds: variant.giftProducts?.map(g => g.id) || [],
                attributeValueIds: attributeValueIds,
                warrantyIds: variant.warranties?.map(w => w.id) || []
            };

            // Gọi API update với file
            const res = await AdminProductService.updateProductVariant(
                variant.id,
                productVariantRequest,
                imageFile
            );

            if (res.success) {
                toast.success("Cập nhật thành công!");
            } else {
                toast.error(res.message || "Cập nhật thất bại!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Có lỗi xảy ra khi cập nhật sản phẩm!");
        } finally {
            setLoading(false);
        }
    };


    const handleDeleteVariant = async () => {
        if (!variantId) {
            toast.error("Không tìm thấy phiên bản để xóa.");
            return;
        }

        const result = await Swal.fire({
            title: "Xác nhận xóa",
            text: "Bạn có chắc chắn muốn xóa phiên bản này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        });

        if (!result.isConfirmed) return;

        try {
            const res = await AdminProductService.deleteProductVariant(variantId);

            if (res.success) {
                toast.success("Xóa phiên bản thành công!");
                navigate(`/admin/products/view/${productId}`);
            } else {
                toast.error(res.message || "Xóa phiên bản thất bại!");
            }
        } catch (err) {
            console.error(err);
            toast.error("Đã xảy ra lỗi khi xóa phiên bản");
        }
    };

    const handleSetThumbnail = async () => {
        const result = await Swal.fire({
            title: "Xác nhận",
            text: "Bạn có chắc muốn đặt phiên bản này làm phiên bản chính?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy",
        });

        if (!result.isConfirmed) return;

        try {
            setLoading(true);

            const res = await AdminProductService.setThumbnail(productId, variantId);

            if (!res.success) {
                toast.error(res.message || "Không thể đặt làm phiên bản chính");
                return;
            }

            toast.success("Đã đặt làm phiên bản chính");

            // Nếu bạn muốn load lại dữ liệu variant
            if (typeof fetchVariant === "function") {
                fetchVariant();
            }
        } catch (err) {
            toast.error("Lỗi khi đặt làm phiên bản chính");
        } finally {
            setLoading(false);
        }
    };


    if (!variant) {
        return (
            <div className="min-h-screen bg-slate-950 text-white p-6 flex items-center justify-center">
                <div className="text-xl">Đang tải...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 flex flex-col gap-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">
                    {variantName || "Chi tiết Phiên bản"}
                </h1>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleDeleteVariant}
                        className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                    >
                        <XCircle size={20} />
                        <span className="text-sm font-medium">Xóa phiên bản</span>
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center gap-2 px-5 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                    >
                        <Save size={20} /> Lưu thay đổi
                    </button>

                    <button
                        onClick={handleSetThumbnail}
                        className="flex items-center gap-2 px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                    >
                        <Save size={20} /> Đặt làm phiên bản chính
                    </button>
                </div>
            </div>

            <div className="flex gap-6">
                {/* Left panel: variant info */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Basic Info */}
                    <div className="bg-slate-900 rounded-lg p-6 flex flex-col gap-4">
                        <h2 className="text-lg font-semibold mb-2">Thông tin cơ bản</h2>

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

                        <div>
                            <label className="text-slate-400">SKU:</label>
                            <input
                                type="text"
                                className="bg-slate-800 p-2 rounded w-full mt-1 opacity-60 cursor-not-allowed"
                                value={variant.sku || ""}
                                readOnly
                            />
                        </div>


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

                        <div>
                            <label className="text-slate-400">Tồn kho:</label>
                            <input
                                type="number"
                                className="bg-slate-800 p-2 rounded w-full mt-1 opacity-60 cursor-not-allowed"
                                value={variant.stock ?? 0}
                                readOnly
                            />
                        </div>

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
                  ${variant.status === "ACTIVE" ? "bg-green-500" : "bg-red-500"}`}
                            >
                                <div
                                    className={`w-5 h-5 bg-white rounded-full shadow transform transition
                    ${variant.status === "ACTIVE" ? "translate-x-6" : "translate-x-1"}`}
                                ></div>
                            </div>
                            <span className="text-sm text-slate-400 mt-1 block">
                                {variant.status === "ACTIVE" ? "Đang hoạt động" : "Ngừng kinh doanh"}
                            </span>
                        </div>

                        {/* Variant Image */}
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

                    {/* Attribute Values */}
                    <div className="bg-slate-900 rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Thuộc tính chi tiết</h2>

                            {/* Icon thêm thuộc tính */}
                            <button className="flex items-center gap-2 px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 text-sm"
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

                                    {/* Nội dung attribute */}
                                    <div className="text-slate-400 text-sm">{attr.attribute.name}</div>
                                    <div className="text-white font-medium mt-1">{attr.strVal}</div>
                                    <div className="text-slate-500 text-xs mt-1">
                                        Giá trị số: {attr.numericVal}
                                    </div>

                                    {/* ICON EDIT */}
                                    <button
                                        onClick={() => {
                                            setModalAttr(attr)
                                            setIsAttributeSearchModalOpen(true);
                                        }}
                                        className="absolute top-2 right-10 p-1 rounded hover:bg-slate-700"
                                    >
                                        <Pencil size={16} />
                                    </button>

                                    {/* ICON DELETE */}
                                    <button
                                        // onClick={() => onDeleteAttribute(attr)}
                                        className="absolute top-2 right-2 p-1 rounded hover:bg-slate-700"
                                        onClick={() => handleDeleteAttribute(attr.id)}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Gift Products */}
                    <div className="bg-slate-900 rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Quà tặng kèm</h2>
                            <button className="flex items-center gap-2 px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 text-sm">
                                <Plus size={16} /> Thêm quà tặng
                            </button>
                        </div>
                        <div className="space-y-3">
                            {variant.giftProducts?.map((gift) => (
                                <div key={gift.id} className="flex items-center gap-3 bg-slate-800 p-3 rounded-lg group">
                                    <img
                                        src={gift.thumbnail}
                                        alt={gift.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <div className="text-white font-medium">{gift.name}</div>
                                        <div className="text-slate-400 text-sm">
                                            {gift.price > 0 ? `${gift.price.toLocaleString("vi-VN")} ₫` : "Miễn phí"}
                                        </div>
                                    </div>
                                    <button className="opacity-0 group-hover:opacity-100 transition text-red-400 hover:text-red-300">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right panel: Promotions & Warranties */}
                <div className="w-96 flex flex-col gap-6">
                    {/* Promotions */}
                    <div className="bg-slate-900 rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Khuyến mãi</h2>
                            <button className="flex items-center gap-2 px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 text-sm">
                                <Plus size={16} /> Thêm
                            </button>
                        </div>
                        <div className="space-y-2">
                            {variant.promotions?.map((promo) => (
                                <div key={promo.id} className="flex items-center justify-between bg-slate-800 p-3 rounded-lg group">
                                    <span className="text-slate-200 text-sm">{promo.name}</span>
                                    <button className="opacity-0 group-hover:opacity-100 transition text-red-400 hover:text-red-300">
                                        <XCircle size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Warranties */}
                    <div className="bg-slate-900 rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Bảo hành</h2>
                            <button className="flex items-center gap-2 px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 text-sm">
                                <Plus size={16} /> Thêm
                            </button>
                        </div>
                        <div className="space-y-3">
                            {variant.warranties?.map((warranty) => (
                                <div key={warranty.id} className="bg-slate-800 p-3 rounded-lg group">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="text-white font-medium text-sm">{warranty.name}</div>
                                            <div className="text-slate-400 text-xs mt-1">{warranty.description}</div>
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className="text-blue-400 text-xs">{warranty.months} tháng</span>
                                                <span className="text-green-400 text-xs font-medium">
                                                    {warranty.price > 0 ? `${warranty.price.toLocaleString("vi-VN")} ₫` : "Miễn phí"}
                                                </span>
                                            </div>
                                        </div>
                                        <button className="opacity-0 group-hover:opacity-100 transition text-red-400 hover:text-red-300">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <AttributeSearchModal
                isOpen={isAttributeSearchModalOpen}
                onClose={() => setIsAttributeSearchModalOpen(false)}
                onSelectAttributeValue={handleAddAttributeValue}
                initialAttributeValue={modalAttr}
            />
        </div>
    );
};

export default AdminVariantDetailsPage;