import styled from 'styled-components';
import { media } from '@/styles/media';

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.default};
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl}
    ${({ theme }) => theme.spacing['3xl']};
  background-color: ${({ theme }) => theme.colors.background.default};

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const LogoLink = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const LogoImage = styled.img`
  width: ${({ theme }) => theme.spacing['3xl']};
  height: ${({ theme }) => theme.spacing['3xl']};
`;

export const HeaderButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const HeaderButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xl}`};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.normal};

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    border-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const Main = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing['3xl']};
  margin-bottom: 80px; // Footer height

  ${media.mobile} {
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }
`;

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.background.default};
  display: flex;
  flex-direction: column;
  z-index: ${({ theme }) => theme.zIndex.header};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const ProgressBarContainer = styled.div`
  display: flex;
  height: 6px;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 0 ${({ theme }) => theme.spacing['3xl']};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  ${media.mobile} {
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }
`;

export const ProgressSegment = styled.div<{
  $active?: boolean;
  $completed?: boolean;
}>`
  flex: 1;
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radius.full};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: ${({ theme }) => theme.colors.primary.main};
    transform-origin: left center;
    transform: scaleX(
      ${({ $active, $completed }) => ($completed ? 1 : $active ? 1 : 0)}
    );
    transition: transform ${({ theme }) => theme.transition.slow};
    border-radius: ${({ theme }) => theme.radius.full};
  }
`;

export const FooterControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing['3xl']};
  height: 100%;

  ${media.mobile} {
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  text-decoration: underline;
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};

  &:disabled {
    color: ${({ theme }) => theme.colors.border.primary};
    cursor: not-allowed;
  }
`;

export const NextButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.common.white};
  border: none;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  cursor: pointer;
  transition: opacity ${({ theme }) => theme.transition.normal};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.hover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.border.light};
    cursor: not-allowed;
  }
`;
