import React from "react";
import ProductCard from "./ProductCard"; // đường dẫn tùy theo cấu trúc thư mục

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
