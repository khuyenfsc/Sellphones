import AxiosClient from "../api/AxiosClient";

const BrandService = {

  async getByCategoryName(categoryName) {
    try {
      const res = await AxiosClient.get(`/brands/category/${categoryName}`);
      const brands = res?.data?.result ?? [];

      return brands;
    } catch (error) {
      console.error(`❌ Lỗi khi tải thương hiệu cho danh mục "${categoryName}":`, error);
      return [];
    }
  },
};

export default BrandService;