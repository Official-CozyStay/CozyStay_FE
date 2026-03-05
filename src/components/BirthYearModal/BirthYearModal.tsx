import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalCloseButton,
  ModalTitle,
  ModalBody,
  ModalDescription,
  SaveButton,
  ToggleOption,
  ToggleLabel,
  ToggleLabelTitle,
  ToggleLabelDescription,
  ToggleSwitch,
  FooterRight,
} from "./BirthYearModal.styles";

interface BirthYearModalProps {
  isOpen: boolean;
  onClose: () => void;
  showBirthDecade: boolean;
  onSave: (showBirthDecade: boolean) => void;
}

const BirthYearModal = ({
  isOpen,
  onClose,
  showBirthDecade,
  onSave,
}: BirthYearModalProps) => {
  const [isActive, setIsActive] = useState(showBirthDecade);

  // 모달이 열릴 때 외부 값으로 초기화
  useEffect(() => {
    if (isOpen) {
      setIsActive(showBirthDecade);
    }
  }, [isOpen, showBirthDecade]);

  const handleSave = () => {
    onSave(isActive);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <ModalOverlay onClick={handleClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalCloseButton onClick={handleClose}>
            <X size={20} />
          </ModalCloseButton>
          <div />
        </ModalHeader>

        <ModalBody>
          <ModalTitle>출생 연도</ModalTitle>
          <ModalDescription style={{ marginTop: "12px" }}>
            정확한 생년월일은 다른 사용자에게 공개되지 않으니 걱정하지 마세요.
          </ModalDescription>

          <ToggleOption>
            <ToggleLabel>
              <ToggleLabelTitle>출생 연대 표시</ToggleLabelTitle>
              <ToggleLabelDescription>출생 연대 00년대생</ToggleLabelDescription>
            </ToggleLabel>
            <ToggleSwitch
              $active={isActive}
              onClick={() => setIsActive(!isActive)}
            />
          </ToggleOption>
        </ModalBody>

        <FooterRight>
          <SaveButton onClick={handleSave}>저장</SaveButton>
        </FooterRight>
      </ModalContainer>
    </ModalOverlay>,
    document.body
  );
};

export default BirthYearModal;

