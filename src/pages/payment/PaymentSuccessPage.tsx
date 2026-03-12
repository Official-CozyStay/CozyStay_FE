import { useSearchParams } from "react-router-dom";
import {
    PaymentSuccessContainer,
    PaymentSuccessTitle,
    PaymentSuccessDescription,
    PaymentSuccessButtonGroup,
    PaymentSuccessLink,
} from "./paymentSuccess.styles";

export default function PaymentSuccessPage() {
    const [sp] = useSearchParams();
    const bookingId = sp.get("bookingId");

    return (
        <PaymentSuccessContainer>
            <PaymentSuccessTitle>결제가 완료되었습니다</PaymentSuccessTitle>

            <PaymentSuccessDescription>
                예약이 정상적으로 접수되었어요.
            </PaymentSuccessDescription>

            <PaymentSuccessButtonGroup>
                {bookingId && (
                    <PaymentSuccessLink to={`/bookings/${bookingId}`}>
                        예약 상세로 이동
                    </PaymentSuccessLink>
                )}

                <PaymentSuccessLink to="/">홈으로</PaymentSuccessLink>
            </PaymentSuccessButtonGroup>
        </PaymentSuccessContainer>
    );
}