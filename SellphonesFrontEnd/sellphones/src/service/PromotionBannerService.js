import AxiosClient from "../api/AxiosClient";

const PromotionBannerService = {
  // 🔹 Lấy danh sách tất cả danh mục
  async getAll() {
    try {
      const res = await AxiosClient.get("/promotion-banners");
      const banners = res?.data?.result ?? [];

      // 👉 Có thể chuẩn hóa dữ liệu nếu backend trả không đồng nhất
      return banners.map((b) => ({
        id: b.id,
        title: b.title || "",
        image: b.image || b.bannerImage || "",
        link: b.link || "#",
        isActive: b.isActive ?? true,
      }));
    } catch (error) {
      console.error("❌ Lỗi khi tải danh sách banner khuyến mãi:", error);
      return [];
    }
  }
};

export default PromotionBannerService;
