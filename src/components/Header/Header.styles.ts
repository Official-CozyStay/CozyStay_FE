import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { media } from '@/styles/media';

export const HeaderContainer = styled.header<{ $isScrolled?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${({ $isScrolled, theme }) =>
    $isScrolled ? `${theme.spacing['5xl']}` : `${theme.spacing['6xl']}`};
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing['3xl']};
  background: ${({ theme }) => theme.colors.common.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  z-index: ${({ theme }) => theme.zIndex.header};
  transition: all ${({ theme }) => theme.transition.slow};
  box-shadow: ${({ $isScrolled, theme }) =>
    $isScrolled ? theme.shadow.md : 'none'};

  ${media.mobile} {
    grid-template-columns: 1fr auto 1fr;
    padding: 0 ${({ theme }) => theme.spacing.lg};
    height: ${({ $isScrolled, theme }) =>
      $isScrolled ? `${theme.spacing['4xl']}` : `${theme.spacing['5xl']}`};
  }
`;

export const HeaderLeft = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-self: start;
  text-decoration: none;
  color: inherit;

  &:hover,
  &:visited,
  &:active,
  &:focus {
    text-decoration: none;
    color: inherit;
  }
`;

export const Logo = styled.img`
  width: ${({ theme }) => theme.spacing['2xl']};
  height: ${({ theme }) => theme.spacing['2xl']};
`;

export const LogoText = styled.span`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.primary.main};

  ${media.mobile} {
    font-size: ${({ theme }) => theme.font.size.md};
  }
`;

export const HeaderCenter = styled.nav<{ $isScrolled?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['2xl']};
  justify-content: center;
  justify-self: center;

  ${media.mobile} {
    display: none;
  }
`;

export const NavItem = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text.primary : theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.font.weight.bold : theme.font.weight.medium};
  position: relative;
  transition: ${({ theme }) => theme.transition.colors.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: ${({ theme }) => theme.spacing.lg};
    right: ${({ theme }) => theme.spacing.lg};
    height: ${({ theme }) => theme.spacing.xs};
    background: ${({ theme }) => theme.colors.primary.main};
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transition: ${({ theme }) => theme.transition.normal};
  }

  svg {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const NavBadge = styled.span`
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.common.white};
  font-size: ${({ theme }) => theme.font.size.xs};
  padding: ${({ theme }) => theme.spacing.xxs}
    ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-self: end;

  ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;


export const MenuButton = styled.button`
  width: ${({ theme }) => theme.spacing['3xl']};
  height: ${({ theme }) => theme.spacing['3xl']};
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

export const ProfileDropdownWrapper = styled.div`
  position: relative;
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

export const LoginButton = styled.button`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary.main};
  font-weight: 500;
  font-size: ${({ theme }) => theme.font.size.md};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
  &:hover {
    text-decoration: underline;
  }
`;
