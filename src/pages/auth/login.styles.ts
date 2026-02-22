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

export const LoginCard = styled.div`
  position: relative;
  width: min(460px, 100%);
  border-radius: 28px;
  background: ${({ theme }) => theme.colors.common.white};
  padding: clamp(24px, 5vw, 40px);
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.25);
  border: 1px solid ${({ theme }) => theme.colors.border.light};
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
  gap: 12px;
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Select = styled.select`
  width: 100%;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  padding: 12px 14px;
  font-size: 14px;
  background: ${({ theme }) => theme.colors.common.white};
`;

export const Input = styled.input`
  width: 100%;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  padding: 12px 14px;
  font-size: 15px;
`;

export const ContinueButton = styled.button`
  border: none;
  border-radius: 12px;
  padding: 14px;
  font-size: 15px;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.hover};
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const DividerLine = styled.span`
  flex: 1;
  height: 1px;
  background: ${({ theme }) => theme.colors.border.light};
`;

export const AuthButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const AuthButton = styled.button<{ $variant?: 'kakao' }>`
  border-radius: 14px;
  padding: 13px 16px;
  border: 1px solid
    ${({ theme, $variant }) =>
      $variant === 'kakao' ? 'transparent' : theme.colors.border.primary};
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  background: ${({ $variant }) => ($variant === 'kakao' ? '#FEE500' : '#fff')};
  color: ${({ $variant }) => ($variant === 'kakao' ? '#191600' : '#333')};
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.2s ease;
  box-shadow: ${({ $variant }) =>
    $variant === 'kakao' ? '0 8px 20px rgba(0,0,0,0.18)' : 'none'};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: ${({ $variant }) =>
      $variant === 'kakao'
        ? '0 12px 24px rgba(0,0,0,0.2)'
        : '0 8px 16px rgba(0,0,0,0.08)'};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.text.secondary};
    background: ${({ theme }) => theme.colors.background.default};
    border-style: dashed;
    opacity: 0.8;
    box-shadow: none;
  }
`;

export const KakaoIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 8px;
  background: #191600;
  color: #fee500;
  font-weight: 700;
  font-size: 14px;
`;

export const ProviderIcon = styled.span`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
`;

export const PolicyText = styled.p`
  margin: 18px 0 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  line-height: 1.5;
`;
