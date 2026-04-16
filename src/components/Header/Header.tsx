import { useState, useRef, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  MenuButton,
  ProfileDropdownWrapper,
  NotificationButton,
  NotificationBadge,
} from "./Header.styles";
import { Home, Sparkles, Bell, User, Menu } from "lucide-react";
import logo from "@/assets/images/logo.svg";
import LoginModal from "@/pages/auth/LoginPage";
import SignupModal from "@/pages/auth/SignupModal";
import { useAuth } from "@/contexts/AuthContext";
import SearchBar from "@/components/SearchBar/SearchBar";
import ProfileDropdown from "@/components/ProfileDropdown";
import NotificationDropdown from "@/components/NotificationDropdown";
import { getMyInvitations } from "@/api/booking";

interface HeaderProps {
  isScrolled?: boolean;
}

const Header = ({ isScrolled = false }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMainPage = location.pathname === "/";
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const notiButtonRef = useRef<HTMLButtonElement>(null);
  const { isAuthenticated, user } = useAuth();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      getMyInvitations("PENDING")
        .then((res) => {
          setPendingCount(res.totalElements || 0);
        })
        .catch((err) => console.error("알림 갯수 조회 실패:", err));
    }
  }, [isAuthenticated, isNotiOpen]); // 모달이 닫힐 때 수락/거절 상태 반영되도록 의존성 배열에 추가

  // 경로에 따라 활성 네비게이션 결정
  const activeNav = useMemo(() => {
    const path = location.pathname;
    if (path === "/" || path.startsWith("/accommodation")) {
      return "숙소";
    }
    if (path.startsWith("/experience")) {
      return "체험";
    }
    if (path.startsWith("/service")) {
      return "서비스";
    }
    return "숙소"; // 기본값
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
              <NavItem $active={activeNav === "숙소"}>
                <Home size={18} />
                <span>숙소</span>
              </NavItem>
              <NavItem $active={activeNav === "체험"}>
                <Sparkles size={18} />
                <span>체험</span>
              </NavItem>
              <NavItem $active={activeNav === "서비스"}>
                <Menu size={18} />
                <span>서비스</span>
              </NavItem>
            </>
          )}
        </HeaderCenter>

        <HeaderRight>
          <HostButton type="button" onClick={() => navigate("/hosting")}>
            호스트로 등록하기
          </HostButton>

          {isAuthenticated && user && (
            <ProfileDropdownWrapper>
              <NotificationButton
                ref={notiButtonRef}
                type="button"
                onClick={() => setIsNotiOpen((prev) => !prev)}
              >
                <Bell size={20} />
                {pendingCount > 0 && <NotificationBadge>{pendingCount}</NotificationBadge>}
              </NotificationButton>
              {isNotiOpen && (
                <NotificationDropdown
                  onClose={() => setIsNotiOpen(false)}
                  buttonRef={notiButtonRef}
                />
              )}
            </ProfileDropdownWrapper>
          )}

          {isAuthenticated && user ? (
            <ProfileButton type="button" onClick={() => navigate("/profile")}>
              <ProfilePlaceholder>
                {user.nickname?.charAt(0)?.toUpperCase() || "?"}
              </ProfilePlaceholder>
            </ProfileButton>
          ) : (
            <>
              <ProfileButton type="button" onClick={() => navigate("/profile")}>
                <ProfilePlaceholder>
                  <User size={18} />
                </ProfilePlaceholder>
              </ProfileButton>
              <LoginButton type="button" onClick={() => setIsLoginOpen(true)}>
                로그인
              </LoginButton>
            </>
          )}

          <ProfileDropdownWrapper>
            <MenuButton
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <Menu size={20} />
            </MenuButton>
            {isMenuOpen && (
              <ProfileDropdown
                onClose={() => setIsMenuOpen(false)}
                buttonRef={menuButtonRef}
              />
            )}
          </ProfileDropdownWrapper>
        </HeaderRight>
      </HeaderContainer>
      <LoginModal
        open={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onOpenSignup={() => {
          setIsLoginOpen(false);
          setIsSignupOpen(true);
        }}
      />
      <SignupModal
        open={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
      />
    </>
  );
};

export default Header;
