import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header/Header";
import SearchBar from "@/components/SearchBar/SearchBar";
import AccommodationSection from "./AccommodationSection";
import { MainContainer, SearchBarWrapper, Footer } from "./MainPage.styles";

// TODO: 임시 데이터 (나중에 API로 대체)
const mockAccommodations = [
  {
    id: 1,
    image: "https://picsum.photos/seed/room1/400/300",
    badge: "게스트 선호",
    title: "서울의 집",
    date: "2월 6일~8일",
    price: "₩256,080",
    nights: "2박",
    rating: 5.0,
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/room2/400/300",
    badge: "게스트 선호",
    title: "서울의 방",
    date: "1월 9일~11일",
    price: "₩136,941",
    nights: "2박",
    rating: 4.91,
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/room3/400/300",
    badge: "게스트 선호",
    title: "서울의 방",
    date: "11월 21일~23일",
    price: "₩102,706",
    nights: "2박",
    rating: 4.89,
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/room4/400/300",
    badge: "게스트 선호",
    title: "서울의 방",
    date: "1월 9일~11일",
    price: "₩121,649",
    nights: "2박",
    rating: 4.94,
  },
  {
    id: 5,
    image: "https://picsum.photos/seed/room5/400/300",
    badge: "게스트 선호",
    title: "서울의 방",
    date: "3월 13일~15일",
    price: "₩75,318",
    nights: "2박",
    rating: 4.88,
  },
  {
    id: 6,
    image: "https://picsum.photos/seed/room6/400/300",
    badge: "게스트 선호",
    title: "마포구의 집",
    date: "4월 17일~19일",
    price: "₩294,424",
    nights: "2박",
    rating: 4.96,
  },
];

const busanAccommodations = [
  {
    id: 7,
    image: "https://picsum.photos/seed/busan1/400/300",
    badge: "게스트 선호",
    title: "부산의 아파트",
    date: "11월 21일~23일",
    price: "₩180,000",
    nights: "2박",
    rating: 4.85,
  },
  {
    id: 8,
    image: "https://picsum.photos/seed/busan2/400/300",
    badge: "게스트 선호",
    title: "Yeonje-gu의 아파트",
    date: "11월 21일~23일",
    price: "₩165,000",
    nights: "2박",
    rating: 4.82,
  },
  {
    id: 9,
    image: "https://picsum.photos/seed/busan3/400/300",
    badge: "게스트 선호",
    title: "부산의 호텔",
    date: "11월 21일~23일",
    price: "₩220,000",
    nights: "2박",
    rating: 4.9,
  },
  {
    id: 10,
    image: "https://picsum.photos/seed/busan4/400/300",
    badge: "게스트 선호",
    title: "suyeong-gu의 아파트",
    date: "11월 21일~23일",
    price: "₩195,000",
    nights: "2박",
    rating: 4.87,
  },
  {
    id: 11,
    image: "https://picsum.photos/seed/busan5/400/300",
    badge: "게스트 선호",
    title: "부산의 아파트",
    date: "11월 21일~23일",
    price: "₩210,000",
    nights: "2박",
    rating: 4.83,
  },
  {
    id: 12,
    image: "https://picsum.photos/seed/busan6/400/300",
    badge: "게스트 선호",
    title: "오크홀름의 아파트",
    date: "11월 21일~23일",
    price: "₩175,000",
    nights: "2박",
    rating: 4.79,
  },
];

