import React from 'react';
import { MapPin } from 'lucide-react';
import {
  LocationContainer,
  HeaderSection,
  Title,
  Subtitle,
  MapWrapper,
  SearchInputWrapper,
  SearchInput,
  SearchText,
  PlaceholderMap,
} from './Location.styles';

const Location: React.FC = () => {
  return (
    <LocationContainer>
      <HeaderSection>
        <Title>숙소 위치는 어디인가요?</Title>
        <Subtitle>주소는 게스트의 예약이 확정된 이후에 공개됩니다.</Subtitle>
      </HeaderSection>

      <MapWrapper>
        <SearchInputWrapper>
          <SearchInput>
            <MapPin size={20} />
            <SearchText>주소를 입력하세요.</SearchText>
          </SearchInput>
        </SearchInputWrapper>
        
        {/* 나중에 실제 구글 맵 컴포넌트로 교체될 영역입니다 */}
        <PlaceholderMap />
      </MapWrapper>
    </LocationContainer>
  );
};

export default Location;

