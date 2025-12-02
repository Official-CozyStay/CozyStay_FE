import styled from "styled-components";
import { media } from "@/styles/media";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
  box-sizing: border-box;

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.md};
    align-items: flex-end;
    justify-content: center;
  }
`;

export const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.common.white};
  border-radius: ${({ theme }) => theme.radius.xl};
  max-width: 568px;
  width: calc(100% - ${({ theme }) => theme.spacing.xl} * 2);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadow.lg};
  overflow: hidden;
  z-index: 1101;
  box-sizing: border-box;

  ${media.mobile} {
    max-width: 100%;
    width: 100%;
    border-radius: ${({ theme }) => theme.radius.xl} ${({ theme }) => theme.radius.xl} 0 0;
    max-height: 80vh;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const ModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;

  ${media.mobile} {
    font-size: ${({ theme }) => theme.font.size.lg};
  }
`;

export const ModalCloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: none;
  background: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${({ theme }) => theme.transition.normal};
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.border.light};
  }

  ${media.mobile} {
    width: 28px;
    height: 28px;
  }
`;

export const ModalContent = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  flex: 1;
  overflow-y: auto;

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const ModalInputLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.font.size.md};
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.common.white};
  transition: ${({ theme }) => theme.transition.colors.normal};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.light};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const ModalCharCount = styled.div`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
  text-align: right;
`;

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.lg};
    flex-direction: column-reverse;
    gap: ${({ theme }) => theme.spacing.sm};

    button {
      width: 100%;
    }
  }
`;

export const ModalButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.colors.normal};
  border: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ModalCancelButton = styled(ModalButton)`
  background: ${({ theme }) => theme.colors.common.white};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.border.light};
  }
`;

export const ModalCreateButton = styled(ModalButton)`
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.common.white};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary.hover};
  }
`;

