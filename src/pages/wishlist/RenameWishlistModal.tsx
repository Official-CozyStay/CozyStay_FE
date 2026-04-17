import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Overlay,
  Container,
  Title,
  Input,
  Actions,
  Button,
  PrimaryButton,
} from './RenameWishlistModal.styles';

interface RenameWishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  onConfirm: (newName: string) => void | Promise<void>;
  isLoading?: boolean;
}

const RenameWishlistModal = ({
  isOpen,
  onClose,
  currentName,
  onConfirm,
  isLoading = false,
}: RenameWishlistModalProps) => {
  const [name, setName] = useState(currentName);

  useEffect(() => {
    if (isOpen) setName(currentName);
  }, [isOpen, currentName]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    await onConfirm(trimmed);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const content = (
    <Overlay onClick={handleOverlayClick}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Title>이름 변경</Title>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="위시리스트 이름"
          maxLength={50}
        />
        <Actions>
          <Button type="button" onClick={onClose}>
            취소
          </Button>
          <PrimaryButton
            type="button"
            onClick={handleSubmit}
            disabled={!name.trim() || isLoading}
          >
            {isLoading ? '저장 중...' : '확인'}
          </PrimaryButton>
        </Actions>
      </Container>
    </Overlay>
  );

  return createPortal(content, document.body);
};

export default RenameWishlistModal;
