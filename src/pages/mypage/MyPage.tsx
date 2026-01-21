import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageContainer,
  PageHeader,
  Logo,
  CompleteButton,
  ContentWrapper,
  Sidebar,
  SidebarTitle,
  SidebarNav,
  SidebarMenuItem,
  MenuItemText,
  NewBadge,
  SidebarDivider,
  MainContent,
} from "./mypage.styles";
import {
  User,
  Shield,
  Lock,
  Bell,
  FileText,
  CreditCard,
  Globe,
  Briefcase,
  Building2,
} from "lucide-react";
import logo from "@/assets/images/logo.svg";
import PersonalInfoSection from "./sections/PersonalInfoSection";
import SecuritySection from "./sections/SecuritySection";
import PrivacySection from "./sections/PrivacySection";
import NotificationsSection from "./sections/NotificationsSection";
import TaxSection from "./sections/TaxSection";
import PaymentSection from "./sections/PaymentSection";
import LanguageSection from "./sections/LanguageSection";
import BusinessSection from "./sections/BusinessSection";
import HostingToolsSection from "./sections/HostingToolsSection";

type MenuKey =
  | "personal"
  | "security"
  | "privacy"
  | "notifications"
  | "tax"
  | "payment"
  | "language"
  | "business"
  | "hosting";

interface MenuItem {
  key: MenuKey;
  icon: React.ElementType;
  label: string;
  isNew?: boolean;
}

const MyPage = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<MenuKey>("personal");

  const menuItems: MenuItem[] = [
    { key: "personal", icon: User, label: "개인 정보" },
    { key: "security", icon: Shield, label: "로그인 및 보안" },
    { key: "privacy", icon: Lock, label: "개인정보 보호" },
    { key: "notifications", icon: Bell, label: "알림" },
    { key: "tax", icon: FileText, label: "세금" },
    { key: "payment", icon: CreditCard, label: "결제 및 대금 수령", isNew: true },
    { key: "language", icon: Globe, label: "언어 및 통화" },
    { key: "business", icon: Briefcase, label: "출장" },
  ];

  const hostingMenuItem: MenuItem = {
    key: "hosting",
    icon: Building2,
    label: "전문 호스팅 도구",
  };

  // activeMenu에 따른 콘텐츠 렌더링
  const renderContent = () => {
    switch (activeMenu) {
      case "personal":
        return <PersonalInfoSection />;
      case "security":
        return <SecuritySection />;
      case "privacy":
        return <PrivacySection />;
      case "notifications":
        return <NotificationsSection />;
      case "tax":
        return <TaxSection />;
      case "payment":
        return <PaymentSection />;
      case "language":
        return <LanguageSection />;
      case "business":
        return <BusinessSection />;
      case "hosting":
        return <HostingToolsSection />;
      default:
        return <PersonalInfoSection />;
    }
  };

  const handleComplete = () => {
    navigate(-1);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <PageContainer>
      <PageHeader>
        <Logo src={logo} alt="CozyStay Logo" onClick={handleLogoClick} />
        <CompleteButton onClick={handleComplete}>완료</CompleteButton>
      </PageHeader>

      <ContentWrapper>
        <Sidebar>
          <SidebarTitle>계정 관리</SidebarTitle>
          <SidebarNav>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <SidebarMenuItem
                  key={item.key}
                  $active={activeMenu === item.key}
                  onClick={() => setActiveMenu(item.key)}
                >
                  <Icon size={24} />
                  <MenuItemText>{item.label}</MenuItemText>
                  {item.isNew && <NewBadge>NEW</NewBadge>}
                </SidebarMenuItem>
              );
            })}

            <SidebarDivider />

            <SidebarMenuItem
              $active={activeMenu === hostingMenuItem.key}
              onClick={() => setActiveMenu(hostingMenuItem.key)}
            >
              <hostingMenuItem.icon size={24} />
              <MenuItemText>{hostingMenuItem.label}</MenuItemText>
            </SidebarMenuItem>
          </SidebarNav>
        </Sidebar>

        <MainContent>{renderContent()}</MainContent>
      </ContentWrapper>
    </PageContainer>
  );
};

export default MyPage;

