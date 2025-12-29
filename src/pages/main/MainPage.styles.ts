import styled from "styled-components";
import { media } from "@/styles/media";

export const MainContainer = styled.div`
  padding-top: ${({ theme }) => theme.spacing["6xl"]};
  background: ${({ theme }) => theme.colors.background.default};

  ${media.mobile} {
    padding-top: ${({ theme }) => theme.spacing["5xl"]};
  }
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing["3xl"]}`};
  background: ${({ theme }) => theme.colors.background.default};
  width: 100%;
  align-items: center;

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const Section = styled.section`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto ${({ theme }) => theme.spacing["5xl"]};
  padding: 0 ${({ theme }) => theme.spacing["3xl"]};

  ${media.mobile} {
    padding: 0 ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing["4xl"]};
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.extrabold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;

  ${media.mobile} {
    font-size: ${({ theme }) => theme.font.size.lg};
  }
`;

export const CardListWrapper = styled.div`
  position: relative;
`;

export const CARD_WIDTH = "300px";
const CARD_WIDTH_MOBILE = "260px";

export const CardList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  > * {
    flex-shrink: 0;
    width: ${CARD_WIDTH};
  }

  ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.xs} 0;

    > * {
      width: ${CARD_WIDTH_MOBILE};
    }
  }
`;

export const ScrollButtonGroup = styled.div`
  position: absolute;
  top: -${({ theme }) => theme.spacing["4xl"]};
  right: 0;
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
  z-index: 10;

  ${media.mobile} {
    display: none;
  }
`;

export const ScrollButton = styled.button<{
  $position: "left" | "right";
  $disabled?: boolean;
}>`
  width: ${({ theme }) => theme.spacing["3xl"]};
  height: ${({ theme }) => theme.spacing["3xl"]};
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  background: ${({ theme }) => theme.colors.common.white};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${({ theme }) => theme.transition.all.normal};
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.text.secondary : theme.colors.text.primary};
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};

  &:hover:not(:disabled) {
    box-shadow: ${({ theme }) => theme.shadow.md};
    transform: scale(1.05);
    border-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.main};
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const Footer = styled.footer`
  border-top: none;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.primary};
  opacity: 0.7;
  font-size: ${({ theme }) => theme.font.size.xs};
  padding: ${({ theme }) => theme.spacing["3xl"]} 0;
  margin-top: ${({ theme }) => theme.spacing["6xl"]};
  background: ${({ theme }) => theme.colors.background.default};

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.xl} 0;
    margin-top: ${({ theme }) => theme.spacing["4xl"]};
    font-size: ${({ theme }) => theme.font.size.xs};
  }
`;
