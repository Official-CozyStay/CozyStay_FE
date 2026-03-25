import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';

import { useAccommodationStore } from '@/store/accommodationStore';
import { nightsBetween, calcTotal } from '../../utils/price';

import BookingSummaryCard from './components/BookngSummaryCard';
import PaymentMethodSection, {
  type UiPaymentMethod,
} from './components/PaymentMethodSection';

import HostMessageSection from './components/HostMessageSection';
import RequestConfirmSection from './components/RequestConfirmSection';

import { createBooking } from '@/api/booking';
import {
  createPayment,
  type PaymentMethod as ApiPaymentMethod,
} from '@/api/payment';

import {
  PaymentPageLayout,
  PaymentContent,
  SubmitErrorBox,
} from './payment.styles';

const tossClientKey = import.meta.env.VITE_TOSS_CLIENT_KEY;
const frontBaseUrl =
  import.meta.env.VITE_FRONT_BASE_URL ?? window.location.origin;

export default function PaymentPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const { detail, loading, error, load } = useAccommodationStore();

  const [paymentMethod, setPaymentMethod] = useState<UiPaymentMethod>('CARD');
  const [hostMessage, setHostMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const checkIn = searchParams.get('checkin');
  const checkOut = searchParams.get('checkout');
  const guests = Number(searchParams.get('numberOfGuests') ?? 1);

  useEffect(() => {
    if (id) load(id);
  }, [id, load]);

  const nights = nightsBetween(checkIn ?? undefined, checkOut ?? undefined);

  const price = useMemo(() => {
    if (!detail || !checkIn || !checkOut || nights <= 0) return null;
    return calcTotal(
      nights,
      detail.pricePerNight,
      detail.cleaningFee,
      detail.serviceFeePercentage,
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

  const toApiPaymentMethod = (m: UiPaymentMethod): ApiPaymentMethod => {
    if (m === 'CARD') return 'CARD';
    return 'EASY_PAY';
  };

  const getUserFriendlyErrorMessage = (
    status?: number,
    serverMessage?: string,
  ) => {
    const message = serverMessage ?? '';

    if (status === 401) {
      return '로그인이 필요합니다.';
    }

    if (status === 409) {
      if (message.includes('겹치는 예약')) {
        return '선택한 날짜에 이미 예약이 있어요. 다른 날짜를 선택해주세요.';
      }

      if (message.includes('이미 결제 진행 중')) {
        return '이미 결제가 진행 중인 예약입니다. 잠시 후 다시 확인해주세요.';
      }

      if (message.includes('이미 결제 완료된 예약')) {
        return '이미 결제가 완료된 예약입니다.';
      }

      return '요청을 처리할 수 없어요. 입력한 정보를 다시 확인해주세요.';
    }

    if (status === 400) {
      return '입력한 정보가 올바르지 않습니다. 다시 확인해주세요.';
    }

    return message || '예약/결제 요청에 실패했습니다.';
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;

    try {
      setSubmitting(true);
      setSubmitError(null);

      if (!tossClientKey) {
        throw new Error('토스 클라이언트 키가 설정되지 않았습니다.');
      }

      const booking = await createBooking({
        accommodationId: Number(id),
        checkInDate: checkIn!,
        checkOutDate: checkOut!,
        numberOfGuests: guests,
      });

      const payment = await createPayment({
        bookingId: booking.bookingId,
        paymentMethod: toApiPaymentMethod(paymentMethod),
      });

      const tossPayments = await loadTossPayments(tossClientKey);

      const paymentSdk = tossPayments.payment({
        customerKey: `booking_${booking.bookingId}`,
      });

      await paymentSdk.requestPayment({
        method: 'CARD',
        amount: {
          currency: 'KRW',
          value: Number(payment.amount),
        },
        orderId: payment.orderId,
        orderName: `${detail.title} 예약`,
        successUrl: `${frontBaseUrl}/payment/success?bookingId=${booking.bookingId}&paymentId=${payment.paymentId}&checkin=${checkIn}&checkout=${checkOut}&guests=${guests}&title=${encodeURIComponent(detail.title)}&amount=${payment.amount}`,
        failUrl: `${frontBaseUrl}/payment/fail?bookingId=${booking.bookingId}&paymentId=${payment.paymentId}&checkin=${checkIn}&checkout=${checkOut}&guests=${guests}&title=${encodeURIComponent(detail.title)}&amount=${payment.amount}`,
        customerName: '고객',
      });
    } catch (e: unknown) {
      let msg = '예약/결제 요청에 실패했습니다.';

      if (axios.isAxiosError<{ message?: string }>(e)) {
        const status = e.response?.status;
        const serverMessage = e.response?.data?.message;

        msg = getUserFriendlyErrorMessage(status, serverMessage);

        if (import.meta.env.DEV) {
          console.error('[PaymentPage] AxiosError:', {
            status,
            serverMessage,
            message: e.message,
            url: e.config?.url,
            method: e.config?.method,
          });
        }
      } else if (e instanceof Error) {
        msg = e.message;

        if (import.meta.env.DEV) {
          console.error('[PaymentPage] Error:', e.message);
        }
      } else {
        msg = '알 수 없는 오류가 발생했습니다.';

        if (import.meta.env.DEV) {
          console.error('[PaymentPage] Unknown error:', String(e));
        }
      }

      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PaymentPageLayout>
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

      <PaymentContent>
        <PaymentMethodSection
          value={paymentMethod}
          onChange={setPaymentMethod}
        />

        <HostMessageSection
          value={hostMessage}
          onChange={setHostMessage}
          hostName={detail.hostNickname ?? '호스트'}
        />

        {submitError && <SubmitErrorBox>{submitError}</SubmitErrorBox>}

        <RequestConfirmSection disabled={!canSubmit} onSubmit={handleSubmit} />
      </PaymentContent>
    </PaymentPageLayout>
  );
}
