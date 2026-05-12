import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import {
  DetailsContainer,
  TitleSection,
  Title,
  Subtitle,
  Section,
  SectionTitle,
  SectionDescription,
  FormGroup,
  Input,
  MapSearchWrapper,
  MapSearchInput,
  MapSearchButton,
  MapContainer,
  MapErrorMessage,
  SelectedAddressCard,
  SelectedAddressLabel,
  SelectedAddressValue,
} from './HostDetails.styles';
import type { StepProps } from '../BecomeHostPage';

const HostDetails = ({ data, onDataChange }: StepProps) => {
  const location = data.location || {
    country: '한국',
    state: '',
    city: '',
    district: '',
    streetAddress: '',
    detailAddress: '',
    postalCode: '',
  };

  const mapRef = useRef<HTMLDivElement>(null);
  const kakaoMapRef = useRef<kakao.maps.Map | null>(null);
  const markerRef = useRef<kakao.maps.Marker | null>(null);

  const [query, setQuery] = useState(location.streetAddress || '');
  const [errorMsg, setErrorMsg] = useState('');
  const [isMapVisible, setIsMapVisible] = useState(!!location.latitude);
  const [selectedAddress, setSelectedAddress] = useState(
    location.streetAddress || '',
  );
  const [pendingLatLng, setPendingLatLng] = useState<{
    lat: number;
    lng: number;
  } | null>(
    location.latitude && location.longitude
      ? { lat: location.latitude, lng: location.longitude }
      : null,
  );

  // pendingLatLng가 설정되면 지도 생성 (최초 1회만)
  useEffect(() => {
    if (
      !pendingLatLng ||
      kakaoMapRef.current ||
      !mapRef.current ||
      !window.kakao?.maps
    )
      return;

    window.kakao.maps.load(() => {
      if (!mapRef.current || kakaoMapRef.current) return;
      const center = new kakao.maps.LatLng(
        pendingLatLng.lat,
        pendingLatLng.lng,
      );
      const map = new kakao.maps.Map(mapRef.current, {
        center,
        level: 4,
      });
      const marker = new kakao.maps.Marker({ map, position: center });
      kakaoMapRef.current = map;
      markerRef.current = marker;
    });
  }, [pendingLatLng]);

  const handleSearch = () => {
    if (!query.trim()) return;
    if (!window.kakao?.maps?.services) {
      setErrorMsg('지도를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(query, (results, status) => {
      if (
        status !== window.kakao.maps.services.Status.OK ||
        results.length === 0
      ) {
        setErrorMsg('주소를 찾을 수 없습니다. 다시 확인해주세요.');
        return;
      }

      setErrorMsg('');
      const result = results[0];
      const lat = parseFloat(result.y);
      const lng = parseFloat(result.x);
      const addr = result.address;
      const roadAddr = result.road_address;
      const displayAddress = roadAddr?.address_name || addr.address_name;

      setSelectedAddress(displayAddress);

      if (!isMapVisible) {
        // 최초 검색: 지도 표시 + useEffect로 지도 생성
        setIsMapVisible(true);
        setPendingLatLng({ lat, lng });
      } else {
        // 이후 검색: 기존 지도 위치만 이동
        const newLatLng = new kakao.maps.LatLng(lat, lng);
        kakaoMapRef.current?.setCenter(newLatLng);
        markerRef.current?.setPosition(newLatLng);
      }

      let parsedState = addr.region_1depth_name;
      const stateMapping: { [key: string]: string } = {
        서울특별시: '서울',
        부산광역시: '부산',
        대구광역시: '대구',
        인천광역시: '인천',
        광주광역시: '광주',
        대전광역시: '대전',
        울산광역시: '울산',
        세종특별자치시: '세종',
        경기도: '경기',
        강원특별자치도: '강원',
        강원도: '강원',
        충청북도: '충북',
        충청남도: '충남',
        전북특별자치도: '전북',
        전라북도: '전북',
        전라남도: '전남',
        경상북도: '경북',
        경상남도: '경남',
        제주특별자치도: '제주',
        제주도: '제주',
      };
      if (stateMapping[parsedState]) {
        parsedState = stateMapping[parsedState];
      }

      let parsedCity = addr.region_2depth_name;
      let parsedDistrict = addr.region_3depth_name;

      // '성남시 분당구'와 같이 시와 구가 함께 오는 경우 분리
      if (addr.region_2depth_name.includes(' ')) {
        const parts = addr.region_2depth_name.split(' ');
        parsedCity = parts[0];
        parsedDistrict = parts[1];
      }

      onDataChange({
        location: {
          ...location,
          country: '한국',
          state: parsedState,
          city: parsedCity,
          district: parsedDistrict,
          streetAddress: displayAddress,
          detailAddress: location.detailAddress || '',
          postalCode: roadAddr?.zone_no || '',
          latitude: lat,
          longitude: lng,
        },
      });
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <DetailsContainer>
      <TitleSection>
        <Title>숙소 주소 정보를 입력해 주세요</Title>
        <Subtitle>
          정확한 주소를 입력해주세요. 예약 확정 전까지 게스트에게 공개되지
          않습니다.
        </Subtitle>
      </TitleSection>

      <Section>
        <SectionTitle>주소 정보</SectionTitle>
        <SectionDescription>
          주소를 검색하면 지도에서 위치를 확인할 수 있습니다.
        </SectionDescription>

        <FormGroup>
          <MapSearchWrapper>
            <MapSearchInput
              type="text"
              placeholder="도로명 주소 또는 지번 주소를 입력하세요"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <MapSearchButton type="button" onClick={handleSearch}>
              검색
            </MapSearchButton>
          </MapSearchWrapper>
          {errorMsg && <MapErrorMessage>{errorMsg}</MapErrorMessage>}
        </FormGroup>

        {isMapVisible && <MapContainer ref={mapRef} />}

        {selectedAddress && (
          <SelectedAddressCard>
            <SelectedAddressLabel>선택된 주소</SelectedAddressLabel>
            <SelectedAddressValue>{selectedAddress}</SelectedAddressValue>
          </SelectedAddressCard>
        )}

        {isMapVisible && (
          <FormGroup>
            <Input
              type="text"
              placeholder="상세주소 (아파트 동/호수, 건물명 등)"
              value={location.detailAddress}
              onChange={(e) =>
                onDataChange({
                  location: { ...location, detailAddress: e.target.value },
                })
              }
            />
          </FormGroup>
        )}
      </Section>
    </DetailsContainer>
  );
};

export default HostDetails;
