import styled from 'styled-components';
import type { ReviewDTO } from '../../api/types';
import { Star } from 'lucide-react';
import ReviewReply from './ReviewReply';

interface ReviewItemProps {
  review: ReviewDTO;
  showAccommodationName?: boolean; // For user profile page, show which accommodation was reviewed
}

export default function ReviewItem({
  review,
  showAccommodationName = false,
}: ReviewItemProps) {
  const authorName = review.author?.nickName || '익명';
  const profileImage =
    review.author?.profileImageUrl || 'https://via.placeholder.com/48';
  const subInfoParts = [
    review.createdAt?.trim(),
    showAccommodationName ? review.accommodationName : undefined,
  ].filter(Boolean) as string[];

  return (
    <Container>
      <Header>
        <Avatar src={profileImage} alt={authorName} />
        <Meta>
          <Author>{authorName}</Author>
          {subInfoParts.length > 0 && (
            <SubInfo>{subInfoParts.join(' · ')}</SubInfo>
          )}
        </Meta>
      </Header>

      <Rating>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            fill={i < review.rating ? 'currentColor' : 'none'}
            className={i < review.rating ? 'active' : 'inactive'}
          />
        ))}
      </Rating>

      <Content>{review.content}</Content>

      {review.reply && <ReviewReply reply={review.reply} />}
    </Container>
  );
}

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  &:last-child {
    border-bottom: none;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.background.active};
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
`;

const Author = styled.div`
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 2px;
`;

const SubInfo = styled.div`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Rating = styled.div`
  display: flex;
  gap: 2px;
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
  color: ${({ theme }) => theme.colors.text.primary};

  .active {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  .inactive {
    color: ${({ theme }) => theme.colors.border.primary};
  }
`;

const Content = styled.p`
  margin: 0;
  line-height: ${({ theme }) => theme.font.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.size.md};
  white-space: pre-wrap;
`;
