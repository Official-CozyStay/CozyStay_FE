import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
  GuestLabel,
  GuestAge,
  GuestCounter,
  CounterButton,
  CounterValue,
} from './SearchBar.styles';
import { Search, Minus, Plus } from 'lucide-react';
import { format } from 'date-fns';
import RegionPopup from './RegionPopup';
import DatePopup from './DatePopup';

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
  ),
);

const SearchBar = ({ isCompact = false }: SearchBarProps) => {
  const navigate = useNavigate();
  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const [showRegionPopup, setShowRegionPopup] = useState(false);
  const [showDatePopup, setShowDatePopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{
    province: string;
    city: string;
    district?: string;
  } | null>(null);
  const [dateRange, setDateRange] = useState<{
    startDate: Date;
    endDate: Date;
  } | null>(null);
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const inputRef = useRef<HTMLInputElement>(null);
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
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showGuestPopup]);

  // Click outside for RegionPopup
  const regionPopupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        regionPopupRef.current &&
        !regionPopupRef.current.contains(event.target as Node)
      ) {
        setShowRegionPopup(false);
      }
    };
    if (showRegionPopup)
      document.addEventListener('mousedown', handleClickOutside);
    else document.removeEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showRegionPopup]);

  // Click outside for DatePopup
  const datePopupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePopupRef.current &&
        !datePopupRef.current.contains(event.target as Node)
      ) {
        setShowDatePopup(false);
      }
    };
    if (showDatePopup)
      document.addEventListener('mousedown', handleClickOutside);
    else document.removeEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDatePopup]);

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
                ? `${selectedLocation.province} ${selectedLocation.city} ${selectedLocation.district || ''}`.trim()
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
            selectedProvince={selectedLocation?.province}
            selectedCity={selectedLocation?.city}
            selectedDistrict={selectedLocation?.district}
            onSelect={(province, city, district) => {
              setSelectedLocation({ province, city, district });
              setShowRegionPopup(false);
              setShowDatePopup(true); // Automatically open date picker after region selection
            }}
          />
        )}
      </SearchField>

      <SearchDivider $isCompact={isCompact} />

      <SearchField
        onClick={() => {
          setShowDatePopup(!showDatePopup);
          setShowRegionPopup(false);
          setShowGuestPopup(false);
        }}
        $hasPopup={showDatePopup}
        $isCompact={isCompact}
      >
        {!isCompact && <SearchFieldLabel>날짜</SearchFieldLabel>}
        <SearchFieldContent>
          {!isCompact && (
            <span>
              {dateRange
                ? `${format(dateRange.startDate, 'M월 d일')} - ${format(dateRange.endDate, 'M월 d일')}`
                : '날짜 추가'}
            </span>
          )}
          {isCompact && (
            <span>
              {dateRange
                ? `${format(dateRange.startDate, 'M.d')}-${format(dateRange.endDate, 'M.d')}`
                : '언제든지'}
            </span>
          )}
        </SearchFieldContent>
        {showDatePopup && (
          <DatePopup
            ref={datePopupRef}
            startDate={dateRange?.startDate}
            endDate={dateRange?.endDate}
            onChange={(startDate, endDate) => {
              setDateRange({ startDate, endDate });
              setShowDatePopup(false);
              setShowGuestPopup(true); // Automatically open guest popup after date selection
            }}
          />
        )}
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
        onClick={() => {
          const params = new URLSearchParams();
          if (searchQuery.trim()) {
            params.append('title', searchQuery.trim());
          }
          if (selectedLocation?.province) {
            params.append('state', selectedLocation.province);
          }
          if (selectedLocation?.city) {
            params.append('city', selectedLocation.city);
          }
          if (selectedLocation?.district && selectedLocation.district !== '전체') {
            params.append('district', selectedLocation.district);
          }
          if (dateRange?.startDate) {
            params.append(
              'checkInDate',
              format(dateRange.startDate, 'yyyy-MM-dd'),
            );
          }
          if (dateRange?.endDate) {
            params.append(
              'checkOutDate',
              format(dateRange.endDate, 'yyyy-MM-dd'),
            );
          }

          const totalGuests = guests.adults + guests.children;
          if (totalGuests > 0) {
            params.append('numberOfBeds', totalGuests.toString());
          }

          navigate(`/search?${params.toString()}`);
        }}
      >
        <Search size={18} />
        {!isCompact && <span>검색</span>}
      </SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;
