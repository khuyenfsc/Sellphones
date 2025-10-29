import React, { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Info,
    MessageCircle,
    Star,
} from "lucide-react";
import ProductSpecsModal from "./ProductSpecsModal";

const ProductDetailSection = ({ productVariant, product }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const [showSpecs, setShowSpecs] = useState(false);

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev > 0 ? prev - 1 : product.images.length - 1
        );
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev < product.images.length - 1 ? prev + 1 : 0
        );
    };

    return (
        <>
            <div className="col-span-6">
                <div className="bg-white rounded-lg shadow-sm p-4">
                    {/* Tên sản phẩm */}
                    <div className="text-lg font-semibold text-black mb-2">
                        {productVariant?.productVariantName || ""}
                    </div>

                    {/* Đánh giá */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-black">{product?.averageRating}</span>
                            <span className="text-gray-500 text-sm">({product?.totalReviews})</span>
                        </div>
                    </div>

                    {/* Nút hỏi đáp + thông số */}
                    <div className="flex gap-2 mb-4">
                        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                            <MessageCircle className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-black">Hỏi đáp</span>
                        </button>
                        <button
                            onClick={() => setShowSpecs(true)}
                            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                        >
                            <Info className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-black">Thông số</span>
                        </button>
                    </div>

                    {/* Ảnh chính */}
                    <div className="relative bg-gray-100 rounded-lg mb-4 h-96 flex items-center justify-center overflow-hidden">
                        {product?.images?.length > 0 ? (
                            <img
                                src={product.images[currentImageIndex]}
                                alt={`Ảnh ${currentImageIndex + 1}`}
                                className="object-contain w-full h-full"
                            />
                        ) : (
                            <p className="text-gray-500">Không có ảnh</p>
                        )}

                        {/* Nút trái */}
                        {product?.images?.length > 1 && (
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-3 shadow-lg"
                            >
                                <ChevronLeft className="w-6 h-6 text-gray-700" />
                            </button>
                        )}

                        {/* Nút phải */}
                        {product?.images?.length > 1 && (
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-3 shadow-lg"
                            >
                                <ChevronRight className="w-6 h-6 text-gray-700" />
                            </button>
                        )}
                    </div>


                    {/* Thumbnail */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">

                        {/* Danh sách ảnh nhỏ */}
                        <div className="flex gap-2">
                            {product?.images?.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`border-2 rounded-lg overflow-hidden flex-shrink-0 ${currentImageIndex === idx
                                        ? "border-red-500"
                                        : "border-transparent hover:border-gray-300"
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${idx + 1}`}
                                        className="w-16 h-16 object-cover"
                                    />
                                </button>
                            ))}
                        </div>

                    </div>


                    {/* Các badge thông tin */}
                    <div className="mt-6 space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-sm">!</span>
                            </div>
                            <p className="text-sm text-black">
                                Mới, đầy đủ phụ kiện từ nhà sản xuất
                            </p>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-sm">⚡</span>
                            </div>
                            <p className="text-sm text-black">
                                Bảo hành 12 tháng tại trung tâm bảo hành chính hãng. 1 đổi 1
                                trong 30 ngày nếu có lỗi phần cứng từ nhà sản xuất.
                            </p>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-sm">$</span>
                            </div>
                            <p className="text-sm text-black">
                                Giá sản phẩm đã bao gồm thuế VAT, giúp bạn yên tâm và dễ dàng
                                trong việc tính toán chi phí.
                            </p>
                        </div>
                    </div>

                    {/* Mô tả */}
                    <div className="mt-6">
                        <h2 className="text-xl font-bold mb-2 text-black">Mô tả</h2>
                        <div
                            className={`bg-white rounded-lg p-4 shadow-sm transition-all duration-300 ${expanded ? "h-96" : "h-48"
                                } overflow-y-auto`}
                        >
                            <p className="text-sm text-gray-700 whitespace-pre-line">
                                {product?.description}
                            </p>
                        </div>

                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="mt-2 text-blue-600 text-sm font-medium"
                        >
                            {expanded ? "Thu gọn" : "Xem thêm"}
                        </button>
                    </div>
                </div>
            </div>
            {/* Modal hiển thị thông số kỹ thuật */}
            {showSpecs && productVariant && (
                <ProductSpecsModal
                    show={showSpecs}
                    onClose={() => setShowSpecs(false)}
                    productVariant={productVariant}
                />
            )}
        </>
    );
};

export default ProductDetailSection;
