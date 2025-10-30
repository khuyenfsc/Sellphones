import AxiosClient from "../api/AxiosClient";

const CommentService = {

  async getComments({ productId, page = 0, size = 2 }) {
    try {
      const res = await AxiosClient.get(`/comments`, {
        params: {
          productId,
          page,
          size,
        },
      });

      const comments = res?.data?.comments ?? [];
      return comments;
    } catch (error) {
      console.error(`❌ Lỗi khi tải comments cho product "${productId}":`, error);
      return [];
    }
    },
    async getCommentsByParentCommentId({ parentId, page = 0, size = 3 }) {
        try {
            const res = await AxiosClient.get(`/comments/child-comments`, {
                params: { parentId, page, size },
            });

            // ✅ Lấy danh sách comment thực tế từ data.comments.result
            const comments = res?.data?.comments?.result ?? [];
            const total = res?.data?.comments?.total ?? 0;

            return { comments, total };
        } catch (error) {
            console.error(`❌ Lỗi khi tải comments cho comment cha "${parentId}":`, error);
            return { comments: [], total: 0 };
        }
    }



};

export default CommentService;