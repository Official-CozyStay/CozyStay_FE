import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: 헤더에 Bearer 토큰 추가
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // 또는 세션 스토리지 등
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor: 에러 처리 및 데이터 가공
client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // 401 Unauthorized 처리 등
    if (error.response?.status === 401) {
      console.error('인증 에러: 로그인이 필요합니다.');
    }
    return Promise.reject(error);
  },
);

export default client;
