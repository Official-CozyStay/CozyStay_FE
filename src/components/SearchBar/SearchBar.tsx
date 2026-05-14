import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { format, startOfDay } from 'date-fns';
import { Search, Minus, Plus } from 'lucide-react';

import { useDateRangePicker } from '../date-range/useDateRangePicker';
import DateRangePopover from '../date-range/DateRangePopover';
import RegionPopup from './RegionPopup';
import {
  SearchBarContainer,
  SearchField,
  SearchFieldLabel,
  SearchFieldContent,
  SearchInput,
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
} from './SearchBar.styles';

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

const SearchBar = ({ isCompact = false }: SearchBarProps) => {
  const navigate = useNavigate();
  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const [showRegionPopup, setShowRegionPopup] = useState(false);
  const [showDatePopup, setShowDatePopup] = useState(false);
  const [dateFieldRect, setDateFieldRect] = useState<DOMRect | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{
    state: string;
    city: string;
    district?: string;
  } | null>(null);
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const dateFieldRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const regionPopupRef = useRef<HTMLDivElement>(null);

  const today = useMemo(() => startOfDay(new Date()), []);
  const { range, disabledMatchers, minStart, handleSelect, reset } =
    useDateRangePicker({
      minDate: today,
      onComplete: () => setShowDatePopup(false),
    });

  // 여행자 팝업: 외부 클릭 시 닫기
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
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showGuestPopup]);

  // 날짜 팝업: ESC로 닫기 (portal 렌더링)
  useEffect(() => {
    if (!showDatePopup) return;

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setShowDatePopup(false);
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showDatePopup]);

  // 지역 팝업: 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        regionPopupRef.current &&
        !regionPopupRef.current.contains(event.target as Node)
      ) {
        setShowRegionPopup(false);
      }
    };

    if (showRegionPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showRegionPopup]);

  const updateGuest = useCallback((type: GuestType, delta: number) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  }, []);

  const totalGuests =
    guests.adults + guests.children + guests.infants + guests.pets;

  const dateLabel = range?.from
    ? range.to
      ? `${format(range.from, 'M월 d일')} - ${format(range.to, 'M월 d일')}`
      : `${format(range.from, 'M월 d일')} ~`
    : '날짜 추가';

  const compactDateLabel =
    range?.from && range?.to
      ? `${format(range.from, 'M.d')}-${format(range.to, 'M.d')}`
      : '언제든지';

  const handleDateFieldClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isCompact) return;

    if (!showDatePopup && range?.from && range?.to) {
      reset();
    }

    setDateFieldRect(e.currentTarget.getBoundingClientRect());
    setShowDatePopup((prev) => !prev);
    setShowRegionPopup(false);
    setShowGuestPopup(false);
  };

  return (
    <SearchBarContainer $isCompact={isCompact}>
      <SearchField
        $isInput
        onClick={() => {
          setShowRegionPopup(false);
          setShowDatePopup(false);
          setShowGuestPopup(false);
          inputRef.current?.focus();
        }}
        $isCompact={isCompact}
      >
        {!isCompact && <SearchFieldLabel>숙소명</SearchFieldLabel>}
        <SearchFieldContent>
          <SearchInput
            ref={inputRef}
            type="text"
            placeholder="숙소명 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchFieldContent>
      </SearchField>

      <SearchDivider $isCompact={isCompact} />

      <SearchField
        onClick={() => {
          setShowRegionPopup(!showRegionPopup);
          setShowDatePopup(false);
          setShowGuestPopup(false);
        }}
        $hasPopup={showRegionPopup}
        $isCompact={isCompact}
      >
        {!isCompact && <SearchFieldLabel>여행지</SearchFieldLabel>}
        <SearchFieldContent>
          {!isCompact && (
            <span>
              {selectedLocation
                ? `${selectedLocation.state} ${selectedLocation.city} ${selectedLocation.district || ''}`.trim()
                : '여행지 검색'}
            </span>
          )}
          {isCompact && (
            <span>
              {selectedLocation
                ? `${selectedLocation.district || selectedLocation.city}`
                : '어디든지'}
            </span>
          )}
        </SearchFieldContent>
        {showRegionPopup && (
          <RegionPopup
            ref={regionPopupRef}
            selectedState={selectedLocation?.state}
            selectedCity={selectedLocation?.city}
            selectedDistrict={selectedLocation?.district}
            onSelect={(state, city, district) => {
              setSelectedLocation({ state, city, district });
              setShowRegionPopup(false);
              if (dateFieldRef.current) {
                setDateFieldRect(dateFieldRef.current.getBoundingClientRect());
              }
              setShowDatePopup(true);
            }}
          />
        )}
      </SearchField>

      <SearchDivider $isCompact={isCompact} />

      <SearchField
        ref={dateFieldRef}
        onClick={handleDateFieldClick}
        $hasPopup={showDatePopup}
        $isCompact={isCompact}
      >
        {!isCompact && <SearchFieldLabel>날짜</SearchFieldLabel>}
        <SearchFieldContent>
          {!isCompact && <span>{dateLabel}</span>}
          {isCompact && <span>{compactDateLabel}</span>}
        </SearchFieldContent>
      </SearchField>

      <SearchDivider $isCompact={isCompact} />

      <SearchField
        onClick={() => {
          setShowGuestPopup(!showGuestPopup);
          setShowRegionPopup(false);
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
        onClick={() => {
          const params = new URLSearchParams();

          if (searchQuery.trim()) {
            params.append('title', searchQuery.trim());
          }
          if (selectedLocation?.state) {
            params.append('state', selectedLocation.state);
          }
          if (selectedLocation?.city) {
            params.append('city', selectedLocation.city);
          }
          if (
            selectedLocation?.district &&
            selectedLocation.district !== '전체'
          ) {
            params.append('district', selectedLocation.district);
          }
          if (range?.from) {
            params.append('checkInDate', format(range.from, 'yyyy-MM-dd'));
          }
          if (range?.to) {
            params.append('checkOutDate', format(range.to, 'yyyy-MM-dd'));
          }

          const bookingGuests = guests.adults + guests.children;
          if (bookingGuests > 0) {
            params.append('numberOfBeds', bookingGuests.toString());
          }

          navigate(`/search?${params.toString()}`);
        }}
      >
        <Search size={18} />
        {!isCompact && <span>검색</span>}
      </SearchButton>

      <DateRangePopover
        open={showDatePopup && !isCompact}
        anchorRect={dateFieldRect}
        range={range}
        disabledMatchers={disabledMatchers}
        minDate={minStart}
        onSelect={handleSelect}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
