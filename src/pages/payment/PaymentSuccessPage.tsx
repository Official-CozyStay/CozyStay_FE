import { useSearchParams, Link } from "react-router-dom";

export default function PaymentSuccessPage(){
    const [sp] = useSearchParams();
    const bookingId = sp.get("bookingId");
    const paymentId = sp.get("paymentId");

    return (
        <div style={{ padding: 24, paddingTop: 120, maxWidth: 720, margin: "0 auto" }}>
            <h1 style={{ fontSize: 24, fontWeight: 800 }}>결제가 완료되었습니다</h1>
            <p style={{ marginTop: 12, color: "#666" }}>
                예약이 정상적으로 접수되었어요.
            </p>

            <div style={{ marginTop: 20, padding: 16, border: "1px solid #ddd", borderRadius: 12 }}>
                <div>bookingId: {bookingId ?? "-"}</div>
                <div>paymentId: {paymentId ?? "-"}</div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                {bookingId && (
                    <Link to={`/bookings/${bookingId}`} style={{ textDecoration: "underline" }}>
                        예약 상세로 이동
                    </Link>
                )}
                <Link to="/" style={{ textDecoration: "underline" }}>
                    홈으로
                </Link>
            </div>
        </div>
    );
}