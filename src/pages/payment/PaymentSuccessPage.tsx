import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import { confirmPayment } from '@/api/payment';
import {
  PaymentSuccessContainer,
  PaymentSuccessTitle,
  PaymentSuccessDescription,
  PaymentSuccessButtonGroup,
  PaymentSuccessLink,
} from './paymentSuccess.styles';

export default function PaymentSuccessPage() {
  const [sp] = useSearchParams();

  const bookingId = sp.get('bookingId');
  const paymentKey = sp.get('paymentKey');
  const orderId = sp.get('orderId');
  const amount = sp.get('amount');

  const [confirming, setConfirming] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const runConfirm = async () => {
      if (!paymentKey || !orderId || !amount) {
        setErrorMessage('결제 승인에 필요한 정보가 없습니다.');
        setConfirming(false);
        return;
      }

      try {
        await confirmPayment({
          paymentKey,
          orderId,
          amount: Number(amount),
        });
      } catch (e: unknown) {
        if (axios.isAxiosError<{ message?: string }>(e)) {
          setErrorMessage(
            e.response?.data?.message ?? '결제 승인 처리에 실패했습니다.',
          );
        } else if (e instanceof Error) {
          setErrorMessage(e.message);
        } else {
          setErrorMessage('결제 승인 처리 중 오류가 발생했습니다.');
        }
      } finally {
        setConfirming(false);
      }
    };

    runConfirm();
  }, [paymentKey, orderId, amount]);

  const title = errorMessage
    ? '결제 승인에 실패했습니다'
    : confirming
      ? '결제 승인 중입니다'
      : '결제가 완료되었습니다';

  const description = errorMessage
    ? errorMessage
    : confirming
      ? '결제 정보를 확인하고 있어요. 잠시만 기다려주세요.'
      : '예약이 정상적으로 접수되었어요.';

  return (
    <PaymentSuccessContainer>
      <PaymentSuccessTitle>{title}</PaymentSuccessTitle>

      <PaymentSuccessDescription>{description}</PaymentSuccessDescription>

      {!confirming && (
        <PaymentSuccessButtonGroup>
          {bookingId && !errorMessage && (
            <PaymentSuccessLink to={`/bookings/${bookingId}`}>
              예약 상세로 이동
            </PaymentSuccessLink>
          )}

          <PaymentSuccessLink to="/">홈으로</PaymentSuccessLink>

          {errorMessage && (
            <PaymentSuccessLink to="/payment/fail">
              실패 페이지로 이동
            </PaymentSuccessLink>
          )}
        </PaymentSuccessButtonGroup>
      )}
    </PaymentSuccessContainer>
  );
}
