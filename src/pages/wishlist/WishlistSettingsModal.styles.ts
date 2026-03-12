import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.overlay.default};
  z-index: ${({ theme }) => theme.zIndex.modalOverlay};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.common.white};
  border-radius: ${({ theme }) => theme.radius.xl};
  width: 100%;
  max-width: 480px;
  padding-top: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  overflow: hidden;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 32px 1fr 32px;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.lg}
    ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const Title = styled.h2`
  grid-column: 2;
  justify-self: center;
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  text-align: center;
`;

export const CloseBtn = styled.button`
  grid-column: 3;
  justify-self: end;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.border.light};
  }
`;

export const MenuList = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
`;

export const MenuItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  background: transparent;
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.size.md};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: left;
  transition: ${({ theme }) => theme.transition.normal};

  & > span:nth-child(2) {
    flex: 1;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.border.light};
  }

  &:last-of-type {
    color: ${({ theme }) => theme.colors.status.error};
  }
`;

export const MenuIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Chevron = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
`;
