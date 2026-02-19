import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  HeaderContainer,
  HeaderLeft,
  Logo,
  LogoText,
  HeaderCenter,
  NavItem,
  HeaderRight,
  HostButton,
  ProfileButton,
  ProfilePlaceholder,
  LoginButton,
} from './Header.styles';
import { Home, Sparkles, Bell, User } from 'lucide-react';
import logo from '@/assets/images/logo.svg';
import LoginModal from '@/pages/auth/LoginPage';
import { useAuth } from '@/contexts/AuthContext';
import SearchBar from '@/components/SearchBar/SearchBar';

interface HeaderProps {
  isScrolled?: boolean;
}

const Header = ({ isScrolled = false }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMainPage = location.pathname === '/';
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const { isAuthenticated, user } = useAuth();

  // 경로에 따라 활성 네비게이션 결정
  const activeNav = React.useMemo(() => {
    const path = location.pathname;
    if (path === '/' || path.startsWith('/accommodation')) {
      return '숙소';
    }
    if (path.startsWith('/experience')) {
      return '체험';
    }
    if (path.startsWith('/service')) {
      return '서비스';
    }
    return '숙소'; // 기본값
  }, [location.pathname]);

  return (
    <>
      <HeaderContainer $isScrolled={isScrolled}>
        <HeaderLeft to="/">
          <Logo src={logo} alt="CozyStay Logo" />
          <LogoText>CozyStay</LogoText>
        </HeaderLeft>

        <HeaderCenter $isScrolled={isScrolled}>
          {isScrolled && isMainPage ? (
            <SearchBar isCompact={true} />
          ) : (
            <>
              <NavItem $active={activeNav === '숙소'}>
                <Home size={18} />
                <span>숙소</span>
              </NavItem>
              <NavItem $active={activeNav === '체험'}>
                <Sparkles size={18} />
                <span>체험</span>
              </NavItem>
              <NavItem $active={activeNav === '서비스'}>
                <Bell size={18} />
                <span>서비스</span>
              </NavItem>
            </>
          )}
        </HeaderCenter>

        <HeaderRight>
          <HostButton type="button" onClick={() => navigate('/hosting')}>
            호스트로 등록하기
          </HostButton>

          {isAuthenticated && user ? (
            <ProfileButton type="button" onClick={() => navigate('/mypage')}>
              <ProfilePlaceholder>
                {user.nickname?.charAt(0)?.toUpperCase() || '?'}
              </ProfilePlaceholder>
            </ProfileButton>
          ) : (
            <>
              <ProfileButton type="button" onClick={() => navigate('/mypage')}>
                <ProfilePlaceholder>
                  <User size={18} />
                </ProfilePlaceholder>
              </ProfileButton>
              <LoginButton type="button" onClick={() => setIsLoginOpen(true)}>
                로그인
              </LoginButton>
            </>
          )}
        </HeaderRight>
      </HeaderContainer>
      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Header;
