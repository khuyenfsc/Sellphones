import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Heart, Star } from 'lucide-react';

const FeaturedProductsSection = () => {
    const [activeTab, setActiveTab] = useState('phone');

    const categories = [
        { id: 'phone', label: 'Điện thoại', icon: '📱' },
        { id: 'charging', label: 'Điện thoại chụp ảnh đẹp', icon: '📷' },
        { id: '5g', label: 'Điện thoại 5G', icon: '5️⃣' },
        { id: 'gaming', label: 'Điện thoại chơi game', icon: '🎮' },
        { id: 'pin', label: 'Điện thoại pin trâu', icon: '🔋' },
        { id: 'gap', label: 'Điện thoại gập', icon: '📲' },
    ];

    const brands = ['Apple', 'Samsung', 'Xiaomi', 'OPPO', 'TECNO', 'HONOR', 'Nubia', 'Sony', 'Nokia', 'Infinix', 'Nokia'];

    const products = [
        {
            id: 1,
            name: 'iPhone Air 256GB | Chính hãng',
            price: '31.390.000₫',
            oldPrice: '31.990.000₫',
            discount: 'Giảm 2%',
            installment: 'Trả góp 0%',
            rating: 5,
            image: '/api/placeholder/200/200',
            promo: 'Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ hạn 3-6...',
            bgColor: 'bg-blue-50'
        },
        {
            id: 2,
            name: 'iPhone 16 Pro Max 256GB | Chính hãng VN/A',
            price: '30.490.000₫',
            oldPrice: '34.990.000₫',
            discount: 'Giảm 13%',
            installment: 'Trả góp 0%',
            rating: 4.9,
            image: '/api/placeholder/200/200',
            promo: 'Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ hạn 3-6...',
            bgColor: 'bg-gray-100'
        },
        {
            id: 3,
            name: 'iPhone 17 Pro Max 256GB | Chính hãng',
            price: '37.990.000₫',
            discount: 'Trả góp 0%',
            tag: 'Hàng đặt trước',
            rating: 5,
            image: '/api/placeholder/200/200',
            promo: 'Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ hạn 3-6...',
            bgColor: 'bg-orange-100'
        },
        {
            id: 4,
            name: 'Samsung Galaxy S25 Ultra 12GB 256GB',
            price: '28.280.000₫',
            oldPrice: '33.990.000₫',
            discount: 'Giảm 15%',
            installment: 'Trả góp 0%',
            rating: 4.7,
            image: '/api/placeholder/200/200',
            badge: 'S-Student giảm thêm 700.000₫',
            promo: 'Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ hạn 3-6...',
            bgColor: 'bg-gray-100'
        },
        {
            id: 5,
            name: 'iPhone 17 256GB | Chính hãng',
            price: '24.990.000₫',
            tag: 'Hàng đặt trước',
            installment: 'Trả góp 0%',
            rating: 5,
            image: '/api/placeholder/200/200',
            bgColor: 'bg-purple-50'
        },
        {
            id: 6,
            name: 'Samsung Galaxy Z Flip7 12GB 256GB',
            price: '26.990.000₫',
            oldPrice: '28.990.000₫',
            discount: 'Giảm 7%',
            installment: 'Trả góp 0%',
            rating: 4.9,
            image: '/api/placeholder/200/200',
            badge: 'S-Student giảm thêm 700.000₫',
            bgColor: 'bg-blue-50'
        },
        {
            id: 7,
            name: 'Samsung Galaxy S25 256GB',
            price: '16.690.000₫',
            oldPrice: '22.990.000₫',
            discount: 'Giảm 28%',
            installment: 'Trả góp 0%',
            rating: 5,
            image: '/api/placeholder/200/200',
            badge: 'S-Student giảm thêm 700.000₫',
            bgColor: 'bg-blue-100'
        },
        {
            id: 8,
            name: 'iPhone 17 Pro 256GB | Chính hãng',
            price: '34.990.000₫',
            installment: 'Trả góp 0%',
            rating: 4.7,
            image: '/api/placeholder/200/200',
            promo: 'Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ hạn 3-6...',
            bgColor: 'bg-orange-100'
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Tabs */}
            <div className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-around py-4">
                        <button className="text-red-600 font-semibold border-b-2 border-red-600 pb-2">
                            ĐIỆN THOẠI
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6">

                {/* Brand Filter */}
                <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
                    <div className="flex items-center gap-2 overflow-x-auto">
                        {brands.map((brand, idx) => (
                            <button
                                key={idx}
                                className={`px-4 py-2 rounded-full text-sm border whitespace-nowrap 
                                    ${idx === 0
                                        ? 'bg-red-50 border-red-500 text-red-600'
                                        : 'border-gray-300 hover:border-gray-400 text-black'
                                    }`}
                            >
                                {brand}
                            </button>
                        ))}
                        <button className="flex items-center gap-1 px-4 py-2 text-blue-600 text-sm whitespace-nowrap">
                            Xem tất cả <ChevronRight size={16} />
                        </button>
                    </div>
                </div>


                {/* Product Grid */}
                <div className="grid grid-cols-4 gap-3">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white text-black rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                        >
                            {/* Product Image */}
                            <div className={`relative ${product.bgColor} p-4`}>
                                {product.discount && (
                                    <span className="absolute top-1 left-1 bg-red-600 text-white text-[11px] px-1.5 py-0.5 rounded">
                                        {product.discount}
                                    </span>
                                )}
                                {product.installment && (
                                    <span className="absolute top-1 right-1 bg-blue-100 text-blue-700 text-[11px] px-1.5 py-0.5 rounded">
                                        {product.installment}
                                    </span>
                                )}
                                {product.tag && (
                                    <span className="absolute top-1 left-1 bg-red-600 text-white text-[11px] px-1.5 py-0.5 rounded">
                                        {product.tag}
                                    </span>
                                )}
                                <div className="aspect-square flex items-center justify-center">
                                    <div className="w-28 h-28 bg-gray-200 rounded-lg"></div>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-3">
                                <h3 className="text-base font-semibold mb-1.5 line-clamp-2 text-gray-900">
                                    {product.name}
                                </h3>

                                <div className="mb-1.5">
                                    <span className="text-red-600 font-bold text-base">{product.price}</span>
                                    {product.oldPrice && (
                                        <span className="text-gray-500 text-xs line-through ml-1 block">{product.oldPrice}</span>
                                    )}
                                </div>

                                {product.badge && (
                                    <div className="text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded mb-1.5">
                                        {product.badge}
                                    </div>
                                )}

                                {product.promo && (
                                    <p className="text-xs text-gray-700 mb-2 line-clamp-2">
                                        {product.promo}
                                    </p>
                                )}

                                {/* Rating & Favorite */}
                                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                                    <div className="flex items-center gap-0.5 text-gray-800">
                                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-medium">{product.rating}</span>
                                    </div>
                                    <button className="text-blue-600 hover:text-blue-700">
                                        <Heart size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
};

export default FeaturedProductsSection;