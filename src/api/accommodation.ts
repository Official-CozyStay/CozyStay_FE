import type { AccommodationDetailDTO } from "./types";

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
      profileImageUrl: null,
    },
  };
}
