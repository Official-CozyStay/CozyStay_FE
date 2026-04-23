import styled from 'styled-components';

// 닫힌 상태 트리거 — Wrapper 높이 기준을 잡아줌
export const Wrapper = styled.div`
  position: relative;
`;

export const CompactRow = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
`;

export const CompactBox = styled.button`
  flex: 1;
  text-align: left;
  border: none;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.sm}`};
  background: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;
  outline: none;
  transition: background-color 0.15s ease;

  & + & {
    border-left: 1px solid ${({ theme }) => theme.colors.border.light};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.background.hover};
  }
`;

// CompactRow / InputBox 공통 라벨·값 컴포넌트
export const DateFieldLabel = styled.div`
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
`;

export const DateFieldValue = styled.div<{ $placeholder?: boolean }>`
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme, $placeholder }) =>
    $placeholder ? theme.colors.text.tertiary : theme.colors.text.primary};
`;

// 열린 상태 패널 — top:0 으로 CompactRow 위에 오버레이
// right:0 + min-width:660px → 카드 오른쪽 끝 정렬, 왼쪽으로 확장
export const Panel = styled.div<{ $open: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  min-width: 660px;
  max-height: ${({ $open }) => ($open ? '580px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: ${({ theme }) => theme.colors.common.white};
  border: ${({ $open, theme }) =>
    $open ? `1px solid ${theme.colors.border.light}` : 'none'};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ $open }) =>
    $open ? '0 10px 24px rgba(0,0,0,0.15)' : 'none'};
  z-index: ${({ theme }) => theme.zIndex.popover};
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const NightSummary = styled.div`
  flex-shrink: 0;
  min-width: 160px;
`;

export const NightCount = styled.div`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.2;
`;

export const NightRange = styled.div`
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.xxs};
`;

export const InputsGroup = styled.div`
  flex: 1;
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const InputBox = styled.button<{ $active?: boolean }>`
  flex: 1;
  position: relative;
  text-align: left;
  border: ${({ $active, theme }) =>
    $active
      ? `2px solid ${theme.colors.text.primary}`
      : `1px solid ${theme.colors.border.primary}`};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;
  outline: none;
  transition:
    border-color 0.15s ease,
    background-color 0.15s ease;

  &:hover {
    border-color: ${({ $active, theme }) =>
      $active ? theme.colors.text.primary : theme.colors.text.secondary};
    background: ${({ theme }) => theme.colors.background.hover};
  }
`;

// InputBox 전용: X 버튼 공간 확보용 padding-right 추가
export const InputValue = styled(DateFieldValue)`
  padding-right: ${({ theme }) => theme.spacing.xl};
`;

export const ClearIconButton = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.spacing.sm};
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.border.primary};
  color: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;
  padding: 0;

  &:hover {
    background: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const FooterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const FooterActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const ClearDatesButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  text-decoration: underline;
  border-radius: ${({ theme }) => theme.radius.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.background.hover};
  }
`;

export const CloseButton = styled.button`
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.common.white};
  background: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.radius.md};

  &:hover {
    opacity: 0.8;
  }
`;

export const calendarStyles = {
  months: { display: 'flex', flexWrap: 'nowrap' as const },
  month: { width: 290, margin: '0 8px' },
} as const;
