import { createPortal } from 'react-dom';
import { useLayoutEffect, useRef, useState } from 'react';
import { DayPicker, type DateRange, type Matcher } from 'react-day-picker';
import ko from 'date-fns/locale/ko';
import { useTheme } from 'styled-components';
import 'react-day-picker/dist/style.css';

import * as S from './DateRangePopover.styles';

const EDGE_MARGIN = 16;
// 2개월 달력(월 320*2 + 마진 16*2 + 패딩 16)을 담을 최소 뷰포트 너비
const TWO_MONTH_MIN_VIEWPORT = 720;

interface Props {
  open: boolean;
  /** 트리거 요소의 getBoundingClientRect() 결과 */
  anchorRect: DOMRect | null;
  range: DateRange | undefined;
  disabledMatchers: Matcher[];
  /** DayPicker fromDate: 선택 가능한 최솟값 */
  minDate?: Date;
  onSelect: (r: DateRange | undefined) => void;
}

export default function DateRangePopover({
  open,
  anchorRect,
  range,
  disabledMatchers,
  minDate,
  onSelect,
}: Props) {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [adjustedLeft, setAdjustedLeft] = useState<number | null>(null);

  const numberOfMonths = window.innerWidth >= TWO_MONTH_MIN_VIEWPORT ? 2 : 1;

  // 실제 렌더된 popover 너비(width)로 clamp 계산.
  // elRect.right가 아닌 width를 사용해야 anchorRect 기준 계산이 정확하고
  // 스크롤로 anchorRect가 바뀌어도 corrected 값이 달라지지 않아 튐이 없음.
  // useLayoutEffect는 페인트 전 동기 실행 → 시각적 깜빡임 없음.
  useLayoutEffect(() => {
    if (!open) {
      setAdjustedLeft(null);
      return;
    }
    if (!anchorRect || !containerRef.current) return;

    const { width } = containerRef.current.getBoundingClientRect();
    const corrected = Math.max(
      EDGE_MARGIN,
      Math.min(anchorRect.left, window.innerWidth - width - EDGE_MARGIN),
    );
    setAdjustedLeft(corrected);
  }, [open, anchorRect]);

  if (!open || !anchorRect) return null;

  const gap = parseInt(theme.spacing.sm, 10);
  const left = adjustedLeft ?? anchorRect.left;

  return createPortal(
    <S.PopoverContainer
      ref={containerRef}
      $singleMonth={numberOfMonths === 1}
      style={{ top: anchorRect.bottom + gap, left }}
    >
      <DayPicker
        mode="range"
        numberOfMonths={numberOfMonths}
        selected={range}
        onSelect={onSelect}
        locale={ko}
        fromDate={minDate}
        disabled={disabledMatchers}
        pagedNavigation
        styles={S.dayPickerStyles}
      />
    </S.PopoverContainer>,
    document.body,
  );
}
