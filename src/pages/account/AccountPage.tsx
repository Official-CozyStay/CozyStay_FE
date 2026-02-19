import { useState, ComponentType } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageContainer,
  PageHeader,
  LogoWrapper,
  Logo,
  LogoText,
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
} from "./account.styles";
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
import type { LucideIcon } from "lucide-react";
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
  icon: LucideIcon;
  label: string;
  component: ComponentType;
  isNew?: boolean;
  hasDividerBefore?: boolean;
}

const menuItems: MenuItem[] = [
  {
    key: "personal",
    icon: User,
    label: "개인 정보",
    component: PersonalInfoSection,
  },
  {
    key: "security",
    icon: Shield,
    label: "로그인 및 보안",
    component: SecuritySection,
  },
  {
    key: "privacy",
    icon: Lock,
    label: "개인정보 보호",
    component: PrivacySection,
  },
  {
    key: "notifications",
    icon: Bell,
    label: "알림",
    component: NotificationsSection,
  },
  { key: "tax", icon: FileText, label: "세금", component: TaxSection },
  {
    key: "payment",
    icon: CreditCard,
    label: "결제 및 대금 수령",
    component: PaymentSection,
    isNew: true,
  },
  {
    key: "language",
    icon: Globe,
    label: "언어 및 통화",
    component: LanguageSection,
  },
  {
    key: "business",
    icon: Briefcase,
    label: "출장",
    component: BusinessSection,
  },
  {
    key: "hosting",
    icon: Building2,
    label: "전문 호스팅 도구",
    component: HostingToolsSection,
    hasDividerBefore: true,
  },
];

const AccountPage = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<MenuKey>("personal");

  const activeItem = menuItems.find((item) => item.key === activeMenu);
  const ActiveComponent = activeItem?.component ?? PersonalInfoSection;

  const handleComplete = () => {
    navigate(-1);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <PageContainer>
      <PageHeader>
        <LogoWrapper onClick={handleLogoClick}>
          <Logo src={logo} alt="CozyStay Logo" />
          <LogoText>CozyStay</LogoText>
        </LogoWrapper>
        <CompleteButton onClick={handleComplete}>완료</CompleteButton>
      </PageHeader>

      <ContentWrapper>
        <Sidebar>
          <SidebarTitle>계정 관리</SidebarTitle>
          <SidebarNav>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.key}>
                  {item.hasDividerBefore && <SidebarDivider />}
                  <SidebarMenuItem
                    $active={activeMenu === item.key}
                    onClick={() => setActiveMenu(item.key)}
                  >
                    <Icon size={24} />
                    <MenuItemText>{item.label}</MenuItemText>
                    {item.isNew && <NewBadge>NEW</NewBadge>}
                  </SidebarMenuItem>
                </div>
              );
            })}
          </SidebarNav>
        </Sidebar>

        <MainContent>
          <ActiveComponent />
        </MainContent>
      </ContentWrapper>
    </PageContainer>
  );
};

export default AccountPage;
