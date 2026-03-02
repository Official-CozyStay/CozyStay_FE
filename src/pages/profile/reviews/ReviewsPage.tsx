import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SimpleHeader from "@/components/SimpleHeader";
import { useAuth } from "@/contexts/AuthContext";
import { fetchUserBookings } from "@/api/booking";
import { fetchAccommodationReviews, writeAccommodationReview } from "@/api/review";
import { fetchUserReviews } from "@/api/user";
import type { BookingResponse, AccommodationReviewRequest, UserReviewDTO } from "@/api/types";
import ReviewFormModal from "@/components/reviews/ReviewFormModal";
import ReviewItem from "@/components/reviews/ReviewItem";
import {
  PageContainer,
  ContentWrapper,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbCurrent,
  PageTitle,
  TabContainer,
  Tab,
  SectionTitle,
  SectionDescription,
  Divider,
} from "./reviews.styles";

type TabKey = "about-me" | "by-me";

const ReviewsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabKey>("by-me");

  // Data States
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [writtenReviewBookingIds, setWrittenReviewBookingIds] = useState<Set<number>>(new Set());
  const [aboutMeReviews, setAboutMeReviews] = useState<UserReviewDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Modal State
  const [reviewModalTarget, setReviewModalTarget] = useState<number | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    loadData();
  }, [user?.id, activeTab]);

  const loadData = async () => {
    if (!user?.id) return;
    try {
      setIsLoading(true);
      if (activeTab === "by-me") {
        // 1. 내 전체 예약 목록 로드
        const allBookings = await fetchUserBookings();
        setBookings(allBookings);

        // 2. 예약된 숙소(accId) 추출 및 중복 제거
        const accIds = [...new Set(allBookings.map(b => b.accommodationId))];

        // 3. 해당 숙소들의 리뷰 목록을 병렬로 조회
        const reviewsPromises = accIds.map(accId => fetchAccommodationReviews(accId));
        const reviewsResults = await Promise.all(reviewsPromises);

        // 4. 내가 작성한 리뷰의 bookingId 추출
        const writtenBookingIds = new Set<number>();
        reviewsResults.flat().forEach(review => {
          // 백엔드 명세상 리뷰에 bookingId가 존재함
          writtenBookingIds.add(review.bookingId);
        });

        setWrittenReviewBookingIds(writtenBookingIds);
      } else {
        // 1. 나에게 달린 리뷰 목록 조회
        const res = await fetchUserReviews(String(user.id));
        // res.reviews 에 UserReviewDTO를 ReviewDTO로 매핑한 값이 들어있음
        // 여기서는 임시 렌더링을 위해 간단히 타입 무시 캐스팅 후 저장
        setAboutMeReviews(res.reviews as any);
      }
    } catch (error) {
      console.error("데이터 로드 중 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReviewSubmit = async (data: AccommodationReviewRequest) => {
    await writeAccommodationReview(data);
    // 작성 완료 후 목록 재조회
    await loadData();
  };

  const pendingBookings = bookings.filter(b => !writtenReviewBookingIds.has(b.bookingId));
  const writtenBookings = bookings.filter(b => writtenReviewBookingIds.has(b.bookingId));


  return (
    <PageContainer>
      <SimpleHeader />

      <ContentWrapper>
        <Breadcrumb>
          <BreadcrumbLink onClick={() => navigate("/profile")}>
            프로필
          </BreadcrumbLink>
          <BreadcrumbSeparator>&gt;</BreadcrumbSeparator>
          <BreadcrumbCurrent>후기</BreadcrumbCurrent>
        </Breadcrumb>

        <PageTitle>{activeTab === "by-me" ? "내가 작성한 후기" : "나에 대한 후기"}</PageTitle>

        <TabContainer>
          <Tab
            $active={activeTab === "about-me"}
            onClick={() => setActiveTab("about-me")}
          >
            나에 대한 후기
          </Tab>
          <Tab
            $active={activeTab === "by-me"}
            onClick={() => setActiveTab("by-me")}
          >
            내가 작성한 후기
          </Tab>
        </TabContainer>

        {activeTab === "by-me" && (
          <>
            <SectionTitle>작성해야 할 후기 ({pendingBookings.length})</SectionTitle>
            {isLoading ? (
              <SectionDescription>불러오는 중...</SectionDescription>
            ) : pendingBookings.length === 0 ? (
              <SectionDescription>
                현재 작성할 후기가 없습니다. 여행을 한번 다녀올 때가 된 것 같네요!
              </SectionDescription>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {pendingBookings.map(booking => (
                  <li key={`pending-${booking.bookingId}`} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px', marginBottom: '12px' }}>
                    <div>
                      <strong>예약 번호: {booking.bookingId}</strong>
                      <p style={{ margin: '4px 0 0', color: '#666', fontSize: '14px' }}>
                        일정: {booking.checkInDate} ~ {booking.checkOutDate}
                      </p>
                    </div>
                    <button
                      onClick={() => setReviewModalTarget(booking.bookingId)}
                      style={{ padding: '8px 16px', cursor: 'pointer', background: '#345342', color: 'white', border: 'none', borderRadius: '4px' }}>
                      후기 작성
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <Divider />

            <SectionTitle>내가 작성한 후기 ({writtenBookings.length})</SectionTitle>
            {isLoading ? (
              <SectionDescription>불러오는 중...</SectionDescription>
            ) : writtenBookings.length === 0 ? (
              <SectionDescription>
                아직 후기를 남기지 않으셨습니다.
              </SectionDescription>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {writtenBookings.map(booking => (
                  <li key={`written-${booking.bookingId}`} style={{ padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px', marginBottom: '12px', background: '#f9f9f9' }}>
                    <div>
                      <strong>예약 번호: {booking.bookingId}</strong>
                      <p style={{ margin: '4px 0 0', color: '#666', fontSize: '14px' }}>
                        일정: {booking.checkInDate} ~ {booking.checkOutDate}
                      </p>
                      <span style={{ display: 'inline-block', marginTop: '8px', color: '#388e3c', fontSize: '14px', fontWeight: 'bold' }}>작성 완료</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {activeTab === "about-me" && (
          <>
            <SectionTitle>나에 대한 후기 ({aboutMeReviews.length})</SectionTitle>
            {isLoading ? (
              <SectionDescription>불러오는 중...</SectionDescription>
            ) : aboutMeReviews.length === 0 ? (
              <SectionDescription>
                아직 받은 후기가 없습니다.
              </SectionDescription>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
                {aboutMeReviews.map((review, idx) => (
                  <ReviewItem key={idx} review={review as any} />
                ))}
              </div>
            )}
          </>
        )}

        {reviewModalTarget !== null && (
          <ReviewFormModal
            bookingId={reviewModalTarget}
            onClose={() => setReviewModalTarget(null)}
            onSubmit={handleReviewSubmit}
          />
        )}
      </ContentWrapper>
    </PageContainer>
  );
};

export default ReviewsPage;
