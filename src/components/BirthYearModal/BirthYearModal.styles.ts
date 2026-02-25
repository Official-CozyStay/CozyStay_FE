import styled from "styled-components";

export {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalCloseButton,
  ModalTitle,
  ModalBody,
  ModalDescription,
  SaveButton,
  FooterRight,
} from "@/styles/shared/modal.styles";

export { ToggleSwitch } from "@/styles/shared/pageLayout.styles";

// 토글 옵션 영역
export const ToggleOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const ToggleLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const ToggleLabelTitle = styled.span`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ToggleLabelDescription = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

