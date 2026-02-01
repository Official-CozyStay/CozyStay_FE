import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchUserProfile, fetchUserReviews } from "../../api/user";
import type { ReviewListResponse, UserProfileDTO } from "../../api/types";
import UserProfileCard from "./components/UserProfileCard";
import ReviewRatingBreakdown from "../../components/reviews/ReviewRatingBreakdown";
import ReviewItem from "../../components/reviews/ReviewItem";
import { media } from "../../styles/media";

export default function UserPage() {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<UserProfileDTO | null>(null);
    const [reviews, setReviews] = useState<ReviewListResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            if (!id) return;
            try {
                setLoading(true);
                const [userData, reviewData] = await Promise.all([
                    fetchUserProfile(id),
                    fetchUserReviews(id),
                ]);
                setUser(userData);
                setReviews(reviewData);
            } catch (error) {
                console.error("Failed to fetch user data", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [id]);

    if (loading) return <Container>Loading...</Container>;
    if (!user) return <Container>User not found</Container>;

    return (
        <Container>
            <Layout>
                <Sidebar>
                    <UserProfileCard user={user} />
                </Sidebar>

                <Main>
                    <Section>
                        <H1>안녕하세요, 저는 {user.nickName}입니다.</H1>
                        <JoinDate>회원 가입: {user.joinedDate.split("-")[0]}년</JoinDate>

                        {user.about && (
                            <About>
                                <SectionTitle>소개</SectionTitle>
                                <p>{user.about}</p>
                                <MetaList>
                                    {user.location && <li>거주지: {user.location}</li>}
                                    {user.work && <li>직업: {user.work}</li>}
                                    {user.languages && (
                                        <li>구사 언어: {user.languages.join(", ")}</li>
                                    )}
                                </MetaList>
                            </About>
                        )}
                    </Section>

                    {reviews && (
                        <Section>
                            <ReviewHeader>
                                <SectionTitle>
                                    ★ {reviews.summary.average.toFixed(2)} 후기 {reviews.summary.count}개
                                </SectionTitle>
                            </ReviewHeader>

                            {reviews.breakdown && (
                                <BreakdownWrapper>
                                    <ReviewRatingBreakdown data={reviews.breakdown} />
                                </BreakdownWrapper>
                            )}

                            <ReviewList>
                                {reviews.reviews.map((review) => (
                                    <ReviewItem
                                        key={review.reviewId}
                                        review={review}
                                        showAccommodationName
                                    />
                                ))}
                            </ReviewList>
                        </Section>
                    )}
                </Main>
            </Layout>
        </Container>
    );
}

const Container = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 80px;

  ${media.tablet} {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const Sidebar = styled.aside``;

const Main = styled.main``;

const Section = styled.div`
  margin-bottom: 48px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  padding-bottom: 48px;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const H1 = styled.h1`
  font-size: ${({ theme }) => theme.font.size.xxl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const JoinDate = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.font.size.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const About = styled.div`
  p {
    font-size: ${({ theme }) => theme.font.size.md};
    line-height: ${({ theme }) => theme.font.lineHeight.relaxed};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const MetaList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  
  li {
    font-size: ${({ theme }) => theme.font.size.md};
  }
`;

const ReviewHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const BreakdownWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background.default};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
`;
