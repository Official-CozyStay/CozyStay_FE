import type { AccommodationDetailDTO, ReviewListResponse } from "./types";

// 숙소 상세 조회 (현재 : 목업)
export async function fetchAccommodationDetail(
  id: string
): Promise<AccommodationDetailDTO> {
  // 임시 목업
  await new Promise((r) => setTimeout(r, 300)); // 로딩 지연 시뮬
  return {
    // AccommodationDetailDTO 형태의 객체 반환
    // 실제 연동 시 :
    // const { data } = await axios.get(`/accommodations/${id}`);
    // return data;
    accommodationId: Number(id),
    hostId: 101,
    title: "한강 뷰 모던 스튜디오",
    description:
      "한강이 내려다보이는 모던 스튜디오입니다. 2호선 역 5분 거리, 와이파이와 넷플릭스를 제공합니다. 넓은 창과 조용한 분위기로 휴식을 즐기세요.",
    accommodationType: "entire_place",
    address: "서울 영등포구 여의대로 50",
    city: "서울",
    state: null,
    country: "대한민국",
    postalCode: "07200",
    latitude: 37.525,
    longitude: 126.925,
    maxGuests: 4,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    pricePerNight: 158000,
    cleaningFee: 20000,
    serviceFeePercentage: 12,
    instantBooking: true,
    checkInTime: "15:00:00",
    checkOutTime: "11:00:00",
    images: [
      {
        imageId: 1,
        imageUrl: "https://picsum.photos/seed/accommodation1/1200/800",
        isPrimary: true,
        displayOrder: 0,
      },
      {
        imageId: 2,
        imageUrl: "https://picsum.photos/seed/accommodation2/800/800",
        isPrimary: false,
        displayOrder: 1,
      },
      {
        imageId: 3,
        imageUrl: "https://picsum.photos/seed/accommodation3/800/800",
        isPrimary: false,
        displayOrder: 2,
      },
      {
        imageId: 4,
        imageUrl: "https://picsum.photos/seed/accommodation4/800/800",
        isPrimary: false,
        displayOrder: 3,
      },
    ],
    amenities: [
      { amenityId: 1, name: "무선 인터넷" },
      { amenityId: 2, name: "에어컨" },
      { amenityId: 3, name: "주방" },
      { amenityId: 4, name: "세탁기" },
    ],
    reviewSummary: {
      average: 4.87,
      count: 126,
    },
    host: {
      userId: 101,
      nickName: "Jisu",
      profileImageUrl: "https://i.pravatar.cc/300?img=5",
    },
  };
}

// 숙소 리뷰 조회 (Mock)
export async function fetchAccommodationReviews(
  id: string
): Promise<ReviewListResponse> {
  await new Promise((r) => setTimeout(r, 400));
  return {
    summary: {
      average: 4.87,
      count: 126,
    },
    breakdown: {
      cleanliness: 4.9,
      accuracy: 4.8,
      communication: 4.9,
      location: 4.5,
      checkIn: 5.0,
      value: 4.7,
    },
    reviews: Array.from({ length: 10 }).map((_, i) => ({
      reviewId: i + 100,
      author: {
        userId: 2000 + i,
        nickName: `Traveler ${i + 1}`,
        profileImageUrl: `https://i.pravatar.cc/150?img=${30 + i}`,
      },
      rating: 5,
      content:
        i % 2 === 0
          ? "뷰가 정말 끝내줍니다! 야경 보면서 와인 한잔하기 딱 좋아요."
          : "침구가 너무 편해서 꿀잠 잤습니다. 청결 상태도 최상이었어요.",
      createdAt: `2024-02-${10 + (i % 20)}`,
      accommodationId: Number(id),
    })),
  };
}
