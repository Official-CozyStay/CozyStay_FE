import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  getBookingGuestConnections,
  type BookingGuestConnectionResponse,
} from '@/api/booking';
import { media } from '@/styles/media';
import { EmptyState, EmptyText, PrimaryButton } from '../profile.styles';

const SectionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  ${media.mobile} {
    align-items: stretch;
    flex-direction: column;
  }
`;

const HeaderText = styled.div`
  min-width: 0;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.size['2xl']};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.font.size.sm};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
  margin: 0;
`;

const ConnectionList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(132px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 640px;

  ${media.mobile} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const ConnectionCard = styled.div`
  min-height: 160px;
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.md}`};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.common.white};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProfileFallback = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary.light};
  color: ${({ theme }) => theme.colors.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

const ConnectionName = styled.strong`
  width: 100%;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TripText = styled.span`
  margin-top: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.font.size.xs};
`;

const ConnectionsSection = () => {
  const navigate = useNavigate();
  const [connections, setConnections] = useState<
    BookingGuestConnectionResponse[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getBookingGuestConnections();
        setConnections(data || []);
      } catch (err) {
        console.error('Failed to fetch booking guest connections:', err);
        setError('인연 목록을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  const handleBookTrip = () => {
    navigate('/');
  };

  const renderAvatar = (connection: BookingGuestConnectionResponse) => {
    if (connection.profileImageUrl) {
      return (
        <ProfileImage
          src={connection.profileImageUrl}
          alt={`${connection.nickName} 프로필`}
        />
      );
    }

    return <ProfileFallback>{connection.nickName}</ProfileFallback>;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <EmptyState>
          <EmptyText>인연 목록을 불러오는 중입니다...</EmptyText>
        </EmptyState>
      );
    }

    if (error) {
      return (
        <EmptyState>
          <EmptyText>{error}</EmptyText>
        </EmptyState>
      );
    }

    if (connections.length === 0) {
      return (
        <EmptyState>
          <EmptyText>
            아직 표시할 인연이 없습니다.
            <br />
            여행에 동반자를 초대하고 상대방이 수락하면 여기에 표시됩니다.
          </EmptyText>
          <PrimaryButton onClick={handleBookTrip}>여행 예약</PrimaryButton>
        </EmptyState>
      );
    }

    return (
      <ConnectionList>
        {connections.map((connection) => (
          <ConnectionCard key={connection.userId}>
            {renderAvatar(connection)}
            <ConnectionName>{connection.nickName}</ConnectionName>
            <TripText>함께한 여행 1회</TripText>
          </ConnectionCard>
        ))}
      </ConnectionList>
    );
  };

  return (
    <>
      <SectionHeader>
        <HeaderText>
          <Title>인연</Title>
          <Description>
            숙소, 체험, 서비스를 함께 예약했던 사람이 여기에 표시됩니다.
          </Description>
        </HeaderText>
      </SectionHeader>

      {renderContent()}
    </>
  );
};

export default ConnectionsSection;
