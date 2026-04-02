import { useRef, useEffect, useState } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';
import AccommodationSection from './AccommodationSection';
import { fetchAccommodations } from '@/api/accommodation';
import type { Accommodation } from '@/types/accommodation';
import { MainContainer, SearchBarWrapper, Footer } from './MainPage.styles';

const PLACEHOLDER_IMAGE =
  'https://a0.muscache.com/im/pictures/miso/Hosting-598015/original/a0ea4842-d25e-4f9f-93ed-c85b5aad0a01.jpeg';

const MainPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);

  useEffect(() => {
    fetchAccommodations()
      .then((data) => {
        const mapped: Accommodation[] = data.map((item) => ({
          id: item.accommodationId,
          image: item.accommodationImage || PLACEHOLDER_IMAGE,
          badge: '',
          title: item.accommodationName,
          date: {
            start: new Date(),
            end: new Date(Date.now() + 1000 * 60 * 60 * 24),
          },
          price: item.accommodationPrice,
          nights: 1,
          rating: 0,
        }));
        setAccommodations(mapped);
      })
      .catch((err) => console.error('숙소 목록 조회 실패:', err));
  }, []);

  return (
    <MainContainer ref={containerRef}>
      <SearchBarWrapper>
        <SearchBar />
      </SearchBarWrapper>

      {accommodations.length > 0 && (
        <AccommodationSection
          title="등록된 숙소"
          accommodations={accommodations}
        />
      )}

      <Footer>
        © {new Date().getFullYear()} CozyStay — Inspired by Airbnb
      </Footer>
    </MainContainer>
  );
};

export default MainPage;
