import * as S from "../accommodationDetail.styles";
import BookingDatePicker from "../../../components/accommodation/BookingDatePicker";
import { nightsBetween, calcTotal, formatKRW } from "../../../utils/price";

import type { AccommodationDetailDTO } from "../../../api/types.ts";

type BookingDetail = Pick<
  AccommodationDetailDTO,
  "pricePerNight" | "cleaningFee" | "serviceFeePercentage" | "maxGuests"
>;

type Props = {
  detail: BookingDetail;
  checkIn: string | null;
  checkOut: string | null;
  guests: number;
  setDates: (ci: string | null, co: string | null) => void;
  setGuests: (n: number) => void;
  onReserve: () => void;
};

export default function BookingCard({
  detail,
  checkIn,
  checkOut,
  guests,
  setDates,
  setGuests,
  onReserve,
}: Props) {
  const nights = nightsBetween(checkIn ?? undefined, checkOut ?? undefined);

  const { room, service, total } = calcTotal(
    nights,
    detail.pricePerNight,
    detail.cleaningFee,
    detail.serviceFeePercentage
  );

  const guestError =
    guests > detail.maxGuests
      ? `최대 인원은 ${detail.maxGuests}명입니다.`
      : undefined;

  const dateError =
    checkIn && checkOut && nights === 0
      ? "최소 1박 이상 선택해주세요."
      : undefined;

  const canReserve =
    !!checkIn &&
    !!checkOut &&
    nights > 0 &&
    guests >= 1 &&
    guests <= detail.maxGuests;

  return (
    <S.Right>
      <S.StickyCard>
        <S.Price>
          ₩{detail.pricePerNight.toLocaleString()} <span>/박</span>
        </S.Price>

        <S.FormSection>
          <S.InputGroup>
            <S.Label>날짜</S.Label>
            <BookingDatePicker
              checkIn={checkIn ?? undefined}
              checkOut={checkOut ?? undefined}
              onChange={(ci, co) => setDates(ci ?? null, co ?? null)}
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>인원</S.Label>
            <S.NumberInput
              type="number"
              min={1}
              max={detail.maxGuests}
              value={guests}
              onChange={(e) => {
                const v = Number(e.target.value) || 1;
                setGuests(Math.max(1, Math.min(detail.maxGuests, v)));
              }}
            />
            <S.HelperText>최대 {detail.maxGuests}명</S.HelperText>
          </S.InputGroup>
        </S.FormSection>

        <S.Summary>
          {nights > 0 ? (
            <>
              <S.SummaryRow>
                <span>
                  ₩{formatKRW(detail.pricePerNight)} x {nights}박
                </span>
                <span>₩{formatKRW(room)}</span>
              </S.SummaryRow>

              <S.SummaryRow>
                <span>청소비</span>
                <span>₩{formatKRW(detail.cleaningFee)}</span>
              </S.SummaryRow>

              <S.SummaryRow>
                <span>서비스 수수료 ({detail.serviceFeePercentage}%)</span>
                <span>₩{formatKRW(service)}</span>
              </S.SummaryRow>

              <S.SummaryTotal>
                <span>총액</span>
                <span>₩{formatKRW(total)}</span>
              </S.SummaryTotal>
            </>
          ) : (
            <S.Small>
              날짜를 선택하면 예상 총액이 계산됩니다.
            </S.Small>
          )}
        </S.Summary>

        {guestError && <S.ErrorText>{guestError}</S.ErrorText>}
        {dateError && <S.ErrorText $compact>{dateError}</S.ErrorText>}

        <S.ReserveButton
          type="button"
          disabled={!canReserve}
          onClick={() => {
            if (!canReserve) return;
            onReserve();
            // alert(
            //   `예약 요청: ${checkIn} ~ ${checkOut}, ${guests}명 (총액: ₩${formatKRW(
            //     total
            //   )})`
            // );
          }}
        >
          {canReserve ? "예약하기" : "날짜와 인원을 선택해주세요"}
        </S.ReserveButton>
      </S.StickyCard>
    </S.Right>
  );
}
