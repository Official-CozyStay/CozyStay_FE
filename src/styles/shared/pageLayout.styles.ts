// 공통 컴포넌트 스타일 파일
import styled from "styled-components";
import { media } from "@/styles/media";

// 페이지 컨테이너
export const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.default};
`;

// 페이지 헤더
export const PageHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing["3xl"]}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.colors.background.default};
  z-index: ${({ theme }) => theme.zIndex.header};

  ${media.mobile} {
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  }
`;

// 헤더 왼쪽 영역
export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
`;

// 헤더 오른쪽 영역
export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

// 로고
export const Logo = styled.img`
  height: 32px;
  cursor: pointer;
`;

// 로고 텍스트
export const LogoText = styled.span`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.primary.main};

  ${media.mobile} {
    font-size: ${({ theme }) => theme.font.size.md};
  }
`;

// 호스팅 버튼
export const HostingButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border: none;
  background: none;
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.background.hover};
    border-radius: ${({ theme }) => theme.radius.full};
  }
`;

// 프로필 아이콘 버튼
export const ProfileIconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  background: ${({ theme }) => theme.colors.common.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.normal};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`;

// 메뉴 버튼
export const MenuButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  background: ${({ theme }) => theme.colors.common.white};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.normal};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`;

// 사이드바 컨테이너 (기본)
export const BaseSidebar = styled.aside`
  flex-shrink: 0;

  ${media.tablet} {
    width: 100%;
  }
`;

// 사이드바 제목
export const SidebarTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.size["2xl"]};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

// 사이드바 네비게이션
export const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

// 사이드바 메뉴 아이템
export const SidebarMenuItem = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.background.hover : "transparent"};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.regular};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  text-align: left;
  transition: ${({ theme }) => theme.transition.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.background.hover};
  }

  svg {
    color: ${({ theme }) => theme.colors.text.secondary};
    flex-shrink: 0;
  }
`;

// 메인 콘텐츠 영역
export const BaseMainContent = styled.main`
  flex: 1;
  min-width: 0;
`;

// 콘텐츠 제목
export const ContentTitle = styled.h1`
  font-size: ${({ theme }) => theme.font.size["2xl"]};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

// 구분선
export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  margin: ${({ theme }) => `${theme.spacing["2xl"]} 0`};
`;

// 토글 스위치
export const ToggleSwitch = styled.button<{ $active?: boolean }>`
  width: 48px;
  height: 28px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid
    ${({ $active, theme }) =>
    $active ? theme.colors.common.black : theme.colors.border.primary};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.common.black : theme.colors.common.white};
  cursor: pointer;
  position: relative;
  transition: ${({ theme }) => theme.transition.normal};
  flex-shrink: 0;

  &::after {
    content: "";
    position: absolute;
    top: 2px;
    left: ${({ $active }) => ($active ? "22px" : "2px")};
    width: 22px;
    height: 22px;
    border-radius: ${({ theme }) => theme.radius.full};
    background: ${({ $active, theme }) =>
    $active ? theme.colors.common.white : theme.colors.border.primary};
    transition: ${({ theme }) => theme.transition.normal};
  }
`;

// 아바타 서클 (크기 props로 조절)
export const AvatarCircle = styled.div<{ $size?: "sm" | "md" | "lg" }>`
  ${({ $size = "md", theme }) => {
    const sizes = {
      sm: { width: "40px", height: "40px", fontSize: theme.font.size.md },
      md: { width: "120px", height: "120px", fontSize: theme.font.size.display },
      lg: { width: "200px", height: "200px", fontSize: "80px" },
    };
    return `
      width: ${sizes[$size].width};
      height: ${sizes[$size].height};
      font-size: ${sizes[$size].fontSize};
    `;
  }}
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.common.black};
  color: ${({ theme }) => theme.colors.common.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// 섹션
export const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing["3xl"]};
`;

// 섹션 헤더
export const SectionHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

// 섹션 타이틀
export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

// 섹션 설명
export const SectionDescription = styled.p`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.font.lineHeight.relaxed};
`;

