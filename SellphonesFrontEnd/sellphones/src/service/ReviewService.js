import AxiosClient from "../api/AxiosClient";

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
    }

};

export default ReviewService;