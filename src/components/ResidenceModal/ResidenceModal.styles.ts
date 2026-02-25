import styled from "styled-components";

export {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalCloseButton,
  ModalTitle,
  ModalBody,
  SaveButton,
  FooterRight,
} from "@/styles/shared/modal.styles";

// 검색 입력창
export const SearchInputWrapper = styled.div<{ $focused?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border: 1px solid
    ${({ $focused, theme }) =>
      $focused ? theme.colors.common.black : theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radius.full};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  transition: ${({ theme }) => theme.transition.normal};

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: ${({ theme }) => theme.font.size.md};
    color: ${({ theme }) => theme.colors.text.primary};

    &::placeholder {
      color: ${({ theme }) => theme.colors.text.tertiary};
    }
  }

  svg {
    color: ${({ theme }) => theme.colors.text.secondary};
    flex-shrink: 0;
  }
`;

// 검색 결과 아이템
export const SearchResultItem = styled.button`
  display: block;
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.md} 0`};
  border: none;
  background: none;
  text-align: left;
  font-size: ${({ theme }) => theme.font.size.md};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

