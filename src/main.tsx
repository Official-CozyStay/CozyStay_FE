import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { router } from './router/index';

import './styles/fonts.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. 주소창의 URL 파라미터 읽기
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');

    if (accessToken && refreshToken) {
      // 2. 토큰을 브라우저(localStorage 등)에 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // 3. 주소창 깨끗하게 정리 (토큰 노출 방지) 및 홈으로 이동
      // window.history.replaceState({}, document.title, "/");
      // 또는 라우터 사용 시:
      navigate('/', { replace: true });

      console.log('로그인 성공! 토큰 저장 완료');
    }
  }, [navigate]);

  return (
    <div>
      {/* 기존 라우터나 페이지 내용 */}
      <h1>CozyStay 메인 페이지</h1>
    </div>
  );
}

export default App;
