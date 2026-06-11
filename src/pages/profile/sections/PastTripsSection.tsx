import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchAccommodationDetail } from '@/api/accommodation';
import {
  fetchCompanionBookings,
  fetchHostBookings,
  fetchUserBookings,
  type BookingResponse,
  type HostBookingListItemResponse,
} from '@/api/booking';
import { getPaymentByBooking, type PaymentResponse } from '@/api/payment';
import InviteFriendModal from '@/components/InviteFriendModal';
import { useAuth } from '@/contexts/AuthContext';
import { media } from '@/styles/media';
import {
  ContentTitle,
  EmptyState,
  EmptyText,
  PrimaryButton,
} from '../profile.styles';

const ReservationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const ReservationCard = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radius.xl};
  background: ${({ theme }) => theme.colors.common.white};
  transition: ${({ theme }) => theme.transition.normal};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }

  ${media.tablet} {
    flex-direction: column;
  }
`;

const ReservationImageFallback = styled.div`
  width: 200px;
  height: 150px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.background.default};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;

  ${media.tablet} {
    width: 100%;
    height: 200px;
  }
`;

const ReservationThumbnail = styled.img`
  width: 200px;
  height: 150px;
  border-radius: ${({ theme }) => theme.radius.lg};
  object-fit: cover;
  background: ${({ theme }) => theme.colors.background.default};

  ${media.tablet} {
    width: 100%;
    height: 200px;
  }
`;

const ReservationInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ReservationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  ${media.mobile} {
    flex-direction: column;
  }
`;

const AccommodationName = styled.h3`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const StatusGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.xs};

  ${media.mobile} {
    justify-content: flex-start;
  }
`;

const ReservationStatus = styled.span`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background: ${({ theme }) => theme.colors.background.hover};
  color: ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 11px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  white-space: nowrap;
`;

const ReservationDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const DetailText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.font.size.xs};
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const PaymentStatusText = styled.span<{
  $tone: 'success' | 'pending' | 'error';
}>`
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ $tone, theme }) => {
    if ($tone === 'success') return theme.colors.primary.main;
    if ($tone === 'error') return theme.colors.status.error;
    return theme.colors.text.secondary;
  }};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};

  ${media.tablet} {
    flex-direction: column;
  }
`;

const ActionButton = styled.button<{ $primary?: boolean }>`
  flex: 1;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border: 1px solid
    ${({ $primary, theme }) =>
      $primary ? theme.colors.primary.main : theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ $primary, theme }) =>
    $primary ? theme.colors.primary.main : theme.colors.common.white};
  color: ${({ $primary, theme }) =>
    $primary ? theme.colors.common.white : theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.normal};
  text-align: center;

  &:hover {
    background: ${({ $primary, theme }) =>
      $primary ? theme.colors.primary.hover : theme.colors.background.hover};
  }

  &:disabled {
    border-color: ${({ theme }) => theme.colors.border.light};
    background: ${({ theme }) => theme.colors.background.default};
    color: ${({ theme }) => theme.colors.text.tertiary};
    cursor: not-allowed;
  }
`;

