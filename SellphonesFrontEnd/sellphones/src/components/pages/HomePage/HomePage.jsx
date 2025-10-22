import { useState } from "react";
import LeftSidebar from "./components/LeftSidebar";
import PromoBanner from "./components/PromoBanner";
import RightSidebar from "./components/RightSidebar";
import FeaturedProductsSection from "./components/FeaturedProductsSection";

export default function HomePage() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const categories = [
        { icon: '📱', name: 'Điện thoại' },
        { icon: '📱', name: 'Tablet' },
        { icon: '💻', name: 'Laptop' }
    ];

    const promos = [
        { title: 'iPhone trợ giá', value: 'đến 5 triệu' },
        { title: 'Samsung trợ giá', value: 'đến 4 triệu' },
        { title: 'Laptop trợ giá', value: 'đến 4 triệu' }
    ];

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Hàng 1: 3 cột */}
            <div className="flex gap-6 mb-6">
                <LeftSidebar categories={categories} />
                <PromoBanner currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
                <RightSidebar promos={promos} />
            </div>

            {/* Hàng 2: FeaturedProductsSection */}
            <div className="flex justify-center">
                <div className="w-full max-w-7xl">
                    <FeaturedProductsSection categoryName="Điện thoại" />
                </div>
            </div>
        </div>

    );
}
