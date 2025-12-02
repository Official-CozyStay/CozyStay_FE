import styled from "styled-components";
import { media } from "@/styles/media";

export const HeaderContainer = styled.header<{ $isScrolled?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${({ $isScrolled }) => ($isScrolled ? "64px" : "80px")};
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing["3xl"]};
  background: ${({ theme }) => theme.colors.common.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  z-index: ${({ theme }) => theme.zIndex.header};
  transition: height ${({ theme }) => theme.transition.slow},
    box-shadow ${({ theme }) => theme.transition.slow};
  box-shadow: ${({ $isScrolled }) =>
    $isScrolled ? "0 2px 8px rgba(0,0,0,0.1)" : "none"};

  ${media.mobile} {
    grid-template-columns: 1fr auto;
    padding: 0 ${({ theme }) => theme.spacing.lg};
    height: ${({ $isScrolled }) => ($isScrolled ? "56px" : "64px")};
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-self: start;
`;

export const Logo = styled.img`
  width: 60px;
  height: 60px;

  ${media.mobile} {
    width: 40px;
    height: 40px;
  }
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
  gap: ${({ theme }) => theme.spacing["2xl"]};
  justify-content: center;
  justify-self: center;

  ${({ $isScrolled }) =>
    $isScrolled &&
    `
    display: none;
  `}

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
    content: "";
    position: absolute;
    bottom: 0;
    left: ${({ theme }) => theme.spacing.lg};
    right: ${({ theme }) => theme.spacing.lg};
    height: 2px;
    background: ${({ theme }) => theme.colors.primary.main};
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transition: ${({ theme }) => theme.transition.normal};
  }

  svg {
    color: ${({ theme }) => theme.colors.primary.main};
  }
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

export const HostModeButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  border-radius: ${({ theme }) => theme.radius.md};
  transition: ${({ theme }) => theme.transition.colors.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.border.light};
  }

  ${media.mobile} {
    display: none;
  }
`;

export const UserProfileButton = styled.button`
  width: 42px;
  height: 42px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  background: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${({ theme }) => theme.transition.all.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
  overflow: hidden;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  svg {
    width: 30px;
    height: 30px;
    background: ${({ theme }) => theme.colors.border.light};
    border-radius: ${({ theme }) => theme.radius.full};
    padding: ${({ theme }) => theme.spacing.xs};
  }

  ${media.mobile} {
    width: 32px;
    height: 32px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

export const MenuButton = styled.button`
  width: 42px;
  height: 42px;
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

  ${media.mobile} {
    width: 36px;
    height: 36px;
  }
`;
