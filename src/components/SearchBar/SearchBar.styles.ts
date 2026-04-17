import styled from 'styled-components';
import { media } from '@/styles/media';

const SEARCH_BAR_MAX_WIDTH_COMPACT = '340px';
const SEARCH_BAR_MAX_WIDTH = '850px';
const SEARCH_BAR_MAX_WIDTH_MOBILE = '300px';

export const SearchBarContainer = styled.div<{ $isCompact?: boolean }>`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.common.white};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.full};
  padding: ${({ $isCompact, theme }) =>
    $isCompact
      ? `${theme.spacing.xs} ${theme.spacing.sm} ${theme.spacing.xs} ${theme.spacing.lg}`
      : `${theme.spacing.md} ${theme.spacing.sm} ${theme.spacing.md} ${theme.spacing.xl}`};
  box-shadow: ${({ theme }) => theme.shadow.md};
  max-width: ${({ $isCompact }) =>
    $isCompact ? SEARCH_BAR_MAX_WIDTH_COMPACT : SEARCH_BAR_MAX_WIDTH};
  width: 100%;
  transition: ${({ theme }) => theme.transition.all.slow};
  gap: ${({ $isCompact, theme }) => ($isCompact ? theme.spacing.sm : '0')};

  ${media.mobile} {
    padding: ${({ $isCompact, theme }) =>
      $isCompact
        ? `${theme.spacing.xs} ${theme.spacing.md}`
        : `${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.lg}`};
    max-width: ${({ $isCompact }) =>
      $isCompact ? SEARCH_BAR_MAX_WIDTH_MOBILE : '100%'};
  }
`;

export const SearchField = styled.div<{
  $isCompact?: boolean;
  $hasPopup?: boolean;
}>`
  flex: ${({ $isCompact }) => ($isCompact ? '0 1 auto' : '1')};
  display: flex;
  flex-direction: ${({ $isCompact }) => ($isCompact ? 'row' : 'column')};
  align-items: ${({ $isCompact }) => ($isCompact ? 'center' : 'flex-start')};
  gap: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
  padding: ${({ $isCompact, theme }) =>
    $isCompact ? `0 ${theme.spacing.sm}` : `0 ${theme.spacing.lg}`};
  position: ${({ $hasPopup }) => ($hasPopup ? 'relative' : 'static')};
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
  width: 1px; // 1px divider는 border로 처리하기 어려워 하드코딩 유지
  height: ${({ $isCompact, theme }) =>
    $isCompact ? theme.spacing.lg : theme.spacing.xl};
  background: ${({ theme }) => theme.colors.border.primary};
  flex-shrink: 0;
`;

export const SearchButton = styled.button<{ $isCompact?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ $isCompact, theme }) => ($isCompact ? '0' : theme.spacing.sm)};
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.common.white};
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  padding: ${({ $isCompact, theme }) =>
    $isCompact
      ? `${theme.spacing.sm}`
      : `${theme.spacing.md} ${theme.spacing.xl}`};
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  transition: ${({ theme }) => theme.transition.colors.normal};
  flex-shrink: 0;
  margin-left: ${({ $isCompact, theme }) =>
    $isCompact ? theme.spacing.xs : '0'};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.hover};
  }

  ${media.mobile} {
    padding: ${({ $isCompact, theme }) =>
      $isCompact
        ? theme.spacing.sm
        : `${theme.spacing.sm} ${theme.spacing.lg}`};
    font-size: ${({ theme }) => theme.font.size.sm};
  }
`;

// ── 날짜 팝업 ──────────────────────────────────────────────

export const DatePopup = styled.div`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing.md});
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.common.white};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  z-index: ${({ theme }) => theme.zIndex.searchBar};
  white-space: normal;

  ${media.mobile} {
    left: 0;
    transform: none;
  }
`;

export const DayPickerWrapper = styled.div`
  .rdp-root {
    --rdp-accent-color: ${({ theme }) => theme.colors.primary.main};
    --rdp-accent-color-dark: ${({ theme }) => theme.colors.primary.hover};
    --rdp-background-color: ${({ theme }) => theme.colors.primary.main}20;
    font-family: inherit;
    font-size: ${({ theme }) => theme.font.size.sm};
  }
`;

// ── 여행자 팝업 ────────────────────────────────────────────

export const GuestPopup = styled.div`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing.sm});
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.common.white};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  min-width: 320px;
  z-index: ${({ theme }) => theme.zIndex.searchBar};
  white-space: normal;

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.md};
    min-width: 280px;
  }
`;

export const GuestSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg} 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  }
`;

// 텍스트 영역: flex-shrink 허용, 긴 설명도 줄바꿈 처리
export const GuestInfo = styled.div`
  flex: 1 1 auto;
  min-width: 0;
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
  white-space: normal;
  word-break: keep-all;
`;

export const GuestCounter = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-shrink: 0;
`;

export const CounterButton = styled.button`
  width: ${({ theme }) => theme.spacing['2xl']};
  height: ${({ theme }) => theme.spacing['2xl']};
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
  min-width: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;
