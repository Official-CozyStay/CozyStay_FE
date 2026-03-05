import styled from "styled-components";

export {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalHeaderCentered,
  ModalCloseButton,
  ModalCloseButtonAbsolute,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalFooterFullWidth,
  ModalDescription,
  SelectionCounter,
  SaveButton,
  FullWidthButton,
  SearchInput,
  Checkbox,
  ListItemText,
} from "@/styles/shared/modal.styles";

// 관심사 태그 그리드
export const InterestTagGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

// 관심사 태그 버튼
export const InterestTag = styled.button<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 1px solid
    ${({ $selected, theme }) =>
      $selected ? theme.colors.common.black : theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ $selected, theme }) =>
    $selected ? theme.colors.common.black : theme.colors.common.white};
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.common.white : theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.size.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.common.black};
  }

  svg {
    flex-shrink: 0;
  }
`;

// 모두 표시 링크
export const ShowAllLink = styled.button`
  padding: 0;
  border: none;
  background: none;
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

// 리스트 아이템
export const InterestListItem = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.lg} 0`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.background.hover};
    margin: 0 -${({ theme }) => theme.spacing.xl};
    padding-left: ${({ theme }) => theme.spacing.xl};
    padding-right: ${({ theme }) => theme.spacing.xl};
  }

  &:last-child {
    border-bottom: none;
  }
`;

// 리스트 아이템 아이콘
export const ListItemIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.primary};
  flex-shrink: 0;
`;

