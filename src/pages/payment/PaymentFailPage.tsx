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
} from './paymentFail.styles';

export default function PaymentFailPage() {
  const navigate = useNavigate();
  const [sp] = useSearchParams();

  const bookingId = sp.get('bookingId');
  const code = sp.get('code');

  const canRetry = useMemo(() => {
    return !!bookingId;
  }, [bookingId]);

  return (
    <PaymentFailPageContainer>
      <PaymentFailTitle>결제에 실패했습니다</PaymentFailTitle>

      <PaymentFailDescription>
        결제에 실패했지만 예약은 아직 유지되고 있어요.
        <br />
        약 10분 동안 예약이 대기 상태로 유지됩니다.
        <br />그 전에 다시 결제를 진행해주세요.
      </PaymentFailDescription>

      {code && (
        <PaymentFailNotice>
          <div>• 오류 코드: {code}</div>
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
