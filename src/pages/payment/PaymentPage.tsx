import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { useAuth } from '@/contexts/AuthContext';

import { useAccommodationStore } from '@/store/accommodationStore';
import { nightsBetween, calcTotal, formatKRW } from '../../utils/price';

import BookingSummaryCard from './components/BookngSummaryCard';
import { createBooking } from '@/api/booking';
import { createOrGetConversation } from '@/api/messages';
import {
  createPayment,
  type PaymentMethod as ApiPaymentMethod,
} from '@/api/payment';
import { getOrCreateStompClient, sendMessageOverWs } from '@/api/chatWebSocket';

import {
  PaymentPageLayout,
  PaymentContent,
  SectionCard,
  SectionTitle,
  IntroRow,
  IntroIcon,
  IntroTextWrap,
  IntroTitle,
  IntroDescription,
  BrandCard,
  BrandHeader,
  BrandDot,
  BrandTitle,
  BrandSubText,
  MethodPillRow,
  MethodPill,
  MessageGuide,
  MessageBox,
  SummaryCard,
  SummaryRow,
  SummaryLabel,
  SummaryValue,
  SummaryDivider,
  AgreementLabel,
  AgreementCheckbox,
  SubmitErrorBox,
  SubmitButton,
  SubmitHint,
} from './payment.styles';

const tossClientKey = import.meta.env.VITE_TOSS_CLIENT_KEY;
const frontBaseUrl =
  import.meta.env.VITE_FRONT_BASE_URL ?? window.location.origin;

