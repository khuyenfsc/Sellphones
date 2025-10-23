import AxiosClient from "../api/AxiosClient";

const ProductService = {
  getFeaturedProductsByCategoryName: (categoryName) => AxiosClient.get(`/products/featured-products/${categoryName}`)

};

export default ProductService;
