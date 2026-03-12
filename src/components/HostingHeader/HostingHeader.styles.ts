import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { media } from '@/styles/media';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${({ theme }) => theme.spacing['6xl']};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing['3xl']};
  background: ${({ theme }) => theme.colors.background.default};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  z-index: ${({ theme }) => theme.zIndex.header};

  ${media.mobile} {
    padding: 0 ${({ theme }) => theme.spacing.lg};
    height: ${({ theme }) => theme.spacing['5xl']};
  }
`;

export const HeaderLeft = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  text-decoration: none;
`;

export const Logo = styled.img`
  width: ${({ theme }) => theme.spacing['3xl']};
  height: ${({ theme }) => theme.spacing['3xl']};
`;

export const LogoText = styled.span`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.primary.main};

  ${media.mobile} {
    font-size: ${({ theme }) => theme.font.size.md};
  }
`;

export const HeaderCenter = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;

  ${media.mobile} {
    display: none;
  }
`;

export const NavItem = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.font.weight.bold : theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  position: relative;
  transition: color ${({ theme }) => theme.transition.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.common.black};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: ${({ theme }) => theme.spacing.lg};
    right: ${({ theme }) => theme.spacing.lg};
    height: 2px;
    background: ${({ theme }) => theme.colors.primary.main};
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transition: opacity ${({ theme }) => theme.transition.normal};
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const SwitchModeButton = styled.button`
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
  padding: 4px;
  border-radius: ${({ theme }) => theme.radius.full};
  transition: box-shadow 0.15s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const ProfilePlaceholder = styled.div`
  width: 32px;
  height: 32px;
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

export const MenuDropdownWrapper = styled.div`
  position: relative;
`;

export const MenuIconButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  width: ${({ theme }) => theme.spacing['3xl']};
  height: ${({ theme }) => theme.spacing['3xl']};
  border-radius: ${({ theme }) => theme.radius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.normal};
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.sm};
    background-color: ${({ theme }) => theme.colors.background.hover};
  }
`;
