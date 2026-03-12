import styled from 'styled-components';
import type { ReviewListResponse } from '../../../api/types';
import ReviewRatingBreakdown from '../../../components/reviews/ReviewRatingBreakdown';
import ReviewItem from '../../../components/reviews/ReviewItem';
import { media } from '../../../styles/media';

interface Props {
  reviews: ReviewListResponse;
}

export default function ReviewSection({ reviews }: Props) {
  return (
    <Container id="reviews">
      <Header>
        <Title>
          ★ {reviews.summary.average.toFixed(2)} · 후기 {reviews.summary.count}
          개
        </Title>
      </Header>

      {reviews.breakdown && (
        <BreakdownWrapper>
          <ReviewRatingBreakdown data={reviews.breakdown} />
        </BreakdownWrapper>
      )}

      <ReviewGrid>
        {reviews.reviews.map((review) => (
          <ReviewItem key={review.reviewId} review={review} />
        ))}
      </ReviewGrid>
    </Container>
  );
}

const Container = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const BreakdownWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 80px;
  row-gap: ${({ theme }) => theme.spacing.lg};

  ${media.tablet} {
    grid-template-columns: 1fr;
    column-gap: 0;
  }
`;
