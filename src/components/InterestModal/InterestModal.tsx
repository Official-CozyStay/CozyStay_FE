import { useState } from "react";
import { createPortal } from "react-dom";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalHeaderCentered,
  ModalCloseButton,
  ModalCloseButtonAbsolute,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalFooterFullWidth,
  ModalDescription,
  SelectionCounter,
  SaveButton,
  FullWidthButton,
  SearchInput,
  InterestTagGrid,
  InterestTag,
  ShowAllLink,
  InterestListItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
} from "./InterestModal.styles";
import {
  X,
  Check,
  Search,
  Utensils,
  Camera,
  ShoppingBag,
  TreePine,
  Music,
  Building2,
  ChefHat,
  PawPrint,
  Theater,
  Coffee,
  Footprints,
  Film,
  BookOpen,
  Palette,
  Clock,
  Wine,
  Dumbbell,
  Home,
  Bike,
  Headphones,
  Globe,
} from "lucide-react";

interface Interest {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface InterestModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedInterests: string[];
  onSave: (interests: string[]) => void;
}

// 관심사 데이터 (나중에 API로 대체)
const INTERESTS: Interest[] = [
  { id: "food", label: "맛집", icon: Utensils },
  { id: "photography", label: "사진 촬영", icon: Camera },
  { id: "shopping", label: "쇼핑", icon: ShoppingBag },
  { id: "outdoor", label: "야외활동", icon: TreePine },
  { id: "liveMusic", label: "라이브 음악", icon: Music },
  { id: "museum", label: "박물관", icon: Building2 },
  { id: "cooking", label: "요리", icon: ChefHat },
  { id: "animals", label: "동물", icon: PawPrint },
  { id: "culture", label: "문화 체험", icon: Theater },
  { id: "coffee", label: "커피", icon: Coffee },
  { id: "walking", label: "걷기", icon: Footprints },
  { id: "movies", label: "영화", icon: Film },
  { id: "reading", label: "독서", icon: BookOpen },
  { id: "art", label: "예술", icon: Palette },
  { id: "history", label: "역사", icon: Clock },
  { id: "wine", label: "와인", icon: Wine },
];

// 전체 관심사 리스트 (모두 표시용)
const ALL_INTERESTS: Interest[] = [
  { id: "karate", label: "가라데", icon: Dumbbell },
  { id: "architecture", label: "건축", icon: Home },
  { id: "walking", label: "걷기", icon: Footprints },
  { id: "horseRacing", label: "경마", icon: Headphones },
  { id: "golf", label: "골프", icon: Globe },
  { id: "cycling", label: "자전거", icon: Bike },
  ...INTERESTS,
].sort((a, b) => a.label.localeCompare(b.label, "ko"));

const InterestModal = ({
  isOpen,
  onClose,
  selectedInterests,
  onSave,
}: InterestModalProps) => {
  const [selected, setSelected] = useState<string[]>(selectedInterests);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const maxSelections = 20;

  const toggleInterest = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
    } else if (selected.length < maxSelections) {
      setSelected([...selected, id]);
    }
  };

  const handleSave = () => {
    onSave(selected);
    onClose();
  };

  const handleClose = () => {
    if (showAll) {
      setShowAll(false);
    } else {
      onClose();
    }
  };

  const filteredInterests = ALL_INTERESTS.filter((interest) =>
    interest.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return createPortal(
    <ModalOverlay onClick={handleClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {showAll ? (
          // 리스트 뷰 (모두 표시)
          <>
            <ModalHeaderCentered>
              <ModalCloseButtonAbsolute onClick={handleClose}>
                <X size={20} />
              </ModalCloseButtonAbsolute>
              <ModalTitle>관심 분야</ModalTitle>
            </ModalHeaderCentered>

            <ModalBody>
              <SearchInput>
                <Search size={20} />
                <input
                  type="text"
                  placeholder="관심 분야 검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </SearchInput>

              {filteredInterests.map((interest) => {
                const Icon = interest.icon;
                const isSelected = selected.includes(interest.id);
                return (
                  <InterestListItem
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                  >
                    <Checkbox $checked={isSelected}>
                      {isSelected && <Check size={14} />}
                    </Checkbox>
                    <ListItemIcon>
                      <Icon size={20} />
                    </ListItemIcon>
                    <ListItemText>{interest.label}</ListItemText>
                  </InterestListItem>
                );
              })}
            </ModalBody>

            <ModalFooterFullWidth>
              <FullWidthButton onClick={handleSave}>완료</FullWidthButton>
            </ModalFooterFullWidth>
          </>
        ) : (
          // 태그 뷰 (기본)
          <>
            <ModalHeader>
              <ModalCloseButton onClick={handleClose}>
                <X size={20} />
              </ModalCloseButton>
              <div />
            </ModalHeader>

            <ModalBody>
              <ModalTitle style={{ marginBottom: "8px" }}>
                어떤 분야에 관심이 가시나요?
              </ModalTitle>
              <ModalDescription>
                프로필에 표시하고 싶은 관심 분야를 선택하세요.
              </ModalDescription>

              <InterestTagGrid>
                {INTERESTS.map((interest) => {
                  const Icon = interest.icon;
                  const isSelected = selected.includes(interest.id);
                  return (
                    <InterestTag
                      key={interest.id}
                      $selected={isSelected}
                      onClick={() => toggleInterest(interest.id)}
                    >
                      <Icon size={18} />
                      {interest.label}
                    </InterestTag>
                  );
                })}
              </InterestTagGrid>

              <ShowAllLink onClick={() => setShowAll(true)}>
                모두 표시
              </ShowAllLink>
            </ModalBody>

            <ModalFooter>
              <SelectionCounter>
                {selected.length}/{maxSelections}개 선택됨
              </SelectionCounter>
              <SaveButton onClick={handleSave}>저장</SaveButton>
            </ModalFooter>
          </>
        )}
      </ModalContainer>
    </ModalOverlay>,
    document.body
  );
};

export default InterestModal;

