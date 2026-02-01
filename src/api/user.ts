import type { ReviewListResponse, UserProfileDTO } from "./types";

// 사용자 프로필 조회 (Mock)
export async function fetchUserProfile(userId: string): Promise<UserProfileDTO> {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay

    return {
        userId: Number(userId),
        nickName: "Jisu",
        profileImageUrl: "https://i.pravatar.cc/300?img=5",
        about:
            "안녕하세요! 여행과 새로운 만남을 좋아하는 Jisu입니다. 서울에서 그래픽 디자이너로 일하고 있어요. 제가 머무는 공간이 여러분에게 편안한 휴식처가 되길 바랍니다.",
        joinedDate: "2023-01-15",
        isVerified: true,
        isSuperhost: true,
        listingsCount: 3,
        reviewCount: 48,
        averageRating: 4.88,
        location: "서울, 대한민국",
        work: "그래픽 디자이너",
        languages: ["한국어", "English"],
    };
}

// 사용자 리뷰 조회 (Mock)
export async function fetchUserReviews(userId: string): Promise<ReviewListResponse> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    return {
        summary: {
            average: 4.88,
            count: 48,
        },
        breakdown: {
            cleanliness: 4.9,
            accuracy: 4.8,
            communication: 5.0,
            location: 4.7,
            checkIn: 5.0,
            value: 4.8,
        },
        reviews: Array.from({ length: 8 }).map((_, i) => ({
            reviewId: i + 1,
            author: {
                userId: 1000 + i,
                nickName: `Guest ${i + 1}`,
                profileImageUrl: `https://i.pravatar.cc/150?img=${10 + i}`,
            },
            rating: 5,
            content:
                i % 2 === 0
                    ? "정말 멋진 숙소였습니다! 호스트분도 너무 친절하시고, 위치도 완벽했어요. 다음에도 또 방문하고 싶습니다."
                    : "사진보다 훨씬 넓고 깨끗했습니다. 인테리어 감각이 뛰어나서 머무는 내내 기분이 좋았어요.",
            createdAt: `2024-03-${10 + i}`,
            accommodationId: 200 + i,
            accommodationName: i % 2 === 0 ? "강남 스튜디오" : "홍대 루프탑 하우스",
        })),
    };
}
