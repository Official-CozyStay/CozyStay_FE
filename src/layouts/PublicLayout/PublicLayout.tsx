import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header/Header';
import { Layout, Main, Footer } from './publicLayout.styles';

const SCROLL_THRESHOLD = 100;

export default function PublicLayout() {
  const location = useLocation();
  // MainPage의 경우 내부 Footer를 사용하므로 PublicLayout의 Footer를 숨깁니다.
  const isMainPage = location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout>
      <Header isScrolled={isScrolled} />
      <Main>
        <Outlet />
      </Main>
      {!isMainPage && (
        <Footer>
          © {new Date().getFullYear()} CozyStay — Inspired by Airbnb
        </Footer>
      )}
    </Layout>
  );
}
