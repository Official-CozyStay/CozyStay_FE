import React from "react";
import {
  HeaderContainer,
  HeaderLeft,
  Logo,
  LogoText,
  HeaderCenter,
  NavItem,
  HeaderRight,
  HostModeButton,
  UserProfileButton,
  MenuButton,
} from "./Header.styles";
import { Home, Sparkles, Bell, Menu, User } from "lucide-react";
import logo from "@/assets/images/logo.svg";
import Sidebar from "@/components/Sidebar/Sidebar";

interface HeaderProps {
  isScrolled?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrolled = false }) => {
  const [activeNav, setActiveNav] = React.useState("숙소");
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

  return (
    <>
      <HeaderContainer $isScrolled={isScrolled}>
        <HeaderLeft>
          <Logo src={logo} alt="CozyStay Logo" />
          <LogoText>CozyStay</LogoText>
        </HeaderLeft>

        <HeaderCenter $isScrolled={isScrolled}>
          <NavItem
            $active={activeNav === "숙소"}
            onClick={() => setActiveNav("숙소")}
          >
            <Home size={18} />
            <span>숙소</span>
          </NavItem>
          <NavItem
            $active={activeNav === "체험"}
            onClick={() => setActiveNav("체험")}
          >
            <Sparkles size={18} />
            <span>체험</span>
          </NavItem>
          <NavItem
            $active={activeNav === "서비스"}
            onClick={() => setActiveNav("서비스")}
          >
            <Bell size={18} />
            <span>서비스</span>
          </NavItem>
        </HeaderCenter>

        <HeaderRight>
          <HostModeButton>호스트 모드로 전환</HostModeButton>
          <UserProfileButton>
            <User size={30} />
          </UserProfileButton>
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
