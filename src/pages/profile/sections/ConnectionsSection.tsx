import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  getBookingGuestConnections,
  type BookingGuestConnectionResponse,
} from '@/api/booking';
import { media } from '@/styles/media';
import {
  ContentTitle,
  EmptyLink,
  EmptyState,
  EmptyText,
  PrimaryButton,
} from '../profile.styles';

const ConnectionImage = styled.div`
  width: 200px;
  height: 150px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.primary.main};
`;

const ConnectionList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const ConnectionItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.common.white};
  text-align: left;
`;

const ProfileImage = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

const ProfileFallback = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.text.primary};
  color: ${({ theme }) => theme.colors.common.white};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

const ConnectionName = styled.span`
  min-width: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

    return <ProfileFallback>{connection.nickName.charAt(0)}</ProfileFallback>;
  };

  if (loading) {
    return (
      <>
        <ContentTitle>인연</ContentTitle>
        <EmptyState>
          <EmptyText>인연 목록을 불러오는 중입니다...</EmptyText>
        </EmptyState>
      </>
    );
  }

  if (error) {
    return (
      <>
        <ContentTitle>인연</ContentTitle>
        <EmptyState>
          <EmptyText>{error}</EmptyText>
        </EmptyState>
      </>
    );
  }

  if (connections.length === 0) {
    return (
      <>
        <ContentTitle>인연</ContentTitle>

        <EmptyState>
          <ConnectionImage>0</ConnectionImage>
          <EmptyText>
            여행에 동반자를 초대하고 상대방이 수락하면
            <br />
            이곳에 함께한 게스트의 프로필이 표시됩니다.
          </EmptyText>
          <EmptyLink>자세히 알아보기</EmptyLink>
          <PrimaryButton onClick={handleBookTrip}>여행 예약</PrimaryButton>
        </EmptyState>
      </>
    );
  }

  return (
    <>
      <ContentTitle>인연</ContentTitle>

      <ConnectionList>
        {connections.map((connection) => (
          <ConnectionItem key={connection.userId}>
            {renderAvatar(connection)}
            <ConnectionName>{connection.nickName}</ConnectionName>
          </ConnectionItem>
        ))}
      </ConnectionList>
    </>
  );
};

export default ConnectionsSection;
