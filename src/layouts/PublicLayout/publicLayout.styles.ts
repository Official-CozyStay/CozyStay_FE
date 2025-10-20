import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Header = styled.header`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  border-bottom: 1px solid #eee;
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Logo = styled.img`
  width: 105px;
  height: 60px;
`;

export const BrandTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 20px;
  a {
    text-decoration: none;
    color: #555;
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
  border-top: 1px solid #eee;
  text-align: center;
  color: #777;
  font-size: 13px;
  padding: 16px 0;
`;
