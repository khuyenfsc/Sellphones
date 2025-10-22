import AxiosClient from "../api/AxiosClient";

const PromotionBannerService = {
  // 🔹 Lấy danh sách tất cả danh mục
  getAll: () => AxiosClient.get('/promotion-banners'),

};

export default PromotionBannerService;
