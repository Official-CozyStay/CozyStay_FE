import type { Accommodation } from "@/types/accommodation";

// 날짜 문자열을 Date 객체로 변환하는 헬퍼 함수
const parseDateRange = (dateStr: string): { start: Date; end: Date } => {
  // "2월 6일~8일" 형식을 파싱
  const match = dateStr.match(/(\d+)월\s*(\d+)일~(\d+)일/);
  if (!match) {
    // "2월 6일~3월 8일" 형식도 처리
    const match2 = dateStr.match(/(\d+)월\s*(\d+)일~(\d+)월\s*(\d+)일/);
    if (match2) {
      const startMonth = parseInt(match2[1], 10) - 1; // 0-based
      const startDay = parseInt(match2[2], 10);
      const endMonth = parseInt(match2[3], 10) - 1;
      const endDay = parseInt(match2[4], 10);
      const currentYear = new Date().getFullYear();
      return {
        start: new Date(currentYear, startMonth, startDay),
        end: new Date(currentYear, endMonth, endDay),
      };
    }
    // 기본값 반환
    const now = new Date();
    return { start: now, end: now };
  }

  const month = parseInt(match[1], 10) - 1; // 0-based
  const startDay = parseInt(match[2], 10);
  const endDay = parseInt(match[3], 10);
  const currentYear = new Date().getFullYear();

  return {
    start: new Date(currentYear, month, startDay),
    end: new Date(currentYear, month, endDay),
  };
};

// 가격 문자열에서 숫자만 추출
const parsePrice = (priceStr: string): number => {
  return parseInt(priceStr.replace(/[₩,]/g, ""), 10);
};

// 박수 문자열에서 숫자만 추출
const parseNights = (nightsStr: string): number => {
  return parseInt(nightsStr.replace("박", ""), 10);
};

// TODO: 임시 데이터 (나중에 API로 대체)
export const mockAccommodations: Accommodation[] = [
  {
    id: 1,
    image: "https://picsum.photos/seed/room1/400/300",
    badge: "게스트 선호",
    title: "서울의 집",
    date: parseDateRange("2월 6일~8일"),
    price: parsePrice("₩256,080"),
    nights: parseNights("2박"),
    rating: 5.0,
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/room2/400/300",
    badge: "게스트 선호",
    title: "서울의 방",
    date: parseDateRange("1월 9일~11일"),
    price: parsePrice("₩136,941"),
    nights: parseNights("2박"),
    rating: 4.91,
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/room3/400/300",
    badge: "게스트 선호",
    title: "서울의 방",
    date: parseDateRange("11월 21일~23일"),
    price: parsePrice("₩102,706"),
    nights: parseNights("2박"),
    rating: 4.89,
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/room4/400/300",
    badge: "게스트 선호",
    title: "서울의 방",
    date: parseDateRange("1월 9일~11일"),
    price: parsePrice("₩121,649"),
    nights: parseNights("2박"),
    rating: 4.94,
  },
  {
    id: 5,
    image: "https://picsum.photos/seed/room5/400/300",
    badge: "게스트 선호",
    title: "서울의 방",
    date: parseDateRange("3월 13일~15일"),
    price: parsePrice("₩75,318"),
    nights: parseNights("2박"),
    rating: 4.88,
  },
  {
    id: 6,
    image: "https://picsum.photos/seed/room6/400/300",
    badge: "게스트 선호",
    title: "마포구의 집",
    date: parseDateRange("4월 17일~19일"),
    price: parsePrice("₩294,424"),
    nights: parseNights("2박"),
    rating: 4.96,
  },
];

export const busanAccommodations: Accommodation[] = [
  {
    id: 7,
    image: "https://picsum.photos/seed/busan1/400/300",
    badge: "게스트 선호",
    title: "부산의 아파트",
    date: parseDateRange("11월 21일~23일"),
    price: parsePrice("₩180,000"),
    nights: parseNights("2박"),
    rating: 4.85,
  },
  {
    id: 8,
    image: "https://picsum.photos/seed/busan2/400/300",
    badge: "게스트 선호",
    title: "Yeonje-gu의 아파트",
    date: parseDateRange("11월 21일~23일"),
    price: parsePrice("₩165,000"),
    nights: parseNights("2박"),
    rating: 4.82,
  },
  {
    id: 9,
    image: "https://picsum.photos/seed/busan3/400/300",
    badge: "게스트 선호",
    title: "부산의 호텔",
    date: parseDateRange("11월 21일~23일"),
    price: parsePrice("₩220,000"),
    nights: parseNights("2박"),
    rating: 4.9,
  },
  {
    id: 10,
    image: "https://picsum.photos/seed/busan4/400/300",
    badge: "게스트 선호",
    title: "suyeong-gu의 아파트",
    date: parseDateRange("11월 21일~23일"),
    price: parsePrice("₩195,000"),
    nights: parseNights("2박"),
    rating: 4.87,
  },
  {
    id: 11,
    image: "https://picsum.photos/seed/busan5/400/300",
    badge: "게스트 선호",
    title: "부산의 아파트",
    date: parseDateRange("11월 21일~23일"),
    price: parsePrice("₩210,000"),
    nights: parseNights("2박"),
    rating: 4.83,
  },
  {
    id: 12,
    image: "https://picsum.photos/seed/busan6/400/300",
    badge: "게스트 선호",
    title: "오크홀름의 아파트",
    date: parseDateRange("11월 21일~23일"),
    price: parsePrice("₩175,000"),
    nights: parseNights("2박"),
    rating: 4.79,
  },
];

