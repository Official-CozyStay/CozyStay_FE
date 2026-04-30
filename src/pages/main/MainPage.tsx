import { useRef, useEffect, useState } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';
import AccommodationSection from './AccommodationSection';
import { fetchAccommodations } from '@/api/accommodation';
import type { Accommodation } from '@/types/accommodation';
import {
  MainContainer,
  SearchBarWrapper,
  Footer,
  StatusMessage,
} from './MainPage.styles';

const PLACEHOLDER_IMAGE =
  'https://a0.muscache.com/im/pictures/miso/Hosting-598015/original/a0ea4842-d25e-4f9f-93ed-c85b5aad0a01.jpeg';

// TEMP MOCK: DB 연동 전 상세/달력 UI 검증용 (검증 후 삭제)
const TEST_MOCK_ACCOMMODATION_ID = 999001;
const TEST_MOCK_ACCOMMODATION: Accommodation = {
  id: TEST_MOCK_ACCOMMODATION_ID,
  image: PLACEHOLDER_IMAGE,
  badge: '테스트',
  title: '테스트 숙소 (달력 검증용)',
  price: 120000,
};

const MainPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    fetchAccommodations()
      .then((data) => {
        const mapped: Accommodation[] = data.map((item) => ({
          id: item.accommodationId,
          image: item.accommodationImage || PLACEHOLDER_IMAGE,
          badge: '',
          title: item.accommodationName,
          price: item.accommodationPrice,
        }));
        const withoutMockDup = mapped.filter(
          (item) => item.id !== TEST_MOCK_ACCOMMODATION_ID,
        );
        setAccommodations([TEST_MOCK_ACCOMMODATION, ...withoutMockDup]);
      })
      .catch((err) => {
        console.error('숙소 목록 조회 실패:', err);
        // DB 연결이 어려운 상황에서도 상세/달력 테스트를 위해 목 카드 유지
        setAccommodations([TEST_MOCK_ACCOMMODATION]);
        setHasError(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <MainContainer ref={containerRef}>
      <SearchBarWrapper>
        <SearchBar />
      </SearchBarWrapper>

      {isLoading && (
        <StatusMessage>숙소 목록을 불러오는 중입니다.</StatusMessage>
      )}

      {!isLoading && hasError && (
        <StatusMessage>
          숙소 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
        </StatusMessage>
      )}

      {!isLoading && !hasError && accommodations.length === 0 && (
        <StatusMessage>아직 등록된 숙소가 없습니다.</StatusMessage>
      )}

      {!isLoading && !hasError && accommodations.length > 0 && (
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
