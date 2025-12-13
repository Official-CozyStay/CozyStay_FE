import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Main = styled.main`
  flex: 1;
`;

export const Footer = styled.footer`
  border-top: none;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.primary};
  opacity: 0.7;
  font-size: ${({ theme }) => theme.font.size.xs};
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
  background: ${({ theme }) => theme.colors.background.default};
`;
