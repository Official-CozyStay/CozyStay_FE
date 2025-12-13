import { useState, useEffect, useRef } from 'react';
import {
  SearchPageContainer,
  FilterBar,
  FilterButton,
  FilterDivider,
  ResultCount,
  ContentArea,
  ListSection,
  ListHeader,
  ListTitle,
  ListCount,
  AccommodationGrid,
  AccommodationCard,
  CardImageWrapper,
  CardImage,
  CardBadge,
  FavoriteButton,
  CardContent,
  CardHeader,
  CardTitle,
  CardRating,
  CardMeta,
  CardPrice,
  MapSection,
  MapContainer,
  PaginationWrapper,
  PaginationButton,
  PaginationEllipsis,
  MAP_MARKER_STYLES,
} from './search.styles';
import {
  Calendar,
  Users,
  SlidersHorizontal,
  Heart,
  Star,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import FilterDropdownPanel from './components/FilterDropdown';

// Types
export type Accommodation = {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  price: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  latitude: number;
  longitude: number;
  beds: number;
  dates: string;
};

export type FilterState = {
  location: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  infants: number;
  minPrice: number;
  maxPrice: number;
};

// Mock data
const mockAccommodations: Accommodation[] = [
  {
    id: '1',
    title: '천안시의 집',
    location: '천안시',
    imageUrl: 'https://picsum.photos/seed/room1/400/380',
    price: 445059,
    rating: 5.0,
    reviewCount: 21,
    badge: '게스트 선호',
    latitude: 36.8151,
    longitude: 127.1139,
    beds: 3,
    dates: '12월 3일~6일',
  },
  {
    id: '2',
    title: '천안시의 집',
    location: '천안시',
    imageUrl: 'https://picsum.photos/seed/room2/400/380',
    price: 452900,
    rating: 4.98,
    reviewCount: 50,
    badge: '게스트 선호',
    latitude: 36.82,
    longitude: 127.12,
    beds: 3,
    dates: '12월 3일~6일',
  },
  {
    id: '3',
    title: '동남구의 집',
    location: '천안시',
    imageUrl: 'https://picsum.photos/seed/room3/400/380',
    price: 234740,
    rating: 4.73,
    reviewCount: 414,
    badge: '슈퍼호스트',
    latitude: 36.81,
    longitude: 127.15,
    beds: 3,
    dates: '12월 3일~6일',
  },
  {
    id: '4',
    title: '아산시의 펜션',
    location: '아산시',
    imageUrl: 'https://picsum.photos/seed/room4/400/380',
    price: 485000,
    rating: 4.95,
    reviewCount: 88,
    badge: '게스트 선호',
    latitude: 36.78,
    longitude: 127.0,
    beds: 4,
    dates: '12월 3일~6일',
  },
  {
    id: '5',
    title: '천안시의 아파트',
    location: '천안시',
    imageUrl: 'https://picsum.photos/seed/room5/400/380',
    price: 158624,
    rating: 4.82,
    reviewCount: 156,
    badge: '게스트 선호',
    latitude: 36.825,
    longitude: 127.13,
    beds: 2,
    dates: '12월 3일~6일',
  },
  {
    id: '6',
    title: '아산시의 호텔',
    location: '아산시',
    imageUrl: 'https://picsum.photos/seed/room6/400/380',
    price: 273540,
    rating: 4.91,
    reviewCount: 203,
    latitude: 36.785,
    longitude: 127.01,
    beds: 2,
    dates: '12월 3일~6일',
  },
  {
    id: '7',
    title: '공주시의 게스트하우스',
    location: '공주시',
    imageUrl: 'https://picsum.photos/seed/room7/400/380',
    price: 385000,
    rating: 4.87,
    reviewCount: 142,
    badge: '게스트 선호',
    latitude: 36.45,
    longitude: 127.12,
    beds: 2,
    dates: '12월 8일~13일',
  },
  {
    id: '8',
    title: '청주시의 한옥',
    location: '청주시',
    imageUrl: 'https://picsum.photos/seed/room8/400/380',
    price: 594000,
    rating: 4.96,
    reviewCount: 211,
    badge: '슈퍼호스트',
    latitude: 36.6424,
    longitude: 127.489,
    beds: 2,
    dates: '12월 7일~12일',
  },
  {
    id: '9',
    title: '세종시의 아파트',
    location: '세종시',
    imageUrl: 'https://picsum.photos/seed/room9/400/380',
    price: 332528,
    rating: 4.75,
    reviewCount: 89,
    badge: '게스트 선호',
    latitude: 36.48,
    longitude: 127.29,
    beds: 3,
    dates: '12월 5일~10일',
  },
  {
    id: '10',
    title: '용인시의 펜션',
    location: '용인시',
    imageUrl: 'https://picsum.photos/seed/room10/400/380',
    price: 496412,
    rating: 4.89,
    reviewCount: 178,
    badge: '게스트 선호',
    latitude: 37.2411,
    longitude: 127.1776,
    beds: 4,
    dates: '12월 6일~11일',
  },
  {
    id: '11',
    title: '수원시의 스튜디오',
    location: '수원시',
    imageUrl: 'https://picsum.photos/seed/room11/400/380',
    price: 547765,
    rating: 4.92,
    reviewCount: 256,
    badge: '게스트 선호',
    latitude: 37.2636,
    longitude: 127.0286,
    beds: 1,
    dates: '12월 4일~9일',
  },
  {
    id: '12',
    title: '이천시의 별장',
    location: '이천시',
    imageUrl: 'https://picsum.photos/seed/room12/400/380',
    price: 718942,
    rating: 4.94,
    reviewCount: 95,
    badge: '슈퍼호스트',
    latitude: 37.2783,
    longitude: 127.4426,
    beds: 4,
    dates: '12월 8일~13일',
  },
];

const initialFilters: FilterState = {
  location: '근처의 숙소',
  checkIn: '',
  checkOut: '',
  adults: 1,
  children: 0,
  infants: 0,
  minPrice: 0,
  maxPrice: 1000000,
};

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        Map: new (
          container: HTMLElement,
          options: { center: unknown; level: number }
        ) => KakaoMap;
        LatLng: new (lat: number, lng: number) => unknown;
        CustomOverlay: new (options: {
          position: unknown;
          content: HTMLElement;
          yAnchor?: number;
          clickable?: boolean;
        }) => KakaoOverlay;
      };
    };
  }
}

