import React from "react";
import {
  HeaderContainer,
  HeaderLeft,
  Logo,
  LogoText,
  HeaderCenter,
  NavItem,
  NavBadge,
  HeaderRight,
  HostModeButton,
  HostModeToggle,
  MenuButton,
} from "./Header.styles";
import { Home, Sparkles, Bell, Menu } from "lucide-react";
import logo from "@/assets/images/logo.svg";

interface HeaderProps {
  isScrolled?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrolled = false }) => {
  const [activeNav, setActiveNav] = React.useState("숙소");
  const [hostMode, setHostMode] = React.useState(false);

  return (
    <HeaderContainer $isScrolled={isScrolled}>
      <HeaderLeft>
        <Logo src={logo} alt="CozyStay Logo" />
        <LogoText>CozyStay</LogoText>
      </HeaderLeft>

      <HeaderCenter>
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
          <NavBadge>NEW</NavBadge>
        </NavItem>
        <NavItem
          $active={activeNav === "서비스"}
          onClick={() => setActiveNav("서비스")}
        >
          <Bell size={18} />
          <span>서비스</span>
          <NavBadge>NEW</NavBadge>
        </NavItem>
      </HeaderCenter>

      <HeaderRight>
        <HostModeButton onClick={() => setHostMode(!hostMode)}>
          호스트 모드로 전환
        </HostModeButton>
        <HostModeToggle
          $active={hostMode}
          onClick={() => setHostMode(!hostMode)}
        >
          {hostMode ? "예" : "아니오"}
        </HostModeToggle>
        <MenuButton>
          <Menu size={20} />
        </MenuButton>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;

