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
  // 실제 연동 (추측 베이스 URL이 다르거나 엔드포인트가 다를 수 있음)
  const data = await client.get<any, AccommodationDetailDTO>(
    `/api/accommodations/${id}`
  );
  return data;
}

// 숙소 리뷰 조회
export async function fetchAccommodationReviews(
  id: string
): Promise<ReviewListResponse> {
  const reviews = await client.get<any, HostelReviewDTO[]>(
    `/api/review/hostel/${id}`
  );

  // 백엔드 데이터를 UI 타입으로 매핑
  const count = reviews.length;
  const average =
    count > 0
      ? reviews.reduce((acc, r) => acc + r.ratingOverall, 0) / count
      : 0;

  // 항목별 평균 계산
  const breakdown = {
    cleanliness: reviews.reduce((acc, r) => acc + r.ratingCleanliness, 0) / count || 0,
    accuracy: reviews.reduce((acc, r) => acc + r.ratingAccuracy, 0) / count || 0,
    communication: reviews.reduce((acc, r) => acc + r.ratingCommunication, 0) / count || 0,
    location: reviews.reduce((acc, r) => acc + r.ratingLocation, 0) / count || 0,
    checkIn: reviews.reduce((acc, r) => acc + r.ratingCheckin, 0) / count || 0,
    value: average, // 백엔드에 value(가성비) 항목이 없어서 전체 평점으로 대체
  };

  return {
    summary: { average, count },
    breakdown,
    reviews: reviews.map((r) => ({
      reviewId: r.id,
      author: r.author || {
        userId: 0,
        nickName: "알 수 없는 사용자",
        profileImageUrl: null,
      },
      rating: r.ratingOverall,
      content: r.reviewComment,
      createdAt: "2024-01-01", // 백엔드 응답에 날짜가 없어서 임시 처리
    })),
  };
}
