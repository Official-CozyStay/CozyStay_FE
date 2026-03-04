import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalContent,
  ModalInput,
  ModalInputLabel,
  ModalCharCount,
  ModalFooter,
  ModalCancelButton,
  ModalCreateButton,
} from './WishlistModal.styles';
import { X } from 'lucide-react';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (name: string) => void;
}

const WishlistModal = ({ isOpen, onClose, onCreate }: WishlistModalProps) => {
  const [wishlistName, setWishlistName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const MAX_LENGTH = 50;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // 모달이 열릴 때 입력 필드에 포커스
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
      setWishlistName('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleCreate = () => {
    if (wishlistName.trim() && onCreate) {
      onCreate(wishlistName.trim());
      setWishlistName('');
      onClose();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>위시리스트 만들기</ModalTitle>
          <ModalCloseButton onClick={onClose}>
            <X size={20} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalContent>
          <ModalInputLabel>이름</ModalInputLabel>
          <ModalInput
            ref={inputRef}
            type="text"
            value={wishlistName}
            onChange={(e) => setWishlistName(e.target.value)}
            placeholder="위시리스트 이름을 입력하세요"
            maxLength={MAX_LENGTH}
          />
          <ModalCharCount>
            {wishlistName.length}/{MAX_LENGTH}자
          </ModalCharCount>
        </ModalContent>
        <ModalFooter>
          <ModalCancelButton onClick={onClose}>취소</ModalCancelButton>
          <ModalCreateButton
            onClick={handleCreate}
            disabled={!wishlistName.trim()}
          >
            새로 만들기
          </ModalCreateButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );

  return createPortal(modalContent, document.body);
};

export default WishlistModal;
