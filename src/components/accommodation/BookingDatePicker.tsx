import { useEffect, useMemo, useState, useRef } from "react";
import { createPortal } from "react-dom";
import "react-day-picker/dist/style.css";
import { ko } from "date-fns/locale";
import { DayPicker, type DateRange, type Matcher } from "react-day-picker";
import { format, parse, addDays, startOfDay } from "date-fns";

type Props = {
    checkIn?: string;
    checkOut?: string;
    onChange: (ci?: string, co?: string) => void;
    minDate?: Date;
};

const FMT = "yyyy-MM-dd";
const toDate = (s?: string) => (s ? parse(s, FMT, new Date()) : undefined);
const toStr  = (d?: Date)   => (d ? format(d, FMT) : undefined);

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
        const to   = toDate(checkOut);
        return from || to ? { from, to } : undefined;
    });

    useEffect(() => {
        const from = toDate(checkIn);
        const to   = toDate(checkOut);
        setRange(from || to ? { from, to } : undefined);
    }, [checkIn, checkOut]);

    // 스크롤 시 위치 업데이트
    useEffect(() => {
        if (!open || !buttonRef.current) return;

        function updatePosition() {
            if (buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect();
                setButtonRect(rect);
            }
        }

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
            if (e.key === "Escape") {
                setOpen(false);
            }
        }

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
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

        // 양쪽 날짜가 모두 선택되고, 서로 다른 날짜일 때만 닫기
        if (newRange?.from && newRange?.to) {
            const isSameDay = newRange.from.getTime() === newRange.to.getTime();

            if (!isSameDay) {
                setTimeout(() => {
                    setOpen(false);
                }, 200);
            }
        }
    };

    const toggleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!open) {
            // [추가] 달력을 열 때 선택 초기화
            setRange(undefined);
            onChange(undefined, undefined);
        }

        const rect = e.currentTarget.getBoundingClientRect();
        setButtonRect(rect);
        setOpen(v => !v);
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

    // 팝오버 컴포넌트
    const popover = open && buttonRect && createPortal(
        <div
            style={{
                position: "absolute",
                top: buttonRect.top + buttonRect.height + 8 + window.scrollY,
                left: buttonRect.left + window.scrollX,
                zIndex: 99999,
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: 12,
                boxShadow: "0 8px 24px rgba(0,0,0,.12)",
                padding: 8,
                minWidth: 660,
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
                styles={{
                    months: { display: "flex", flexWrap: "nowrap" },
                    month: { width: 320, margin: "0 8px" },
                }}
            />
        </div>,
        document.body
    );

    return (
        <>
            <div style={{ position: "relative" }}>
                <button
                    ref={buttonRef}
                    type="button"
                    onClick={toggleOpen}
                    style={{
                        width: "100%",
                        textAlign: "left",
                        border: "1px solid #ddd",
                        borderRadius: 12,
                        padding: "12px 14px",
                        background: "#fff",
                        cursor: "pointer",
                    }}
                >
                    <div style={{ fontSize: 12, color: "#6b6b6b" }}>날짜</div>
                    <div style={{ fontWeight: 600 }}>{label}</div>
                </button>
            </div>
            {popover}
        </>
    );
}