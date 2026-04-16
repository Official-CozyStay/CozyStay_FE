import { useRef } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';
import AccommodationSection from './AccommodationSection';
import {
  mockAccommodations,
  busanAccommodations,
  tokyoAccommodations,
  osakaAccommodations,
} from '@/data/mockAccommodations';
import { MainContainer, SearchBarWrapper, Footer } from './MainPage.styles';

const MainPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <MainContainer ref={containerRef}>
      <SearchBarWrapper>
        <SearchBar />
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
