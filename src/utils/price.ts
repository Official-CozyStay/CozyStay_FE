// 숙박일수 계산 + 총액 계산 + 금액 포맷

import { differenceInCalendarDays, parse } from "date-fns";

const FMT = "yyyy-MM-dd";

//체크인/체크아웃 문자열 기준으로 몇 박인지 계산
export function nightsBetween(
  checkIn?: string,
  checkOut?: string
): number {
  if (!checkIn || !checkOut) return 0;

  const ci = parse(checkIn, FMT, new Date());
  const co = parse(checkOut, FMT, new Date());

  const diff = differenceInCalendarDays(co, ci);
  return diff > 0 ? diff : 0;
}

// 총액 계산 (숙박 + 서비스 수수료 + 청소비)
export function calcTotal(
  nights: number,
  pricePerNight: number,
  cleaningFee: number,
  serviceFeePercentage: number
) {
  const room = nights * pricePerNight;
  const service = Math.round(room * (serviceFeePercentage / 100));
  const total = room + service + cleaningFee;
  return { room, service, total };
}

export function formatKRW(n: number): string {
  return n.toLocaleString("ko-KR");
}