import { Home, Package } from 'lucide-react';
import ProductGrid from '../../product/ProductGrid';
import React, { useState, useEffect } from 'react';


const SearchPage = () => {
    // --- Dữ liệu mẫu tạm ---
    const [sort, setSort] = useState("asc");
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages] = useState(3);

    const [products] = useState([
        {
            name: "iPhone 15 128GB",
            price: "23.990.000",
            image: "https://cdn.tgdd.vn/Products/Images/42/329149/iphone-15-blue-thumbnew-600x600.jpg",
        },
        {
            name: "iPhone 15 Plus 256GB",
            price: "27.990.000",
            image: "https://cdn.tgdd.vn/Products/Images/42/329147/iphone-15-plus-thumbnew-600x600.jpg",
        },
        {
            name: "iPhone 15 Pro 128GB",
            price: "30.990.000",
            image: "https://cdn.tgdd.vn/Products/Images/42/329146/iphone-15-pro-thumbnew-600x600.jpg",
        },
    ]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Home className="w-5 h-5 text-gray-600" />
                            <span className="text-sm text-gray-600">
                                <a href="/" className="hover:underline text-blue-600">
                                    Trang chủ
                                </a>
                            </span>
                            <span className="text-gray-400">/</span>
                            <span className="text-sm font-medium text-black bg-white px-1 rounded">
                                Kết quả tìm kiếm cho iPhone 15
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">
                <div className="flex items-center gap-2 mb-6">

                    <button
                        onClick={() => setSort("relevance")}
                        className={`px-4 py-2 border rounded-lg text-sm transition-all ${sort === "relevance"
                            ? "bg-red-600 text-white border-red-600"
                            : "border-gray-300 text-black"
                            }`}
                    >
                        🔎 Liên quan
                    </button>
                    <button
                        onClick={() => setSort("asc")}
                        className={`px-4 py-2 border rounded-lg text-sm transition-all ${sort === "asc"
                            ? "bg-red-600 text-white border-red-600"
                            : "border-gray-300 text-black"
                            }`}
                    >
                        ↑ Giá Thấp - Cao
                    </button>

                    <button
                        onClick={() => setSort("desc")}
                        className={`px-4 py-2 border rounded-lg text-sm transition-all ${sort === "desc"
                            ? "bg-red-600 text-white border-red-600"
                            : "border-gray-300 text-black"
                            }`}
                    >
                        ↓ Giá Cao - Thấp
                    </button>


                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64">
                        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-3 text-gray-700 font-medium">
                            Đang tải sản phẩm...
                        </p>
                    </div>
                ) : products.length > 0 ? (
                    <>
                        <ProductGrid products={products} />

                        {/* Pagination */}
                        <div className="flex justify-center items-center mt-6 gap-4 flex-wrap">
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
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <Package className="w-10 h-10 mb-2" />
                        <p>Không tìm thấy sản phẩm phù hợp</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default SearchPage;