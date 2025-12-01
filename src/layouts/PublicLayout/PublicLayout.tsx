import { useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Layout,
  Header,
  Brand,
  BrandTitle,
  Logo,
  Nav,
  NavButton,
  Main,
  Footer,
  ProfileButton,
  ProfilePlaceholder,
  ProfileDropdownWrapper,
} from './publicLayout.styles';
import logo from '@/assets/images/logo.svg';
import LoginModal from '@/pages/auth/LoginPage';
import ProfileDropdown from '@/components/ProfileDropdown';
import { useAuth } from '@/contexts/AuthContext';

export default function PublicLayout() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const profileButtonRef = useRef<HTMLButtonElement>(null);

  const toggleProfile = () => {
    setIsProfileOpen((prev) => !prev);
  };

  return (
    <Layout>
      <Header>
        <Brand to="/">
          <Logo src={logo} alt="CozyStay Logo" />
          <BrandTitle>CozyStay</BrandTitle>
        </Brand>
        <Nav>
          {isAuthenticated && user ? (
            <ProfileDropdownWrapper>
              <ProfileButton
                ref={profileButtonRef}
                type="button"
                onClick={toggleProfile}
              >
                <ProfilePlaceholder>
                  {user.nickname?.charAt(0)?.toUpperCase() || '?'}
                </ProfilePlaceholder>
              </ProfileButton>
              {isProfileOpen && (
                <ProfileDropdown
                  onClose={() => setIsProfileOpen(false)}
                  buttonRef={profileButtonRef}
                />
              )}
            </ProfileDropdownWrapper>
          ) : (
            <NavButton type="button" onClick={() => setIsLoginOpen(true)}>
              로그인
            </NavButton>
          )}
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
