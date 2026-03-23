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

const ReservationImage = styled.div`
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

const PastTripsSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isHost = user?.role === 'HOST';

  const [guestBookings, setGuestBookings] = useState<BookingResponse[]>([]);
  const [hostBookings, setHostBookings] = useState<
    HostBookingListItemResponse[]
  >([]);
  const [accommodationNames, setAccommodationNames] = useState<
    Record<number, string>
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

        // 게스트의 내가 예약한 목록 조회
        const gBookings = await fetchUserBookings('CONFIRMED');
        setGuestBookings(gBookings || []);

        // 내가 예약한 숙소의 이름 정보를 가져오기 위해 숙소 디테일 조회 (ReviewPage 참조)
        if (gBookings && gBookings.length > 0) {
          const accIds = [...new Set(gBookings.map((b) => b.accommodationId))];
          const newNames: Record<number, string> = {};
          const detailPromises = accIds.map(async (id) => {
            try {
              const detail = await fetchAccommodationDetail(String(id));
              newNames[id] = detail.title;
            } catch (e) {
              console.error(`Failed to fetch title for accommodation ${id}`, e);
            }
          });
          await Promise.all(detailPromises);
          setAccommodationNames(newNames);
        }

        // 사용자가 호스트인 경우, 호스트의 예약 목록도 조회
        if (isHost) {
          const hBookings = await fetchHostBookings('CONFIRMED');
          setHostBookings(hBookings || []);
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
      PENDING: '승인 대기중',
      CONFIRMED: '예약 확정',
      CANCELLED: '예약 취소',
      COMPLETED: '이용 완료',
    };
    return statusMap[status] || status;
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
            CozyStay에서 첫 예약 내역이 없습니다.
            <br />
            원하는 숙소를 예약하여 멋진 여행을 시작해보세요!
          </EmptyText>
          <PrimaryButton onClick={handleBookTrip}>여행 예약하기</PrimaryButton>
        </EmptyState>
      );
    }

    return (
      <ReservationList>
        {guestBookings.map((booking) => (
          <ReservationCard key={`guest-${booking.bookingId}`}>
            <ReservationImage>🏠</ReservationImage>
            <ReservationInfo>
              <ReservationHeader>
                <AccommodationName>
                  {accommodationNames[booking.accommodationId] ||
                    `숙소 ID: ${booking.accommodationId}`}
                </AccommodationName>
                <ReservationStatus>
                  {getStatusText(booking.bookingStatus || 'CONFIRMED')}
                </ReservationStatus>
              </ReservationHeader>
              <ReservationDetails>
                <DetailText>
                  일정: {booking.checkInDate} ~ {booking.checkOutDate}
                </DetailText>
                <DetailText>인원: 게스트 {booking.numberOfGuests}명</DetailText>
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
        ))}
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
            <EmptyText>
              아직 호스트님의 숙소에 예약된 내역이 없습니다.
            </EmptyText>
          </EmptyState>
        </>
      );
    }

    return (
      <>
        <SectionTitle>호스트 예약 내역</SectionTitle>
        <ReservationList>
          {hostBookings.map((booking) => (
            <ReservationCard key={`host-${booking.bookingId}`}>
              <ReservationImage>🏠</ReservationImage>
              <ReservationInfo>
                <ReservationHeader>
                  <AccommodationName>
                    {booking.accommodationTitle}
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
          ))}
        </ReservationList>
      </>
    );
  };

  return (
    <>
      <ContentTitle>예약</ContentTitle>

      <SectionTitle>내가 예약한 리스트</SectionTitle>
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
