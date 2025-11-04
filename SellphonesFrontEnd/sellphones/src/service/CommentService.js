import AxiosClient from "../api/AxiosClient";
import UserService from "./UserService";

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
  },

  async createComment(commentData) {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return { success: false, message: 'Chưa đăng nhập' };

      const res = await AxiosClient.post('/comments', commentData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const newComment = res.data?.result;
      return { success: true, comment: newComment };
    } catch (err) {
      // Nếu token hết hạn → thử refresh token
      if (err.response?.status === 401) {
        try {
          const refreshResult = await UserService.refreshToken();
          if (refreshResult.success) {
            const retryRes = await AxiosClient.post('/comments/add-comment', commentData, {
              headers: { Authorization: `Bearer ${refreshResult.accessToken}` },
            });
            const newComment = retryRes.data?.result;
            return { success: true, comment: newComment };
          }
        } catch (refreshErr) {
          console.error("❌ Lỗi refresh token khi gửi comment:", refreshErr);
        }
      }

      console.error('❌ Lỗi thêm bình luận:', err);
      const message =
        err.response?.data?.message ||
        'Không thể thêm bình luận. Vui lòng thử lại sau.';
      return { success: false, message };
    }
  },

  async replyComment(replyData) {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return { success: false, message: "Chưa đăng nhập" };

      const res = await AxiosClient.post(
        "/comments/reply-comment",
        replyData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const newReply = res.data?.result;
      return { success: true, reply: newReply };
    } catch (err) {
      // Nếu token hết hạn → thử refresh token
      if (err.response?.status === 401) {
        try {
          const refreshResult = await UserService.refreshToken();
          if (refreshResult.success) {
            const retryRes = await AxiosClient.post(
              "/comments/reply-comment",
              replyData,
              {
                headers: { Authorization: `Bearer ${refreshResult.accessToken}` },
              }
            );
            const newReply = retryRes.data?.result;
            return { success: true, reply: newReply };
          }
        } catch (refreshErr) {
          console.error("❌ Lỗi refresh token khi gửi phản hồi:", refreshErr);
        }
      }

      console.error("❌ Lỗi thêm phản hồi:", err);
      const message =
        err.response?.data?.message ||
        "Không thể thêm phản hồi. Vui lòng thử lại sau.";
      return { success: false, message };
    }
  }




};

export default CommentService;