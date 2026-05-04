import client from './client';
import type {
  ApiResponse,
  MyProfileResponse,
  PublicUserProfileResponse,
  ReviewListResponse,
  UpdateMyProfileRequest,
  UserReviewDTO,
} from './types';

// 사용자 공개 프로필 조회
export async function fetchUserProfile(
  userId: string,
): Promise<PublicUserProfileResponse> {
  // 입력값 검증: 숫자만 포함되어 있는지 확인 (Path Traversal 방지)
  if (!userId || !/^\d+$/.test(userId)) {
    throw new Error(`Invalid userId format: ${userId}`);
  }

  const response = (await client.get(
    `/api/users/${userId}/public-profile`,
  )) as ApiResponse<PublicUserProfileResponse>;
  return response.data;
}

// 사용자 리뷰 조회 (호스트가 게스트에게 남긴 리뷰)
export async function fetchUserReviews(
  userId: string,
): Promise<ReviewListResponse> {
  if (!userId || !/^\d+$/.test(userId)) {
    console.error(`Invalid userId format: ${userId}`);
    return {
      summary: { average: 0, count: 0 },
      reviews: [],
    };
  }

  try {
    const reviews = (await client.get(
      `/api/review/users/${userId}`,
    )) as UserReviewDTO[];

    const count = reviews.length;
    const average =
      count > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / count : 0;

    return {
      summary: { average, count },
      reviews: reviews.map((r) => ({
        reviewId: r.id || r.bookingId, // 백엔드 리뷰 DTO에 별도 ID가 없어 우선 bookingId 사용
        author: {
          userId: 0,
          nickName: r.userNickName || '익명 사용자',
          profileImageUrl: r.userProfileImageUrl || null,
        },
        rating: r.rating,
        content: r.reviewComment,
        createdAt: '2024-01-01',
        reply: r.comment,
      })),
    };
  } catch (error) {
    console.error('Failed to fetch user reviews:', error);
    return {
      summary: { average: 0, count: 0 },
      reviews: [],
    };
  }
}

// 내 프로필 수정
export async function updateMyProfile(
  data: UpdateMyProfileRequest,
): Promise<MyProfileResponse> {
  const response = (await client.patch(
    '/api/users/me/profile',
    data,
  )) as ApiResponse<MyProfileResponse>;
  return response.data;
}
