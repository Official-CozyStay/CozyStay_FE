import styled from 'styled-components';
import type { PublicUserProfileResponse } from '../../../api/types';
import { CheckCircle } from 'lucide-react';

interface Props {
  user: PublicUserProfileResponse;
}

export default function UserProfileCard({ user }: Props) {
  return (
    <Card>
      <ProfileImageWrapper>
        <ProfileImage
          src={user.profileImageUrl || 'https://via.placeholder.com/150'}
          alt={user.nickName}
        />
      </ProfileImageWrapper>

      <Stats>
        <StatItem>
          <h3>{user.reviewCount}</h3>
          <span>후기</span>
        </StatItem>
        <Divider />
        <StatItem>
          <h3>{user.grade}</h3>
          <span>등급</span>
        </StatItem>
      </Stats>

      <Section>
        <SectionTitle>인증 완료</SectionTitle>
        <VerificationList>
          <VerificationItem>
            <CheckCircle size={18} />
            <span>본인 인증 완료</span>
          </VerificationItem>
          <VerificationItem>
            <CheckCircle size={18} />
            <span>이메일 주소</span>
          </VerificationItem>
        </VerificationList>
      </Section>
    </Card>
  );
}

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.common.white};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  justify-content: center;
`;

const StatItem = styled.div`
  text-align: center;

  h3 {
    margin: 0;
    font-size: ${({ theme }) => theme.font.size.xl};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  span {
    font-size: ${({ theme }) => theme.font.size.xs};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 40px;
  background: ${({ theme }) => theme.colors.border.light};
`;

const Section = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  padding-top: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.h4`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.font.size.lg};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const VerificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const VerificationItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.size.md};

  svg {
    color: ${({ theme }) => theme.colors.status.success};
  }
`;
