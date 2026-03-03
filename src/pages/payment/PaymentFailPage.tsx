import { useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function PaymentFailPage() {
    const navigate = useNavigate();
    const [sp] = useSearchParams();

    const bookingId = sp.get("bookingId");

    const canRetry = useMemo(() => {
        return !!bookingId;
    }, [bookingId]);

    return (
        <div
            style={{
                padding: 24,
                paddingTop: 120, // TODO: fixed header 생기면 삭제
                maxWidth: 720,
                margin: "0 auto",
            }}
        >
            <h1 style={{ fontSize: 24, fontWeight: 800 }}>
                결제에 실패했습니다
            </h1>

            <p style={{ marginTop: 12, color: "#666", lineHeight: 1.6 }}>
                네트워크 문제 또는 결제 과정에서 오류가 발생했을 수 있어요.
                <br />
                다시 시도하거나, 문제가 계속되면 잠시 후 재시도해주세요.
            </p>

            <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
                {/* 결제 재시도: 다시 PaymentPage로 */}
                <button
                    type="button"
                    disabled={!canRetry}
                    onClick={() => {
                        if (!bookingId) return;

                        // 간단 재시도: 뒤로 가기(= PaymentPage로 복귀)
                        navigate(-1);
                    }}
                    style={{
                        padding: "10px 14px",
                        borderRadius: 10,
                        border: "1px solid #333",
                        background: "#fff",
                        cursor: canRetry ? "pointer" : "not-allowed",
                        opacity: canRetry ? 1 : 0.5,
                    }}
                >
                    결제 다시 시도
                </button>

                <Link
                    to="/"
                    style={{
                        padding: "10px 14px",
                        borderRadius: 10,
                        border: "1px solid #ddd",
                        textDecoration: "none",
                        color: "#333",
                        background: "#fff",
                    }}
                >
                    홈으로
                </Link>

                {/* 예약 상세로 이동  */}
                {bookingId && (
                    <Link
                        to={`/bookings/${bookingId}`}
                        style={{
                            padding: "10px 14px",
                            borderRadius: 10,
                            border: "1px solid #ddd",
                            textDecoration: "none",
                            color: "#333",
                            background: "#fff",
                        }}
                    >
                        예약 상세 보기
                    </Link>
                )}
            </div>

            <div style={{ marginTop: 28, color: "#777", fontSize: 13, lineHeight: 1.6 }}>
                <div>• 결제가 실패해도 예약이 자동으로 확정되진 않아요.</div>
                <div>• 문제가 지속되면 결제 수단을 바꾸거나 잠시 후 다시 시도해보세요.</div>
            </div>
        </div>
    );
}