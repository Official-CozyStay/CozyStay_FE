import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalCloseButton,
  ModalTitle,
  ModalTitleUnderline,
  ModalBody,
  ModalDescription,
  SaveButton,
  InputWrapper,
  TextInput,
  TextArea,
  CharacterCount,
  FooterRight,
} from "./TextInputModal.styles";

interface TextInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  placeholder?: string;
  maxLength: number;
  value: string;
  onSave: (value: string) => void;
  multiline?: boolean;
  titleUnderline?: boolean;
}

const TextInputModal = ({
  isOpen,
  onClose,
  title,
  description,
  placeholder = "",
  maxLength,
  value,
  onSave,
  multiline = false,
  titleUnderline = false,
}: TextInputModalProps) => {
  const [inputValue, setInputValue] = useState(value);

  // 모달이 열릴 때 외부 값으로 초기화
  useEffect(() => {
    if (isOpen) {
      setInputValue(value);
    }
  }, [isOpen, value]);

  const remainingChars = maxLength - inputValue.length;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      setInputValue(newValue);
    }
  };

  const handleSave = () => {
    onSave(inputValue);
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
          {titleUnderline ? (
            <ModalTitleUnderline>{title}</ModalTitleUnderline>
          ) : (
            <ModalTitle>{title}</ModalTitle>
          )}
          <ModalDescription style={{ marginTop: "12px" }}>
            {description}
          </ModalDescription>

          <InputWrapper>
            {multiline ? (
              <TextArea
                placeholder={placeholder}
                value={inputValue}
                onChange={handleChange}
                autoFocus
              />
            ) : (
              <TextInput
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={handleChange}
                autoFocus
              />
            )}
            <CharacterCount>{remainingChars}자 남음</CharacterCount>
          </InputWrapper>
        </ModalBody>

        <FooterRight>
          <SaveButton onClick={handleSave}>저장</SaveButton>
        </FooterRight>
      </ModalContainer>
    </ModalOverlay>,
    document.body
  );
};

export default TextInputModal;

