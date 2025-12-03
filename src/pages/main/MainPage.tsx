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

// spacing 토큰을 기반으로 스크롤 임계값 계산 (5xl + 2xl = 64px + 32px = 96px, 100px에 근접)
const getScrollThreshold = (spacing5xl: string, spacing2xl: string) => {
  const value5xl = parseInt(spacing5xl.replace("px", ""), 10);
  const value2xl = parseInt(spacing2xl.replace("px", ""), 10);
  return value5xl + value2xl; // 96px
};

const MainPage: React.FC = () => {
  const theme = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollThreshold = getScrollThreshold(theme.spacing["5xl"], theme.spacing["2xl"]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > scrollThreshold);

      // 스크롤이 끝에 도달했는지 확인
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = scrollY + windowHeight;

      // 끝에서 scrollThreshold 이내에 도달하면 Footer 표시
      if (scrollPosition >= documentHeight - scrollThreshold) {
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
