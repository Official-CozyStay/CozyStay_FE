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
    const response = await client.get<AccommodationReviewResponse[]>(
        `/api/review/accommodation/${accId}`
    ) as unknown as AccommodationReviewResponse[];
    return response;
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
    ) as unknown as AccommodationReviewResponse;
    return response;
}

/**
 * 호스트 -> 게스트 리뷰 작성
 */
export async function writeUserReview(
    data: UserReviewCreateRequest
): Promise<UserReviewDTO> {
    const response = await client.post<UserReviewDTO>(
        "/api/review/users",
        data
    ) as unknown as UserReviewDTO;
    return response;
}
