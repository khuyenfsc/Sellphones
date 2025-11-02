import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import ProductService from "../../../service/ProductService";
import ReviewService from "../../../service/ReviewService";
import ProductSpecsModal from './components/ProductSpecsModal';
import ProductDetailSection from './components/ProductDetailSection';
import ProductPurchaseSection from './components/ProductPurchaseSection';
import RelatedProducts from './components/RelatedProducts';
import ProductReviewsSection from './components/ProductReviewsSection';
import ProductQnASection from './components/ProductQnAISection';

export default function ProductDetailsPage() {
    const [showSpecs, setShowSpecs] = useState(false);
    const { slug } = useParams();
    const location = useLocation(); // để đọc query param
    const [product, setProduct] = useState(null);
    const [productVariant, setProductVariant] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [ratingStats, setRatingStats] = useState([]);

    // Lấy query param "variant"
    const queryParams = new URLSearchParams(location.search);
    const variantIdFromUrl = queryParams.get("variant");

    useEffect(() => {
        if (!slug) return;

        const fetchProduct = async () => {
            const result = await ProductService.getProductById(slug);
            if (!result) return;

            setProduct(result);

            // // Xử lý variant: ưu tiên query param, nếu không có thì lấy thumbnail
            // let variantId = variantIdFromUrl || result.thumbnailProduct?.id;
            // if (variantId) {
            //     const variantData = await ProductService.getProductVariantById(variantId);
            //     setProductVariant(variantData);
            // }
        };

        fetchProduct();
    }, [slug, variantIdFromUrl]);

    useEffect(() => {
        if (!productVariant?.id) return;

        const fetchRatingStats = async () => {
            const res = await ReviewService.getRatingStatsByProductVariantId(productVariant.id);
            setRatingStats(res);
        };

        fetchRatingStats();
    }, [productVariant]);

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

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            {product ? (
                <header className="bg-white text-black p-4">
                    <div className="container mx-auto">
                        <nav className="text-sm mb-2 flex items-center gap-2">
                            <a href="/" className="hover:underline text-blue-600">Trang chủ</a>
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
                    <ProductDetailSection productVariant={productVariant} product={product} />
                    {product && (
                        <ProductPurchaseSection
                            product={product}
                            onVariantChange={setProductVariant}
                            initialVariantId={variantIdFromUrl} // ⚡ truyền variant hiện tại
                        />

                    )}
                </div>
            </div>

            <RelatedProducts relatedProducts={similarProducts} />

            {productVariant && ratingStats && (
                <ProductReviewsSection
                    productName={productVariant.productVariantName}
                    productVariantId={productVariant?.id}
                    reviewStats={ratingStats}
                />
            )}

            <ProductQnASection productId={slug} />
        </div>
    );
}
