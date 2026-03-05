import styled from 'styled-components';
import { media } from '@/styles/media';

export const SidebarOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.overlay.default};
  z-index: ${({ theme }) => theme.zIndex.sidebarOverlay};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: ${({ theme }) => theme.transition.normal};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
`;

export const SidebarContainer = styled.aside<{
  $isOpen: boolean;
  $isScrolled?: boolean;
}>`
  position: fixed;
  top: ${({ $isScrolled, theme }) =>
    $isScrolled ? theme.spacing['5xl'] : theme.spacing['6xl']};
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  background: ${({ theme }) => theme.colors.common.white};
  z-index: ${({ theme }) => theme.zIndex.sidebar};
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
  transition:
    transform ${({ theme }) => theme.transition.slow},
    top ${({ theme }) => theme.transition.slow};
  display: flex;
  flex-direction: column;
  box-shadow: -${({ theme }) => theme.spacing.xs} 0
    ${({ theme }) => theme.spacing.lg} rgba(0, 0, 0, 0.1);
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};

  ${media.mobile} {
    max-width: 100%;
    top: ${({ $isScrolled, theme }) =>
      $isScrolled ? theme.spacing['4xl'] : theme.spacing['5xl']};
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  flex-shrink: 0;

  ${media.mobile} {
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  }
`;

export const SidebarCloseButton = styled.button`
  width: ${({ theme }) => theme.spacing['3xl']};
  height: ${({ theme }) => theme.spacing['3xl']};
  border-radius: ${({ theme }) => theme.radius.full};
  border: none;
  background: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${({ theme }) => theme.transition.normal};
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.border.light};
  }

  ${media.mobile} {
    width: ${({ theme }) => theme.spacing['2xl']};
    height: ${({ theme }) => theme.spacing['2xl']};
  }
`;

export const SidebarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

export const SidebarMenuIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  flex-shrink: 0;
  transition: ${({ theme }) => theme.transition.colors.normal};
`;

export const SidebarMenuItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: ${({ theme }) => theme.transition.normal};
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.border.light};

    ${SidebarMenuIcon} {
      color: ${({ theme }) => theme.colors.text.primary};
    }
  }
`;

export const SidebarMenuText = styled.span`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SidebarDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border.light};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

export const SidebarHostSection = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  margin: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.primary.light};
  border-radius: ${({ theme }) => theme.radius.lg};
  position: relative;
  overflow: hidden;
`;

export const SidebarHostTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const SidebarHostDesc = styled.p`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.font.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const SidebarHostIllustration = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing.xl};
  bottom: ${({ theme }) => theme.spacing.xl};
  width: ${({ theme }) => theme.spacing['6xl']};
  height: ${({ theme }) => theme.spacing['6xl']};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary.main};
  opacity: 0.2;

  svg {
    width: 100%;
    height: 100%;
  }

  ${media.mobile} {
    width: ${({ theme }) => theme.spacing['5xl']};
    height: ${({ theme }) => theme.spacing['5xl']};
    right: ${({ theme }) => theme.spacing.lg};
    bottom: ${({ theme }) => theme.spacing.lg};
  }
`;
