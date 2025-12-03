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
    $isScrolled ? theme.spacing.sm : `${theme.spacing.xl} ${theme.spacing["3xl"]}`};
  background: ${({ $isScrolled, theme }) =>
    $isScrolled ? "transparent" : theme.colors.common.white};
  position: ${({ $isScrolled }) => ($isScrolled ? "fixed" : "static")};
  top: ${({ $isScrolled, theme }) => ($isScrolled ? `${theme.spacing["5xl"]}` : "auto")};
  left: ${({ $isScrolled }) => ($isScrolled ? "50%" : "auto")};
  transform: ${({ $isScrolled }) => ($isScrolled ? "translateX(-50%)" : "none")};
  z-index: ${({ $isScrolled, theme }) =>
    $isScrolled ? theme.zIndex.searchBar : "auto"};
  width: ${({ $isScrolled }) => ($isScrolled ? "auto" : "100%")};
  transition: ${({ theme }) => theme.transition.all.slow};

  ${media.mobile} {
    padding: ${({ $isScrolled, theme }) =>
      $isScrolled ? `6px ${theme.spacing.lg}` : theme.spacing.lg};
    top: ${({ $isScrolled }) => ($isScrolled ? "56px" : "auto")};
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

export const SectionArrow = styled.span`
  font-size: ${({ theme }) => theme.font.size.xxl};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.colors.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
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

const SCROLL_BUTTON_SIZE = "40px";

export const ScrollButton = styled.button<{ $position: "left" | "right" }>`
  position: absolute;
  ${({ $position, theme }) =>
    $position === "left" ? `left: -${theme.spacing.xl}` : `right: -${theme.spacing.xl}`};
  top: 50%;
  transform: translateY(-50%);
  width: ${SCROLL_BUTTON_SIZE};
  height: ${SCROLL_BUTTON_SIZE};
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  background: ${({ theme }) => theme.colors.common.white};
  box-shadow: ${({ theme }) => theme.shadow.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  transition: ${({ theme }) => theme.transition.all.normal};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.lg};
    transform: translateY(-50%) scale(1.1);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  ${media.mobile} {
    display: none;
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
`;

