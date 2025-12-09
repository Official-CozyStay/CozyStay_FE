import React from "react";
import { useLocation } from "react-router-dom";
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
  MenuButton,
} from "./Header.styles";
import { Home, Sparkles, Bell, Menu, User } from "lucide-react";
import logo from "@/assets/images/logo.svg";
import Sidebar from "@/components/Sidebar/Sidebar";

interface HeaderProps {
  isScrolled?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrolled = false }) => {
  const location = useLocation();
  const [hostMode, setHostMode] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isSidebarOpen]);

  // 경로에 따라 활성 네비게이션 결정
  const activeNav = React.useMemo(() => {
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

  const toggleHostMode = React.useCallback(
    () => setHostMode((prev) => !prev),
    []
  );

  return (
    <>
      <HeaderContainer $isScrolled={isScrolled}>
        <HeaderLeft>
          <Logo src={logo} alt="CozyStay Logo" />
          <LogoText>CozyStay</LogoText>
        </HeaderLeft>

        <HeaderCenter $isScrolled={isScrolled}>
          <NavItem $active={activeNav === "숙소"}>
            <Home size={18} />
            <span>숙소</span>
          </NavItem>
          <NavItem $active={activeNav === "체험"}>
            <Sparkles size={18} />
            <span>체험</span>
            <NavBadge>NEW</NavBadge>
          </NavItem>
          <NavItem $active={activeNav === "서비스"}>
            <Bell size={18} />
            <span>서비스</span>
            <NavBadge>NEW</NavBadge>
          </NavItem>
        </HeaderCenter>

        <HeaderRight>
          <HostModeToggle $active={hostMode} onClick={toggleHostMode}>
            {hostMode ? "예" : "아니오"}
          </HostModeToggle>
          <MenuButton onClick={() => setIsSidebarOpen(true)}>
            <Menu size={20} />
          </MenuButton>
        </HeaderRight>
      </HeaderContainer>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isScrolled={isScrolled}
      />
    </>
  );
};

export default Header;
