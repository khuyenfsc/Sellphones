import AxiosClient from "../api/AxiosClient";

const BrandService = {
  // 🔹 Lấy danh sách tất cả danh mục
  getByCategoryName: (categoryName) => AxiosClient.get(`/brands/category/${categoryName}`)

};

export default BrandService;
