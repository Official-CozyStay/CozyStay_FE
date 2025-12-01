import React, { useState, useRef, useEffect } from "react";
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

  const updateGuest = (
    type: keyof typeof guests,
    delta: number
  ) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  };

  const totalGuests = guests.adults + guests.children + guests.infants;

  return (
    <SearchBarContainer $isCompact={isCompact}>
      <SearchField onClick={() => {}} $isCompact={isCompact}>
        {!isCompact && <SearchFieldLabel>여행지</SearchFieldLabel>}
        <SearchFieldContent>
          <Home size={16} />
          {!isCompact && <span>여행지 검색</span>}
          {isCompact && <span>어디든지</span>}
        </SearchFieldContent>
      </SearchField>

      <SearchDivider $isCompact={isCompact} />

      <SearchField onClick={() => {}} $isCompact={isCompact}>
        {!isCompact && <SearchFieldLabel>날짜</SearchFieldLabel>}
        <SearchFieldContent>
          {!isCompact && <span>날짜 추가</span>}
          {isCompact && <span>언제든지</span>}
        </SearchFieldContent>
      </SearchField>

      <SearchDivider $isCompact={isCompact} />

      <SearchField
        onClick={() => setShowGuestPopup(!showGuestPopup)}
        style={{ position: "relative" }}
        $isCompact={isCompact}
      >
        {!isCompact && <SearchFieldLabel>여행자</SearchFieldLabel>}
        <SearchFieldContent>
          {!isCompact && (
            <span>{totalGuests > 0 ? `게스트 ${totalGuests}명` : "게스트 추가"}</span>
          )}
          {isCompact && (
            <span>{totalGuests > 0 ? `게스트 ${totalGuests}명` : "게스트 추가"}</span>
          )}
        </SearchFieldContent>
        {showGuestPopup && (
          <GuestPopup ref={popupRef}>
            <GuestSection>
              <div>
                <GuestLabel>성인</GuestLabel>
                <GuestAge>13세 이상</GuestAge>
              </div>
              <GuestCounter>
                <CounterButton
                  onClick={(e) => {
                    e.stopPropagation();
                    updateGuest("adults", -1);
                  }}
                  disabled={guests.adults === 0}
                >
                  <Minus size={16} />
                </CounterButton>
                <CounterValue>{guests.adults}</CounterValue>
                <CounterButton
                  onClick={(e) => {
                    e.stopPropagation();
                    updateGuest("adults", 1);
                  }}
                >
                  <Plus size={16} />
                </CounterButton>
              </GuestCounter>
            </GuestSection>

            <GuestSection>
              <div>
                <GuestLabel>어린이</GuestLabel>
                <GuestAge>2~12세</GuestAge>
              </div>
              <GuestCounter>
                <CounterButton
                  onClick={(e) => {
                    e.stopPropagation();
                    updateGuest("children", -1);
                  }}
                  disabled={guests.children === 0}
                >
                  <Minus size={16} />
                </CounterButton>
                <CounterValue>{guests.children}</CounterValue>
                <CounterButton
                  onClick={(e) => {
                    e.stopPropagation();
                    updateGuest("children", 1);
                  }}
                >
                  <Plus size={16} />
                </CounterButton>
              </GuestCounter>
            </GuestSection>

            <GuestSection>
              <div>
                <GuestLabel>유아</GuestLabel>
                <GuestAge>2세 미만</GuestAge>
              </div>
              <GuestCounter>
                <CounterButton
                  onClick={(e) => {
                    e.stopPropagation();
                    updateGuest("infants", -1);
                  }}
                  disabled={guests.infants === 0}
                >
                  <Minus size={16} />
                </CounterButton>
                <CounterValue>{guests.infants}</CounterValue>
                <CounterButton
                  onClick={(e) => {
                    e.stopPropagation();
                    updateGuest("infants", 1);
                  }}
                >
                  <Plus size={16} />
                </CounterButton>
              </GuestCounter>
            </GuestSection>

            <GuestSection>
              <div>
                <GuestLabel>반려동물</GuestLabel>
                <GuestAge>보조동물을 동반하시나요?</GuestAge>
              </div>
              <GuestCounter>
                <CounterButton
                  onClick={(e) => {
                    e.stopPropagation();
                    updateGuest("pets", -1);
                  }}
                  disabled={guests.pets === 0}
                >
                  <Minus size={16} />
                </CounterButton>
                <CounterValue>{guests.pets}</CounterValue>
                <CounterButton
                  onClick={(e) => {
                    e.stopPropagation();
                    updateGuest("pets", 1);
                  }}
                >
                  <Plus size={16} />
                </CounterButton>
              </GuestCounter>
            </GuestSection>
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

