import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { fetchUserBookings, fetchHostBookings } from '@/api/booking';
import {
  fetchAccommodationReviews,
  writeAccommodationReview,
  writeUserReview,
} from '@/api/review';
import { fetchUserReviews } from '@/api/user';
import { fetchAccommodationDetail } from '@/api/accommodation';
import type {
  BookingResponse,
  AccommodationReviewRequest,
  ReviewDTO,
  HostBookingListItemResponse,
  UserReviewCreateRequest,
} from '@/api/types';
import ReviewFormModal from '@/components/reviews/ReviewFormModal';
import GuestReviewModal from '@/components/reviews/GuestReviewModal';
import ReviewItem from '@/components/reviews/ReviewItem';
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
  ReviewList,
  ReviewListItem,
  HostReviewListItem,
  BookingTitle,
  BookingDetails,
  GuestDetails,
  ActionButton,
  HostActionButton,
  StatusText,
  ReviewItemContainer,
} from './reviews.styles';

type TabKey = 'about-me' | 'by-me';

const ReviewsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabKey>('by-me');

  // Data States
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [writtenReviewBookingIds, setWrittenReviewBookingIds] = useState<
    Set<number>
  >(new Set());
  const [aboutMeReviews, setAboutMeReviews] = useState<ReviewDTO[]>([]);
  const [hostBookings, setHostBookings] = useState<
    HostBookingListItemResponse[]
  >([]);
  const [accommodationNames, setAccommodationNames] = useState<
    Record<number, string>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  const isHost = user?.role === 'HOST';

  // Modal State
  const [reviewModalTarget, setReviewModalTarget] = useState<number | null>(
    null,
  );
  const [guestReviewModalTarget, setGuestReviewModalTarget] = useState<{
    bookingId: number;
    guestId: number;
  } | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    loadData();
  }, [user?.id, activeTab]);

  const loadData = async () => {
    if (!user?.id) return;
    try {
      setIsLoading(true);
      if (activeTab === 'by-me') {
        // 1. 내 전체 예약 목록 로드
        const allBookings = await fetchUserBookings();
        setBookings(allBookings);

        // 2. 예약된 숙소(accId) 추출 및 중복 제거
        const accIds = [...new Set(allBookings.map((b) => b.accommodationId))];

        // 3. 해당 숙소들의 리뷰 목록을 병렬로 조회
        const reviewsPromises = accIds.map((accId) =>
          fetchAccommodationReviews(accId),
        );
        const reviewsResults = await Promise.all(reviewsPromises);

        // 4. 내가 작성한 리뷰의 bookingId 추출
        const writtenBookingIds = new Set<number>();
        reviewsResults.flat().forEach((review) => {
          // 백엔드 명세상 리뷰에 bookingId가 존재함
          writtenBookingIds.add(review.bookingId);
        });

        // 5. 숙소 이름 조회를 위한 패치
        const newNames: Record<number, string> = {};
        const detailPromises = accIds.map(async (id) => {
          try {
            // fetchAccommodationDetail 내부에서 id를 문자열로 요구하는지 확인해야 하지만, number를 문자열로 치환.
            const detail = await fetchAccommodationDetail(String(id));
            newNames[id] = detail.title;
          } catch (e) {
            console.error(
              `Failed to fetch accommodation details for id: ${id}`,
              e,
            );
          }
        });
        await Promise.all(detailPromises);

        setAccommodationNames(newNames);
        setWrittenReviewBookingIds(writtenBookingIds);

        // 호스트인 경우 게스트 리뷰를 위해 hostBookings 도 추가 로드
        if (isHost) {
          try {
            const hBookings = await fetchHostBookings();
            setHostBookings(hBookings);
          } catch (err) {
            console.error('호스트 예약 정보 로드 실패:', err);
          }
        }
      } else {
        // 1. 나에게 달린 리뷰 목록 조회
        const res = await fetchUserReviews(String(user.id));
        // res.reviews 에 UserReviewDTO를 ReviewDTO로 매핑한 값이 들어있음
        setAboutMeReviews(res.reviews);
      }
    } catch (error) {
      console.error('데이터 로드 중 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReviewSubmit = async (data: AccommodationReviewRequest) => {
    await writeAccommodationReview(data);
    // 작성 완료 후 목록 재조회
    await loadData();
  };

  const handleGuestReviewSubmit = async (data: UserReviewCreateRequest) => {
    await writeUserReview(data);
    alert('게스트에 대한 리뷰 작성이 완료되었습니다.');
    await loadData();
  };

  const pendingBookings = (bookings || []).filter(
    (b) => !writtenReviewBookingIds.has(b.bookingId),
  );
  const writtenBookings = (bookings || []).filter((b) =>
    writtenReviewBookingIds.has(b.bookingId),
  );

  return (
    <PageContainer>
      <ContentWrapper>
        <Breadcrumb>
          <BreadcrumbLink onClick={() => navigate('/profile')}>
            프로필
          </BreadcrumbLink>
          <BreadcrumbSeparator>&gt;</BreadcrumbSeparator>
          <BreadcrumbCurrent>후기</BreadcrumbCurrent>
        </Breadcrumb>

        <PageTitle>
          {activeTab === 'by-me' ? '내가 작성한 후기' : '나에 대한 후기'}
        </PageTitle>

        <TabContainer>
          <Tab
            $active={activeTab === 'about-me'}
            onClick={() => setActiveTab('about-me')}
          >
            나에 대한 후기
          </Tab>
          <Tab
            $active={activeTab === 'by-me'}
            onClick={() => setActiveTab('by-me')}
          >
            내가 작성한 후기
          </Tab>
        </TabContainer>

        {activeTab === 'by-me' && (
          <>
            <SectionTitle>
              작성해야 할 후기 ({pendingBookings.length})
            </SectionTitle>
            {isLoading ? (
              <SectionDescription>불러오는 중...</SectionDescription>
            ) : pendingBookings.length === 0 ? (
              <SectionDescription>
                현재 작성할 후기가 없습니다. 여행을 한번 다녀올 때가 된 것
                같네요!
              </SectionDescription>
            ) : (
              <ReviewList>
                {pendingBookings.map((booking) => (
                  <ReviewListItem key={`pending-${booking.bookingId}`}>
                    <div>
                      <BookingTitle>
                        {accommodationNames[booking.accommodationId] ||
                          `숙소 ID: ${booking.accommodationId}`}
                      </BookingTitle>
                      <BookingDetails>
                        예약 번호: {booking.bookingId} | 일정:{' '}
                        {booking.checkInDate} ~ {booking.checkOutDate}
                      </BookingDetails>
                    </div>
                    <ActionButton
                      onClick={() => setReviewModalTarget(booking.bookingId)}
                    >
                      후기 작성
                    </ActionButton>
                  </ReviewListItem>
                ))}
              </ReviewList>
            )}

            <Divider />

            <SectionTitle>
              내가 작성한 후기 ({writtenBookings.length})
            </SectionTitle>
            {isLoading ? (
              <SectionDescription>불러오는 중...</SectionDescription>
            ) : writtenBookings.length === 0 ? (
              <SectionDescription>
                아직 후기를 남기지 않으셨습니다.
              </SectionDescription>
            ) : (
              <ReviewList>
                {writtenBookings.map((booking) => (
                  <ReviewListItem
                    key={`written-${booking.bookingId}`}
                    $isWritten
                  >
                    <div>
                      <BookingTitle>
                        {accommodationNames[booking.accommodationId] ||
                          `숙소 ID: ${booking.accommodationId}`}
                      </BookingTitle>
                      <BookingDetails>
                        예약 번호: {booking.bookingId} | 일정:{' '}
                        {booking.checkInDate} ~ {booking.checkOutDate}
                      </BookingDetails>
                      <StatusText>작성 완료</StatusText>
                    </div>
                  </ReviewListItem>
                ))}
              </ReviewList>
            )}

            {isHost && (
              <>
                <Divider />
                <SectionTitle>
                  내 숙소 방문 게스트 ({hostBookings.length})
                </SectionTitle>
                <SectionDescription>
                  게스트에 대한 리뷰를 작성해 보세요. 호스트 리뷰는 다른
                  호스트들에게 큰 도움이 됩니다.
                </SectionDescription>
                {hostBookings.length === 0 ? (
                  <SectionDescription>
                    아직 방문한 게스트가 없습니다.
                  </SectionDescription>
                ) : (
                  <ReviewList>
                    {hostBookings.map((b) => (
                      <HostReviewListItem key={`host-booking-${b.bookingId}`}>
                        <div>
                          <BookingTitle>
                            숙소: {b.accommodationTitle}
                          </BookingTitle>
                          <BookingDetails>
                            예약번호: {b.bookingId} | 일정: {b.checkInDate} ~{' '}
                            {b.checkOutDate}
                          </BookingDetails>
                          <GuestDetails>
                            방문 게스트 ID: {b.guestId} ({b.numberOfGuests}명)
                          </GuestDetails>
                        </div>
                        <HostActionButton
                          onClick={() =>
                            setGuestReviewModalTarget({
                              bookingId: b.bookingId,
                              guestId: b.guestId,
                            })
                          }
                        >
                          게스트 리뷰 작성
                        </HostActionButton>
                      </HostReviewListItem>
                    ))}
                  </ReviewList>
                )}
              </>
            )}
          </>
        )}

        {activeTab === 'about-me' && (
          <>
            <SectionTitle>
              나에 대한 후기 ({aboutMeReviews.length})
            </SectionTitle>
            {isLoading ? (
              <SectionDescription>불러오는 중...</SectionDescription>
            ) : aboutMeReviews.length === 0 ? (
              <SectionDescription>
                아직 받은 후기가 없습니다.
              </SectionDescription>
            ) : (
              <ReviewItemContainer>
                {aboutMeReviews.map((review, idx) => (
                  <ReviewItem key={idx} review={review} />
                ))}
              </ReviewItemContainer>
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

        {guestReviewModalTarget !== null && (
          <GuestReviewModal
            bookingId={guestReviewModalTarget.bookingId}
            guestId={guestReviewModalTarget.guestId}
            onClose={() => setGuestReviewModalTarget(null)}
            onSubmit={handleGuestReviewSubmit}
          />
        )}
      </ContentWrapper>
    </PageContainer>
  );
};

export default ReviewsPage;