export const tokyoAccommodations: Accommodation[] = [
  {
    id: 13,
    image: "https://picsum.photos/seed/tokyo1/400/300",
    badge: "게스트 선호",
    title: "타이토구의 호텔 객실",
    date: parseDateRange("1월 2일~4일"),
    price: parsePrice("₩157,654"),
    nights: parseNights("2박"),
    rating: 4.89,
  },
  {
    id: 14,
    image: "https://picsum.photos/seed/tokyo2/400/300",
    badge: "게스트 선호",
    title: "스미다구의 방",
    date: parseDateRange("12월 19일~21일"),
    price: parsePrice("₩163,847"),
    nights: parseNights("2박"),
    rating: 4.91,
  },
  {
    id: 15,
    image: "https://picsum.photos/seed/tokyo3/400/300",
    badge: "게스트 선호",
    title: "도시마구의 아파트",
    date: parseDateRange("1월 23일~25일"),
    price: parsePrice("₩221,843"),
    nights: parseNights("2박"),
    rating: 5.0,
  },
  {
    id: 16,
    image: "https://picsum.photos/seed/tokyo4/400/300",
    badge: "게스트 선호",
    title: "타이토구의 오두막",
    date: parseDateRange("3월 20일~22일"),
    price: parsePrice("₩133,257"),
    nights: parseNights("2박"),
    rating: 4.81,
  },
  {
    id: 17,
    image: "https://picsum.photos/seed/tokyo5/400/300",
    badge: "게스트 선호",
    title: "도쿄의 호텔 객실",
    date: parseDateRange("1월 2일~4일"),
    price: parsePrice("₩73,196"),
    nights: parseNights("2박"),
    rating: 4.83,
  },
  {
    id: 18,
    image: "https://picsum.photos/seed/tokyo6/400/300",
    badge: "게스트 선호",
    title: "고토구의 방",
    date: parseDateRange("2월 13일~15일"),
    price: parsePrice("₩140,903"),
    nights: parseNights("2박"),
    rating: 4.94,
  },
];

export const osakaAccommodations: Accommodation[] = [
  {
    id: 19,
    image: "https://picsum.photos/seed/osaka1/400/300",
    badge: "게스트 선호",
    title: "말론키르멘스키의 아파트",
    date: parseDateRange("12월 19일~21일"),
    price: parsePrice("₩156,716"),
    nights: parseNights("2박"),
    rating: 4.79,
  },
  {
    id: 20,
    image: "https://picsum.photos/seed/osaka2/400/300",
    badge: "게스트 선호",
    title: "오사카시의 아파트",
    date: parseDateRange("12월 19일~21일"),
    price: parsePrice("₩210,207"),
    nights: parseNights("2박"),
    rating: 4.92,
  },
  {
    id: 21,
    image: "https://picsum.photos/seed/osaka3/400/300",
    badge: "게스트 선호",
    title: "오사카시의 아파트",
    date: parseDateRange("12월 12일~14일"),
    price: parsePrice("₩245,866"),
    nights: parseNights("2박"),
    rating: 4.77,
  },
  {
    id: 22,
    image: "https://picsum.photos/seed/osaka4/400/300",
    badge: "게스트 선호",
    title: "오사카시의 아파트",
    date: parseDateRange("12월 19일~21일"),
    price: parsePrice("₩236,482"),
    nights: parseNights("2박"),
    rating: 4.81,
  },
  {
    id: 23,
    image: "https://picsum.photos/seed/osaka5/400/300",
    badge: "게스트 선호",
    title: "오사카시의 아파트",
    date: parseDateRange("12월 12일~14일"),
    price: parsePrice("₩210,205"),
    nights: parseNights("2박"),
    rating: 4.85,
  },
  {
    id: 24,
    image: "https://picsum.photos/seed/osaka6/400/300",
    badge: "게스트 선호",
    title: "오사카시의 아파트",
    date: parseDateRange("12월 12일~14일"),
    price: parsePrice("₩256,188"),
    nights: parseNights("2박"),
    rating: 4.83,
  },
];
