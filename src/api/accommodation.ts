import client from "./client";
import type {
  AccommodationDetailDTO,
  HostelReviewDTO,
  ReviewListResponse,
} from "./types";


// 숙소 상세 조회
export async function fetchAccommodationDetail(
  id: string
): Promise<AccommodationDetailDTO> {
  const data = await client.get<any, AccommodationDetailDTO>(
    `/api/accommodations/${id}`
  );
  return data;
}

// 숙소 리뷰 조회
export async function fetchAccommodationReviews(
  accId: string
): Promise<ReviewListResponse> {
  let reviewsToUse: HostelReviewDTO[] = [];

  // 더미 데이터 정의
  const MOCK_REVIEWS: HostelReviewDTO[] = Array.from({ length: 3 }).map((_, i) => ({
    id: 100 + i,
    bookingId: 200 + i,
    ratingOverall: 4.5 + (i * 0.1),
    ratingCleanliness: 5,
    ratingAccuracy: 4,
    ratingCheckin: 5,
    ratingCommunication: 5,
    ratingLocation: 4,
    reviewComment: `정말 멋진 숙소였습니다! (테스트 후기 ${i + 1})`,
    comment: null,
  }));

  try {
    // client.ts의 인터셉터가 response.data를 반환하므로, payload 자체가 배열임
    const reviews = await client.get<any, HostelReviewDTO[]>(
      `/api/review/hostel/${accId}`
    );

    if (Array.isArray(reviews)) {
      reviewsToUse = reviews;
    } else {
      console.warn("Expected array but got:", reviews);
      reviewsToUse = MOCK_REVIEWS; // 데이터 형식이 다르면 더미 사용
    }
  } catch (error) {
    console.error("Failed to fetch reviews (using mock data):", error);
    reviewsToUse = MOCK_REVIEWS; // 에러(401 등) 발생 시 더미 사용
  }

  const count = reviewsToUse.length;
  // 단일 reduce로 모든 항목의 합계 계산
  const sums = reviewsToUse.reduce(
    (acc, r) => ({
      overall: acc.overall + Number(r.ratingOverall || 0),
      cleanliness: acc.cleanliness + Number(r.ratingCleanliness || 0),
      accuracy: acc.accuracy + Number(r.ratingAccuracy || 0),
      communication: acc.communication + Number(r.ratingCommunication || 0),
      location: acc.location + Number(r.ratingLocation || 0),
      checkIn: acc.checkIn + Number(r.ratingCheckin || 0),
    }),
    {
      overall: 0,
      cleanliness: 0,
      accuracy: 0,
      communication: 0,
      location: 0,
      checkIn: 0,
    }
  );

  const average = count > 0 ? sums.overall / count : 0;

  // 항목별 평균 계산
  const breakdown = {
    cleanliness: count > 0 ? sums.cleanliness / count : 0,
    accuracy: count > 0 ? sums.accuracy / count : 0,
    communication: count > 0 ? sums.communication / count : 0,
    location: count > 0 ? sums.location / count : 0,
    checkIn: count > 0 ? sums.checkIn / count : 0,
    value: average,
  };

  return {
    summary: { average, count },
    breakdown,
    reviews: reviewsToUse.map((r) => ({
      reviewId: r.id,
      author: {
        userId: 0,
        nickName: `게스트 ${r.id}`,
        profileImageUrl: `https://i.pravatar.cc/150?u=${r.id}`,
      },
      rating: Number(r.ratingOverall),
      content: r.reviewComment,
      createdAt: "2024-02-02",
      reply: r.comment,
    })),
  };
}
