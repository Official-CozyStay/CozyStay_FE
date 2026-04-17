import { useRef, useEffect, useState } from 'react';
import type { RefObject } from 'react';
import {
  FilterDropdown,
  FilterSection,
  FilterLabel,
  FilterInput,
  PriceRangeWrapper,
  PriceInput,
  GuestCounter,
  GuestLabel,
  CounterControls,
  CounterButton,
  CounterValue,
  FilterActions,
  ClearButton,
  ApplyButton,
} from '../search.styles';
import { Minus, Plus } from 'lucide-react';
import type { FilterState } from '../SearchPage';

// 게스트 연령 범위 텍스트 상수 (향후 i18n 적용 시 쉽게 교체 가능)
const GUEST_AGE_RANGES = {
  adult: '13세 이상',
  child: '2~12세',
  infant: '2세 미만',
} as const;

// 게스트 타입 라벨 상수
const GUEST_LABELS = {
  adult: '성인',
  child: '어린이',
  infant: '유아',
} as const;

type FilterDropdownPanelProps = {
  activeFilter: string;
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: unknown) => void;
  onClose: () => void;
  buttonRefs: {
    location: RefObject<HTMLElement | null>;
    dates: RefObject<HTMLElement | null>;
    guests: RefObject<HTMLElement | null>;
    filters: RefObject<HTMLElement | null>;
  };
};

