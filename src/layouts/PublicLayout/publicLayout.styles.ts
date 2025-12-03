import styled from "styled-components";
import { Link } from "react-router-dom";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Header = styled.header`
  height: ${({ theme }) => theme.spacing["4xl"]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
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
  font-family: "Pacifico";
  font-size: 26px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.primary.main};
`;

export const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary.main};
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Main = styled.main`
  flex: 1;
`;

export const Footer = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
  text-align: center;
  color: ${({ theme }) => theme.colors.primary.main};
  opacity: 0.7;
  font-size: ${({ theme }) => theme.font.size.xs};
  padding: ${({ theme }) => theme.spacing.lg} 0;
`;
