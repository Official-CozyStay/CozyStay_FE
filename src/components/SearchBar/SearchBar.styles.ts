import styled from "styled-components";
import { media } from "@/styles/media";

export const SearchBarContainer = styled.div<{ $isCompact?: boolean }>`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.common.white};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.full};
  padding: ${({ $isCompact, theme }) =>
    $isCompact
      ? `${theme.spacing.sm} ${theme.spacing.lg}`
      : `14px ${theme.spacing.sm} 14px ${theme.spacing.xl}`};
  box-shadow: ${({ theme }) => theme.shadow.md};
  max-width: ${({ $isCompact }) => ($isCompact ? "420px" : "850px")};
  width: 100%;
  transition: ${({ theme }) => theme.transition.all.slow};
  gap: ${({ $isCompact, theme }) => ($isCompact ? theme.spacing.sm : "0")};

  ${media.mobile} {
    padding: ${({ $isCompact, theme }) =>
      $isCompact
        ? `6px ${theme.spacing.md}`
        : `10px ${theme.spacing.md} 10px ${theme.spacing.lg}`};
    max-width: ${({ $isCompact }) => ($isCompact ? "320px" : "100%")};
  }
`;

export const SearchField = styled.div<{ $isCompact?: boolean }>`
  flex: ${({ $isCompact }) => ($isCompact ? "0 1 auto" : "1")};
  display: flex;
  flex-direction: ${({ $isCompact }) => ($isCompact ? "row" : "column")};
  align-items: ${({ $isCompact }) => ($isCompact ? "center" : "flex-start")};
  gap: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
  padding: ${({ $isCompact, theme }) =>
    $isCompact ? `0 ${theme.spacing.sm}` : `0 ${theme.spacing.lg}`};
  position: relative;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.colors.border.light};
    border-radius: ${({ theme }) => theme.radius.md};
  }

  ${media.mobile} {
    padding: ${({ $isCompact, theme }) =>
      $isCompact ? `0 ${theme.spacing.md}` : `0 ${theme.spacing.md}`};
  }
`;

export const SearchFieldLabel = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SearchFieldContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.font.size.sm};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SearchDivider = styled.div<{ $isCompact?: boolean }>`
  width: 1px;
  height: ${({ $isCompact }) => ($isCompact ? "16px" : "24px")};
  background: ${({ theme }) => theme.colors.border.primary};
  flex-shrink: 0;
`;

export const SearchButton = styled.button<{ $isCompact?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ $isCompact, theme }) => ($isCompact ? "0" : theme.spacing.sm)};
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.common.white};
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  width: ${({ $isCompact }) => ($isCompact ? "32px" : "48px")};
  height: ${({ $isCompact }) => ($isCompact ? "32px" : "48px")};
  padding: 0;
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  transition: ${({ theme }) => theme.transition.colors.normal};
  flex-shrink: 0;
  margin-left: ${({ $isCompact, theme }) =>
    $isCompact ? theme.spacing.md : "0"};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.hover};
  }

  ${media.mobile} {
    width: ${({ $isCompact }) => ($isCompact ? "32px" : "40px")};
    height: ${({ $isCompact }) => ($isCompact ? "32px" : "40px")};
    font-size: ${({ theme }) => theme.font.size.sm};
  }
`;

export const GuestPopup = styled.div`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing.sm});
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.common.white};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  min-width: 280px;
  z-index: ${({ theme }) => theme.zIndex.searchBar};

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.md};
    min-width: 240px;
  }
`;

export const GuestSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg} 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  }
`;

export const GuestLabel = styled.div`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const GuestAge = styled.div`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const GuestCounter = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const CounterButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${({ theme }) => theme.transition.all.normal};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.main};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  ${media.mobile} {
    width: 28px;
    height: 28px;
  }
`;

export const CounterValue = styled.span`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  min-width: 24px;
  text-align: center;
`;
