import AxiosClient from "../api/AxiosClient";

const CategoryService = {
  // 🔹 Lấy danh sách tất cả danh mục
  getAll: () => AxiosClient.get('/categories'),

  getFeaturedCategories: () => AxiosClient.get('/categories/featured-categories'),

  getFilterByCategoryName : (categoryName)  => AxiosClient.get(`/categories/${categoryName}/filters`)
};

export default CategoryService;
