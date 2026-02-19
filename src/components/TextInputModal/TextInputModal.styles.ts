import styled from "styled-components";

export {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalCloseButton,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalDescription,
  SaveButton,
  FooterRight,
} from "@/styles/shared/modal.styles";

// 텍스트 입력 영역
export const InputWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const TextInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.font.size.md};
  color: ${({ theme }) => theme.colors.text.primary};
  transition: ${({ theme }) => theme.transition.normal};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.common.black};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.font.size.md};
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text.primary};
  transition: ${({ theme }) => theme.transition.normal};
  resize: vertical;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.common.black};
  }
`;

export const ModalTitleUnderline = styled.h2`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  text-decoration: underline;
  text-underline-offset: 4px;
`;

export const CharacterCount = styled.span`
  display: block;
  text-align: right;
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

