import React, { useState } from 'react';
import styled from 'styled-components';
import { DateRange } from 'react-date-range';
import type { RangeKeyDict, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { ko } from 'date-fns/locale';

const PopupContainer = styled.div`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing.sm});
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.common.white};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  padding: ${({ theme }) => theme.spacing.md};
  z-index: ${({ theme }) => theme.zIndex.searchBar};

  /* react-date-range 스타일 오버라이드 */
  .rdrCalendarWrapper {
    color: ${({ theme }) => theme.colors.text.primary};
  }
  .rdrDayToday .rdrDayNumber span:after {
    background: ${({ theme }) => theme.colors.primary.main};
  }
  .rdrSelected,
  .rdrInRange,
  .rdrStartEdge,
  .rdrEndEdge {
    background: ${({ theme }) => theme.colors.primary.main} !important;
  }
  .rdrDayHovered {
    border-color: ${({ theme }) => theme.colors.primary.main} !important;
  }
`;

interface DatePopupProps {
  startDate?: Date;
  endDate?: Date;
  onChange: (startDate: Date, endDate: Date) => void;
}

const DatePopup = React.forwardRef<HTMLDivElement, DatePopupProps>(
  ({ startDate, endDate, onChange }, ref) => {
    const [state, setState] = useState<Range[]>([
      {
        startDate: startDate || new Date(),
        endDate: endDate || new Date(),
        key: 'selection',
        color: '#ff385c', // CozyStay primary color (will be overridden by CSS above as well)
      },
    ]);

    const handleSelect = (rangesByKey: RangeKeyDict) => {
      const selection = rangesByKey.selection;
      setState([selection]);

      if (
        selection.startDate &&
        selection.endDate &&
        selection.startDate !== selection.endDate
      ) {
        onChange(selection.startDate, selection.endDate);
      } else if (
        selection.startDate &&
        selection.endDate &&
        selection.startDate === selection.endDate
      ) {
        // If they just clicked a start date, we let them pick an end date next
        // No auto close here usually
      }
    };

    return (
      <PopupContainer ref={ref} onClick={(e) => e.stopPropagation()}>
        <DateRange
          locale={ko}
          ranges={state}
          onChange={handleSelect}
          months={2}
          direction="horizontal"
          minDate={new Date()}
          showDateDisplay={false}
          showMonthAndYearPickers={false}
        />
      </PopupContainer>
    );
  },
);

DatePopup.displayName = 'DatePopup';

export default DatePopup;
