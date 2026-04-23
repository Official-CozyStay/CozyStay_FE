import { useEffect, useRef, useState } from 'react';
import { format, differenceInCalendarDays } from 'date-fns';
import { DayPicker, type DateRange } from 'react-day-picker';
import ko from 'date-fns/locale/ko';
import { X } from 'lucide-react';
import 'react-day-picker/dist/style.css';

import { useDateRangePicker } from '../date-range/useDateRangePicker';
import * as S from './BookingDatePicker.styles';

type Props = {
  checkIn?: string;
  checkOut?: string;
  onChange: (ci?: string, co?: string) => void;
  minDate?: Date;
};

export default function BookingDatePicker({
  checkIn,
  checkOut,
  onChange,
  minDate,
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { range, disabledMatchers, minStart, handleSelect, reset } =
    useDateRangePicker({
      checkIn,
      checkOut,
      minDate,
      onChange,
      onComplete: () => setOpen(false),
    });

  // 체크인 선택 중 vs 체크아웃 선택 중
  const isPickingEnd = !!(range?.from && !range?.to);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open]);

  // 체크인 박스 클릭: 초기화 후 체크인부터 다시 선택
  const handleCheckInClick = () => {
    reset();
    setOpen(true);
  };

  // 체크아웃 박스 클릭: 체크인이 있으면 체크아웃만 재선택, 없으면 처음부터
  const handleCheckOutClick = () => {
    if (range?.from) {
      handleSelect({ from: range.from, to: undefined } as DateRange);
    } else {
      reset();
    }
    setOpen(true);
  };

  const handleClearFrom = (e: React.MouseEvent) => {
    e.stopPropagation();
    reset();
    setOpen(false);
  };

  const handleClearTo = (e: React.MouseEvent) => {
    e.stopPropagation();
    // range.to가 있을 때만 버튼이 렌더링되므로 range.from도 반드시 존재
    handleSelect({ from: range!.from, to: undefined } as DateRange);
    setOpen(true);
  };

  const nights =
    range?.from && range?.to
      ? differenceInCalendarDays(range.to, range.from)
      : 0;

  const fmt = (d: Date) => format(d, 'yyyy. M. d.');

  return (
    <S.Wrapper ref={wrapperRef}>
      {/* 닫힌 상태: 컴팩트 트리거 — Wrapper 높이 기준 */}
      <S.CompactRow>
        <S.CompactBox type="button" onClick={handleCheckInClick}>
          <S.DateFieldLabel>체크인</S.DateFieldLabel>
          <S.DateFieldValue $placeholder={!range?.from}>
            {range?.from ? fmt(range.from) : '날짜 선택'}
          </S.DateFieldValue>
        </S.CompactBox>
        <S.CompactBox type="button" onClick={handleCheckOutClick}>
          <S.DateFieldLabel>체크아웃</S.DateFieldLabel>
          <S.DateFieldValue $placeholder={!range?.to}>
            {range?.to ? fmt(range.to) : '날짜 선택'}
          </S.DateFieldValue>
        </S.CompactBox>
      </S.CompactRow>

      {/* 열린 상태: top:0으로 CompactRow를 덮으며 통합 패널 펼침 */}
      <S.Panel $open={open}>
        <S.PanelHeader>
          {nights > 0 && range?.from && range?.to && (
            <S.NightSummary>
              <S.NightCount>{nights}박</S.NightCount>
              <S.NightRange>
                {format(range.from, 'yyyy년 M월 d일')} -{' '}
                {format(range.to, 'yyyy년 M월 d일')}
              </S.NightRange>
            </S.NightSummary>
          )}

          <S.InputsGroup>
            <S.InputBox
              type="button"
              $active={!isPickingEnd}
              onClick={handleCheckInClick}
            >
              <S.DateFieldLabel>체크인</S.DateFieldLabel>
              <S.InputValue $placeholder={!range?.from}>
                {range?.from ? fmt(range.from) : '날짜 추가'}
              </S.InputValue>
              {range?.from && (
                <S.ClearIconButton
                  type="button"
                  onClick={handleClearFrom}
                  aria-label="체크인 날짜 지우기"
                >
                  <X size={10} />
                </S.ClearIconButton>
              )}
            </S.InputBox>

            <S.InputBox
              type="button"
              $active={isPickingEnd}
              onClick={handleCheckOutClick}
            >
              <S.DateFieldLabel>체크아웃</S.DateFieldLabel>
              <S.InputValue $placeholder={!range?.to}>
                {range?.to ? fmt(range.to) : '날짜 추가'}
              </S.InputValue>
              {range?.to && (
                <S.ClearIconButton
                  type="button"
                  onClick={handleClearTo}
                  aria-label="체크아웃 날짜 지우기"
                >
                  <X size={10} />
                </S.ClearIconButton>
              )}
            </S.InputBox>
          </S.InputsGroup>
        </S.PanelHeader>

        <DayPicker
          mode="range"
          numberOfMonths={2}
          selected={range}
          onSelect={handleSelect}
          locale={ko}
          fromDate={minStart}
          disabled={disabledMatchers}
          pagedNavigation
          styles={S.calendarStyles}
        />

        <S.FooterBar>
          <S.FooterActions>
            <S.ClearDatesButton
              type="button"
              onClick={() => {
                reset();
                setOpen(true);
              }}
            >
              날짜 지우기
            </S.ClearDatesButton>
            <S.CloseButton type="button" onClick={() => setOpen(false)}>
              닫기
            </S.CloseButton>
          </S.FooterActions>
        </S.FooterBar>
      </S.Panel>
    </S.Wrapper>
  );
}
