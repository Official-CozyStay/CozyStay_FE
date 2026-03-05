import styled from "styled-components";

export const ListContainer = styled.aside`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${({ theme }) => theme.colors.common.white};
`;

/** 대화 목록·채팅창 헤더 공통 높이 (두 헤더가 동일하게 맞춤) */
const HEADER_MIN_HEIGHT = 56;

export const Header = styled.header`
  min-height: ${HEADER_MIN_HEIGHT}px;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  margin: 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const IconButton = styled.button`
  width: ${({ theme }) => theme.spacing["2xl"]};
  height: ${({ theme }) => theme.spacing["2xl"]};
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  background: ${({ theme }) => theme.colors.common.white};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: background ${({ theme }) => theme.transition.normal},
    color ${({ theme }) => theme.transition.normal},
    box-shadow ${({ theme }) => theme.transition.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.background.hover};
    color: ${({ theme }) => theme.colors.text.primary};
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }
`;

export const FilterBar = styled.div`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg}
    ${({ theme }) => theme.spacing.md};
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
`;

export const FilterChip = styled.button<{ $active?: boolean }>`
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.text.primary : theme.colors.border.primary};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.common.white : "transparent"};
  padding: ${({ theme }) => theme.spacing.xs}
    ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.font.size.sm};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ListBody = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 0 ${({ theme }) => theme.spacing.sm}
    ${({ theme }) => theme.spacing.sm};
`;

export const StateText = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;
