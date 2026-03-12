import styled from 'styled-components';
import { media } from '@/styles/media';

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.overlay.default};
  z-index: ${({ theme }) => theme.zIndex.modalOverlay};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.md};
    align-items: flex-end;
  }
`;

export const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.common.white};
  border-radius: ${({ theme }) => theme.radius.xl};
  width: 100%;
  max-width: 568px;
  height: 720px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadow.lg};
  overflow: hidden;

  ${media.mobile} {
    height: 80vh;
    max-height: 80vh;
    border-radius: ${({ theme }) => theme.radius.xl}
      ${({ theme }) => theme.radius.xl} 0 0;
  }
`;

export const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: 32px 1fr 32px;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const ModalTitle = styled.h2`
  grid-column: 2;
  justify-self: center;
  margin: 0;
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
`;

export const ModalCloseButton = styled.button`
  grid-column: 3;
  justify-self: end;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.border.light};
  }
`;

export const ModalContent = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
  overflow: hidden;
  display: flex;
  flex-direction: column;

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

/* 목록 뷰: 스크롤 영역 + 하단 버튼 */
export const ListScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-right: ${({ theme }) => theme.spacing.md};
`;

export const WishlistList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const WishlistItem = styled.button`
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;
  text-align: left;
  overflow: hidden;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.border.light};
  transition: ${({ theme }) => theme.transition.normal};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`;

export const WishlistItemThumb = styled.div<{ $imageUrl?: string | null }>`
  width: 100%;
  aspect-ratio: 1;
  background: ${({ $imageUrl, theme }) =>
    $imageUrl
      ? `url(${$imageUrl}) center/cover`
      : `linear-gradient(135deg, ${theme.colors.border.light} 0%, ${theme.colors.border.primary} 100%)`};
`;

export const WishlistItemBody = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

export const WishlistItemTitle = styled.div`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const WishlistItemCount = styled.div`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ModalNewWishlistButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  background: ${({ theme }) => theme.colors.text.primary};
  color: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

/* 만들기 뷰 */
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
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
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
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const ModalCancelButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  background: ${({ theme }) => theme.colors.common.white};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.border.light};
  }
`;

export const ModalCreateButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  border: none;
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary.hover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ModalButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.border.light};
  }
`;
