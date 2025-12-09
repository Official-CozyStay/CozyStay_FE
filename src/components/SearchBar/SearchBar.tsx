import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from './SearchBar.styles';
import { Home, Search, Minus, Plus } from 'lucide-react';

interface SearchBarProps {
  isCompact?: boolean;
}

type GuestType = 'adults' | 'children' | 'infants' | 'pets';

interface GuestCounterRowProps {
  label: string;
  age: string;
  count: number;
  guestType: GuestType;
  onUpdate: (type: GuestType, delta: number) => void;
}

const GuestCounterRow: React.FC<GuestCounterRowProps> = React.memo(
  ({ label, age, count, guestType, onUpdate }) => (
    <GuestSection>
      <div>
        <GuestLabel>{label}</GuestLabel>
        <GuestAge>{age}</GuestAge>
      </div>
      <GuestCounter>
        <CounterButton
          onClick={(e) => {
            e.stopPropagation();
            onUpdate(guestType, -1);
          }}
          disabled={count === 0}
        >
          <Minus size={16} />
        </CounterButton>
        <CounterValue>{count}</CounterValue>
        <CounterButton
          onClick={(e) => {
            e.stopPropagation();
            onUpdate(guestType, 1);
          }}
        >
          <Plus size={16} />
        </CounterButton>
      </GuestCounter>
    </GuestSection>
  )
);

const SearchBar: React.FC<SearchBarProps> = ({ isCompact = false }) => {
  const navigate = useNavigate();
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
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showGuestPopup]);

  const updateGuest = useCallback((type: GuestType, delta: number) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  }, []);

  const totalGuests =
    guests.adults + guests.children + guests.infants + guests.pets;

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
          <span>
            {totalGuests > 0 ? `게스트 ${totalGuests}명` : '게스트 추가'}
          </span>
        </SearchFieldContent>
        {showGuestPopup && (
          <GuestPopup ref={popupRef}>
            <GuestCounterRow
              label="성인"
              age="13세 이상"
              count={guests.adults}
              guestType="adults"
              onUpdate={updateGuest}
            />
            <GuestCounterRow
              label="어린이"
              age="2~12세"
              count={guests.children}
              guestType="children"
              onUpdate={updateGuest}
            />
            <GuestCounterRow
              label="유아"
              age="2세 미만"
              count={guests.infants}
              guestType="infants"
              onUpdate={updateGuest}
            />
            <GuestCounterRow
              label="반려동물"
              age="보조동물을 동반하시나요?"
              count={guests.pets}
              guestType="pets"
              onUpdate={updateGuest}
            />
          </GuestPopup>
        )}
      </SearchField>

      <SearchButton
        type="button"
        $isCompact={isCompact}
        onClick={() => navigate('/search')}
      >
        <Search size={18} />
        {!isCompact && <span>검색</span>}
      </SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;
