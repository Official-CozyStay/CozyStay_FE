import React from 'react';
import { createPortal } from 'react-dom';
import { Pencil, Trash2, X } from 'lucide-react';
import {
  Overlay,
  Container,
  Header,
  Title,
  CloseBtn,
  MenuList,
  MenuItem,
  MenuIcon,
  Chevron,
} from './WishlistSettingsModal.styles';

interface WishlistSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRename: () => void;
  onDelete: () => void;
}

const WishlistSettingsModal = ({
  isOpen,
  onClose,
  onRename,
  onDelete,
}: WishlistSettingsModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const content = (
    <Overlay onClick={handleOverlayClick}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>환경설정</Title>
          <CloseBtn type="button" onClick={onClose}>
            <X size={20} />
          </CloseBtn>
        </Header>
        <MenuList>
          <MenuItem
            type="button"
            onClick={() => {
              onRename();
              onClose();
            }}
          >
            <MenuIcon>
              <Pencil size={18} />
            </MenuIcon>
            <span>이름 변경</span>
            <Chevron>&gt;</Chevron>
          </MenuItem>
          <MenuItem
            type="button"
            onClick={() => {
              onDelete();
              onClose();
            }}
          >
            <MenuIcon>
              <Trash2 size={18} />
            </MenuIcon>
            <span>삭제</span>
            <Chevron>&gt;</Chevron>
          </MenuItem>
        </MenuList>
      </Container>
    </Overlay>
  );

  return createPortal(content, document.body);
};

export default WishlistSettingsModal;
