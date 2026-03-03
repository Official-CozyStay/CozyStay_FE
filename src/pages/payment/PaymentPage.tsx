import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

import { useAccommodationStore } from "@/store/accommodationStore.ts";
import { nightsBetween, calcTotal } from "../../utils/price";

import BookingSummaryCard from "./components/BookngSummaryCard";
import PaymentMethodSection, { type UiPaymentMethod, } from "./components/PaymentMethodSection";

import HostMessageSection from "./components/HostMessageSection";
import RequestConfirmSection from "./components/RequestConfirmSection";

import { createBooking } from "@/api/booking";
import { createPayment, confirmPayment, failPayment, type PaymentMethod as ApiPaymentMethod, } from "@/api/payment";

export default function PaymentPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { detail, loading, error, load } = useAccommodationStore();

    /** 결제수단 */
    const [paymentMethod, setPaymentMethod] = useState<UiPaymentMethod>("CARD");

    const [hostMessage, setHostMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const checkIn = searchParams.get("checkin");
    const checkOut = searchParams.get("checkout");
    const guests = Number(searchParams.get("numberOfGuests") ?? 1);

    useEffect(() => { if (id) load(id); }, [id, load]);

    const nights = nightsBetween(checkIn ?? undefined, checkOut ?? undefined);

    const price = useMemo(() => {
        if (!detail || !checkIn || !checkOut || nights <= 0) return null;
        return calcTotal(
            nights,
            detail.pricePerNight,
            detail.cleaningFee,
            detail.serviceFeePercentage
        );
    }, [detail, checkIn, checkOut, nights]);

    if (!id) return <div>잘못된 접근</div>;
    if (loading) return <div>불러오는 중...</div>;
    if (error) return <div>에러: {error}</div>;
    if (!detail) return <div>데이터 없음</div>;

    const HEADER_OFFSET = 80;

    const canSubmit =
        !!price &&
        !!checkIn &&
        !!checkOut &&
        guests >= 1 &&
        guests <= detail.maxGuests &&
        !submitting;

    /** UI → 서버 PaymentMethod 매핑 */
    const toApiPaymentMethod = (m: UiPaymentMethod): ApiPaymentMethod => {
        if (m === "CARD") return "CARD";
        // NAVERPAY / KAKAOPAY는 서버에서는 EASY_PAY
        return "EASY_PAY";
    };

    /** 예약 + 결제 생성 */
    const handleSubmit = async () => {
        if (!canSubmit) return;

        let bookingIdForNav: number | null = null;
        let paymentIdForNav: number | null = null;

        try {
            setSubmitting(true);
            setSubmitError(null);

            // 1) 예약 생성
            const booking = await createBooking({
                accommodationId: Number(id),
                checkInDate: checkIn!,
                checkOutDate: checkOut!,
                numberOfGuests: guests,
            });

            bookingIdForNav = booking.bookingId;

            // 2) 결제 생성
            const payment = await createPayment({
                bookingId: booking.bookingId,
                paymentMethod: toApiPaymentMethod(paymentMethod),
            });

            paymentIdForNav = payment.paymentId;

            // 3) 결제 confirm (PG 연동 전이라 임시 키 생성)
            const mockPaymentKey = `MOCK_${payment.paymentId}_${Date.now()}`;

            try {
                const confirmed = await confirmPayment(payment.paymentId, {
                    paymentKey: mockPaymentKey,
                });

                console.log("booking: ", booking);
                console.log("payment(created): ", payment);
                console.log("payment(confirmed): ", confirmed);

                // 결제 성공 페이지로 이동
                navigate(
                    `/payment/success?bookingId=${booking.bookingId}&paymentId=${payment.paymentId}`
                );
            } catch {
                // confirm 실패 → failPayment 호출(백엔드 상태 FAIL로)
                try {
                    await failPayment(payment.paymentId);
                } catch (failErr) {
                    // failPayment도 실패할 수 있으니 로그 남김
                    console.error("failPayment 호출 실패:", failErr);
                }

                // 실패 페이지로 이동
                navigate(
                    `/payment/fail?bookingId=${booking.bookingId}&paymentId=${payment.paymentId}`
                );
            }
        } catch (e: unknown) {
            // createBooking / createPayment 단계에서의 에러
            if (axios.isAxiosError<{ message?: string }>(e)) {
                const status = e.response?.status;
                const msg =
                    status === 401
                        ? "로그인이 필요합니다."
                        : e.response?.data?.message ?? "예약/결제 요청에 실패했습니다.";
                setSubmitError(msg);
            } else {
                setSubmitError("알 수 없는 오류가 발생했습니다.");
            }
            console.error(e);

            // 여기서도 paymentId가 있으면 fail 처리하고 fail 페이지로 보낼 수 있음
            // (지금은 createPayment 전에 실패하면 paymentId가 없을 수 있어서 기본은 에러 표시만)
            if (bookingIdForNav && paymentIdForNav) {
                navigate(
                    `/payment/fail?bookingId=${bookingIdForNav}&paymentId=${paymentIdForNav}`
                );
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "360px minmax(0,700px)",
                gap: 24,
                padding: 24,
                paddingTop: 24 + HEADER_OFFSET,
                justifyContent: "center",
            }}
        >
            {/* 왼쪽: 숙소 요약 */}
            <BookingSummaryCard
                title={detail.title}
                thumbnailUrl={detail.images?.[0]?.imageUrl}
                averageRating={5.0}
                reviewCount={4}
                checkIn={checkIn}
                checkOut={checkOut}
                guests={guests}
                nights={nights}
                pricePerNight={detail.pricePerNight}
                total={price?.total}
            />

            {/* 오른쪽: 결제 영역 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <PaymentMethodSection value={paymentMethod} onChange={setPaymentMethod} />

                <HostMessageSection value={hostMessage} onChange={setHostMessage} hostName="현진" />

                {submitError && (
                    <div
                        style={{
                            padding: 12,
                            borderRadius: 12,
                            border: "1px solid #fca5a5",
                            background: "#fef2f2",
                            color: "#991b1b",
                            fontSize: 14,
                        }}
                    >
                        {submitError}
                    </div>
                )}

                <RequestConfirmSection disabled={!canSubmit} onSubmit={handleSubmit} />
            </div>
        </div>
    );
}