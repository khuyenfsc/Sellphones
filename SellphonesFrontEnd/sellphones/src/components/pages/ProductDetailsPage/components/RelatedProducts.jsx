import React from "react";
import { Star } from "lucide-react";
import ProductGrid from "../../../product/ProductGrid";

const RelatedProducts = ({ relatedProducts }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
      <h2 className="text-xl font-bold mb-4 text-black">Có thể bạn cũng thích</h2>

      {/* Nếu không có sản phẩm */}
      {!relatedProducts || relatedProducts.length === 0 ? (
        <p className="text-gray-500 italic">Không có sản phẩm liên quan</p>
      ) : (
        <>
            <ProductGrid products={relatedProducts} />
        </>
      )}
    </div>
  );
};

export default RelatedProducts;
