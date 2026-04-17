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

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  label {
    font-size: ${({ theme }) => theme.font.size.sm};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  input {
    padding: ${({ theme }) => theme.spacing.md};
    border: 1px solid ${({ theme }) => theme.colors.border.primary || theme.colors.border.light};
    border-radius: ${({ theme }) => theme.radius.md};
    font-size: ${({ theme }) => theme.font.size.md};
    color: ${({ theme }) => theme.colors.text.primary};
    transition: ${({ theme }) => theme.transition.normal};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary.main};
    }
    
    &::placeholder {
      color: ${({ theme }) => theme.colors.text.tertiary};
    }
  }
`;

export const ErrorText = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.status.error};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;
