import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Search } from "lucide-react";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalCloseButton,
  ModalTitle,
  ModalBody,
  SaveButton,
  SearchInputWrapper,
  SearchResultItem,
  FooterRight,
} from "./ResidenceModal.styles";

interface ResidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedResidence: string;
  onSave: (residence: string) => void;
}

// 도시 목록 (나중에 API로 대체 - 실제로는 검색 API 사용)
const CITIES = [
  "Seoul, South Korea",
  "Busan, South Korea",
  "Incheon, South Korea",
  "Daegu, South Korea",
  "Daejeon, South Korea",
  "Gwangju, South Korea",
  "Ulsan, South Korea",
  "Suwon, Gyeonggi-do, South Korea",
  "Gwangju-si, Gyeonggi-do, South Korea",
  "Seongnam, Gyeonggi-do, South Korea",
  "Goyang, Gyeonggi-do, South Korea",
  "Yongin, Gyeonggi-do, South Korea",
  "Bucheon, Gyeonggi-do, South Korea",
  "Ansan, Gyeonggi-do, South Korea",
  "Anyang, Gyeonggi-do, South Korea",
  "Jeju City, Jeju-do, South Korea",
  "Tokyo, Japan",
  "Osaka, Japan",
  "New York, NY, USA",
  "Los Angeles, CA, USA",
  "San Francisco, CA, USA",
  "London, United Kingdom",
  "Paris, France",
  "Berlin, Germany",
  "Sydney, Australia",
  "Singapore",
  "Hong Kong",
  "Bangkok, Thailand",
  "Shanghai, China",
  "Beijing, China",
];

const ResidenceModal = ({
  isOpen,
  onClose,
  selectedResidence,
  onSave,
}: ResidenceModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState(selectedResidence);
  const [isFocused, setIsFocused] = useState(false);

  // 모달이 열릴 때 외부 값으로 초기화
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setSelected(selectedResidence);
    }
  }, [isOpen, selectedResidence]);

  const handleSelectCity = (city: string) => {
    setSelected(city);
    setSearchQuery(city);
  };

  const handleSave = () => {
    onSave(selected);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const filteredCities = searchQuery
    ? CITIES.filter((city) =>
        city.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

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
          <ModalTitle style={{ marginBottom: "24px" }}>거주지</ModalTitle>

          <SearchInputWrapper $focused={isFocused}>
            <Search size={20} />
            <input
              type="text"
              placeholder="도시 검색"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelected("");
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </SearchInputWrapper>

          {filteredCities.map((city) => (
            <SearchResultItem
              key={city}
              onClick={() => handleSelectCity(city)}
            >
              {city}
            </SearchResultItem>
          ))}
        </ModalBody>

        <FooterRight>
          <SaveButton onClick={handleSave} disabled={!selected}>
            저장
          </SaveButton>
        </FooterRight>
      </ModalContainer>
    </ModalOverlay>,
    document.body
  );
};

export default ResidenceModal;

