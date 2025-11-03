import AxiosClient from "../api/AxiosClient";

const CategoryService = {
  // 🔹 Lấy tất cả danh mục (có xử lý lỗi & transform dữ liệu)
  async getAllCategories() {
    try {
      const res = await AxiosClient.get("/categories");
      const result = res?.data?.result ?? [];
      // Có thể transform thêm nếu cần
      return result;
    } catch (error) {
      console.error("❌ Lỗi khi tải danh mục:", error);
      return []; // fallback để component không crash
    }
  },

  // 🔹 Danh mục nổi bật
  async getFeaturedCategories() {
    try {
      const res = await AxiosClient.get("/categories/featured-categories");
      return res?.data?.result ?? [];
    } catch (error) {
      console.error("❌ Lỗi khi tải danh mục nổi bật:", error);
      return [];
    }
  },

  // 🔹 Bộ lọc theo tên danh mục
  async getFiltersByCategoryName(categoryName) {
    try {
      const res = await AxiosClient.get(`/categories/${categoryName}/filters`);
      return res?.data?.result ?? [];
    } catch (error) {
      console.error(`❌ Lỗi khi lấy bộ lọc cho ${categoryName}:`, error);
      return [];
    }
  },
};

export default CategoryService;
