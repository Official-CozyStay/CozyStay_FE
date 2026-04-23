import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { media } from '@/styles/media';
import {
  ContentTitle,
  EmptyState,
  EmptyText,
  PrimaryButton,
} from '../profile.styles';
import {
  fetchHostBookings,
  fetchUserBookings,
  type HostBookingListItemResponse,
  type BookingResponse,
} from '@/api/booking';
import { fetchAccommodationDetail } from '@/api/accommodation';
import InviteFriendModal from '@/components/InviteFriendModal';
import { useAuth } from '@/contexts/AuthContext';

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
`;

const ReservationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  ${media.mobile} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const AccommodationName = styled.h3`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ReservationStatus = styled.span`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background: ${({ theme }) => theme.colors.background.hover};
  color: ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  white-space: nowrap;
`;

const ReservationDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const DetailText = styled.p`
  font-size: ${({ theme }) => theme.font.size.md};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: auto;

  ${media.tablet} {
    flex-direction: column;
  }
`;

const ActionButton = styled.button<{ $primary?: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid
    ${({ $primary, theme }) =>
      $primary ? theme.colors.primary.main : theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ $primary, theme }) =>
    $primary ? theme.colors.primary.main : theme.colors.common.white};
  color: ${({ $primary, theme }) =>
    $primary ? theme.colors.common.white : theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.normal};
  text-align: center;

  &:hover {
    background: ${({ $primary, theme }) =>
      $primary ? theme.colors.primary.hover : theme.colors.background.hover};
  }
`;

const TripImage = styled.div`
  width: 180px;
  height: 180px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 120px;
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

const getPrimaryImageUrl = (
  imageUrls: { imageUrl: string; isPrimary: boolean }[],
) => {
  return (
    imageUrls.find((image) => image.isPrimary)?.imageUrl ??
    imageUrls[0]?.imageUrl ??
    null
  );
};

const PastTripsSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isHost = user?.role === 'HOST';

  const [guestBookings, setGuestBookings] = useState<BookingResponse[]>([]);
  const [hostBookings, setHostBookings] = useState<
    HostBookingListItemResponse[]
  >([]);
  const [accommodationPreviews, setAccommodationPreviews] = useState<
    Record<number, AccommodationPreview>
  >({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        const gBookings = await fetchUserBookings();
        setGuestBookings(gBookings || []);

        const hBookings = isHost ? await fetchHostBookings('CONFIRMED') : [];
        setHostBookings(hBookings || []);

        const accommodationIds = [
          ...new Set([
            ...(gBookings || []).map((booking) => booking.accommodationId),
            ...(hBookings || []).map((booking) => booking.accommodationId),
          ]),
        ];

        if (accommodationIds.length > 0) {
          const nextPreviews: Record<number, AccommodationPreview> = {};

          await Promise.all(
            accommodationIds.map(async (accommodationId) => {
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

          setAccommodationPreviews(nextPreviews);
        } else {
          setAccommodationPreviews({});
        }
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
        setError('예약 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadBookings();
    }
  }, [user, isHost]);

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(price);
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      PENDING: '결제 대기 중',
      CONFIRMED: '예약 확정',
      CANCELLED: '예약 취소',
      COMPLETED: '이용 완료',
    };
    return statusMap[status] || status;
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

    return <ReservationImageFallback>🏨</ReservationImageFallback>;
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
    if (guestBookings.length === 0) {
      return (
        <EmptyState>
          <TripImage>🧳</TripImage>
          <EmptyText>
            CozyStay에서 아직 예약 내역이 없습니다.
            <br />
            마음에 드는 숙소를 예약하고 멋진 여행을 시작해보세요!
          </EmptyText>
          <PrimaryButton onClick={handleBookTrip}>여행 예약하기</PrimaryButton>
        </EmptyState>
      );
    }

    return (
      <ReservationList>
        {guestBookings.map((booking) => {
          const preview = getAccommodationPreview(booking.accommodationId);

          return (
            <ReservationCard key={`guest-${booking.bookingId}`}>
              {renderReservationImage(
                booking.accommodationId,
                preview?.title || `숙소 ${booking.accommodationId}`,
              )}
              <ReservationInfo>
                <ReservationHeader>
                  <AccommodationName>
                    {preview?.title || `숙소 ID: ${booking.accommodationId}`}
                  </AccommodationName>
                  <ReservationStatus>
                    {getStatusText(booking.bookingStatus || 'CONFIRMED')}
                  </ReservationStatus>
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
                  <ActionButton
                    $primary
                    onClick={() => handleInviteFriend(booking.bookingId)}
                  >
                    친구 초대
                  </ActionButton>
                </ButtonGroup>
              </ReservationInfo>
            </ReservationCard>
          );
        })}
      </ReservationList>
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
                    <ReservationStatus>
                      {getStatusText(booking.status)}
                    </ReservationStatus>
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

      <SectionTitle>내 예약 리스트</SectionTitle>
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
