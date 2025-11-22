import { useEffect, useMemo, useState, useRef } from "react";
import { createPortal } from "react-dom";
import "react-day-picker/dist/style.css";
import { ko } from "date-fns/locale";
import { DayPicker, type DateRange, type Matcher } from "react-day-picker";
import { format, parse, addDays, startOfDay } from "date-fns";

import * as S from "./BookingDatePicker.styles";

type Props = {
    checkIn?: string;
    checkOut?: string;
    onChange: (ci?: string, co?: string) => void;
    minDate?: Date;
};

const FMT = "yyyy-MM-dd";
const toDate = (s?: string) => (s ? parse(s, FMT, new Date()) : undefined);
const toStr = (d?: Date) => (d ? format(d, FMT) : undefined);

export default function BookingDatePicker({
                                              checkIn,
                                              checkOut,
                                              onChange,
                                              minDate,
                                          }: Props) {
    const today = useMemo(() => startOfDay(new Date()), []);
    const minStart = useMemo(() => startOfDay(minDate ?? today), [minDate, today]);

    const [open, setOpen] = useState(false);
    const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const [range, setRange] = useState<DateRange | undefined>(() => {
        const from = toDate(checkIn);
        const to = toDate(checkOut);
        return from || to ? { from, to } : undefined;
    });

    useEffect(() => {
        const from = toDate(checkIn);
        const to = toDate(checkOut);
        setRange(from || to ? { from, to } : undefined);
    }, [checkIn, checkOut]);

    // 스크롤 시 위치 업데이트
    useEffect(() => {
        if (!open || !buttonRef.current) return;

        function updatePosition() {
            if (buttonRef.current) {
                setButtonRect(buttonRef.current.getBoundingClientRect());
            }
        }

        updatePosition();
        window.addEventListener("scroll", updatePosition, true);
        window.addEventListener("resize", updatePosition);

        return () => {
            window.removeEventListener("scroll", updatePosition, true);
            window.removeEventListener("resize", updatePosition);
        };
    }, [open]);

    // ESC 키만 처리
    useEffect(() => {
        if (!open) return;

        function handleEscape(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [open]);

    const label =
        range?.from && range?.to
            ? `${format(range.from, "MM.dd")} - ${format(range.to, "MM.dd")}`
            : range?.from
                ? `${format(range.from, "MM.dd")} - 체크아웃`
                : "날짜 선택";

    const handleSelect = (newRange: DateRange | undefined) => {
        setRange(newRange);
        onChange(toStr(newRange?.from), toStr(newRange?.to));

        if (newRange?.from && newRange?.to) {
            const isSameDay = newRange.from.getTime() === newRange.to.getTime();
            if (!isSameDay) setTimeout(() => setOpen(false), 200);
        }
    };

    const toggleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!open) {
            setRange(undefined);
            onChange(undefined, undefined);
        }

        setButtonRect(e.currentTarget.getBoundingClientRect());
        setOpen((v) => !v);
    };

    const isPickingEnd = !!(range?.from && !range?.to);

    const disabledMatchers: Matcher[] = useMemo(() => {
        const base: Matcher[] = [{ before: minStart }];

        if (isPickingEnd && range?.from) {
            const checkInDay = startOfDay(range.from);
            base.push({ before: addDays(checkInDay, 1) });
        }

        return base;
    }, [isPickingEnd, range?.from, minStart]);

    const popover =
        open &&
        buttonRect &&
        createPortal(
            <S.PopoverContainer
                style={{
                    top: buttonRect.top + buttonRect.height + 8 + window.scrollY,
                    left: buttonRect.left + window.scrollX,
                }}
            >
                <DayPicker
                    mode="range"
                    numberOfMonths={2}
                    selected={range}
                    onSelect={handleSelect}
                    locale={ko}
                    fromDate={minStart}
                    disabled={disabledMatchers}
                    pagedNavigation
                    styles={S.dayPickerStyles}
                />
            </S.PopoverContainer>,
            document.body
        );

    return (
        <>
            <S.Wrapper>
                <S.TriggerButton ref={buttonRef} type="button" onClick={toggleOpen}>
                    <S.TriggerLabel>날짜</S.TriggerLabel>
                    <S.TriggerValue>{label}</S.TriggerValue>
                </S.TriggerButton>
            </S.Wrapper>

            {popover}
        </>
    );
}
