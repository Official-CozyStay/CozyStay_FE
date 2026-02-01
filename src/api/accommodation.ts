import client from "./client";
import type {
  AccommodationDetailDTO,
  HostelReviewDTO,
  ReviewListResponse,
  ApiResponse,
} from "./types";
import { fetchComment } from "./comment";

// 숙소 상세 조회
export async function fetchAccommodationDetail(
  id: string
): Promise<AccommodationDetailDTO> {
  // 실제 연동
  const data = await client.get<any, AccommodationDetailDTO>(
    `/api/accommodations/${id}`
  );
  return data;
}

// 숙소 리뷰 조회
export async function fetchAccommodationReviews(
  accId: string
): Promise<ReviewListResponse> {
  // client.ts의 인터셉터가 response.data를 반환하므로, payload 자체가 배열임
  const reviews = await client.get<any, HostelReviewDTO[]>(
    `/api/review/hostel/${accId}`
  );

  if (!Array.isArray(reviews)) {
    console.error("Expected array but got:", reviews);
    return { summary: { average: 0, count: 0 }, reviews: [] };
  }

  const count = reviews.length;
  // ratingOverall은 BigDecimal로 넘어오므로 숫자 취급 (JS/TS에서는 자동으로 숫자 혹은 문자열)
  // 안전하게 Number() 변환 권장
  const average =
    count > 0
      ? reviews.reduce((acc, r) => acc + Number(r.ratingOverall), 0) / count
      : 0;

  // 항목별 평균 계산
  const breakdown = {
    cleanliness: reviews.reduce((acc, r) => acc + Number(r.ratingCleanliness || 0), 0) / count || 0,
    accuracy: reviews.reduce((acc, r) => acc + Number(r.ratingAccuracy || 0), 0) / count || 0,
    communication: reviews.reduce((acc, r) => acc + Number(r.ratingCommunication || 0), 0) / count || 0,
    location: reviews.reduce((acc, r) => acc + Number(r.ratingLocation || 0), 0) / count || 0,
    checkIn: reviews.reduce((acc, r) => acc + Number(r.ratingCheckin || 0), 0) / count || 0,
    value: average,
  };

  return {
    summary: { average, count },
    breakdown,
    reviews: reviews.map((r) => ({
      reviewId: r.id,
      author: {
        userId: 0, // 백엔드 DTO에 사용자 정보가 아직 없음
        nickName: "알 수 없는 사용자",
        profileImageUrl: null,
      },
      rating: Number(r.ratingOverall),
      content: r.reviewComment,
      createdAt: "2024-01-01",
      reply: r.comment,
    })),
  };
}
