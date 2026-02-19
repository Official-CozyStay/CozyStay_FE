import styled from "styled-components";
import { media } from "@/styles/media";

export const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.default};
`;

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

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
`;

export const Logo = styled.img`
  width: ${({ theme }) => theme.spacing["2xl"]};
  height: ${({ theme }) => theme.spacing["2xl"]};
`;

export const LogoText = styled.span`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.primary.main};

  ${media.mobile} {
    font-size: ${({ theme }) => theme.font.size.md};
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const HostButton = styled.button`
  background: none;
  border: none;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radius.full};
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  transition: background-color ${({ theme }) => theme.transition.normal};
  white-space: nowrap;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  ${media.mobile} {
    display: none;
  }
`;

export const ProfileButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xxs};
  border-radius: ${({ theme }) => theme.radius.full};
  transition: box-shadow ${({ theme }) => theme.transition.fast};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.header};
  }
`;

export const ProfilePlaceholder = styled.div`
  width: ${({ theme }) => theme.size.button.sm};
  height: ${({ theme }) => theme.size.button.sm};
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.common.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const MenuButton = styled.button`
  width: ${({ theme }) => theme.spacing["3xl"]};
  height: ${({ theme }) => theme.spacing["3xl"]};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  background: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${({ theme }) => theme.transition.normal};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }
`;

export const MenuDropdownWrapper = styled.div`
  position: relative;
`;

export const ContentWrapper = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing["3xl"]} ${theme.spacing["3xl"]}`};
  gap: ${({ theme }) => theme.spacing["5xl"]};

  ${media.tablet} {
    flex-direction: column;
    padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.lg}`};
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

export const Sidebar = styled.aside`
  width: 280px;
  flex-shrink: 0;

  ${media.tablet} {
    width: 100%;
  }
`;

export const SidebarTitle = styled.h1`
  font-size: ${({ theme }) => theme.font.size["2xl"]};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const SidebarMenuItem = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border: none;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.common.white : "transparent"};
  box-shadow: ${({ $active, theme }) => ($active ? theme.shadow.sm : "none")};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.normal};
  width: 100%;
  text-align: left;

  &:hover {
    background: ${({ theme }) => theme.colors.common.white};
  }
`;

export const MenuIcon = styled.div<{ $active?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const MenuItemText = styled.span`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const MainContent = styled.main`
  flex: 1;
  min-width: 0;
`;

export const ContentTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.size["2xl"]};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const EditButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.common.white};
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.background.hover};
  }
`;

export const ProfileCard = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing["3xl"]};
  margin-bottom: ${({ theme }) => theme.spacing["3xl"]};

  ${media.tablet} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

export const ProfileCardLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing["2xl"]};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radius.xl};
  background: ${({ theme }) => theme.colors.common.white};
  min-width: 200px;
`;

export const ProfileAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.text.primary};
  color: ${({ theme }) => theme.colors.common.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.font.size["3xl"]};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const ProfileName = styled.h3`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const ProfileRole = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ProfileCardRight = styled.div`
  flex: 1;
`;

export const ProfileCompleteBox = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const ProfileCompleteTitle = styled.h4`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const ProfileCompleteDesc = styled.p`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.font.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const PrimaryButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.common.white};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.hover};
  }
`;

export const ReviewSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const ReviewIcon = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ReviewText = styled.span`
  font-size: ${({ theme }) => theme.font.size.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing["5xl"]};
  text-align: center;
`;

export const EmptyImage = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const EmptyText = styled.p`
  font-size: ${({ theme }) => theme.font.size.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.font.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const EmptyLink = styled.a`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  &:hover {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;
