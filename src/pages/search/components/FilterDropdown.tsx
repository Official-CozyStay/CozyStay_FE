import { useRef, useEffect } from 'react';
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

type FilterDropdownPanelProps = {
  activeFilter: string;
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: unknown) => void;
  onClose: () => void;
};

const FilterDropdownPanel = ({
  activeFilter,
  filters,
  onFilterChange,
  onClose,
}: FilterDropdownPanelProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

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
          <span>성인</span>
          <small>13세 이상</small>
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
          <span>어린이</span>
          <small>2~12세</small>
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
          <span>유아</span>
          <small>2세 미만</small>
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

  return (
    <FilterDropdown
      ref={dropdownRef}
      style={{
        position: 'absolute',
        top: '120px',
        left:
          activeFilter === 'location'
            ? '24px'
            : activeFilter === 'dates'
              ? '160px'
              : activeFilter === 'guests'
                ? '300px'
                : '440px',
      }}
    >
      {renderContent()}
    </FilterDropdown>
  );
};

export default FilterDropdownPanel;


