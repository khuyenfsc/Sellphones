import AxiosClient from "../api/AxiosClient";

const ProductService = {
  getFeaturedProductsByCategoryName: (categoryName) => AxiosClient.get(`/products/featured-products/${categoryName}`),
  getProductsByFilters: (filters) => {
    return AxiosClient.post(`/products/query`, filters);
  }
};

export default ProductService;
