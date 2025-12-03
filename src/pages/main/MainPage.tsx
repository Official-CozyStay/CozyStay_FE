import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header/Header";
import SearchBar from "@/components/SearchBar/SearchBar";
import AccommodationSection from "./AccommodationSection";
import {
  mockAccommodations,
  busanAccommodations,
  tokyoAccommodations,
  osakaAccommodations,
} from "@/data/mockAccommodations";
import { MainContainer, SearchBarWrapper, Footer } from "./MainPage.styles";

const SCROLL_THRESHOLD = 100;

const MainPage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > SCROLL_THRESHOLD);

      // 스크롤이 끝에 도달했는지 확인
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = scrollY + windowHeight;

      // 끝에서 SCROLL_THRESHOLD 이내에 도달하면 Footer 표시
      if (scrollPosition >= documentHeight - SCROLL_THRESHOLD) {
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
