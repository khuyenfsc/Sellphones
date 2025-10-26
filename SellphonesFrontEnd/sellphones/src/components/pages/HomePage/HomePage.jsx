import { useState, useEffect } from "react";
import LeftSidebar from "./components/Category";
import PromoBanner from "./components/PromoBanner";
import RightSidebar from "./components/RightSidebar";
import FeaturedProductsSection from "./components/FeaturedProductsSection";
import CategoryService from "../../../service/CategoryService";


export default function HomePage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [featuredCategories, setFeaturedCategories] = useState([]);

    useEffect(() => {
        const fetchFeaturedCategories = async () => {
            const data = await CategoryService.getFeaturedCategories();
            setFeaturedCategories(data);
        };

        fetchFeaturedCategories();
    }, []);


    return (
        <div className="container mx-auto px-4 py-6">
            {/* Hàng 1: 3 cột */}
            <div className="flex gap-6 mb-6">
                <LeftSidebar categories={featuredCategories} />
                <PromoBanner currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
                <RightSidebar promos={[]} />
            </div>

            {/* Hàng 2: FeaturedProductsSection cho từng category */}
            <div className="flex flex-col items-center space-y-10">
                {featuredCategories.map((cat) => (
                    <div key={cat.id} className="w-full max-w-7xl">
                        <FeaturedProductsSection categoryName={cat.name} />
                    </div>
                ))}
            </div>
        </div>
    );
}
