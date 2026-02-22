import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import {
  SafetyContainer,
  TitleSection,
  Title,
  SectionTitle,
  CheckboxList,
  CheckboxItem,
  CheckboxLabel,
  Checkbox,
  HiddenInput,
  NoticeSection,
  NoticeTitle,
  NoticeText,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  CloseButton,
  ModalTitle,
  ModalDescription,
  ModalTextArea,
  CharCount,
  ModalButton,
} from './SafetyInfo.styles';
import type { StepProps } from '../BecomeHostPage';

interface SafetyOption {
  id: string;
  label: string;
  modalTitle: string;
  modalDescription: string;
}

const safetyOptions: SafetyOption[] = [
  {
    id: 'camera',
    label: '숙소 실외 공간을 모니터링하는 보안 카메라 있음',
    modalTitle:
      '숙소의 실외 공간을 모니터링하는 보안 카메라에 대해 게스트에게 알려주세요',
    modalDescription:
      '각 카메라가 모니터링하는 공간이 어디인지 알려주세요(예: 뒷마당, 수영장 등).',
  },
  {
    id: 'noise',
    label: '소음 측정기 있음',
    modalTitle: '소음 측정기에 대해 게스트에게 알려주세요',
    modalDescription: '소음 측정기의 위치와 작동 방식을 알려주세요.',
  },
  {
    id: 'weapon',
    label: '숙소에 무기가 있음',
    modalTitle: '숙소에 있는 무기에 대해 게스트에게 알려주세요',
    modalDescription: '무기의 종류와 보관 위치를 알려주세요.',
  },
];

const MAX_LENGTH = 300;

const SafetyInfo = ({ data, onDataChange }: StepProps) => {
  const selectedItems = data.safetyInfo || {};
  const [modalOpen, setModalOpen] = useState<string | null>(null);
  const [tempDescription, setTempDescription] = useState('');

  const handleCheckboxClick = (id: string) => {
    const currentItem = selectedItems[id];

    if (currentItem?.checked) {
      // 체크 해제
      onDataChange({
        safetyInfo: {
          ...selectedItems,
          [id]: { checked: false, description: '' },
        },
      });
    } else {
      // 체크 시 모달 열기
      setModalOpen(id);
      setTempDescription(currentItem?.description || '');
    }
  };

  const handleModalClose = () => {
    setModalOpen(null);
    setTempDescription('');
  };

  const handleModalSubmit = () => {
    if (modalOpen) {
      onDataChange({
        safetyInfo: {
          ...selectedItems,
          [modalOpen]: { checked: true, description: tempDescription },
        },
      });
      setModalOpen(null);
      setTempDescription('');
    }
  };

  const currentModalOption = safetyOptions.find((opt) => opt.id === modalOpen);

  return (
    <SafetyContainer>
      <TitleSection>
        <Title>안전 관련 정보 공유하기</Title>
      </TitleSection>

      <div>
        <SectionTitle>숙소에 다음 사항이 있나요?</SectionTitle>
        <CheckboxList>
          {safetyOptions.map((option) => {
            const isChecked = selectedItems[option.id]?.checked || false;
            return (
              <CheckboxItem
                key={option.id}
                onClick={() => handleCheckboxClick(option.id)}
              >
                <CheckboxLabel>{option.label}</CheckboxLabel>
                <HiddenInput type="checkbox" checked={isChecked} readOnly />
                <Checkbox $checked={isChecked}>
                  {isChecked && <Check size={16} />}
                </Checkbox>
              </CheckboxItem>
            );
          })}
        </CheckboxList>
      </div>

      <NoticeSection>
        <NoticeTitle>중요사항</NoticeTitle>
        <NoticeText>
          실내 공간을 모니터링하는 보안 카메라는 전원이 꺼져 있어도 허용되지
          않습니다. 실외 공간을 모니터링하는 보안 카메라는 설치 위치를 모두
          공개해야 합니다.
        </NoticeText>
      </NoticeSection>

      {/* 모달 */}
      {modalOpen && currentModalOption && (
        <ModalOverlay onClick={handleModalClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <CloseButton onClick={handleModalClose}>
                <X size={24} />
              </CloseButton>
            </ModalHeader>

            <ModalTitle>{currentModalOption.modalTitle}</ModalTitle>
            <ModalDescription>
              {currentModalOption.modalDescription}
            </ModalDescription>

            <ModalTextArea
              value={tempDescription}
              onChange={(e) => {
                if (e.target.value.length <= MAX_LENGTH) {
                  setTempDescription(e.target.value);
                }
              }}
              placeholder="내용을 입력하세요..."
              maxLength={MAX_LENGTH}
            />
            <CharCount>{MAX_LENGTH - tempDescription.length}자 남음</CharCount>

            <ModalButton onClick={handleModalSubmit}>계속</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </SafetyContainer>
  );
};

export default SafetyInfo;
