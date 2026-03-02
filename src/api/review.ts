import client from "./client";
import type {
    AccommodationReviewRequest,
    AccommodationReviewResponse,
} from "./types";

/**
 * 특정 숙소의 리뷰 목록 조회
 */
export async function fetchAccommodationReviews(
    accId: number
): Promise<AccommodationReviewResponse[]> {
    const response = await client.get<AccommodationReviewResponse[]>(
        `/api/review/accommodation/${accId}`
    );
    return response.data;
}

/**
 * (게스트 -> 숙소) 리뷰 작성
 */
export async function writeAccommodationReview(
    data: AccommodationReviewRequest
): Promise<AccommodationReviewResponse> {
    const response = await client.post<AccommodationReviewResponse>(
        "/api/review/accommodation",
        data
    );
    return response.data;
}
