import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Heart, MessageCircle, Info, Share2, ChevronLeft, ChevronRight, MapPin, Phone, Star, ShoppingCart, Check, Gift } from 'lucide-react';
import ProductService from "../../../service/ProductService";
import ProductSpecsModal from './components/ProductSpecsModal';

const images = ["📱", "💻", "⌚", "🎧"];

export default function ProductDetailsPage() {
    const [selectedStorage, setSelectedStorage] = useState('256GB');
    const [selectedColor, setSelectedColor] = useState('red');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showSpecs, setShowSpecs] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [productVariant, setProductVariant] = useState(null);


    useEffect(() => {
        if (!slug) {
            return;
        }

        const fetchProduct = async () => {
            const result = await ProductService.getProductById(slug);
            if (result) setProduct(result);
        };

        fetchProduct();
    }, [slug]);

    useEffect(() => {
        if (!product?.thumbnailProduct?.id) return;

        const fetchVariantDetails = async () => {
            const id = product.thumbnailProduct.id;
            const res = await ProductService.getProductVariantById(id);
            console.log("Chi tiết biến thể:", res);
        };

        fetchVariantDetails();
    }, [product]);

    const reviewStats = {
        "5": 23,
        "4": 5,
        "3": 2,
        "2": 0,
        "1": 1,
    };

    const longDescription = `
  Samsung Galaxy Z Flip7 12GB 256GB là chiếc smartphone đột phá với thiết kế gập màn hình độc đáo, 
  mang đến trải nghiệm sử dụng linh hoạt và tiện lợi. Với màn hình Dynamic AMOLED 2X 6.9 inches, 
  hình ảnh hiển thị sắc nét và sống động, đảm bảo trải nghiệm giải trí tuyệt vời. Camera sau 50 MP + 12 MP 
  cùng camera trước 10 MP cho phép chụp ảnh chuyên nghiệp, selfie đẹp và quay video chất lượng cao. 
  Thiết bị được trang bị dung lượng RAM 12 GB và bộ nhớ trong 256 GB, giúp chạy đa nhiệm mượt mà, 
  lưu trữ nhiều ứng dụng, game và dữ liệu. Pin 4300mAh kết hợp công nghệ sạc nhanh, đảm bảo thời gian sử dụng dài 
  mà không lo gián đoạn. Ngoài ra, máy còn hỗ trợ NFC, kết nối 5G, và các tính năng bảo mật cao cấp như vân tay, 
  nhận diện khuôn mặt. Với thiết kế sang trọng, cấu hình mạnh mẽ và nhiều tính năng thông minh, 
  Samsung Galaxy Z Flip7 là lựa chọn hoàn hảo cho những người yêu công nghệ và muốn trải nghiệm smartphone gập hiện đại.
  `.repeat(10); // nhân đôi cho thật dài

    const prevImage = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextImage = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };


    const colors = [
        { id: 'red', name: 'Đỏ san hô', price: '25.990.000đ', image: '🔴' },
        { id: 'blue', name: 'Xanh bồng', price: '25.990.000đ', image: '🔵' },
        { id: 'black', name: 'Đen tuyền', price: '25.990.000đ', image: '⚫' }
    ];

    const images = Array(8).fill('📱');

    const relatedProducts = [
        { name: 'Samsung Galaxy S25 Ultra 12GB 256GB', price: '27.280.000đ', oldPrice: '33.380.000đ', discount: '18%', rating: 4.7 },
        { name: 'iPhone 16 Pro 128GB | Chính hãng', price: '25.590.000đ', oldPrice: '28.990.000đ', discount: '12%', rating: 4.9 },
        { name: 'iPhone 17 256GB | Chính hãng', price: '24.990.000đ', status: 'Hàng đặt trước', rating: 0 },
        { name: 'iPhone 16 Plus 128GB | Chính hãng VN/A', price: '24.890.000đ', oldPrice: '25.990.000đ', discount: '4%', rating: 4.8 },
    ];

    const reviews = [
        {
            name: 'Trần',
            rating: 5,
            time: '3 ngày trước',
            performance: 'Siêu mạnh mẽ',
            battery: 'Cực khỏng',
            camera: 'Chụp đep, chuyên nghiệp',
            content: 'Chất lượng tốt. Đáng mua. Camera rõ nét. Zoom rõ'
        },
        {
            name: 'Nguyễn Đình Bảo',
            rating: 5,
            time: '3 ngày trước',
            performance: 'Siêu mạnh mẽ',
            battery: 'Cực khỏng',
            camera: 'Chụp đep, chuyên nghiệp',
            content: 'Mình chưa dùng nhưng xem review và trải nghiệm thử ở của hàng thấy Z Flip7 thật sự ấn tượng. Thiết kế gập nhỏ gọn, cầm chắc tay, màn hình ngoài rõ hơn, có thể xem giờ, nghe nhạc, trả lời tin nhắn. Camera nâng cấp, góc chụp linh hoạt nhờ có chế gập. Galaxy AI hỗ trợ chính ảnh, dịch nhanh, cảm giác đỡng mở máy chắc, nghe "tsch" đã tai. Nếu có điều kiện chắc chắn mình sẽ chọn màu này.'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            {product ? (
                <header className="bg-white text-black p-4">
                    <div className="container mx-auto">
                        <nav className="text-sm mb-2 flex items-center gap-2">
                            <a href="/" className="hover:underline text-blue-600">
                                Trang chủ
                            </a>
                            <span>/</span>

                            <a
                                href={`/category/${encodeURIComponent(product.category?.name || '')}`}
                                className="text-blue-700 hover:underline hover:text-blue-900 transition"
                            >
                                {product.category?.name || 'Đang tải...'}
                            </a>

                            <span>/</span>
                            <a
                                href={`/category/${encodeURIComponent(product.category?.name || '')}?brand=${product.brand?.id || ''}`}
                                className="text-blue-700 hover:underline hover:text-blue-900 transition"
                            >
                                {product.brand?.name || 'Đang tải...'}
                            </a>

                            <span>/</span>
                            <span>{product.name}</span>
                            <span>/</span>
                            <span className="font-semibold">{productVariant?.productVariantName || ''}</span>
                        </nav>
                    </div>
                </header>
            ) : (
                <p className="p-4 text-gray-500">Đang tải dữ liệu sản phẩm...</p>
            )}


            {/* Modal */}
            {showSpecs && (
                <ProductSpecsModal show={showSpecs} onClose={() => setShowSpecs(false)} />
            )}


            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-12 gap-6">
                    {/* Left Column - Product Images */}
                    <div className="col-span-6">
                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <div className="text-lg font-semibold text-black mb-2">
                                {productVariant?.productVariantName || ''}
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold text-black">5</span>
                                    <span className="text-gray-500 text-sm">(25 đánh giá)</span>
                                </div>
                            </div>

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

                            {/* Main Product Image with gradient background */}
                            <div className="relative bg-gradient-to-br from-pink-300 via-orange-300 to-orange-400 rounded-lg mb-4 h-96 flex items-center justify-center">
                                {/* Image / Icon full */}
                                <div className="flex items-center justify-center w-full h-full text-6xl">
                                    {images[currentIndex]}
                                </div>

                                {/* Nút trái */}
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-3 shadow-lg"
                                >
                                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                                </button>

                                {/* Nút phải */}
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-3 shadow-lg"
                                >
                                    <ChevronRight className="w-6 h-6 text-gray-700" />
                                </button>
                            </div>



                            {/* Thumbnail Images */}
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                <button className="p-2 border rounded">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`p-3 border rounded-lg flex-shrink-0 ${currentImageIndex === idx ? 'border-red-500' : ''}`}
                                    >
                                        <span className="text-2xl">{img}</span>
                                    </button>
                                ))}
                                <button className="p-2 border rounded">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Product Info Badges */}
                            <div className="mt-6 space-y-3">
                                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                                    <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-sm">!</span>
                                    </div>
                                    <p className="text-sm text-black">Mới, đây đủ phụ kiện từ nhà sản xuất</p>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                                    <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-sm">⚡</span>
                                    </div>
                                    <p className="text-sm text-black">Bảo hành 12 tháng tại trung tâm bảo hành Chính hãng. 1 đổi 1 trong 30 ngày nếu có lỗi phần cứng từ nhà sản xuất.</p>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                                    <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-sm">$</span>
                                    </div>
                                    <p className="text-sm text-black">Giá sản phẩm đã bao gồm thuế VAT, giúp bạn yên tâm và dễ dàng trong việc tính toán chi phí.</p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h2 className="text-xl font-bold mb-2 text-black">Mô tả</h2>

                                <div
                                    className={`bg-white rounded-lg p-4 shadow-sm transition-all duration-300 ${expanded ? "h-96" : "h-48"
                                        } overflow-y-auto`}
                                >
                                    <p className="text-sm text-gray-700 whitespace-pre-line">{longDescription}</p>
                                </div>

                                {/* Nút xem thêm / thu gọn */}
                                <button
                                    onClick={() => setExpanded(!expanded)}
                                    className="mt-2 text-blue-600 text-sm font-medium"
                                >
                                    {expanded ? "Thu gọn" : "Xem thêm"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Purchase Options */}
                    <div className="col-span-6">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            {/* Price Section */}
                            <div className="grid grid-cols-2 gap-4 mb-6 bg-blue-50 border border-blue-300 p-4 rounded-lg">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Giá sản phẩm</p>
                                    <p className="text-3xl font-bold text-red-600">25.990.000đ</p>
                                    <p className="text-sm text-gray-400 line-through">28.990.000đ</p>
                                </div>
                            </div>


                            {/* Storage Options */}
                            <div className="mb-6">
                                <p className="font-semibold mb-3 text-black">Phiên bản</p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setSelectedStorage('512GB')}
                                        className={`px-6 py-3 rounded-lg border-1 text-black font-medium ${selectedStorage === '512GB'
                                            ? 'border-red-500 bg-red-50'
                                            : 'border-gray-700'
                                            }`}
                                    >
                                        512GB
                                    </button>

                                    <button
                                        onClick={() => setSelectedStorage('256GB')}
                                        className={`px-6 py-3 rounded-lg border-1 text-black font-medium relative ${selectedStorage === '256GB'
                                            ? 'border-red-500 bg-red-50'
                                            : 'border-gray-700'
                                            }`}
                                    >
                                        256GB
                                        {selectedStorage === '256GB' && (
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                                <Check className="w-4 h-4 text-white" />
                                            </div>
                                        )}
                                    </button>

                                </div>
                            </div>

                            {/* Color Options */}
                            <div className="mb-6">
                                <p className="font-semibold mb-3 text-black">Màu sắc</p>
                                <div className="grid grid-cols-3 gap-3">
                                    {colors.map((color) => (
                                        <button
                                            key={color.id}
                                            onClick={() => setSelectedColor(color.id)}
                                            className={`p-4 rounded-lg border-2 flex items-center gap-3 relative text-black ${selectedColor === color.id ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                                }`}
                                        >
                                            <span className="text-2xl">{color.image}</span>
                                            <div className="text-left">
                                                <p className="font-medium text-sm">{color.name}</p>
                                                <p className="text-sm">{color.price}</p>
                                            </div>
                                            {selectedColor === color.id && (
                                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                                    <Check className="w-4 h-4 text-white" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="border-2 border-blue-700 bg-blue-100 rounded-lg p-4 mb-6">
                                {/* Tiêu đề */}
                                <div className="flex items-center gap-2 mb-3">
                                    <Gift className="w-5 h-5 text-blue-700" />
                                    <h3 className="text-lg font-bold text-blue-800">Khuyến mãi</h3>
                                </div>

                                {/* Danh sách khuyến mãi */}
                                <div className="flex flex-col gap-2">
                                    {[
                                        "GIẢM 10% cho đơn hàng đầu tiên",
                                        "RẺ VOUCHER 10 TRIỆU",
                                        "HOÀNG GIÁ HẤN",
                                        "Miễn phí vận chuyển cho đơn trên 5 triệu"
                                    ].map((item, index) => (
                                        <div key={index} className="bg-white/30 rounded px-3 py-1">
                                            <p className="text-sm text-blue-800">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Nút thêm vào giỏ hàng */}
                            <button
                                className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition duration-200"
                                onClick={() => alert("Đã thêm vào giỏ hàng!")}
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Thêm vào giỏ hàng +
                            </button>

                            {/* Promotional Products */}
                            <div className="mb-6">

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="border rounded-lg p-4">
                                        <div className="flex gap-3 mb-3">
                                            <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                                                <span className="text-2xl">⌚</span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium mb-1 text-black">Mua kèm ốp Flip7 chính hãng</p>
                                                <p className="text-red-600 font-bold ">Giảm thêm 50%</p>
                                            </div>
                                        </div>
                                        <button className="text-blue-600 text-sm">Chọn thêm +</button>
                                    </div>
                                    <div className="border rounded-lg p-4">
                                        <div className="flex gap-3 mb-3">
                                            <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                                                <span className="text-2xl">⌚</span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium mb-1 text-black">Đồng hồ thông minh Samsung Galaxy Watch8</p>
                                                <p className="text-red-600 font-bold">7.490.000đ</p>
                                                <p className="text-xs text-gray-400 line-through">9.990.000đ</p>
                                            </div>
                                        </div>
                                        <button className="text-blue-600 text-sm">Chọn thêm +</button>
                                    </div>
                                </div>
                            </div>

                            {/* Warranty Options */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-4 text-black">🛡️ Chọn gói dịch vụ bảo hành</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="border rounded-lg p-4 text-center">
                                        <p className="text-sm mb-2 text-black">Gói 6 tháng bảo hành</p>
                                        <p className="font-bold text-red-600 ">2.243.000đ</p>
                                    </div>
                                    <div className="border rounded-lg p-4 text-center">
                                        <p className="text-sm mb-2 text-black">Gói 1 năm bảo hành</p>
                                        <p className="font-bold text-red-600">2.693.000đ</p>
                                    </div>
                                    <div className="border rounded-lg p-4 text-center">
                                        <p className="text-sm mb-2 text-black">Gói 2 năm bảo hành</p>
                                        <p className="font-bold text-red-600">4.718.000đ</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                <h2 className="text-xl font-bold mb-4 text-black">Có thể bạn cũng thích</h2>
                <div className="grid grid-cols-4 gap-4">
                    {relatedProducts.map((product, idx) => (
                        <div key={idx} className="border rounded-lg p-4">
                            {product.discount && (
                                <div className="bg-red-500 text-white text-xs px-2 py-1 rounded inline-block mb-2">
                                    Giảm {product.discount}
                                </div>
                            )}
                            <div className="w-full h-32 bg-gray-100 rounded mb-3 flex items-center justify-center">
                                <span className="text-4xl">📱</span>
                            </div>
                            <p className="text-sm font-medium mb-2 line-clamp-2">{product.name}</p>
                            <p className="font-bold text-red-600 mb-1">{product.price}</p>
                            {product.oldPrice && (
                                <p className="text-xs text-gray-400 line-through">{product.oldPrice}</p>
                            )}
                            {product.status && (
                                <p className="text-xs text-orange-600 mt-1">{product.status}</p>
                            )}
                            {product.rating > 0 && (
                                <div className="flex items-center gap-1 mt-2">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-medium">{product.rating}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                <h2 className="text-xl font-bold mb-6 text-black">Đánh giá Samsung Galaxy Z Flip7 12GB 256GB</h2>

                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div className="text-center">
                        <div className="text-5xl font-bold mb-2 text-black">
                            5.0<span className="text-2xl text-gray-400">/5</span>
                        </div>
                        <div className="flex justify-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <p className="text-gray-600">25 lượt đánh giá</p>
                        <button className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg">Viết đánh giá</button>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3 text-black">Đánh giá theo trải nghiệm</h3>
                        <div className="space-y-2">
                            {Object.entries(reviewStats)
                                .sort((a, b) => b[0] - a[0]) // sắp xếp từ 5 sao xuống 1 sao
                                .map(([star, count]) => (
                                    <div key={star} className="flex items-center justify-between">
                                        <span className="text-sm text-black">{star} sao</span>
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < star ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
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

                {/* Review Filters */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    <button className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg whitespace-nowrap">
                        Tất cả
                    </button>
                    <button className="px-4 py-2 border rounded-lg whitespace-nowrap hover:bg-gray-50 text-black">
                        Có hình ảnh
                    </button>
                    <button className="px-4 py-2 border rounded-lg whitespace-nowrap hover:bg-gray-50 text-black">
                        5 sao
                    </button>
                    <button className="px-4 py-2 border rounded-lg whitespace-nowrap hover:bg-gray-50 text-black">
                        4 sao
                    </button>
                    <button className="px-4 py-2 border rounded-lg whitespace-nowrap hover:bg-gray-50 text-black">
                        3 sao
                    </button>
                    <button className="px-4 py-2 border rounded-lg whitespace-nowrap hover:bg-gray-50 text-black">
                        2 sao
                    </button>
                    <button className="px-4 py-2 border rounded-lg whitespace-nowrap hover:bg-gray-50 text-black">
                        1 sao
                    </button>
                </div>

                {/* Individual Reviews */}
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
                                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-500">Tuyệt vời</span>
                                    </div>

                                    <p className="text-sm text-gray-700 mb-2">{review.content}</p>
                                    <p className="text-xs text-gray-500">⏱ Đánh giá đã đăng vào {review.time}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Q&A Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                <div className="flex items-start gap-4 mb-6">
                    <div className="text-6xl">🐰</div>
                    <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 text-black">Hãy đặt câu hỏi cho chúng tôi</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            CellphoneS sẽ phản hồi trong vòng 1 giờ. Nếu Quý khách gửi câu hỏi sau 22h, chúng tôi sẽ trả lời vào sáng hôm sau. Thông tin có thể thay đổi theo thời gian, vui lòng đặt câu hỏi để nhận được cập nhật mới nhất!
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Viết câu hỏi của bạn tại đây"
                                className="flex-1 px-4 py-3 border rounded-lg"
                            />
                            <button className="bg-red-600 text-white px-6 py-3 rounded-lg flex items-center gap-2">
                                Gửi câu hỏi
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sample Q&A */}
                <div className="border-t pt-6">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                            B
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-black">Bùi Lan</span>
                                <span className="text-sm text-gray-500">2 tháng trước</span>
                            </div>
                            <p className="text-sm mb-2 text-black">
                                Em ở Thái Bình muốn mua z flip 7 trả góp, thì giá như thế nào a, cần trả trước bao nhiêu thì được a?
                            </p>
                            <button className="text-red-600 text-sm flex items-center gap-1">
                                💬 Phản hồi
                            </button>

                            {/* Store Response */}
                            <div className="mt-4 ml-8 bg-gray-50 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                        S
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-semibold text-sm text-black">Quân Trị Viên</span>
                                            <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded">QTV</span>
                                            <span className="text-xs text-gray-500">2 tháng trước</span>
                                        </div>
                                        <div className="text-sm space-y-1 text-black">
                                            <p>SellphoneS xin chào chị Lan,</p>
                                            <p className="font-medium">Dạ SAMSUNG GALAXY Z FLIP 7 5G 12GB 256GB ĐEN (F766) giá thời điểm hiện tại là 26.990.000đ a,</p>
                                            <p>Hiện sản phẩm đang sẵn tại cửa hàng CellphoneS 333 Lý Bôn, P. Đề Thám, Thái Bình a,</p>
                                            <p>Ưu đãi ngay 1 triệu khi thanh toán qua MOMO</p>
                                            <p>Ưu đãi ngay 1 triệu khi thanh toán qua VNPAY</p>
                                            <p>Ưu đãi đặc quyền: Tặng thêm 12 tháng bảo hành chính hãng, Ưu đãi gói dùng thử gói Google AI Pro 6 tháng</p>
                                            <p>Ưu đãi ngay 1 triệu khi trả góp 0% kỳ hạn đến 18 tháng qua Samsung Finance+</p>
                                            <p>Nhận thêm 1 trong các khuyến mại sau:</p>
                                            <p>Tặng sim 5G Viettel 6T5G150N 8GB/Ngày (Free TV360 4K) - 6 Tháng</p>
                                            <p>Minh tham khảo trả góp qua thẻ tín dụng có liên kết có hỗ trợ 0% lãi xuất, 0 mất phí chuyển đổi với kỳ hạn 3-6 tháng a. Kỳ hạn 6 tháng minh cần góp 4.498.333đ/tháng a, thẻ còn hạn mức không cần trả trước a.</p>
                                            <p>Không biết mình tiện ghé shop thời gian nào em lên đơn giữ sản phẩm và giá trong 24h cho mình qua SDT a</p>
                                            <p>Mong sớm nhận được phản hồi từ mình a.</p>
                                        </div>
                                        <button className="text-red-600 text-sm mt-2">💬 Phản hồi</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}