import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "styled-components";
import SearchBar from "@/components/SearchBar/SearchBar";
import AccommodationSection from "./AccommodationSection";
import {
  mockAccommodations,
  busanAccommodations,
  tokyoAccommodations,
  osakaAccommodations,
} from "@/data/mockAccommodations";
import { MainContainer, SearchBarWrapper, Footer } from "./MainPage.styles";
import { sumSpacingValues } from "@/utils/spacing";

const MainPage: React.FC = () => {
  const theme = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // spacing 토큰을 기반으로 스크롤 임계값 계산 (5xl + 2xl = 64px + 32px = 96px, 100px에 근접)
  const scrollThreshold = sumSpacingValues(
    theme.spacing["5xl"],
    theme.spacing["2xl"]
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    // 초기 로드 시에도 확인
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  return (
    <MainContainer ref={containerRef}>
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

      <Footer>
        © {new Date().getFullYear()} CozyStay — Inspired by Airbnb
      </Footer>
    </MainContainer>
  );
};

export default MainPage;
