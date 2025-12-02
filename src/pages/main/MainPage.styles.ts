import styled from "styled-components";
import { media } from "@/styles/media";

export const MainContainer = styled.div`
  padding-top: ${({ theme }) => theme.spacing["6xl"]};
  background: ${({ theme }) => theme.colors.common.white};

  ${media.mobile} {
    padding-top: ${({ theme }) => theme.spacing["5xl"]};
  }
`;

export const SearchBarWrapper = styled.div<{ $isScrolled?: boolean }>`
  display: flex;
  justify-content: center;
  padding: ${({ $isScrolled, theme }) =>
    $isScrolled
      ? theme.spacing.sm
      : `${theme.spacing.xl} ${theme.spacing["3xl"]}`};
  background: ${({ $isScrolled, theme }) =>
    $isScrolled ? "transparent" : theme.colors.common.white};
  position: ${({ $isScrolled }) => ($isScrolled ? "fixed" : "static")};
  top: ${({ $isScrolled }) => ($isScrolled ? "0" : "auto")};
  left: ${({ $isScrolled }) => ($isScrolled ? "50%" : "auto")};
  transform: ${({ $isScrolled }) =>
    $isScrolled ? "translateX(-50%)" : "none"};
  z-index: ${({ $isScrolled, theme }) =>
    $isScrolled ? theme.zIndex.header + 1 : "auto"};
  width: ${({ $isScrolled }) => ($isScrolled ? "auto" : "100%")};
  transition: ${({ theme }) => theme.transition.all.slow};
  height: ${({ $isScrolled }) => ($isScrolled ? "64px" : "auto")};
  align-items: center;
  pointer-events: ${({ $isScrolled }) => ($isScrolled ? "none" : "auto")};

  > * {
    pointer-events: auto;
  }

  ${media.mobile} {
    padding: ${({ $isScrolled, theme }) =>
      $isScrolled ? `6px ${theme.spacing.lg}` : theme.spacing.lg};
    top: ${({ $isScrolled }) => ($isScrolled ? "0" : "auto")};
    height: ${({ $isScrolled }) => ($isScrolled ? "56px" : "auto")};
  }
`;

export const Section = styled.section`
  max-width: 1760px;
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
    width: 300px;
  }

  ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.xs} 0;

    > * {
      width: 260px;
    }
  }
`;

export const ScrollButtonGroup = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  top: -${({ theme }) => theme.spacing["2xl"]};
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  z-index: ${({ theme }) => theme.zIndex.fixed};

  ${media.mobile} {
    display: none;
  }
`;

export const ScrollButton = styled.button<{
  $position: "left" | "right";
  $disabled?: boolean;
}>`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  background: ${({ theme }) => theme.colors.common.white};
  box-shadow: ${({ theme }) => theme.shadow.md};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${({ theme }) => theme.transition.all.normal};
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.text.secondary : theme.colors.text.primary};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

  &:hover:not(:disabled) {
    box-shadow: ${({ theme }) => theme.shadow.lg};
    transform: scale(1.1);
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
  border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
  text-align: center;
  color: ${({ theme }) => theme.colors.primary.main};
  opacity: 0.7;
  font-size: ${({ theme }) => theme.font.size.xs};
  padding: ${({ theme }) => theme.spacing["3xl"]} 0;
  margin-top: ${({ theme }) => theme.spacing["6xl"]};
  background: ${({ theme }) => theme.colors.common.white};

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.xl} 0;
    margin-top: ${({ theme }) => theme.spacing["4xl"]};
    font-size: ${({ theme }) => theme.font.size.xs};
  }
`;
