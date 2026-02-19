import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Check, Search } from "lucide-react";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalCloseButton,
  ModalTitle,
  ModalBody,
  SaveButton,
  SearchInput,
  LanguageListItem,
  LanguageName,
  Checkbox,
  FooterRight,
} from "./LanguageModal.styles";

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLanguages: string[];
  onSave: (languages: string[]) => void;
}

// 언어 목록 (나중에 API로 대체)
const LANGUAGES = [
  "한국어",
  "갈리시아어",
  "구자라트어",
  "그리스어",
  "네덜란드어",
  "노르웨이어",
  "덴마크어",
  "독일어",
  "라트비아어",
  "러시아어",
  "루마니아어",
  "리투아니아어",
  "말레이어",
  "베트남어",
  "벵골어",
  "불가리아어",
  "스와힐리어",
  "스웨덴어",
  "스페인어",
  "슬로바키아어",
  "슬로베니아어",
  "아랍어",
  "아르메니아어",
  "아이슬란드어",
  "에스토니아어",
  "영어",
  "우크라이나어",
  "이탈리아어",
  "인도네시아어",
  "일본어",
  "중국어",
  "체코어",
  "카탈루냐어",
  "크로아티아어",
  "타갈로그어",
  "태국어",
  "터키어",
  "페르시아어",
  "포르투갈어",
  "폴란드어",
  "프랑스어",
  "핀란드어",
  "헝가리어",
  "헤브라이어",
  "힌디어",
].sort((a, b) => a.localeCompare(b, "ko"));

const LanguageModal = ({
  isOpen,
  onClose,
  selectedLanguages,
  onSave,
}: LanguageModalProps) => {
  const [selected, setSelected] = useState<string[]>(selectedLanguages);
  const [searchQuery, setSearchQuery] = useState("");

  // 모달이 열릴 때 외부 값으로 초기화
  useEffect(() => {
    if (isOpen) {
      setSelected(selectedLanguages);
      setSearchQuery("");
    }
  }, [isOpen, selectedLanguages]);

  const toggleLanguage = (language: string) => {
    if (selected.includes(language)) {
      setSelected(selected.filter((l) => l !== language));
    } else {
      setSelected([...selected, language]);
    }
  };

  const handleSave = () => {
    onSave(selected);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const filteredLanguages = LANGUAGES.filter((language) =>
    language.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <ModalTitle style={{ marginBottom: "24px" }}>구사 언어</ModalTitle>

          <SearchInput>
            <Search size={20} />
            <input
              type="text"
              placeholder="언어 검색하기"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchInput>

          {filteredLanguages.map((language) => {
            const isSelected = selected.includes(language);
            return (
              <LanguageListItem
                key={language}
                onClick={() => toggleLanguage(language)}
              >
                <LanguageName>{language}</LanguageName>
                <Checkbox $checked={isSelected}>
                  {isSelected && <Check size={14} />}
                </Checkbox>
              </LanguageListItem>
            );
          })}
        </ModalBody>

        <FooterRight>
          <SaveButton onClick={handleSave}>저장</SaveButton>
        </FooterRight>
      </ModalContainer>
    </ModalOverlay>,
    document.body
  );
};

export default LanguageModal;

