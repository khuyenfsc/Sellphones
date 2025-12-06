import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { Save, XCircle, Plus, Trash2, PlusCircle, Pencil } from "lucide-react";
import AdminProductService from "../../../service/AdminProductService";
import VariantAttributeList from "./components/VariantAttributeList";
import GiftProductList from "./components/GiftProductList";
import PromotionList from "./components/PromotionList";
import WarrantyList from "./components/WarrantyList";
import VariantBasicInfoSection from "./components/VariantBasicInfoSection";

const AdminVariantDetailsPage = () => {
    const { variantId } = useParams();
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    const [attributes, setAttributes] = useState([]);
    const [values, setValues] = useState([]);
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

        const att = product.variantAttributeNames?.split("-") || [];
        setAttributes(att);

        if (variant?.variantAttributeValues) {
            const defaultValues = variant.variantAttributeValues.split("-");
            setValues(defaultValues);
        } else {
            setValues(att.map(() => ""));
        }

        if (variant) {
            setPreviewImage(variant.variantImage);

            const ids = variant.attributeValues.map(a => a.id);
            setAttributeValueIds(ids);
        }

    }, [product, variant]);

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
                    <VariantBasicInfoSection 
                        variant={variant} 
                        setVariant={setVariant} 
                        errors={errors}
                        setImageFile={setImageFile}
                        attributes={attributes}
                    />

                    {/* Attribute Values */}
                    <VariantAttributeList variant={variant} setVariant={setVariant}/>

                    {/* Gift Products */}
                    <GiftProductList variant={variant} setVariant={setVariant} />            
                </div>

                {/* Right panel: Promotions & Warranties */}
                <div className="w-96 flex flex-col gap-6">
                    {/* Promotions */}
                    <PromotionList variant={variant} setVariant={setVariant} />            

                    {/* Warranties */}
                    <WarrantyList variant={variant} setVariant={setVariant} />            
                </div>
            </div>

        </div>
    );
};

export default AdminVariantDetailsPage;