import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    PaymentFailButtonGroup,
    PaymentFailDescription,
    PaymentFailLinkButton,
    PaymentFailNotice,
    PaymentFailPageContainer,
    PaymentFailRetryButton,
    PaymentFailTitle,
} from "./paymentFail.styles";

export default function PaymentFailPage() {
    const navigate = useNavigate();
    const [sp] = useSearchParams();

    const bookingId = sp.get("bookingId");

    const canRetry = useMemo(() => {
        return !!bookingId;
    }, [bookingId]);

    return (
        <PaymentFailPageContainer>
            <PaymentFailTitle>결제에 실패했습니다</PaymentFailTitle>

            <PaymentFailDescription>
                네트워크 문제 또는 결제 과정에서 오류가 발생했을 수 있어요.
                <br />
                다시 시도하거나, 문제가 계속되면 잠시 후 재시도해주세요.
            </PaymentFailDescription>

            <PaymentFailButtonGroup>
                {/* 결제 재시도: 다시 PaymentPage로 */}
                <PaymentFailRetryButton
                    type="button"
                    disabled={!canRetry}
                    $disabled={!canRetry}
                    onClick={() => {
                        if (!bookingId) return;

                        // 간단 재시도: 뒤로 가기(= PaymentPage로 복귀)
                        navigate(-1);
                    }}
                >
                    결제 다시 시도
                </PaymentFailRetryButton>

                <PaymentFailLinkButton to="/">홈으로</PaymentFailLinkButton>

                {/* 예약 상세로 이동 */}
                {bookingId && (
                    <PaymentFailLinkButton to={`/bookings/${bookingId}`}>
                        예약 상세 보기
                    </PaymentFailLinkButton>
                )}
            </PaymentFailButtonGroup>

            <PaymentFailNotice>
                <div>• 결제가 실패해도 예약이 자동으로 확정되진 않아요.</div>
                <div>• 문제가 지속되면 결제 수단을 바꾸거나 잠시 후 다시 시도해보세요.</div>
            </PaymentFailNotice>
        </PaymentFailPageContainer>
    );
}