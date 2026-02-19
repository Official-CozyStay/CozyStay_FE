import { useState, useRef } from "react";
import type { ComponentType } from "react";
import { useNavigate } from "react-router-dom";
import { User, Menu } from "lucide-react";
import logo from "@/assets/images/logo.svg";
import { useAuth } from "@/contexts/AuthContext";
import ProfileDropdown from "@/components/ProfileDropdown";
import IntroSection from "./sections/IntroSection";
import PastTripsSection from "./sections/PastTripsSection";
import ConnectionsSection from "./sections/ConnectionsSection";
import {
  PageContainer,
  PageHeader,
  HeaderLeft,
  Logo,
  LogoText,
  HeaderRight,
  HostButton,
  ProfileButton,
  ProfilePlaceholder,
  MenuButton,
  MenuDropdownWrapper,
  ContentWrapper,
  Sidebar,
  SidebarTitle,
  SidebarNav,
  SidebarMenuItem,
  MenuIcon,
  MenuItemText,
  MainContent,
} from "./profile.styles";

type MenuKey = "intro" | "trips" | "connections";

interface MenuItem {
  key: MenuKey;
  icon: string;
  label: string;
  component:
    | ComponentType<{ userName: string; userInitial: string }>
    | ComponentType;
}

const menuItems: MenuItem[] = [
  { key: "intro", icon: "user", label: "자기소개", component: IntroSection },
  {
    key: "trips",
    icon: "luggage",
    label: "이전 여행",
    component: PastTripsSection,
  },
  {
    key: "connections",
    icon: "users",
    label: "인연",
    component: ConnectionsSection,
  },
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [activeMenu, setActiveMenu] = useState<MenuKey>("intro");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const userName = user?.nickname || "예은";
  const userInitial = userName.charAt(0);

  const handleLogoClick = () => {
    navigate("/");
  };

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case "user":
        return (
          <MenuIcon>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "#222",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {userInitial}
            </div>
          </MenuIcon>
        );
      case "luggage":
        return (
          <MenuIcon>
            <span style={{ fontSize: 28 }}>🧳</span>
          </MenuIcon>
        );
      case "users":
        return (
          <MenuIcon>
            <span style={{ fontSize: 28 }}>👥</span>
          </MenuIcon>
        );
      default:
        return null;
    }
  };

  const activeItem = menuItems.find((item) => item.key === activeMenu);
  const ActiveComponent = activeItem?.component;

  return (
    <PageContainer>
      <PageHeader>
        <HeaderLeft onClick={handleLogoClick}>
          <Logo src={logo} alt="CozyStay Logo" />
          <LogoText>CozyStay</LogoText>
        </HeaderLeft>

        <HeaderRight>
          <HostButton type="button" onClick={() => navigate("/hosting")}>
            호스팅 하기
          </HostButton>

          {isAuthenticated && user ? (
            <ProfileButton type="button">
              <ProfilePlaceholder>
                {user.nickname?.charAt(0)?.toUpperCase() || "?"}
              </ProfilePlaceholder>
            </ProfileButton>
          ) : (
            <ProfileButton type="button">
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
        </HeaderRight>
      </PageHeader>

      <ContentWrapper>
        <Sidebar>
          <SidebarTitle>프로필</SidebarTitle>
          <SidebarNav>
            {menuItems.map((item) => (
              <SidebarMenuItem
                key={item.key}
                $active={activeMenu === item.key}
                onClick={() => setActiveMenu(item.key)}
              >
                {renderIcon(item.icon)}
                <MenuItemText>{item.label}</MenuItemText>
              </SidebarMenuItem>
            ))}
          </SidebarNav>
        </Sidebar>

        <MainContent>
          {ActiveComponent &&
            (activeMenu === "intro" ? (
              <IntroSection userName={userName} userInitial={userInitial} />
            ) : (
              <ActiveComponent userName={userName} userInitial={userInitial} />
            ))}
        </MainContent>
      </ContentWrapper>
    </PageContainer>
  );
};

export default ProfilePage;
