import axios from 'axios';

// Tạo instance riêng
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1', 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    // Lấy token (nếu có)
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => {
    // Trả về dữ liệu chính
    return response.data;
  },
  (error) => {
    if (error.response) {
      // Có phản hồi lỗi từ server
    } else {
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
