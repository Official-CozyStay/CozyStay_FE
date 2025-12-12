import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  HeaderContainer,
  HeaderLeft,
  Logo,
  LogoText,
  HeaderCenter,
  NavItem,
  NavBadge,
  HeaderRight,
  HostModeToggle,
  ProfileDropdownWrapper,
  ProfileButton,
  ProfilePlaceholder,
  LoginButton,
} from './Header.styles';
import { Home, Sparkles, Bell } from 'lucide-react';
import logo from '@/assets/images/logo.svg';
import LoginModal from '@/pages/auth/LoginPage';
import ProfileDropdown from '@/components/ProfileDropdown';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  isScrolled?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrolled = false }) => {
  const location = useLocation();
  const [hostMode, setHostMode] = React.useState(false);
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const { isAuthenticated, user } = useAuth();
  const profileButtonRef = React.useRef<HTMLButtonElement>(null);

  const toggleProfile = () => {
    setIsProfileOpen((prev) => !prev);
  };

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

  const toggleHostMode = React.useCallback(
    () => setHostMode((prev) => !prev),
    []
  );

  return (
    <>
      <HeaderContainer $isScrolled={isScrolled}>
        <HeaderLeft to="/">
          <Logo src={logo} alt="CozyStay Logo" />
          <LogoText>CozyStay</LogoText>
        </HeaderLeft>

        <HeaderCenter $isScrolled={isScrolled}>
          <NavItem $active={activeNav === '숙소'}>
            <Home size={18} />
            <span>숙소</span>
          </NavItem>
          <NavItem $active={activeNav === '체험'}>
            <Sparkles size={18} />
            <span>체험</span>
            <NavBadge>NEW</NavBadge>
          </NavItem>
          <NavItem $active={activeNav === '서비스'}>
            <Bell size={18} />
            <span>서비스</span>
            <NavBadge>NEW</NavBadge>
          </NavItem>
        </HeaderCenter>

        <HeaderRight>
          <HostModeToggle $active={hostMode} onClick={toggleHostMode}>
            {hostMode ? '예' : '아니오'}
          </HostModeToggle>

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
            <LoginButton type="button" onClick={() => setIsLoginOpen(true)}>
              로그인
            </LoginButton>
          )}
        </HeaderRight>
      </HeaderContainer>
      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Header;