export default function PaymentPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const { detail, loading, error, load } = useAccommodationStore();
  const { user, accessToken } = useAuth();

  const [hostMessage, setHostMessage] = useState('');
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const retryBookingId = searchParams.get('bookingId');
  const checkIn = searchParams.get('checkin');
  const checkOut = searchParams.get('checkout');
  const guests = Number(
    searchParams.get('numberOfGuests') ?? searchParams.get('guests') ?? 1,
  );

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

  const stayAmount = useMemo(() => {
    if (!detail || nights <= 0) return 0;
    return detail.pricePerNight * nights;
  }, [detail, nights]);

  const extraAmount = useMemo(() => {
    if (!price) return 0;
    return Math.max(price.total - stayAmount, 0);
  }, [price, stayAmount]);

  const serviceFeeAmount = useMemo(() => {
    if (!price || !detail) return 0;
    return Math.max(price.total - stayAmount - detail.cleaningFee, 0);
  }, [price, stayAmount, detail]);

  if (!id) return <div>잘못된 접근입니다.</div>;
  if (loading) return <div>불러오는 중...</div>;
  if (error) return <div>오류: {error}</div>;
  if (!detail) return <div>숙소 정보를 찾을 수 없습니다.</div>;

  const canSubmit =
    !!price &&
    !!checkIn &&
    !!checkOut &&
    guests >= 1 &&
    guests <= detail.maxGuests &&
    agreementChecked &&
    !submitting;

  const paymentMethod: ApiPaymentMethod = 'EASY_PAY';
  // Toss SDK 통합 결제창은 CARD method로 진입해 카드/간편결제를 함께 노출한다.
  const tossMethod = 'CARD' as const;

  const getUserFriendlyErrorMessage = (
    status?: number,
    serverMessage?: string,
  ) => {
    const message = serverMessage ?? '';

    if (status === 401) {
      return '로그인이 필요합니다.';
    }

    if (status === 409) {
      if (message.includes('겹치') || message.includes('중복')) {
        return '선택한 날짜에 이미 예약이 있어요. 다른 날짜를 선택해주세요.';
      }

      if (message.includes('결제 진행 중')) {
        return '이미 결제가 진행 중인 예약입니다. 잠시 후 다시 확인해주세요.';
      }

      if (message.includes('결제 완료')) {
        return '이미 결제가 완료된 예약입니다.';
      }

      return '요청을 처리할 수 없어요. 입력한 내용을 다시 확인해주세요.';
    }

    if (status === 400) {
      return '입력한 정보가 올바르지 않아요. 다시 확인해주세요.';
    }

    return message || '예약 또는 결제 요청에 실패했습니다.';
  };

  const sendHostMessageToConversation = async () => {
    const trimmedMessage = hostMessage.trim();

    if (!trimmedMessage || !accessToken) {
      return;
    }

    const conversation = await createOrGetConversation({
      hostId: detail.hostId,
      accommodationId: Number(id),
    });

    const stompClient = await getOrCreateStompClient(accessToken);
    sendMessageOverWs(stompClient, conversation.conversationId, trimmedMessage);
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;

    let bookingIdForNav: number | null = retryBookingId
      ? Number(retryBookingId)
      : null;
    let paymentIdForNav: number | null = null;

    try {
      setSubmitting(true);
      setSubmitError(null);

      if (!tossClientKey) {
        throw new Error('토스 클라이언트 키가 설정되지 않았습니다.');
      }

      if (!bookingIdForNav) {
        const booking = await createBooking({
          accommodationId: Number(id),
          checkInDate: checkIn!,
          checkOutDate: checkOut!,
          numberOfGuests: guests,
        });

        bookingIdForNav = booking.bookingId;
      }

      if (hostMessage.trim()) {
        try {
          await sendHostMessageToConversation();
        } catch (chatError) {
          if (import.meta.env.DEV) {
            console.warn(
              '[PaymentPage] Failed to send host message:',
              chatError,
            );
          }
        }
      }

      const payment = await createPayment({
        bookingId: bookingIdForNav,
        paymentMethod,
      });

      paymentIdForNav = payment.paymentId;

      const tossPayments = await loadTossPayments(tossClientKey);
      const paymentSdk = tossPayments.payment({
        customerKey: `booking_${bookingIdForNav}`,
      });

      const commonParams = new URLSearchParams({
        bookingId: String(bookingIdForNav),
        paymentId: String(payment.paymentId),
        accommodationId: String(id),
        checkin: String(checkIn),
        checkout: String(checkOut),
        guests: String(guests),
        title: detail.title,
        amount: String(payment.amount),
      });

      await paymentSdk.requestPayment({
        method: tossMethod,
        amount: {
          currency: 'KRW',
          value: Number(payment.amount),
        },
        orderId: payment.orderId,
        orderName: `${detail.title} 예약`,
        successUrl: `${frontBaseUrl}/payment/success?${commonParams.toString()}`,
        failUrl: `${frontBaseUrl}/payment/fail?${commonParams.toString()}`,
        customerName: user?.nickname ?? '고객',
      });
    } catch (e: unknown) {
      let msg = '예약 또는 결제 요청에 실패했습니다.';

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

      if (bookingIdForNav) {
        const params = new URLSearchParams();
        params.set('bookingId', String(bookingIdForNav));
        params.set('accommodationId', String(id));

        if (paymentIdForNav) {
          params.set('paymentId', String(paymentIdForNav));
        }

        params.set('checkin', String(checkIn));
        params.set('checkout', String(checkOut));
        params.set('guests', String(guests));
        params.set('title', detail.title);
        params.set('amount', String(price?.total ?? ''));
        params.set('message', msg);

        navigate(`/payment/fail?${params.toString()}`);
        return;
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
        cleaningFee={detail.cleaningFee}
        serviceFee={serviceFeeAmount}
        total={price?.total}
      />

      <PaymentContent>
        <SectionCard>
          <SectionTitle>1. 간편결제로 결제</SectionTitle>

          <IntroRow>
            <IntroIcon>✓</IntroIcon>
            <IntroTextWrap>
              <IntroTitle>간편한 토스 결제창이 열려요</IntroTitle>
              <IntroDescription>
                카카오페이, 네이버페이 등 결제 수단을 토스 결제창 안에서 선택할
                수 있어요.
              </IntroDescription>
            </IntroTextWrap>
          </IntroRow>

          <BrandCard>
            <BrandHeader>
              <BrandDot />
              <BrandTitle>TossPayments</BrandTitle>
            </BrandHeader>
            <BrandSubText>
              자체 결제수단, 카카오페이, 네이버페이, 카드 결제를 지원합니다.
            </BrandSubText>
            <MethodPillRow>
              <MethodPill>간편결제</MethodPill>
              <MethodPill>카카오페이</MethodPill>
              <MethodPill>네이버페이</MethodPill>
              <MethodPill>카드</MethodPill>
            </MethodPillRow>
          </BrandCard>
        </SectionCard>

        <SectionCard>
          <SectionTitle>2. 호스트에게 남길 메시지 작성</SectionTitle>
          <MessageGuide>
            {detail.hostNickname ?? '호스트'}에게 전달하고 싶은 요청 사항이나
            도착 예정 시간을 남겨보세요.
          </MessageGuide>

          <MessageBox
            value={hostMessage}
            onChange={(e) => setHostMessage(e.target.value)}
            placeholder="호스트에게 전달하고 싶은 말을 남겨주세요."
            maxLength={300}
          />
        </SectionCard>

        <SectionCard>
          <SectionTitle>3. 최종 결제 정보 확인</SectionTitle>

          <SummaryCard>
            <SummaryRow>
              <SummaryLabel>숙박 금액</SummaryLabel>
              <SummaryValue>₩{formatKRW(stayAmount)}</SummaryValue>
            </SummaryRow>

            <SummaryRow>
              <SummaryLabel>수수료/청소비</SummaryLabel>
              <SummaryValue>₩{formatKRW(extraAmount)}</SummaryValue>
            </SummaryRow>

            <SummaryDivider />

            <SummaryRow $isTotal>
              <SummaryLabel>총 결제 금액</SummaryLabel>
              <SummaryValue>₩{formatKRW(price?.total ?? 0)}</SummaryValue>
            </SummaryRow>
          </SummaryCard>

          <AgreementLabel>
            <AgreementCheckbox
              type="checkbox"
              checked={agreementChecked}
              onChange={(e) => setAgreementChecked(e.target.checked)}
            />
            <span>결제 진행 및 환불 규정을 확인했습니다.</span>
          </AgreementLabel>

          {submitError && <SubmitErrorBox>{submitError}</SubmitErrorBox>}

          <SubmitButton
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            $disabled={!canSubmit}
          >
            {submitting ? '결제창으로 이동 중...' : '간편결제로 결제하기'}
          </SubmitButton>

          <SubmitHint>버튼을 누르면 안전한 결제창으로 이동합니다.</SubmitHint>
        </SectionCard>
      </PaymentContent>
    </PaymentPageLayout>
  );
}
