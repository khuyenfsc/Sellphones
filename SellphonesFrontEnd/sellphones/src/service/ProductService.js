import AxiosClient from "../api/AxiosClient";

const ProductService = {
  // 🔹 Lấy danh sách tất cả danh mục
  getFeaturedProducts: (categoryName) => AxiosClient.get(`/products/featured-products/${categoryName}`)

};

export default ProductService;
