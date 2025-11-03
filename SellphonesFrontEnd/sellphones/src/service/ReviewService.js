import AxiosClient from "../api/AxiosClient";
import UserService from "./UserService";

const ReviewService = {

  async getRatingStatsByProductVariantId(id) {
    try {
      const res = await AxiosClient.get(`/reviews/product-variants/${id}/rating-stats`);
      const ratingStats = res?.data?.result ?? [];

      return ratingStats;
    } catch (error) {
      console.error(`❌ Lỗi khi tải rating stats "${id}":`, error);
      return [];
    }
  },

  async getReviews({ productVariantId, hasPhotos, ratingScore, page = 0, size = 5 }) {
    try {
      const res = await AxiosClient.get(`/reviews`, {
        params: {
          productVariantId,
          hasPhotos,
          ratingScore,
          page,
          size,
        },
      });

      const reviews = res?.data?.reviews ?? [];
      return reviews;
    } catch (error) {
      console.error(`❌ Lỗi khi tải reviews cho variant "${productVariantId}":`, error);
      return [];
    }
  },

  async createReview(reviewData, files) {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return { success: false, message: "Chưa đăng nhập" };

      if (!reviewData || !reviewData.productVariantId || !reviewData.ratingScore) {
        return { success: false, message: "Thiếu thông tin đánh giá" };
      }

      // Chuẩn bị form-data
      const formData = new FormData();
      formData.append("review", new Blob([JSON.stringify(reviewData)], { type: "application/json" }));

      if (files && files.length > 0) {
        files.forEach(file => {
          formData.append("files", file);
        });
      }

      // Gọi API tạo đánh giá
      const res = await AxiosClient.post(`/reviews/add-review`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const result = res.data?.result || {};
      return { success: true, result };

    } catch (err) {
      // Nếu token hết hạn → thử refresh token
      if (err.response?.status === 401) {
        const refreshResult = await UserService.refreshToken();
        if (refreshResult.success) {
          const formData = new FormData();
          formData.append("review", new Blob([JSON.stringify(reviewData)], { type: "application/json" }));
          if (files && files.length > 0) {
            files.forEach(file => {
              formData.append("files", file);
            });
          }

          const retryRes = await AxiosClient.post(`/reviews/add-review`, formData, {
            headers: {
              Authorization: `Bearer ${refreshResult.accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          });
          const result = retryRes.data?.result || {};
          return { success: true, result };
        }
      }

      console.error("❌ Lỗi tạo đánh giá:", err);
      return { success: false, message: "Không thể tạo đánh giá" };
    }
  }


};

export default ReviewService;