type KakaoMap = {
  setCenter: (latlng: unknown) => void;
};

type KakaoOverlay = {
  setMap: (map: KakaoMap | null) => void;
};

const SearchPage = () => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [accommodations] = useState<Accommodation[]>(mockAccommodations);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<KakaoMap | null>(null);
  const overlaysRef = useRef<KakaoOverlay[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const locationButtonRef = useRef<HTMLButtonElement>(null);
  const datesButtonRef = useRef<HTMLButtonElement>(null);
  const guestsButtonRef = useRef<HTMLButtonElement>(null);
  const filtersButtonRef = useRef<HTMLButtonElement>(null);

  const totalGuests = filters.adults + filters.children;

  // Pagination settings
  const itemsPerPage = 6;
  const totalPages = Math.ceil(accommodations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedAccommodations = accommodations.slice(startIndex, endIndex);

  // Handle marker click - scroll to accommodation card
  const handleMarkerClick = (accId: string) => {
    setSelectedId(accId);

    // Find and scroll to the card
    const card = document.querySelector(`[data-acc-id="${accId}"]`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Initialize Kakao Map
  useEffect(() => {
    const kakaoMapKey = import.meta.env.VITE_KAKAO_MAP_KEY;

    if (!kakaoMapKey) {
      console.warn('카카오맵 API 키가 설정되지 않았습니다.');
      return;
    }

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        const center = new window.kakao.maps.LatLng(36.815, 127.114);
        const map = new window.kakao.maps.Map(mapRef.current, {
          center,
          level: 10,
        });

        mapInstanceRef.current = map;

        // Add price markers
        accommodations.forEach((acc) => {
          const position = new window.kakao.maps.LatLng(
            acc.latitude,
            acc.longitude
          );

          // Create DOM element for clickable overlay
          const markerElement = document.createElement('div');
          markerElement.className = 'map-price-marker';
          markerElement.dataset.id = acc.id;
          markerElement.style.cssText = MAP_MARKER_STYLES.base;
          markerElement.textContent = `₩${acc.price.toLocaleString()}`;

          // Add click event
          markerElement.addEventListener('click', () => {
            handleMarkerClick(acc.id);
          });

          // Add hover effects using style constants
          markerElement.addEventListener('mouseenter', () => {
            markerElement.style.cssText = MAP_MARKER_STYLES.base + MAP_MARKER_STYLES.hover;
          });

          markerElement.addEventListener('mouseleave', () => {
            markerElement.style.cssText = MAP_MARKER_STYLES.base;
          });

          const overlay = new window.kakao.maps.CustomOverlay({
            position,
            content: markerElement,
            yAnchor: 1.3,
            clickable: true,
          });

          overlay.setMap(map);
          overlaysRef.current.push(overlay);
        });
      });
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [accommodations]);

  const handleFilterChange = (key: keyof FilterState, value: unknown) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const formatPrice = (price: number) => {
    return `₩${price.toLocaleString()}`;
  };

  // Scroll to top when page changes
  useEffect(() => {
    if (listRef.current) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  const renderPagination = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 4;

    if (totalPages <= maxVisiblePages + 2) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of visible range
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the start
      if (currentPage <= 3) {
        end = Math.min(4, totalPages - 1);
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 3);
      }

      // Add ellipsis before visible range if needed
      if (start > 2) {
        pages.push('...');
      }

      // Add visible pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis after visible range if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return (
      <PaginationWrapper>
        <PaginationButton
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          aria-label="이전 페이지"
        >
          <ChevronLeft />
        </PaginationButton>

        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <PaginationEllipsis key={`ellipsis-${index}`}>
                ...
              </PaginationEllipsis>
            );
          }

          return (
            <PaginationButton
              key={page}
              $active={currentPage === page}
              onClick={() => setCurrentPage(page as number)}
            >
              {page}
            </PaginationButton>
          );
        })}

        <PaginationButton
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          disabled={currentPage === totalPages}
          aria-label="다음 페이지"
        >
          <ChevronRight />
        </PaginationButton>
      </PaginationWrapper>
    );
  };

  return (
    <SearchPageContainer data-search-container>
      <FilterBar data-filter-bar>
        <FilterButton
          ref={locationButtonRef}
          $active={activeFilter === 'location'}
          onClick={() =>
            setActiveFilter(activeFilter === 'location' ? null : 'location')
          }
        >
          <MapPin />
          {filters.location}
        </FilterButton>

        <FilterButton
          ref={datesButtonRef}
          $active={activeFilter === 'dates'}
          onClick={() =>
            setActiveFilter(activeFilter === 'dates' ? null : 'dates')
          }
        >
          <Calendar />
          {filters.checkIn && filters.checkOut
            ? `${filters.checkIn} ~ ${filters.checkOut}`
            : '날짜 추가'}
        </FilterButton>

        <FilterButton
          ref={guestsButtonRef}
          $active={activeFilter === 'guests'}
          onClick={() =>
            setActiveFilter(activeFilter === 'guests' ? null : 'guests')
          }
        >
          <Users />
          게스트 {totalGuests > 0 ? `${totalGuests}명` : '추가'}
        </FilterButton>

        <FilterDivider />

        <FilterButton
          ref={filtersButtonRef}
          $active={activeFilter === 'filters'}
          onClick={() =>
            setActiveFilter(activeFilter === 'filters' ? null : 'filters')
          }
        >
          <SlidersHorizontal />
          필터
        </FilterButton>

        <ResultCount>숙소 {accommodations.length}개</ResultCount>
      </FilterBar>

      {activeFilter && (
        <FilterDropdownPanel
          activeFilter={activeFilter}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClose={() => setActiveFilter(null)}
          buttonRefs={{
            location: locationButtonRef,
            dates: datesButtonRef,
            guests: guestsButtonRef,
            filters: filtersButtonRef,
          }}
        />
      )}

      <ContentArea>
        <ListSection>
          <ListHeader>
            <ListTitle>
              {filters.location} · {filters.checkIn || '날짜 미정'}
            </ListTitle>
            <ListCount>숙소 {accommodations.length}개</ListCount>
          </ListHeader>

          <AccommodationGrid ref={listRef}>
            {displayedAccommodations.map((acc) => (
              <AccommodationCard
                key={acc.id}
                data-acc-id={acc.id}
                $selected={selectedId === acc.id}
                onMouseEnter={() => setSelectedId(acc.id)}
                onMouseLeave={() => setSelectedId(null)}
              >
                <CardImageWrapper>
                  <CardImage
                    src={acc.imageUrl}
                    alt={acc.title}
                    loading="lazy"
                  />
                  {acc.badge && <CardBadge>{acc.badge}</CardBadge>}
                  <FavoriteButton type="button" aria-label="찜하기">
                    <Heart />
                  </FavoriteButton>
                </CardImageWrapper>

                <CardContent>
                  <CardHeader>
                    <CardTitle>{acc.title}</CardTitle>
                    <CardRating>
                      <Star />
                      {acc.rating.toFixed(2)} ({acc.reviewCount})
                    </CardRating>
                  </CardHeader>
                  <CardMeta>{acc.dates}</CardMeta>
                  <CardMeta>침대 {acc.beds}개</CardMeta>
                  <CardPrice>
                    <strong>{formatPrice(acc.price)}</strong> /3박
                  </CardPrice>
                </CardContent>
              </AccommodationCard>
            ))}
          </AccommodationGrid>
        </ListSection>

        <MapSection>
          <MapContainer ref={mapRef} />
        </MapSection>
      </ContentArea>

      {totalPages > 1 && renderPagination()}
    </SearchPageContainer>
  );
};

export default SearchPage;
