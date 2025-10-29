import React from "react";
import { Star } from "lucide-react";

const ProductReviewsSection = ({ productName, reviewStats, reviews }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h2 className="text-xl font-bold mb-6 text-black">
                Đánh giá {productName}
            </h2>

            <div className="grid grid-cols-2 gap-8 mb-8">
                {/* Tổng quan đánh giá */}
                <div className="text-center">
                    <div className="text-5xl font-bold mb-2 text-black">
                        5.0
                        <span className="text-2xl text-gray-400">/5</span>
                    </div>
                    <div className="flex justify-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map(i => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>
                    <p className="text-gray-600">25 lượt đánh giá</p>
                    <button className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg">
                        Viết đánh giá
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
                                                    className={`w-4 h-4 ${
                                                        i < star
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
                {["Tất cả", "Có hình ảnh", "5 sao", "4 sao", "3 sao", "2 sao", "1 sao"].map((filter, idx) => (
                    <button
                        key={idx}
                        className={`px-4 py-2 border rounded-lg whitespace-nowrap hover:bg-gray-50 text-black ${
                            filter === "Tất cả" ? "border-blue-600 text-blue-600 font-medium" : ""
                        }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Danh sách đánh giá */}
            <div className="space-y-6">
                {reviews.map((review, idx) => (
                    <div key={idx} className="border-b pb-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-semibold">
                                {review.name[0]}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="font-semibold text-black">{review.name}</span>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${
                                                    i <= review.rating
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "fill-gray-200 text-gray-200"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-500">{review.title}</span>
                                </div>

                                <p className="text-sm text-gray-700 mb-2">{review.content}</p>
                                <p className="text-xs text-gray-500">⏱ Đánh giá đã đăng vào {review.time}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductReviewsSection;
