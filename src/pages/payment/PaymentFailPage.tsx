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
  const message = sp.get('message');

  const canRetry = useMemo(() => {
    return !!bookingId;
  }, [bookingId]);

  return (
    <PaymentFailPageContainer>
      <PaymentFailTitle>결제에 실패했습니다</PaymentFailTitle>

      <PaymentFailDescription>
        {message ??
          '네트워크 문제 또는 결제 과정에서 오류가 발생했을 수 있어요.'}
        <br />
        다시 시도하거나, 문제가 계속되면 잠시 후 재시도해주세요.
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
          결제 다시 시도
        </PaymentFailRetryButton>

        <PaymentFailLinkButton to="/">홈으로</PaymentFailLinkButton>

        {bookingId && (
          <PaymentFailLinkButton to={`/bookings/${bookingId}`}>
            예약 상세 보기
          </PaymentFailLinkButton>
        )}
      </PaymentFailButtonGroup>

      <PaymentFailNotice>
        <div>• 결제가 실패해도 예약이 자동으로 확정되진 않아요.</div>
        <div>
          • 문제가 지속되면 결제 수단을 바꾸거나 잠시 후 다시 시도해보세요.
        </div>
      </PaymentFailNotice>
    </PaymentFailPageContainer>
  );
}
