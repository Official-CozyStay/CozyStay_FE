import styled from 'styled-components';

export const Page = styled.section`
  position: fixed;
  inset: 0;
  padding: clamp(16px, 4vw, 64px) clamp(16px, 5vw, 88px);
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const SignupCard = styled.div`
  position: relative;
  width: min(460px, 100%);
  border-radius: 28px;
  background: ${({ theme }) => theme.colors.common.white};
  padding: clamp(24px, 5vw, 40px);
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.25);
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  max-height: 90vh;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border.light};
    border-radius: 4px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.colors.background.default};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.border.light};
  }
`;

export const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

export const ModalTitle = styled.h2`
  font-size: 24px;
  margin: 0 0 6px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 700;
`;

export const ModalSubtitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.5;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const Input = styled.input`
  width: 100%;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  padding: 12px 14px;
  font-size: 15px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.background.default};
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.span`
  font-size: 12px;
  color: #ff3b30;
  margin-top: 2px;
`;

export const SuccessText = styled.span`
  font-size: 12px;
  color: #34c759;
  margin-top: 2px;
`;

export const ActionButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  border: none;
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.2s ease;

  background: ${({ theme, $variant }) =>
        $variant === 'secondary' ? theme.colors.background.default : theme.colors.primary.main};
  color: ${({ theme, $variant }) =>
        $variant === 'secondary' ? theme.colors.text.primary : theme.colors.common.white};
  
  border: 1px solid ${({ theme, $variant }) =>
        $variant === 'secondary' ? theme.colors.border.primary : 'transparent'};

  &:hover:not(:disabled) {
    background: ${({ theme, $variant }) =>
        $variant === 'secondary' ? theme.colors.border.light : theme.colors.primary.hover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SubmitButton = styled(ActionButton)`
  padding: 14px;
  font-size: 15px;
  margin-top: 8px;
`;