const tokyoAccommodations = [
  {
    id: 13,
    image: "https://picsum.photos/seed/tokyo1/400/300",
    badge: "게스트 선호",
    title: "타이토구의 호텔 객실",
    date: "1월 2일~4일",
    price: "₩157,654",
    nights: "2박",
    rating: 4.89,
  },
  {
    id: 14,
    image: "https://picsum.photos/seed/tokyo2/400/300",
    badge: "게스트 선호",
    title: "스미다구의 방",
    date: "12월 19일~21일",
    price: "₩163,847",
    nights: "2박",
    rating: 4.91,
  },
  {
    id: 15,
    image: "https://picsum.photos/seed/tokyo3/400/300",
    badge: "게스트 선호",
    title: "도시마구의 아파트",
    date: "1월 23일~25일",
    price: "₩221,843",
    nights: "2박",
    rating: 5.0,
  },
  {
    id: 16,
    image: "https://picsum.photos/seed/tokyo4/400/300",
    badge: "게스트 선호",
    title: "타이토구의 오두막",
    date: "3월 20일~22일",
    price: "₩133,257",
    nights: "2박",
    rating: 4.81,
  },
  {
    id: 17,
    image: "https://picsum.photos/seed/tokyo5/400/300",
    badge: "게스트 선호",
    title: "도쿄의 호텔 객실",
    date: "1월 2일~4일",
    price: "₩73,196",
    nights: "2박",
    rating: 4.83,
  },
  {
    id: 18,
    image: "https://picsum.photos/seed/tokyo6/400/300",
    badge: "게스트 선호",
    title: "고토구의 방",
    date: "2월 13일~15일",
    price: "₩140,903",
    nights: "2박",
    rating: 4.94,
  },
];

const osakaAccommodations = [
  {
    id: 19,
    image: "https://picsum.photos/seed/osaka1/400/300",
    badge: "게스트 선호",
    title: "말론키르멘스키의 아파트",
    date: "12월 19일~21일",
    price: "₩156,716",
    nights: "2박",
    rating: 4.79,
  },
  {
    id: 20,
    image: "https://picsum.photos/seed/osaka2/400/300",
    badge: "게스트 선호",
    title: "오사카시의 아파트",
    date: "12월 19일~21일",
    price: "₩210,207",
    nights: "2박",
    rating: 4.92,
  },
  {
    id: 21,
    image: "https://picsum.photos/seed/osaka3/400/300",
    badge: "게스트 선호",
    title: "오사카시의 아파트",
    date: "12월 12일~14일",
    price: "₩245,866",
    nights: "2박",
    rating: 4.77,
  },
  {
    id: 22,
    image: "https://picsum.photos/seed/osaka4/400/300",
    badge: "게스트 선호",
    title: "오사카시의 아파트",
    date: "12월 19일~21일",
    price: "₩236,482",
    nights: "2박",
    rating: 4.81,
  },
  {
    id: 23,
    image: "https://picsum.photos/seed/osaka5/400/300",
    badge: "게스트 선호",
    title: "오사카시의 아파트",
    date: "12월 12일~14일",
    price: "₩210,205",
    nights: "2박",
    rating: 4.85,
  },
  {
    id: 24,
    image: "https://picsum.photos/seed/osaka6/400/300",
    badge: "게스트 선호",
    title: "오사카시의 아파트",
    date: "12월 12일~14일",
    price: "₩256,188",
    nights: "2박",
    rating: 4.83,
  },
];

const MainPage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);

      // 스크롤이 끝에 도달했는지 확인
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = scrollY + windowHeight;

      // 끝에서 100px 이내에 도달하면 Footer 표시
      if (scrollPosition >= documentHeight - 100) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // 초기 로드 시에도 확인
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MainContainer ref={containerRef}>
      <Header isScrolled={isScrolled} />

      <SearchBarWrapper $isScrolled={isScrolled}>
        <SearchBar isCompact={isScrolled} />
      </SearchBarWrapper>

      <AccommodationSection
        title="서울의 인기 숙소"
        accommodations={mockAccommodations}
      />

      <AccommodationSection
        title="다음 주말에 예약 가능한 부산 숙소"
        accommodations={busanAccommodations}
      />

      <AccommodationSection
        title="도쿄의 숙소"
        accommodations={tokyoAccommodations}
      />

      <AccommodationSection
        title="다음 달에 예약 가능한 오사카시 숙소"
        accommodations={osakaAccommodations}
      />

      {showFooter && (
        <Footer>
          © {new Date().getFullYear()} CozyStay — Inspired by Airbnb
        </Footer>
      )}
    </MainContainer>
  );
};

export default MainPage;
