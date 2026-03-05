import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { User, Menu } from "lucide-react";
import logo from "@/assets/images/logo.svg";
import { useAuth } from "@/contexts/AuthContext";
import ProfileDropdown from "@/components/ProfileDropdown";
import {
  HeaderContainer,
  HeaderLeft,
  Logo,
  LogoText,
  HeaderRight,
  HostButton,
  ProfileButton,
  ProfilePlaceholder,
  MenuButton,
  MenuDropdownWrapper,
  ActionButton,
} from "./SimpleHeader.styles";

interface SimpleHeaderProps {
  rightAction?: {
    label: string;
    onClick: () => void;
  };
  showHostButton?: boolean;
}

const SimpleHeader = ({ rightAction, showHostButton = true }: SimpleHeaderProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <HeaderContainer>
      <HeaderLeft onClick={handleLogoClick}>
        <Logo src={logo} alt="CozyStay Logo" />
        <LogoText>CozyStay</LogoText>
      </HeaderLeft>

      <HeaderRight>
        {showHostButton && (
          <HostButton type="button" onClick={() => navigate("/hosting")}>
            호스팅 하기
          </HostButton>
        )}

        {isAuthenticated && user ? (
          <ProfileButton type="button" onClick={() => navigate("/profile")}>
            <ProfilePlaceholder>
              {user.nickname?.charAt(0)?.toUpperCase() || "?"}
            </ProfilePlaceholder>
          </ProfileButton>
        ) : (
          <ProfileButton type="button" onClick={() => navigate("/profile")}>
            <ProfilePlaceholder>
              <User size={18} />
            </ProfilePlaceholder>
          </ProfileButton>
        )}

        <MenuDropdownWrapper>
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
        </MenuDropdownWrapper>

        {rightAction && (
          <ActionButton onClick={rightAction.onClick}>
            {rightAction.label}
          </ActionButton>
        )}
      </HeaderRight>
    </HeaderContainer>
  );
};

export default SimpleHeader;
