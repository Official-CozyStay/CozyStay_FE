import client from "./client";
import type {
    AccommodationReviewRequest,
    AccommodationReviewResponse,
    UserReviewCreateRequest,
    UserReviewDTO,
} from "./types";

/**
 * 특정 숙소의 리뷰 목록 조회
 */
export async function fetchAccommodationReviews(
    accId: number
): Promise<AccommodationReviewResponse[]> {
    const response = await client.get(
        `/api/review/accommodation/${accId}`
    ) as AccommodationReviewResponse[];
    return response;
}

/**
 * (게스트 -> 숙소) 리뷰 작성
 */
export async function writeAccommodationReview(
    data: AccommodationReviewRequest
): Promise<AccommodationReviewResponse> {
    const response = await client.post(
        "/api/review/accommodation",
        data
    ) as AccommodationReviewResponse;
    return response;
}

/**
 * 호스트 -> 게스트 리뷰 작성
 */
export async function writeUserReview(
    data: UserReviewCreateRequest
): Promise<UserReviewDTO> {
    const response = await client.post(
        "/api/review/users",
        data
    ) as UserReviewDTO;
    return response;
}
