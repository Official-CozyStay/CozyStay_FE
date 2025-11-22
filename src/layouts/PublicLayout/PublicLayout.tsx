import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import {
  Layout,
  Header,
  Brand,
  BrandTitle,
  Logo,
  Nav,
  Main,
  Footer,
} from './publicLayout.styles';
import logo from '@/assets/images/logo.svg';
import LoginModal from '@/pages/auth/LoginPage';

export default function PublicLayout() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <Layout>
      <Header>
        <Brand to="/">
          <Logo src={logo} alt="CozyStay Logo" />
          <BrandTitle>CozyStay</BrandTitle>
        </Brand>
        <Nav>
          <Link to="/signup">가입하기</Link>
          <button type="button" onClick={() => setIsLoginOpen(true)}>
            로그인
          </button>
        </Nav>
      </Header>

      <Main>
        <Outlet />
      </Main>

      <Footer>
        © {new Date().getFullYear()} CozyStay — Inspired by Airbnb
      </Footer>

      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </Layout>
  );
}