const FilterDropdownPanel = ({
  activeFilter,
  filters,
  onFilterChange,
  onClose,
  buttonRefs,
}: FilterDropdownPanelProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{
    left: number;
    top: number;
  } | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    // activeFilter가 변경되면 위치를 초기화하고 다시 계산
    setDropdownPosition(null);

    const calculatePosition = () => {
      const activeButtonRef =
        buttonRefs[activeFilter as keyof typeof buttonRefs];
      if (activeButtonRef?.current) {
        const buttonRect = activeButtonRef.current.getBoundingClientRect();
        const filterBar = activeButtonRef.current.closest(
          '[data-filter-bar]',
        ) as HTMLElement;
        if (filterBar) {
          const barRect = filterBar.getBoundingClientRect();
          const searchContainer = filterBar.closest(
            '[data-search-container]',
          ) as HTMLElement;

          if (searchContainer) {
            const containerRect = searchContainer.getBoundingClientRect();
            // FilterBar 기준으로 left 위치 계산
            const left = buttonRect.left - barRect.left;
            // FilterBar의 bottom 기준으로 top 위치 계산 (FilterBar 아래 8px 간격)
            const top = barRect.bottom - containerRect.top + 8;
            setDropdownPosition({ left, top });
          }
        }
      }
    };

    // 다음 프레임에서 위치 계산 (DOM 업데이트 후)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        calculatePosition();
      });
    });

    // 리사이즈 및 스크롤 이벤트 리스너
    window.addEventListener('resize', calculatePosition);
    window.addEventListener('scroll', calculatePosition, true);

    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition, true);
    };
  }, [activeFilter, buttonRefs]);

  const renderLocationFilter = () => (
    <>
      <FilterSection>
        <FilterLabel htmlFor="location">여행지</FilterLabel>
        <FilterInput
          id="location"
          type="text"
          placeholder="여행지 검색"
          value={filters.location}
          onChange={(e) => onFilterChange('location', e.target.value)}
        />
      </FilterSection>
      <FilterActions>
        <ClearButton
          type="button"
          onClick={() => onFilterChange('location', '')}
        >
          지우기
        </ClearButton>
        <ApplyButton type="button" onClick={onClose}>
          적용
        </ApplyButton>
      </FilterActions>
    </>
  );

  const renderDatesFilter = () => (
    <>
      <FilterSection>
        <FilterLabel htmlFor="checkIn">체크인</FilterLabel>
        <FilterInput
          id="checkIn"
          type="date"
          value={filters.checkIn}
          onChange={(e) => onFilterChange('checkIn', e.target.value)}
        />
      </FilterSection>
      <FilterSection>
        <FilterLabel htmlFor="checkOut">체크아웃</FilterLabel>
        <FilterInput
          id="checkOut"
          type="date"
          value={filters.checkOut}
          onChange={(e) => onFilterChange('checkOut', e.target.value)}
        />
      </FilterSection>
      <FilterActions>
        <ClearButton
          type="button"
          onClick={() => {
            onFilterChange('checkIn', '');
            onFilterChange('checkOut', '');
          }}
        >
          지우기
        </ClearButton>
        <ApplyButton type="button" onClick={onClose}>
          적용
        </ApplyButton>
      </FilterActions>
    </>
  );

  const renderGuestsFilter = () => (
    <>
      <GuestCounter>
        <GuestLabel>
          <span>{GUEST_LABELS.adult}</span>
          <small>{GUEST_AGE_RANGES.adult}</small>
        </GuestLabel>
        <CounterControls>
          <CounterButton
            type="button"
            disabled={filters.adults <= 1}
            onClick={() => onFilterChange('adults', filters.adults - 1)}
          >
            <Minus />
          </CounterButton>
          <CounterValue>{filters.adults}</CounterValue>
          <CounterButton
            type="button"
            onClick={() => onFilterChange('adults', filters.adults + 1)}
          >
            <Plus />
          </CounterButton>
        </CounterControls>
      </GuestCounter>

      <GuestCounter>
        <GuestLabel>
          <span>{GUEST_LABELS.child}</span>
          <small>{GUEST_AGE_RANGES.child}</small>
        </GuestLabel>
        <CounterControls>
          <CounterButton
            type="button"
            disabled={filters.children <= 0}
            onClick={() => onFilterChange('children', filters.children - 1)}
          >
            <Minus />
          </CounterButton>
          <CounterValue>{filters.children}</CounterValue>
          <CounterButton
            type="button"
            onClick={() => onFilterChange('children', filters.children + 1)}
          >
            <Plus />
          </CounterButton>
        </CounterControls>
      </GuestCounter>

      <GuestCounter>
        <GuestLabel>
          <span>{GUEST_LABELS.infant}</span>
          <small>{GUEST_AGE_RANGES.infant}</small>
        </GuestLabel>
        <CounterControls>
          <CounterButton
            type="button"
            disabled={filters.infants <= 0}
            onClick={() => onFilterChange('infants', filters.infants - 1)}
          >
            <Minus />
          </CounterButton>
          <CounterValue>{filters.infants}</CounterValue>
          <CounterButton
            type="button"
            onClick={() => onFilterChange('infants', filters.infants + 1)}
          >
            <Plus />
          </CounterButton>
        </CounterControls>
      </GuestCounter>

      <FilterActions>
        <ClearButton
          type="button"
          onClick={() => {
            onFilterChange('adults', 1);
            onFilterChange('children', 0);
            onFilterChange('infants', 0);
          }}
        >
          지우기
        </ClearButton>
        <ApplyButton type="button" onClick={onClose}>
          적용
        </ApplyButton>
      </FilterActions>
    </>
  );

  const renderFiltersPanel = () => (
    <>
      <FilterSection>
        <FilterLabel>가격 범위</FilterLabel>
        <PriceRangeWrapper>
          <PriceInput
            type="number"
            placeholder="최소"
            value={filters.minPrice || ''}
            onChange={(e) =>
              onFilterChange('minPrice', Number(e.target.value) || 0)
            }
          />
          <span>~</span>
          <PriceInput
            type="number"
            placeholder="최대"
            value={filters.maxPrice || ''}
            onChange={(e) =>
              onFilterChange('maxPrice', Number(e.target.value) || 0)
            }
          />
        </PriceRangeWrapper>
      </FilterSection>

      <FilterActions>
        <ClearButton
          type="button"
          onClick={() => {
            onFilterChange('minPrice', 0);
            onFilterChange('maxPrice', 1000000);
          }}
        >
          모두 지우기
        </ClearButton>
        <ApplyButton type="button" onClick={onClose}>
          숙소 보기
        </ApplyButton>
      </FilterActions>
    </>
  );

  const renderContent = () => {
    switch (activeFilter) {
      case 'location':
        return renderLocationFilter();
      case 'dates':
        return renderDatesFilter();
      case 'guests':
        return renderGuestsFilter();
      case 'filters':
        return renderFiltersPanel();
      default:
        return null;
    }
  };

  // 위치가 계산되기 전에는 렌더링하지 않음
  if (!dropdownPosition) {
    return null;
  }

  return (
    <FilterDropdown
      ref={dropdownRef}
      style={{
        top: `${dropdownPosition.top}px`,
        left: `${dropdownPosition.left}px`,
      }}
    >
      {renderContent()}
    </FilterDropdown>
  );
};

export default FilterDropdownPanel;