const TripImage = styled.div`
  width: 180px;
  height: 180px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 72px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.primary.main};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  margin: ${({ theme }) => theme.spacing.xl} 0
    ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

type AccommodationPreview = {
  title: string;
  imageUrl: string | null;
};

type BookingPaymentInfo = {
  payment: PaymentResponse | null;
  hasPayment: boolean;
};

const getPrimaryImageUrl = (
  images?: { imageUrl: string; isPrimary: boolean }[] | null,
) => {
  return (
    images?.find((image) => image.isPrimary)?.imageUrl ??
    images?.[0]?.imageUrl ??
    null
  );
};

const PastTripsSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isHost = user?.role === 'HOST';

  const [guestBookings, setGuestBookings] = useState<BookingResponse[]>([]);
  const [companionBookings, setCompanionBookings] = useState<BookingResponse[]>(
    [],
  );
  const [hostBookings, setHostBookings] = useState<
    HostBookingListItemResponse[]
  >([]);
  const [accommodationPreviews, setAccommodationPreviews] = useState<
    Record<number, AccommodationPreview>
  >({});
  const accommodationPreviewsRef = useRef<Record<number, AccommodationPreview>>(
    {},
  );
  const [paymentInfos, setPaymentInfos] = useState<
    Record<number, BookingPaymentInfo>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null,
  );

  const loadMissingAccommodationPreviews = useCallback(
    async (accommodationIds: number[]) => {
      const uniqueIds = [...new Set(accommodationIds)];

      if (uniqueIds.length === 0) {
        accommodationPreviewsRef.current = {};
        setAccommodationPreviews({});
        return;
      }

      const missingIds = uniqueIds.filter(
        (accommodationId) => !accommodationPreviewsRef.current[accommodationId],
      );

      if (missingIds.length === 0) {
        return;
      }

      const nextPreviews: Record<number, AccommodationPreview> = {};
      await Promise.all(
        missingIds.map(async (accommodationId) => {
          try {
            const detail = await fetchAccommodationDetail(
              String(accommodationId),
            );
            nextPreviews[accommodationId] = {
              title: detail.title,
              imageUrl: getPrimaryImageUrl(detail.images),
            };
          } catch (previewError) {
            console.error(
              `Failed to fetch preview for accommodation ${accommodationId}`,
              previewError,
            );
          }
        }),
      );

      accommodationPreviewsRef.current = {
        ...accommodationPreviewsRef.current,
        ...nextPreviews,
      };
      setAccommodationPreviews(accommodationPreviewsRef.current);
    },
    [],
  );

  const loadBookings = useCallback(
    async (showLoading = false) => {
      try {
        if (showLoading) {
          setLoading(true);
        }
        setError(null);

        const [gBookings, cBookings, hBookings] = await Promise.all([
          fetchUserBookings(),
          fetchCompanionBookings(),
          isHost
            ? fetchHostBookings('CONFIRMED')
            : Promise.resolve<HostBookingListItemResponse[]>([]),
        ]);

        setGuestBookings(gBookings || []);
        setCompanionBookings(cBookings || []);
        setHostBookings(hBookings || []);

        if ((gBookings || []).length > 0) {
          const nextPaymentInfos: Record<number, BookingPaymentInfo> = {};

          await Promise.all(
            gBookings.map(async (booking) => {
              try {
                const payment = await getPaymentByBooking(booking.bookingId);
                nextPaymentInfos[booking.bookingId] = {
                  payment,
                  hasPayment: true,
                };
              } catch (paymentError) {
                if (
                  axios.isAxiosError(paymentError) &&
                  paymentError.response?.status === 404
                ) {
                  nextPaymentInfos[booking.bookingId] = {
                    payment: null,
                    hasPayment: false,
                  };
                  return;
                }

                console.error(
                  `Failed to fetch payment for booking ${booking.bookingId}`,
                  paymentError,
                );
              }
            }),
          );

          setPaymentInfos(nextPaymentInfos);
        } else {
          setPaymentInfos({});
        }

        await loadMissingAccommodationPreviews([
          ...(gBookings || []).map((booking) => booking.accommodationId),
          ...(cBookings || []).map((booking) => booking.accommodationId),
          ...(hBookings || []).map((booking) => booking.accommodationId),
        ]);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
        setError('예약 목록을 불러오지 못했습니다.');
      } finally {
        if (showLoading) {
          setLoading(false);
        }
      }
    },
    [isHost, loadMissingAccommodationPreviews],
  );

  useEffect(() => {
    if (user) {
      loadBookings(true);
    }
  }, [user, loadBookings]);

  useEffect(() => {
    if (!user) return;

    const intervalId = window.setInterval(() => {
      loadBookings();
    }, 60_000);

    return () => window.clearInterval(intervalId);
  }, [user, loadBookings]);

  const handleViewDetails = (id: number) => {
    navigate(`/accommodation/${id}`);
  };

  const handleInviteFriend = (bookingId: number) => {
    setSelectedBookingId(bookingId);
    setIsInviteModalOpen(true);
  };

  const handleBookTrip = () => {
    navigate('/');
  };

  const handleRetryPayment = (booking: BookingResponse) => {
    const params = new URLSearchParams();
    params.set('bookingId', String(booking.bookingId));
    params.set('checkin', booking.checkInDate);
    params.set('checkout', booking.checkOutDate);
    params.set('numberOfGuests', String(booking.numberOfGuests));

    navigate(`/payment/retry/${booking.accommodationId}?${params.toString()}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(price);
  };

  const getBookingStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      PENDING: '예약 대기 중',
      CONFIRMED: '예약 확정',
      CANCELLED: '예약 취소됨',
      COMPLETED: '이용 완료',
      REJECTED: '예약 거절됨',
    };
    return statusMap[status] || status;
  };

  const getPaymentStatusText = (bookingId: number) => {
    const paymentInfo = paymentInfos[bookingId];

    if (!paymentInfo || !paymentInfo.hasPayment || !paymentInfo.payment) {
      return {
        text: '결제 정보 없음',
        tone: 'pending' as const,
      };
    }

    const paymentStatusMap: Record<
      string,
      { text: string; tone: 'success' | 'pending' | 'error' }
    > = {
      READY: { text: '결제 대기', tone: 'pending' },
      SUCCESS: { text: '결제 완료', tone: 'success' },
      FAILED: { text: '결제 실패', tone: 'error' },
      CANCELLED: { text: '결제 취소', tone: 'error' },
    };

    return (
      paymentStatusMap[paymentInfo.payment.paymentStatus] ?? {
        text: paymentInfo.payment.paymentStatus,
        tone: 'pending',
      }
    );
  };

  const canShowRetryPayment = (booking: BookingResponse) => {
    if (
      ['CANCELLED', 'COMPLETED', 'REJECTED'].includes(booking.bookingStatus)
    ) {
      return false;
    }

    const paymentInfo = paymentInfos[booking.bookingId];

    if (!paymentInfo || !paymentInfo.hasPayment || !paymentInfo.payment) {
      return true;
    }

    return ['READY', 'FAILED', 'CANCELLED'].includes(
      paymentInfo.payment.paymentStatus,
    );
  };

  const canInviteFriend = (bookingId: number) => {
    return paymentInfos[bookingId]?.payment?.paymentStatus === 'SUCCESS';
  };

  const getAccommodationPreview = (accommodationId: number) => {
    return accommodationPreviews[accommodationId];
  };

  const renderReservationImage = (
    accommodationId: number,
    fallbackTitle: string,
  ) => {
    const preview = getAccommodationPreview(accommodationId);

    if (preview?.imageUrl) {
      return (
        <ReservationThumbnail
          src={preview.imageUrl}
          alt={preview.title || fallbackTitle}
        />
      );
    }

    return <ReservationImageFallback>숙소</ReservationImageFallback>;
  };

  const renderBookingCard = (
    booking: BookingResponse,
    keyPrefix: string,
    options?: {
      companion?: boolean;
      inviteEnabled?: boolean;
      paymentVisible?: boolean;
      retryVisible?: boolean;
    },
  ) => {
    const preview = getAccommodationPreview(booking.accommodationId);
    const paymentStatus = options?.paymentVisible
      ? getPaymentStatusText(booking.bookingId)
      : null;
    const inviteEnabled =
      !!options?.inviteEnabled && canInviteFriend(booking.bookingId);
    const showRetryPayment =
      !!options?.retryVisible && canShowRetryPayment(booking);

    return (
      <ReservationCard key={`${keyPrefix}-${booking.bookingId}`}>
        {renderReservationImage(
          booking.accommodationId,
          preview?.title || `숙소 ${booking.accommodationId}`,
        )}
        <ReservationInfo>
          <ReservationHeader>
            <AccommodationName>
              {preview?.title || `숙소 ID: ${booking.accommodationId}`}
            </AccommodationName>
            <StatusGroup>
              {options?.companion && (
                <ReservationStatus>동반자 예약</ReservationStatus>
              )}
              <ReservationStatus>
                {getBookingStatusText(booking.bookingStatus || 'CONFIRMED')}
              </ReservationStatus>
            </StatusGroup>
          </ReservationHeader>
          <ReservationDetails>
            <DetailText>
              일정: {booking.checkInDate} ~ {booking.checkOutDate}
            </DetailText>
            <DetailText>인원: 게스트 {booking.numberOfGuests}명</DetailText>
            {paymentStatus && (
              <DetailText>
                결제 상태:{' '}
                <PaymentStatusText $tone={paymentStatus.tone}>
                  {paymentStatus.text}
                </PaymentStatusText>
              </DetailText>
            )}
            <DetailText>
              총 결제 금액: {formatPrice(booking.totalPrice)}
            </DetailText>
          </ReservationDetails>

          <ButtonGroup>
            <ActionButton
              onClick={() => handleViewDetails(booking.accommodationId)}
            >
              숙소 상세보기
            </ActionButton>
            {showRetryPayment && (
              <ActionButton onClick={() => handleRetryPayment(booking)}>
                재결제하기
              </ActionButton>
            )}
            {options?.inviteEnabled && (
              <ActionButton
                $primary
                onClick={() => handleInviteFriend(booking.bookingId)}
                disabled={!inviteEnabled}
                title={
                  inviteEnabled
                    ? undefined
                    : '결제가 완료된 예약만 친구를 초대할 수 있습니다.'
                }
              >
                친구 초대
              </ActionButton>
            )}
          </ButtonGroup>
        </ReservationInfo>
      </ReservationCard>
    );
  };

  if (loading) {
    return (
      <>
        <ContentTitle>예약</ContentTitle>
        <EmptyState>
          <EmptyText>예약 목록을 불러오는 중입니다...</EmptyText>
        </EmptyState>
      </>
    );
  }

  if (error) {
    return (
      <>
        <ContentTitle>예약</ContentTitle>
        <EmptyState>
          <EmptyText>{error}</EmptyText>
          <PrimaryButton onClick={() => window.location.reload()}>
            다시 시도
          </PrimaryButton>
        </EmptyState>
      </>
    );
  }

  const renderGuestBookings = () => {
    if (guestBookings.length === 0 && companionBookings.length === 0) {
      return (
        <EmptyState>
          <TripImage>0</TripImage>
          <EmptyText>
            CozyStay에서 아직 예약 내역이 없습니다.
            <br />
            마음에 드는 숙소를 예약하고 멋진 여행을 시작해보세요.
          </EmptyText>
          <PrimaryButton onClick={handleBookTrip}>여행 예약하기</PrimaryButton>
        </EmptyState>
      );
    }

    return (
      <>
        {guestBookings.length > 0 && (
          <>
            <SectionTitle>내 예약 리스트</SectionTitle>
            <ReservationList>
              {guestBookings.map((booking) =>
                renderBookingCard(booking, 'guest', {
                  inviteEnabled: true,
                  paymentVisible: true,
                  retryVisible: true,
                }),
              )}
            </ReservationList>
          </>
        )}

        {companionBookings.length > 0 && (
          <>
            <SectionTitle>동반자로 참여한 예약</SectionTitle>
            <ReservationList>
              {companionBookings.map((booking) =>
                renderBookingCard(booking, 'companion', { companion: true }),
              )}
            </ReservationList>
          </>
        )}
      </>
    );
  };

  const renderHostBookings = () => {
    if (!isHost) return null;

    if (hostBookings.length === 0) {
      return (
        <>
          <SectionTitle>호스트 예약 내역</SectionTitle>
          <EmptyState>
            <EmptyText>아직 호스트 숙소에 대한 예약 내역이 없습니다.</EmptyText>
          </EmptyState>
        </>
      );
    }

    return (
      <>
        <SectionTitle>호스트 예약 내역</SectionTitle>
        <ReservationList>
          {hostBookings.map((booking) => {
            const preview = getAccommodationPreview(booking.accommodationId);

            return (
              <ReservationCard key={`host-${booking.bookingId}`}>
                {renderReservationImage(
                  booking.accommodationId,
                  preview?.title || booking.accommodationTitle,
                )}
                <ReservationInfo>
                  <ReservationHeader>
                    <AccommodationName>
                      {preview?.title || booking.accommodationTitle}
                    </AccommodationName>
                    <StatusGroup>
                      <ReservationStatus>
                        {getBookingStatusText(booking.status)}
                      </ReservationStatus>
                    </StatusGroup>
                  </ReservationHeader>
                  <ReservationDetails>
                    <DetailText>
                      일정: {booking.checkInDate} ~ {booking.checkOutDate}
                    </DetailText>
                    <DetailText>
                      인원: 게스트 {booking.numberOfGuests}명
                    </DetailText>
                    <DetailText>
                      총 결제 금액: {formatPrice(booking.totalPrice)}
                    </DetailText>
                  </ReservationDetails>

                  <ButtonGroup>
                    <ActionButton
                      onClick={() => handleViewDetails(booking.accommodationId)}
                    >
                      숙소 상세보기
                    </ActionButton>
                  </ButtonGroup>
                </ReservationInfo>
              </ReservationCard>
            );
          })}
        </ReservationList>
      </>
    );
  };

  return (
    <>
      <ContentTitle>예약</ContentTitle>

      {renderGuestBookings()}

      {renderHostBookings()}

      <InviteFriendModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        bookingId={selectedBookingId}
      />
    </>
  );
};

export default PastTripsSection;
