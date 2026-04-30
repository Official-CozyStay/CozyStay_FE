import styled from 'styled-components';

/**
 * createPortal(document.body)로 렌더링되므로 position: fixed 사용.
 * top/left는 useLayoutEffect에서 실측 DOM 폭 기반으로 보정됨.
 * sticky 헤더(SearchBar)와 일반 스크롤 위치(BookingCard) 모두에서 정상 동작.
 */
export const PopoverContainer = styled.div<{ $singleMonth?: boolean }>`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.popover};
  background: ${({ theme }) => theme.colors.common.white};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  padding: ${({ theme }) => theme.spacing.sm};
  min-width: ${({ $singleMonth }) => ($singleMonth ? '350px' : '660px')};
`;

export const dayPickerStyles = {
  months: { display: 'flex', flexWrap: 'nowrap' as const },
  month: { width: 320, margin: '0 8px' },
} as const;
