import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  PaymentFailButtonGroup,
  PaymentFailDescription,
  PaymentFailLinkButton,
  PaymentFailNotice,
  PaymentFailPageContainer,
  PaymentFailRetryButton,
  PaymentFailTitle,
  PaymentFailSummaryCard,
  PaymentFailSummaryTitle,
  PaymentFailSummaryRow,
  PaymentFailSummaryLabel,
  PaymentFailSummaryValue,
} from './paymentFail.styles';

export default function PaymentFailPage() {
  const navigate = useNavigate();
  const [sp] = useSearchParams();

  const bookingId = sp.get('bookingId');
  const code = sp.get('code');
  const message = sp.get('message');

  const title = sp.get('title');
  const checkIn = sp.get('checkin');
  const checkOut = sp.get('checkout');
  const guests = sp.get('guests');
  const amount = sp.get('amount');

  const canRetry = useMemo(() => {
    return !!bookingId;
  }, [bookingId]);

  return (
    <PaymentFailPageContainer>
      <PaymentFailTitle>결제에 실패했습니다</PaymentFailTitle>

      <PaymentFailDescription>
        결제에 실패했지만 예약은 아직 유지되고 있어요.
        <br />약 10분 동안 예약이 대기 상태로 유지됩니다. 그 전에 다시 결제를
        진행해주세요.
      </PaymentFailDescription>

      {(title || checkIn || checkOut || guests || amount) && (
        <PaymentFailSummaryCard>
          <PaymentFailSummaryTitle>예약 정보</PaymentFailSummaryTitle>

          {title && (
            <PaymentFailSummaryRow>
              <PaymentFailSummaryLabel>숙소</PaymentFailSummaryLabel>
              <PaymentFailSummaryValue>{title}</PaymentFailSummaryValue>
            </PaymentFailSummaryRow>
          )}

          {checkIn && (
            <PaymentFailSummaryRow>
              <PaymentFailSummaryLabel>체크인</PaymentFailSummaryLabel>
              <PaymentFailSummaryValue>{checkIn}</PaymentFailSummaryValue>
            </PaymentFailSummaryRow>
          )}

          {checkOut && (
            <PaymentFailSummaryRow>
              <PaymentFailSummaryLabel>체크아웃</PaymentFailSummaryLabel>
              <PaymentFailSummaryValue>{checkOut}</PaymentFailSummaryValue>
            </PaymentFailSummaryRow>
          )}

          {guests && (
            <PaymentFailSummaryRow>
              <PaymentFailSummaryLabel>게스트</PaymentFailSummaryLabel>
              <PaymentFailSummaryValue>{guests}명</PaymentFailSummaryValue>
            </PaymentFailSummaryRow>
          )}

          {amount && (
            <PaymentFailSummaryRow>
              <PaymentFailSummaryLabel>결제 예정 금액</PaymentFailSummaryLabel>
              <PaymentFailSummaryValue>
                ₩{Number(amount).toLocaleString()}
              </PaymentFailSummaryValue>
            </PaymentFailSummaryRow>
          )}
        </PaymentFailSummaryCard>
      )}

      {code && (
        <PaymentFailNotice>
          <div>• 오류 코드: {code}</div>
          {message && <div>• 상세 메시지: {message}</div>}
        </PaymentFailNotice>
      )}

      <PaymentFailButtonGroup>
        <PaymentFailRetryButton
          type="button"
          disabled={!canRetry}
          $disabled={!canRetry}
          onClick={() => {
            if (!bookingId) return;
            navigate(-1);
          }}
        >
          다시 결제하기
        </PaymentFailRetryButton>

        <PaymentFailLinkButton to="/">홈으로</PaymentFailLinkButton>

        {bookingId && (
          <PaymentFailLinkButton to={`/bookings/${bookingId}`}>
            예약 상세 보기
          </PaymentFailLinkButton>
        )}
      </PaymentFailButtonGroup>

      <PaymentFailNotice>
        <div>• 결제가 완료되지 않으면 예약은 자동으로 취소됩니다.</div>
        <div>
          • 문제가 지속되면 결제 수단을 변경하거나 잠시 후 다시 시도해주세요.
        </div>
      </PaymentFailNotice>
    </PaymentFailPageContainer>
  );
}
