import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Heart, MessageCircle, Info, Share2, ChevronLeft, ChevronRight, MapPin, Phone, Star, ShoppingCart, Check, Gift } from 'lucide-react';
import ProductService from "../../../service/ProductService";
import ProductSpecsModal from './components/ProductSpecsModal';
import ProductDetailSection from './components/ProductDetailSection';
import ProductPurchaseSection from './components/ProductPurchaseSection';
import RelatedProducts from './components/RelatedProducts';
import ProductReviewsSection from './components/ProductReviewsSection';


export default function ProductDetailsPage() {
    const [showSpecs, setShowSpecs] = useState(false);
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [productVariant, setProductVariant] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);

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
            setProductVariant(res)
        };

        fetchVariantDetails();
    }, [product]);

    useEffect(() => {
        if (!slug) return;

        const fetchSimilarProducts = async () => {
            try {
                const res = await ProductService.getSimilarProducts(slug);
                if (res) setSimilarProducts(res);
            } catch (error) {
                console.error("Lỗi khi tải sản phẩm tương tự:", error);
            }
        };

        fetchSimilarProducts();
    }, [slug]);

    const reviewStats = {
        "5": 23,
        "4": 5,
        "3": 2,
        "2": 0,
        "1": 1,
    };

    const colors = [
        { id: 'red', name: 'Đỏ san hô', price: '25.990.000đ', image: '🔴' },
        { id: 'blue', name: 'Xanh bồng', price: '25.990.000đ', image: '🔵' },
        { id: 'black', name: 'Đen tuyền', price: '25.990.000đ', image: '⚫' }
    ];

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


            {showSpecs && productVariant && (
                <ProductSpecsModal
                    show={showSpecs}
                    onClose={() => setShowSpecs(false)}
                    productVariant={productVariant}
                />
            )}


            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-12 gap-6">
                    {/* Left Column - Product Images */}
                    <ProductDetailSection
                        productVariant={productVariant}
                        product={product}
                    />

                    {/* Right Column - Purchase Options */}
                    {product && colors ? (
                        <ProductPurchaseSection
                            product={product}
                            onVariantChange={setProductVariant}
                        />
                    ) : (
                        <div className="text-center py-10 text-gray-500"></div>
                    )}
                </div>
            </div>

            {/* Related Products */}
            <RelatedProducts relatedProducts={similarProducts} />

            {/* Reviews Section */}
            {productVariant && reviewStats && reviews && (
                <ProductReviewsSection
                    productName={productVariant.productVariantName || "Sản phẩm"}
                    reviewStats={reviewStats}
                    reviews={reviews}
                />
            )}

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