import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
  to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${({ theme }) => theme.colors.overlay.default};
  z-index: ${({ theme }) => theme.zIndex.modalOverlay};
`;

const Dialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${({ theme }) => theme.zIndex.modalContainer};
  background-color: ${({ theme }) => theme.colors.common.white};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing['2xl']};
  width: 360px;
  box-shadow: ${({ theme }) => theme.shadow.lg};
  animation: ${fadeIn} 0.15s ease-out;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Message = styled.p`
  font-size: ${({ theme }) => theme.font.size.md};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.6;
  margin: 0;
  white-space: pre-wrap;
`;

const ConfirmButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.text.primary};
  color: ${({ theme }) => theme.colors.common.white};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  cursor: pointer;
  transition: opacity ${({ theme }) => theme.transition.fast};

  &:hover {
    opacity: 0.85;
  }
`;

interface AlertProps {
  message: string;
  onClose: () => void;
}

const Alert = ({ message, onClose }: AlertProps) => {
  return (
    <>
      <Overlay onClick={onClose} />
      <Dialog>
        <Message>{message}</Message>
        <ConfirmButton onClick={onClose}>확인</ConfirmButton>
      </Dialog>
    </>
  );
};

export default Alert;
