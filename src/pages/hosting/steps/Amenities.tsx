import React from 'react';
import { 
  Wifi, 
  Tv, 
  UtensilsCrossed, 
  WashingMachine, 
  Car, 
  CircleDollarSign,
  Snowflake,
  Briefcase,
  Waves,
  Bath,
  TreePalm,
  Beef,
  UtensilsCrossed as DiningIcon,
  Flame
} from 'lucide-react';
import {
  AmenitiesContainer,
  TitleSection,
  Title,
  Subtitle,
  Section,
  SectionTitle,
  AmenityGrid,
  AmenityItem,
  IconWrapper,
  Label,
} from './Amenities.styles';
import type { StepProps } from '../BecomeHostPage';

const popularAmenities = [
  { id: 'wifi', label: '와이파이', icon: <Wifi size={28} /> },
  { id: 'tv', label: 'TV', icon: <Tv size={28} /> },
  { id: 'kitchen', label: '주방', icon: <UtensilsCrossed size={28} /> },
  { id: 'washer', label: '세탁기', icon: <WashingMachine size={28} /> },
  { id: 'free_parking', label: '건물 내 무료 주차', icon: <Car size={28} /> },
  { id: 'paid_parking', label: '건물 부지 내 유료 주차', icon: <CircleDollarSign size={28} /> },
  { id: 'ac', label: '에어컨', icon: <Snowflake size={28} /> },
  { id: 'workspace', label: '업무 전용 공간', icon: <Briefcase size={28} /> },
];

const standoutAmenities = [
  { id: 'pool', label: '수영장', icon: <Waves size={28} /> },
  { id: 'hot_tub', label: '대형 욕조', icon: <Bath size={28} /> },
  { id: 'patio', label: '파티오', icon: <TreePalm size={28} /> },
  { id: 'bbq', label: '바비큐 그릴', icon: <Beef size={28} /> },
  { id: 'outdoor_dining', label: '야외 식사 공간', icon: <DiningIcon size={28} /> },
  { id: 'firepit', label: '화로', icon: <Flame size={28} /> },
];

const Amenities = ({ data, onDataChange }: StepProps) => {
  const selectedIds = data.amenities || [];

  const toggleSelection = (label: string) => {
    const newSelectedIds = selectedIds.includes(label)
      ? selectedIds.filter((i) => i !== label)
      : [...selectedIds, label];
    onDataChange({ amenities: newSelectedIds });
  };

  return (
    <AmenitiesContainer>
      <TitleSection>
        <Title>숙소 편의시설 정보를 추가하세요</Title>
        <Subtitle>
          여기에 추가하려는 편의시설이 보이지 않더라도 걱정하지 마세요! 숙소를 등록한 후에 편의시설을 추가할 수 있습니다.
        </Subtitle>
      </TitleSection>

      <Section>
        <SectionTitle>다음 인기 편의시설이 있나요?</SectionTitle>
        <AmenityGrid>
          {popularAmenities.map((amenity) => (
            <AmenityItem
              key={amenity.id}
              $selected={selectedIds.includes(amenity.label)}
              onClick={() => toggleSelection(amenity.label)}
            >
              <IconWrapper>{amenity.icon}</IconWrapper>
              <Label>{amenity.label}</Label>
            </AmenityItem>
          ))}
        </AmenityGrid>
      </Section>

      <Section>
        <SectionTitle>특별히 내세울 만한 편의시설이 있나요?</SectionTitle>
        <AmenityGrid>
          {standoutAmenities.map((amenity) => (
            <AmenityItem
              key={amenity.id}
              $selected={selectedIds.includes(amenity.label)}
              onClick={() => toggleSelection(amenity.label)}
            >
              <IconWrapper>{amenity.icon}</IconWrapper>
              <Label>{amenity.label}</Label>
            </AmenityItem>
          ))}
        </AmenityGrid>
      </Section>
    </AmenitiesContainer>
  );
};

export default Amenities;

