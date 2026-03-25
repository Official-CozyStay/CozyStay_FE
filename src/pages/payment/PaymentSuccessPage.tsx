import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

import { confirmPayment } from '@/api/payment';
import {
  PaymentSuccessContainer,
  PaymentSuccessTitle,
  PaymentSuccessDescription,
  PaymentSuccessButtonGroup,
  PaymentSuccessLink,
  PaymentSuccessSummaryCard,
  PaymentSuccessSummaryRow,
  PaymentSuccessSummaryLabel,
  PaymentSuccessSummaryValue,
} from './paymentSuccess.styles';

export default function PaymentSuccessPage() {
  const [sp] = useSearchParams();
  const navigate = useNavigate();

  const bookingId = sp.get('bookingId');
  const paymentId = sp.get('paymentId');
  const paymentKey = sp.get('paymentKey');
  const orderId = sp.get('orderId');
  const amount = sp.get('amount');

  const checkIn = sp.get('checkin');
  const checkOut = sp.get('checkout');
  const guests = sp.get('guests');

  const [confirming, setConfirming] = useState(true);

  useEffect(() => {
    const runConfirm = async () => {
      if (!paymentKey || !orderId || !amount) {
        navigate(
          `/payment/fail?bookingId=${bookingId ?? ''}&paymentId=${paymentId ?? ''}&message=${encodeURIComponent(
            '결제 승인에 필요한 정보가 없습니다.',
          )}`,
          { replace: true },
        );
        return;
      }

      try {
        await confirmPayment({
          paymentKey,
          orderId,
          amount: Number(amount),
        });
      } catch (e: unknown) {
        let errorMessage = '결제 승인 처리 중 오류가 발생했습니다.';

        if (axios.isAxiosError<{ message?: string }>(e)) {
          errorMessage =
            e.response?.data?.message ?? '결제 승인 처리에 실패했습니다.';
        } else if (e instanceof Error) {
          errorMessage = e.message;
        }

        navigate(
          `/payment/fail?bookingId=${bookingId ?? ''}&paymentId=${paymentId ?? ''}&message=${encodeURIComponent(
            errorMessage,
          )}`,
          { replace: true },
        );
        return;
      } finally {
        setConfirming(false);
      }
    };

    runConfirm();
  }, [paymentKey, orderId, amount, bookingId, paymentId, navigate]);

  if (confirming) {
    return (
      <PaymentSuccessContainer>
        <PaymentSuccessTitle>결제를 확인하고 있습니다</PaymentSuccessTitle>
        <PaymentSuccessDescription>
          결제 정보를 확인하고 있어요. 잠시만 기다려주세요.
        </PaymentSuccessDescription>
      </PaymentSuccessContainer>
    );
  }

  return (
    <PaymentSuccessContainer>
      <PaymentSuccessTitle>결제가 완료되었습니다</PaymentSuccessTitle>

      <PaymentSuccessDescription>
        예약이 정상적으로 접수되었어요. 아래에서 예약 정보를 확인해보세요.
      </PaymentSuccessDescription>

      <PaymentSuccessSummaryCard>
        {checkIn && (
          <PaymentSuccessSummaryRow>
            <PaymentSuccessSummaryLabel>체크인</PaymentSuccessSummaryLabel>
            <PaymentSuccessSummaryValue>{checkIn}</PaymentSuccessSummaryValue>
          </PaymentSuccessSummaryRow>
        )}

        {checkOut && (
          <PaymentSuccessSummaryRow>
            <PaymentSuccessSummaryLabel>체크아웃</PaymentSuccessSummaryLabel>
            <PaymentSuccessSummaryValue>{checkOut}</PaymentSuccessSummaryValue>
          </PaymentSuccessSummaryRow>
        )}

        {guests && (
          <PaymentSuccessSummaryRow>
            <PaymentSuccessSummaryLabel>게스트</PaymentSuccessSummaryLabel>
            <PaymentSuccessSummaryValue>{guests}명</PaymentSuccessSummaryValue>
          </PaymentSuccessSummaryRow>
        )}

        {amount && (
          <PaymentSuccessSummaryRow>
            <PaymentSuccessSummaryLabel>결제 금액</PaymentSuccessSummaryLabel>
            <PaymentSuccessSummaryValue>
              ₩{Number(amount).toLocaleString()}
            </PaymentSuccessSummaryValue>
          </PaymentSuccessSummaryRow>
        )}
      </PaymentSuccessSummaryCard>

      <PaymentSuccessButtonGroup>
        {bookingId && (
          <PaymentSuccessLink to={`/bookings/${bookingId}`}>
            예약 상세보기
          </PaymentSuccessLink>
        )}

        <PaymentSuccessLink to="/">홈으로</PaymentSuccessLink>
      </PaymentSuccessButtonGroup>
    </PaymentSuccessContainer>
  );
}
