import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Header = styled.header`
  position: sticky;
  top: 0;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  background: ${({ theme }) => theme.colors.common.white};
  z-index: 100;
`;

export const Brand = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

export const Logo = styled.img`
  width: 105px;
  height: 70px;
  margin-right: -18px;
`;

export const BrandTitle = styled.h1`
  font-family: 'Pacifico';
  font-size: 26px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.primary.main};
`;

export const Nav = styled.nav`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const NavLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary.main};
  font-weight: 500;
  font-size: ${({ theme }) => theme.font.size.md};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const NavButton = styled.button`
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

export const Main = styled.main`
  flex: 1;
`;

export const Footer = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.primary};
  opacity: 0.7;
  font-size: 13px;
  padding: 16px 0;
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

export const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
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
