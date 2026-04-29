import styled from 'styled-components';
import { media } from '@/styles/media';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.overlay.default};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.common.white};
  border-radius: ${({ theme }) => theme.radius.lg};
  max-width: 560px;
  width: 100%;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  ${media.mobile} {
    max-width: 100%;
    max-height: 85vh;
    border-radius: 0;
  }
`;

export const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  flex-shrink: 0;
`;

export const ModalHeaderCentered = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  flex-shrink: 0;
  position: relative;
`;

export const ModalCloseButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.full};
  transition: ${({ theme }) => theme.transition.normal};
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.background.hover};
  }
`;

export const ModalCloseButtonAbsolute = styled(ModalCloseButton)`
  position: absolute;
  left: ${({ theme }) => theme.spacing.lg};
`;

export const ModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const ModalFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  flex-shrink: 0;
`;

export const ModalFooterFullWidth = styled.footer`
  padding: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  flex-shrink: 0;
`;

export const ModalDescription = styled.p`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const SelectionCounter = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const SaveButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing['2xl']}`};
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.primary.main};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.hover};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.border.primary};
    cursor: not-allowed;
  }
`;

export const FullWidthButton = styled(SaveButton)`
  width: 100%;
`;

export const SearchInput = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radius.full};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

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

export const FooterRight = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const Checkbox = styled.div<{ $checked?: boolean }>`
  width: 24px;
  height: 24px;
  border: 2px solid
    ${({ $checked, theme }) =>
      $checked ? theme.colors.common.black : theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ $checked, theme }) =>
    $checked ? theme.colors.common.black : theme.colors.common.white};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: ${({ theme }) => theme.transition.normal};

  svg {
    color: ${({ theme }) => theme.colors.common.white};
  }
`;

export const ListItemText = styled.span`
  font-size: ${({ theme }) => theme.font.size.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;
