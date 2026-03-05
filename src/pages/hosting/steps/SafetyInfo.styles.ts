import styled from 'styled-components';
import {
  StepContainer,
  TitleSection as BaseTitleSection,
  StepTitle,
} from './shared.styles';

// 공통 스타일 재사용
export const SafetyContainer = styled(StepContainer)`
  gap: ${({ theme }) => theme.spacing['2xl']};
  align-items: flex-start;
  justify-content: center;
`;

export const TitleSection = BaseTitleSection;
export const Title = StepTitle;

// SafetyInfo 전용 스타일
export const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CheckboxList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['3xl']};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;

export const CheckboxLabel = styled.span`
  flex: 1;
  font-size: ${({ theme }) => theme.font.size.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Checkbox = styled.div<{ $checked?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 2px solid
    ${({ theme, $checked }) =>
      $checked ? theme.colors.text.primary : theme.colors.border.primary};
  background-color: ${({ theme, $checked }) =>
    $checked ? theme.colors.text.primary : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transition.fast};
  flex-shrink: 0;
  margin-left: auto;

  svg {
    color: ${({ theme }) => theme.colors.common.white};
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const NoticeSection = styled.div`
  width: 100%;
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const NoticeTitle = styled.h4`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const NoticeText = styled.p`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0;
`;

// 모달 스타일
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.overlay.default};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.modalOverlay};
`;

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.common.white};
  border-radius: ${({ theme }) => theme.radius.xl};
  width: 90%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  margin: -${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    opacity: 0.7;
  }
`;

export const ModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.3;
`;

export const ModalDescription = styled.p`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.5;
  margin: 0;
`;

export const ModalTextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.font.size.md};
  font-family: inherit;
  line-height: 1.5;
  resize: vertical;
  transition: all ${({ theme }) => theme.transition.fast};

  &:focus {
    outline: none;
    border-width: 2px;
    padding: calc(${({ theme }) => theme.spacing.lg} - 1px);
  }
`;

export const CharCount = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: right;
`;

export const ModalButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.text.primary};
  color: ${({ theme }) => theme.colors.common.white};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.border.primary};
    cursor: not-allowed;
  }
`;
