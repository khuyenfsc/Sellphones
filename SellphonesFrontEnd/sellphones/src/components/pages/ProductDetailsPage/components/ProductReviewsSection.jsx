import React, { useState, useEffect, useRef } from "react";
import { Star, StarHalf, ChevronLeft, ChevronRight, X } from "lucide-react";
import ReviewService from "../../../../service/ReviewService";
import OrderService from "../../../../service/OrderService";
import ReviewModal from "./ReviewModal";

const ProductReviewsSection = ({ productName, productVariantId, reviewStats }) => {
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImages, setCurrentImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [checking, setChecking] = useState(true);
    const [purchased, setPurchased] = useState(false);
    const totalReviews = Object.values(reviewStats).reduce((sum, count) => sum + count, 0);
    const averageRating = totalReviews === 0
        ? 0
        : (
            Object.entries(reviewStats).reduce(
                (sum, [rating, count]) => sum + Number(rating) * count,
                0
            ) / totalReviews
        ).toFixed(1);

    const [filters, setFilters] = useState({
        hasPhotos: null,
        ratingScore: null,
        size: 1,
    });

    const filterButtons = ["Tất cả", "Có hình ảnh", "5 sao", "4 sao", "3 sao", "2 sao", "1 sao"];


    // --- Xử lý sao ---
    const avg = parseFloat(averageRating);
    const fullStars = Math.floor(avg);
    const decimal = avg - fullStars;
    const hasHalfStar = decimal >= 0.25 && decimal < 0.75;
    const starsToShow = fullStars + (decimal >= 0.75 ? 1 : 0);
    const emptyStars = 5 - starsToShow - (hasHalfStar ? 1 : 0);

    const handleReviewSuccess = (newReview) => {
        console.log(reviews);
        // ✅ Cập nhật ngay danh sách review (không cần reload)
        setReviews(prev => [newReview, ...prev]);
    };

    // Khi click vào filter
    const handleFilterClick = (filter) => {
        setFilters((prev) => {
            if (filter === "Tất cả") {
                return { ...prev, hasPhotos: null, ratingScore: null }; // reset
            }
            if (filter === "Có hình ảnh") {
                return { ...prev, hasPhotos: prev.hasPhotos ? null : true }; // toggle
            }
            if (filter.endsWith("sao")) {
                const rating = parseInt(filter[0]);
                return { ...prev, ratingScore: prev.ratingScore === rating ? null : rating };
            }
            return prev;
        });
    };

    const fetchReviews = async () => {
        const data = await ReviewService.getReviews({
            productVariantId,
            ...filters,
            page: currentPage - 1
        });

        if (data) {
            setReviews(data.result);
            setTotal(data.total || 0);
            setTotalPages(data.totalPages || 1);
        }
    };

    const openLightbox = (images, index) => {
        setCurrentImages(images);
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => setLightboxOpen(false);
    const prevImage = () =>
        setCurrentIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1));
    const nextImage = () =>
        setCurrentIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1));

    useEffect(() => {
        fetchReviews();
    }, [filters, productVariantId]);

    useEffect(() => {
        // console.log("🔄 Fetch reviews for page:", currentPage);
        fetchReviews()
    }, [currentPage]);

    useEffect(() => {
        const checkPurchase = async () => {
            if (!productVariantId) return;
            setChecking(true);
            const res = await OrderService.checkUserPurchasedVariant(productVariantId);
            setChecking(false);
            if (res.success) {
                console.log(res.result)
                setPurchased(res.result);
            }
        };
        checkPurchase();
    }, [productVariantId]);


    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h2 className="text-xl font-bold mb-6 text-black">
                Đánh giá {productName}
            </h2>

            <div className="grid grid-cols-2 gap-8 mb-8">
                {/* Tổng quan đánh giá */}
                <div className="text-center">
                    <div className="text-5xl font-bold mb-2 text-black">
                        {averageRating}
                        <span className="text-2xl text-gray-400">/5</span>
                    </div>
                    <div className="flex justify-center gap-1 mb-2">
                        {/* Sao đầy */}
                        {Array.from({ length: fullStars }).map((_, i) => (
                            <Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}

                        {/* Nửa sao */}
                        {hasHalfStar && (
                            <StarHalf className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        )}

                        {/* Sao trống */}
                        {Array.from({ length: emptyStars }).map((_, i) => (
                            <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
                        ))}
                    </div>
                    <p className="text-gray-600">{totalReviews} lượt đánh giá</p>
                    <button
                        onClick={() => purchased && setShowModal(true)}
                        className={`mt-4 px-6 py-2 rounded-lg text-white transition-colors ${purchased
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-gray-400 cursor-not-allowed"
                            }`}
                        disabled={!purchased || checking}
                    >
                        {checking
                            ? "Đang kiểm tra..."
                            : purchased
                                ? "Viết đánh giá"
                                : "Chưa thể đánh giá"}
                    </button>
                </div>

                {/* Thống kê sao */}
                <div>
                    <h3 className="font-semibold mb-3 text-black">Đánh giá theo trải nghiệm</h3>
                    <div className="space-y-2">
                        {Object.entries(reviewStats)
                            .sort((a, b) => b[0] - a[0])
                            .map(([star, count]) => (
                                <div key={star} className="flex items-center justify-between">
                                    <span className="text-sm text-black">{star} sao</span>
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < star
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "fill-gray-200 text-gray-200"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-black">{count} đánh giá</span>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Bộ lọc đánh giá */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {filterButtons.map((filter, idx) => {
                    const isActive =
                        (filter === "Tất cả" && !filters.hasPhotos && !filters.ratingScore) ||
                        (filter === "Có hình ảnh" && filters.hasPhotos) ||
                        (filter.endsWith("sao") && filters.ratingScore === parseInt(filter[0]));

                    return (
                        <button
                            key={idx}
                            onClick={() => handleFilterClick(filter)}
                            className={`px-4 py-2 border rounded-lg whitespace-nowrap hover:bg-gray-50 text-black ${isActive ? "border-blue-600 text-blue-600 font-medium bg-blue-50" : ""
                                }`}
                        >
                            {filter}
                        </button>
                    );
                })}
            </div>

            {/* Danh sách đánh giá */}
            <div className="space-y-6">
                {reviews?.map((review, idx) => (
                    <div key={review.id || idx} className="border-b pb-6">
                        <div className="flex items-start gap-4">
                            {/* Avatar */}
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-semibold text-white">
                                {review.user?.fullName?.charAt(0)?.toUpperCase() || "?"}
                            </div>

                            <div className="flex-1">
                                {/* Tên + Rating */}
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="font-semibold text-black">
                                        {review.user?.fullName}
                                    </span>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i <= review.ratingScore
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "fill-gray-200 text-gray-200"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Nội dung */}
                                <p className="text-sm text-gray-700 mb-2">{review.content}</p>

                                {/* Hình ảnh */}
                                {review.imageNames && review.imageNames.length > 0 && (
                                    <div className="flex gap-2 flex-wrap mb-2">
                                        {review.imageNames.slice(0, 5).map((imgUrl, imgIdx) => {
                                            const isLastVisible =
                                                imgIdx === 4 &&
                                                review.imageNames.length > 5;
                                            return (
                                                <div
                                                    key={imgIdx}
                                                    className="relative cursor-pointer"
                                                    onClick={() =>
                                                        openLightbox(
                                                            review.imageNames,
                                                            imgIdx
                                                        )
                                                    }
                                                >
                                                    <img
                                                        src={imgUrl}
                                                        alt={`review-img-${imgIdx}`}
                                                        className="w-20 h-20 object-cover rounded-lg border"
                                                    />
                                                    {/* Overlay "+N" */}
                                                    {isLastVisible && (
                                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                                                            <span className="text-white font-semibold text-lg">
                                                                +{review.imageNames.length - 5}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Thời gian */}
                                <p className="text-xs text-gray-500">
                                    ⏱ Đánh giá đã đăng vào{" "}
                                    {new Date(
                                        review.createdAt
                                    ).toLocaleString("vi-VN")}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 🖼 Lightbox */}
            {lightboxOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white text-2xl hover:text-red-400"
                    >
                        <X size={28} />
                    </button>

                    <button
                        onClick={prevImage}
                        className="absolute left-6 text-white hover:text-red-400"
                    >
                        <ChevronLeft size={36} />
                    </button>

                    <img
                        src={currentImages[currentIndex]}
                        alt="review-full"
                        className="max-w-[80%] max-h-[80%] object-contain rounded-lg"
                    />

                    <button
                        onClick={nextImage}
                        className="absolute right-6 text-white hover:text-red-400"
                    >
                        <ChevronRight size={36} />
                    </button>

                    <div className="absolute bottom-6 text-gray-300 text-sm">
                        {currentIndex + 1}/{currentImages.length}
                    </div>
                </div>
            )}

            {/* Phân trang */}
            <div className="flex justify-center items-center mt-6 gap-4 flex-wrap">
                {/* Nút Trang trước */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className={`px-3 py-2 rounded-lg border text-sm ${currentPage === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white hover:bg-red-50 border-red-400 text-red-500"
                        }`}
                >
                    Trang trước
                </button>

                {/* Dropdown chọn trang */}
                <div className="flex items-center gap-2">
                    <p className="text-gray-700 font-medium">Trang</p>
                    <select
                        value={currentPage}
                        onChange={(e) => setCurrentPage(Number(e.target.value))}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm 
                        focus:ring-2 focus:ring-red-400 focus:outline-none 
                        bg-white text-black"
                    >
                        {Array.from({ length: totalPages }, (_, i) => (
                            <option
                                key={i + 1}
                                value={i + 1}
                                className="bg-white text-black"
                            >
                                {i + 1}
                            </option>
                        ))}
                    </select>
                    <p className="text-gray-700 font-medium">/ {totalPages}</p>
                </div>

                {/* Nút Trang sau */}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className={`px-3 py-2 rounded-lg border text-sm ${currentPage === totalPages
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white hover:bg-red-50 border-red-400 text-red-500"
                        }`}
                >
                    Trang sau
                </button>
            </div>

            {/* Modal hiển thị khi bấm */}
            {showModal && (
                <ReviewModal
                    variantId={productVariantId}
                    onClose={() => setShowModal(false)}
                    onReviewSuccess={handleReviewSuccess}
                />
            )}

        </div>
    );
};

export default ProductReviewsSection;
