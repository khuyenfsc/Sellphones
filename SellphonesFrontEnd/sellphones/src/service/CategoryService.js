import AxiosClient from "../api/AxiosClient";

const CategoryService = {
  // 🔹 Lấy danh sách tất cả danh mục
  getAll: () => AxiosClient.get('/categories'),

  getFeaturedCategories: () => AxiosClient.get('/categories/featured-categories'),

  // 🔹 Lấy thông tin chi tiết của 1 danh mục
  getById: (id) => AxiosClient.get(`/categories/${id}`),

  // 🔹 Tạo danh mục mới
  create: (data) => AxiosClient.post('/categories', data),

  // 🔹 Cập nhật danh mục theo id
  update: (id, data) => AxiosClient.put(`/categories/${id}`, data),

  // 🔹 Xóa danh mục
  delete: (id) => AxiosClient.delete(`/categories/${id}`),
};

export default CategoryService;
