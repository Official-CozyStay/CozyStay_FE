import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

import { useAccommodationStore } from "@/store/accommodationStore";
import { nightsBetween, calcTotal } from "../../utils/price";

import BookingSummaryCard from "./components/BookngSummaryCard";
import PaymentMethodSection, { type UiPaymentMethod, } from "./components/PaymentMethodSection";

import HostMessageSection from "./components/HostMessageSection";
import RequestConfirmSection from "./components/RequestConfirmSection";

import { createBooking } from "@/api/booking";
import { createPayment, confirmPayment, failPayment, type PaymentMethod as ApiPaymentMethod, } from "@/api/payment";

import {
    PaymentPageLayout,
    PaymentContent,
    SubmitErrorBox,
} from "./payment.styles";

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
                await confirmPayment(payment.paymentId, {
                    paymentKey: mockPaymentKey,
                });

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

            let msg = "예약/결제 요청에 실패했습니다.";

            // createBooking / createPayment 단계에서의 에러
            if (axios.isAxiosError<{ message?: string }>(e)) {
                const status = e.response?.status;
                msg =
                    status === 401
                        ? "로그인이 필요합니다."
                        : e.response?.data?.message ?? msg;

                // 민감 정보 노출 방지: DEV에서만 최소 정보 로그
                if (import.meta.env.DEV) {
                    console.error("[PaymentPage] AxiosError:", {
                        status,
                        message: e.message,
                        url: e.config?.url,
                        method: e.config?.method,
                    });
                }
            } else {
                msg = "알 수 없는 오류가 발생했습니다.";

                // DEV에서만 로그 (객체 전체 말고 메시지 위주)
                if (import.meta.env.DEV) {
                    console.error("[PaymentPage] Unknown error:", String(e));
                }
            }

            // 예약이 만들어진 상태면(Booking-PENDING) 실패 페이지로 보내서 재결제 안내
            if(bookingIdForNav){
                const params = new URLSearchParams();
                params.set("bookingId", String(bookingIdForNav));

                if(paymentIdForNav){
                    params.set("paymentId", String(paymentIdForNav));
                }
                navigate(`/payment/fail?${params.toString()}`);
                return;
            }
            // 예약도 못 만든 경우만 현재 페이지에 에러 표시
            setSubmitError(msg);

        } finally {
            setSubmitting(false);
        }
    };

    return (
        <PaymentPageLayout>
            {/* 왼쪽: 숙소 요약 */}
            <BookingSummaryCard
                title={detail.title}
                thumbnailUrl={detail.images?.[0]?.imageUrl}
                averageRating={detail.reviewSummary?.average ?? 0}
                reviewCount={detail.reviewSummary?.count ?? 0}
                checkIn={checkIn}
                checkOut={checkOut}
                guests={guests}
                nights={nights}
                pricePerNight={detail.pricePerNight}
                total={price?.total}
            />

            {/* 오른쪽: 결제 영역 */}
            <PaymentContent>
                <PaymentMethodSection
                    value={paymentMethod}
                    onChange={setPaymentMethod}
                />

                <HostMessageSection
                    value={hostMessage}
                    onChange={setHostMessage}
                    hostName={detail.hostNickname ?? "호스트"}
                />

                {submitError && <SubmitErrorBox>{submitError}</SubmitErrorBox>}

                <RequestConfirmSection
                    disabled={!canSubmit}
                    onSubmit={handleSubmit}
                />
            </PaymentContent>
        </PaymentPageLayout>
    );
}