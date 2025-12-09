import React from "react";
import { createPortal } from "react-dom";
import {
  SidebarOverlay,
  SidebarContainer,
  SidebarHeader,
  SidebarCloseButton,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenuIcon,
  SidebarMenuText,
  SidebarDivider,
  SidebarHostSection,
  SidebarHostTitle,
  SidebarHostDesc,
  SidebarHostIllustration,
} from "./Sidebar.styles";
import {
  Heart,
  Plane,
  MessageSquare,
  User,
  Settings,
  Globe,
  HelpCircle,
  Home,
  UserPlus,
  LogOut,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isScrolled?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isScrolled = false }) => {
  const menuItems = [
    { icon: Heart, text: "위시리스트" },
    { icon: Plane, text: "여행" },
    { icon: MessageSquare, text: "메시지" },
    { icon: User, text: "프로필" },
    { icon: Settings, text: "계정 관리" },
    { icon: Globe, text: "언어 및 통화" },
    { icon: HelpCircle, text: "도움말 센터" },
  ];

  const hostItems = [
    { icon: Home, text: "호스트 추천하기" },
    { icon: UserPlus, text: "공동 호스트 찾기" },
  ];

  if (!isOpen) return null;

  return createPortal(
    <>
      <SidebarOverlay $isOpen={isOpen} onClick={onClose} />
      <SidebarContainer $isOpen={isOpen} $isScrolled={isScrolled}>
        <SidebarHeader>
          <SidebarCloseButton onClick={onClose}>
            <X size={20} />
          </SidebarCloseButton>
        </SidebarHeader>
        <SidebarContent>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <SidebarMenuItem key={index}>
                <SidebarMenuIcon>
                  <Icon size={20} />
                </SidebarMenuIcon>
                <SidebarMenuText>{item.text}</SidebarMenuText>
              </SidebarMenuItem>
            );
          })}

          <SidebarDivider />

          <SidebarHostSection>
            <SidebarHostTitle>호스팅 하기</SidebarHostTitle>
            <SidebarHostDesc>
              간단하게 호스팅을 시작하고 부수입을 올릴 수 있습니다.
            </SidebarHostDesc>
            <SidebarHostIllustration>
              <Home size={80} />
            </SidebarHostIllustration>
          </SidebarHostSection>

          {hostItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <SidebarMenuItem key={index}>
                <SidebarMenuIcon>
                  <Icon size={20} />
                </SidebarMenuIcon>
                <SidebarMenuText>{item.text}</SidebarMenuText>
              </SidebarMenuItem>
            );
          })}

          <SidebarDivider />

          <SidebarMenuItem>
            <SidebarMenuIcon>
              <LogOut size={20} />
            </SidebarMenuIcon>
            <SidebarMenuText>로그아웃</SidebarMenuText>
          </SidebarMenuItem>
        </SidebarContent>
      </SidebarContainer>
    </>,
    document.body
  );
};

export default Sidebar;

