import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { DayPicker } from 'react-day-picker';
import type { DateRange } from 'react-day-picker';
import 'react-day-picker/style.css';
import {
  SearchBarContainer,
  SearchField,
  SearchFieldLabel,
  SearchFieldContent,
  SearchDivider,
  SearchButton,
  GuestPopup,
  GuestSection,
  GuestInfo,
  GuestLabel,
  GuestAge,
  GuestCounter,
  CounterButton,
  CounterValue,
  DatePopup,
  DayPickerWrapper,
} from './SearchBar.styles';
import { Search, Minus, Plus } from 'lucide-react';

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

const GuestCounterRow = React.memo(
  ({ label, age, count, guestType, onUpdate }: GuestCounterRowProps) => (
    <GuestSection>
      <GuestInfo>
        <GuestLabel>{label}</GuestLabel>
        <GuestAge>{age}</GuestAge>
      </GuestInfo>
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
  ),
);

GuestCounterRow.displayName = 'GuestCounterRow';

const formatDate = (date: Date): string =>
  `${date.getMonth() + 1}월 ${date.getDate()}일`;

const SearchBar = ({ isCompact = false }: SearchBarProps) => {
  const navigate = useNavigate();
  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const [showDatePopup, setShowDatePopup] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const guestFieldRef = useRef<HTMLDivElement>(null);
  const dateFieldRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const datePopupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        popupRef.current &&
        !popupRef.current.contains(target) &&
        !guestFieldRef.current?.contains(target)
      ) {
        setShowGuestPopup(false);
      }
      if (
        datePopupRef.current &&
        !datePopupRef.current.contains(target) &&
        !dateFieldRef.current?.contains(target)
      ) {
        setShowDatePopup(false);
      }
    };

    if (showGuestPopup || showDatePopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showGuestPopup, showDatePopup]);

  const updateGuest = useCallback((type: GuestType, delta: number) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  }, []);

  const handleDateSelect = useCallback((range: DateRange | undefined) => {
    // from === to이면 "시작일만 선택된 상태"로 정규화
    const normalized: DateRange | undefined =
      range?.from && range?.to && range.from.getTime() === range.to.getTime()
        ? { from: range.from, to: undefined }
        : range;

    setDateRange(normalized);

    if (normalized?.from && normalized?.to) {
      setShowDatePopup(false);
    }
  }, []);

  const totalGuests =
    guests.adults + guests.children + guests.infants + guests.pets;

  const dateLabel = dateRange?.from
    ? dateRange.to
      ? `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`
      : `${formatDate(dateRange.from)} ~`
    : '날짜 추가';

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
          {!isCompact && <span>여행지 검색</span>}
          {isCompact && <span>어디든지</span>}
        </SearchFieldContent>
      </SearchField>

      <SearchDivider $isCompact={isCompact} />

      <SearchField
        ref={dateFieldRef}
        onClick={() => {
          if (isCompact) return;
          // 팝업을 열 때 이미 완성된 범위가 있으면 초기화 → 무조건 2번 새로 선택
          if (!showDatePopup && dateRange?.from && dateRange?.to) {
            setDateRange(undefined);
          }
          setShowDatePopup((prev) => !prev);
          setShowGuestPopup(false);
        }}
        $hasPopup={showDatePopup}
        $isCompact={isCompact}
      >
        {!isCompact && <SearchFieldLabel>날짜</SearchFieldLabel>}
        <SearchFieldContent>
          {!isCompact && <span>{dateLabel}</span>}
          {isCompact && <span>언제든지</span>}
        </SearchFieldContent>
        {showDatePopup && !isCompact && (
          <DatePopup ref={datePopupRef} onClick={(e) => e.stopPropagation()}>
            <DayPickerWrapper>
              <DayPicker
                mode="range"
                selected={dateRange}
                onSelect={handleDateSelect}
                numberOfMonths={2}
              />
            </DayPickerWrapper>
          </DatePopup>
        )}
      </SearchField>

      <SearchDivider $isCompact={isCompact} />

      <SearchField
        ref={guestFieldRef}
        onClick={() => {
          setShowGuestPopup((prev) => !prev);
          setShowDatePopup(false);
        }}
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
          <GuestPopup ref={popupRef} onClick={(e) => e.stopPropagation()}>
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
