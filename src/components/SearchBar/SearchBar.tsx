import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  SearchBarContainer,
  SearchField,
  SearchFieldLabel,
  SearchFieldContent,
  SearchDivider,
  SearchButton,
  GuestPopup,
  GuestSection,
  GuestLabel,
  GuestAge,
  GuestCounter,
  CounterButton,
  CounterValue,
} from "./SearchBar.styles";
import { Home, Search, Minus, Plus } from "lucide-react";

interface SearchBarProps {
  isCompact?: boolean;
}

interface GuestCounterRowProps {
  label: string;
  age: string;
  count: number;
  onIncrease: (e: React.MouseEvent) => void;
  onDecrease: (e: React.MouseEvent) => void;
}

const GuestCounterRow: React.FC<GuestCounterRowProps> = React.memo(({
  label,
  age,
  count,
  onIncrease,
  onDecrease,
}) => (
  <GuestSection>
    <div>
      <GuestLabel>{label}</GuestLabel>
      <GuestAge>{age}</GuestAge>
    </div>
    <GuestCounter>
      <CounterButton onClick={onDecrease} disabled={count === 0}>
        <Minus size={16} />
      </CounterButton>
      <CounterValue>{count}</CounterValue>
      <CounterButton onClick={onIncrease}>
        <Plus size={16} />
      </CounterButton>
    </GuestCounter>
  </GuestSection>
));

const SearchBar: React.FC<SearchBarProps> = ({ isCompact = false }) => {
  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowGuestPopup(false);
      }
    };

    if (showGuestPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showGuestPopup]);

  const updateGuest = useCallback(
    (type: keyof typeof guests, delta: number) => {
      setGuests((prev) => ({
        ...prev,
        [type]: Math.max(0, prev[type] + delta),
      }));
    },
    []
  );

  // 성인 수 조절 핸들러
  const handleAdultsIncrease = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      updateGuest("adults", 1);
    },
    [updateGuest]
  );

  const handleAdultsDecrease = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      updateGuest("adults", -1);
    },
    [updateGuest]
  );

  // 어린이 수 조절 핸들러
  const handleChildrenIncrease = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      updateGuest("children", 1);
    },
    [updateGuest]
  );

  const handleChildrenDecrease = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      updateGuest("children", -1);
    },
    [updateGuest]
  );

  // 유아 수 조절 핸들러
  const handleInfantsIncrease = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      updateGuest("infants", 1);
    },
    [updateGuest]
  );

  const handleInfantsDecrease = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      updateGuest("infants", -1);
    },
    [updateGuest]
  );

  // 반려동물 수 조절 핸들러
  const handlePetsIncrease = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      updateGuest("pets", 1);
    },
    [updateGuest]
  );

  const handlePetsDecrease = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      updateGuest("pets", -1);
    },
    [updateGuest]
  );

  const totalGuests = guests.adults + guests.children + guests.infants + guests.pets;

  return (
    <SearchBarContainer $isCompact={isCompact}>
      <SearchField
        onClick={() => {
          // TODO: 여행지 검색 기능 구현
        }}
        $isCompact={isCompact}
      >
        {!isCompact && <SearchFieldLabel>여행지</SearchFieldLabel>}
        <SearchFieldContent>
          <Home size={16} />
          {!isCompact && <span>여행지 검색</span>}
          {isCompact && <span>어디든지</span>}
        </SearchFieldContent>
      </SearchField>

      <SearchDivider $isCompact={isCompact} />

      <SearchField
        onClick={() => {
          // TODO: 날짜 선택 기능 구현
        }}
        $isCompact={isCompact}
      >
        {!isCompact && <SearchFieldLabel>날짜</SearchFieldLabel>}
        <SearchFieldContent>
          {!isCompact && <span>날짜 추가</span>}
          {isCompact && <span>언제든지</span>}
        </SearchFieldContent>
      </SearchField>

      <SearchDivider $isCompact={isCompact} />

      <SearchField
        onClick={() => setShowGuestPopup(!showGuestPopup)}
        $hasPopup={showGuestPopup}
        $isCompact={isCompact}
      >
        {!isCompact && <SearchFieldLabel>여행자</SearchFieldLabel>}
        <SearchFieldContent>
          <span>{totalGuests > 0 ? `게스트 ${totalGuests}명` : "게스트 추가"}</span>
        </SearchFieldContent>
        {showGuestPopup && (
          <GuestPopup ref={popupRef}>
            <GuestCounterRow
              label="성인"
              age="13세 이상"
              count={guests.adults}
              onDecrease={handleAdultsDecrease}
              onIncrease={handleAdultsIncrease}
            />
            <GuestCounterRow
              label="어린이"
              age="2~12세"
              count={guests.children}
              onDecrease={handleChildrenDecrease}
              onIncrease={handleChildrenIncrease}
            />
            <GuestCounterRow
              label="유아"
              age="2세 미만"
              count={guests.infants}
              onDecrease={handleInfantsDecrease}
              onIncrease={handleInfantsIncrease}
            />
            <GuestCounterRow
              label="반려동물"
              age="보조동물을 동반하시나요?"
              count={guests.pets}
              onDecrease={handlePetsDecrease}
              onIncrease={handlePetsIncrease}
            />
          </GuestPopup>
        )}
      </SearchField>

      <SearchButton type="button" $isCompact={isCompact}>
        <Search size={18} />
        {!isCompact && <span>검색</span>}
      </SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;

