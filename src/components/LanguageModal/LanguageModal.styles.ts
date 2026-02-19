import styled from "styled-components";

export {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalCloseButton,
  ModalTitle,
  ModalBody,
  SaveButton,
  SearchInput,
  FooterRight,
  Checkbox,
  ListItemText as LanguageName,
} from "@/styles/shared/modal.styles";

// 언어 리스트 아이템
export const LanguageListItem = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing.lg} 0`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.normal};

  &:last-child {
    border-bottom: none;
  }
`;

