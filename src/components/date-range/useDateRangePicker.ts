import { useEffect, useMemo, useState } from 'react';
import { type DateRange, type Matcher } from 'react-day-picker';
import { addDays, format, parse, startOfDay } from 'date-fns';

const FMT = 'yyyy-MM-dd';

export const toDate = (s?: string): Date | undefined =>
  s ? parse(s, FMT, new Date()) : undefined;

export const toStr = (d?: Date): string | undefined =>
  d ? format(d, FMT) : undefined;

interface Options {
  checkIn?: string;
  checkOut?: string;
  /** 선택 가능한 최소 날짜. 미지정 시 오늘 기준 */
  minDate?: Date;
  /** checkIn/checkOut 문자열로 변환된 값 전달 */
  onChange?: (ci?: string, co?: string) => void;
  /** from+to 모두 선택되고 서로 다른 날 확정 후 200ms 뒤 호출 */
  onComplete?: () => void;
}

export interface UseDateRangePickerReturn {
  range: DateRange | undefined;
  /** DayPicker disabled prop에 전달할 Matcher 배열 */
  disabledMatchers: Matcher[];
  /** DayPicker fromDate prop에 전달할 최솟값 */
  minStart: Date;
  handleSelect: (r: DateRange | undefined) => void;
  /** 팝업 열기 전 기존 선택 초기화 (재선택 흐름) */
  reset: () => void;
}

export function useDateRangePicker({
  checkIn,
  checkOut,
  minDate,
  onChange,
  onComplete,
}: Options): UseDateRangePickerReturn {
  const today = useMemo(() => startOfDay(new Date()), []);
  const minStart = useMemo(
    () => startOfDay(minDate ?? today),
    [minDate, today],
  );

  const [range, setRange] = useState<DateRange | undefined>(() => {
    const from = toDate(checkIn);
    const to = toDate(checkOut);
    return from || to ? { from, to } : undefined;
  });

  // 외부 props 변경 시 동기화 (상세 페이지 store 연동)
  useEffect(() => {
    const from = toDate(checkIn);
    const to = toDate(checkOut);
    setRange(from || to ? { from, to } : undefined);
  }, [checkIn, checkOut]);

  const isPickingEnd = !!(range?.from && !range?.to);

  const disabledMatchers = useMemo<Matcher[]>(() => {
    const base: Matcher[] = [{ before: minStart }];
    if (isPickingEnd && range?.from) {
      // 체크인 다음 날부터 체크아웃 선택 가능
      base.push({ before: addDays(startOfDay(range.from), 1) });
    }
    return base;
  }, [isPickingEnd, range?.from, minStart]);

  const handleSelect = (newRange: DateRange | undefined) => {
    // from === to → 첫 클릭 (시작일만 선택된 상태로 정규화)
    const normalized: DateRange | undefined =
      newRange?.from &&
      newRange?.to &&
      newRange.from.getTime() === newRange.to.getTime()
        ? { from: newRange.from, to: undefined }
        : newRange;

    setRange(normalized);
    onChange?.(toStr(normalized?.from), toStr(normalized?.to));

    if (normalized?.from && normalized?.to) {
      setTimeout(() => onComplete?.(), 200);
    }
  };

  const reset = () => {
    setRange(undefined);
    onChange?.(undefined, undefined);
  };

  return { range, disabledMatchers, minStart, handleSelect, reset };
}
