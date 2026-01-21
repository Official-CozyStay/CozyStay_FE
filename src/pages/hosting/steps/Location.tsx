import React, { useState } from 'react';
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
import type { StepProps } from '../BecomeHostPage';

const Location = ({ data, onDataChange }: StepProps) => {
  const [addressInput, setAddressInput] = useState(data.location?.streetAddress || '');

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddressInput(value);
    onDataChange({
      location: {
        ...data.location,
        country: data.location?.country || '한국',
        province: data.location?.province || '',
        city: data.location?.city || '',
        district: data.location?.district || '',
        streetAddress: value,
        detailAddress: data.location?.detailAddress || '',
        postalCode: data.location?.postalCode || '',
      },
    });
  };

  return (
    <LocationContainer>
      <HeaderSection>
        <Title>숙소 위치는 어디인가요?</Title>
        <Subtitle>주소는 게스트의 예약이 확정된 이후에 공개됩니다.</Subtitle>
      </HeaderSection>

      <MapWrapper>
        <SearchInputWrapper>
          <SearchInput as="label">
            <MapPin size={20} />
            <input
              type="text"
              value={addressInput}
              onChange={handleAddressChange}
              placeholder="주소를 입력하세요."
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                flex: 1,
                fontSize: 'inherit',
                fontFamily: 'inherit',
              }}
            />
          </SearchInput>
        </SearchInputWrapper>
        
        {/* 나중에 실제 구글 맵 컴포넌트로 교체될 영역입니다 */}
        <PlaceholderMap />
      </MapWrapper>
    </LocationContainer>
  );
};

export default Location;

