import { useState } from 'react';
import { 
  Wifi, 
  Tv, 
  UtensilsCrossed, 
  WashingMachine, 
  Car, 
  Snowflake,
  Wind,
  Refrigerator,
  Minus,
  Plus,
  PawPrint,
  Waves,
  Bath,
  Flame,
  Dumbbell,
  Mountain,
  Gamepad2,
  Baby,
  Cigarette,
  X as CloseIcon,
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
  ApplianceList,
  ApplianceItem,
  ApplianceInfo,
  ApplianceLabel,
  ApplianceControls,
  ApplianceButton,
  ApplianceValue,
  CustomAmenitySection,
  CustomAmenityInputWrapper,
  CustomAmenityInput,
  AddButton,
  CustomAmenityList,
  CustomAmenityTag,
  RemoveButton,
} from './Amenities.styles';
import type { StepProps } from '../BecomeHostPage';
import type { Listing } from '@/types/listing';

type AmenityKey = keyof Listing['amenities'];
type ApplianceKey = keyof Listing['appliances'];

const basicAmenities: { id: AmenityKey; label: string; icon: React.ReactNode }[] = [
  { id: 'wifi', label: '와이파이', icon: <Wifi size={28} /> },
  { id: 'parking', label: '주차 가능', icon: <Car size={28} /> },
  { id: 'kitchen', label: '주방', icon: <UtensilsCrossed size={28} /> },
  { id: 'pet', label: '반려동물 동반 가능', icon: <PawPrint size={28} /> },
];

const applianceItems: { id: ApplianceKey; label: string; icon: React.ReactNode }[] = [
  { id: 'airConditioner', label: '에어컨', icon: <Snowflake size={24} /> },
  { id: 'television', label: 'TV', icon: <Tv size={24} /> },
  { id: 'refrigerator', label: '냉장고', icon: <Refrigerator size={24} /> },
  { id: 'washer', label: '세탁기', icon: <WashingMachine size={24} /> },
  { id: 'dryer', label: '건조기', icon: <Wind size={24} /> },
  { id: 'hairDryer', label: '드라이기', icon: <Wind size={24} /> },
];

const extraAmenityOptions: { id: string; label: string; icon: React.ReactNode; category: string }[] = [
  { id: 'pool', label: '수영장', icon: <Waves size={28} />, category: 'FACILITY' },
  { id: 'hot_tub', label: '온수 욕조', icon: <Bath size={28} />, category: 'FACILITY' },
  { id: 'fireplace', label: '벽난로', icon: <Flame size={28} />, category: 'FACILITY' },
  { id: 'gym', label: '헬스장', icon: <Dumbbell size={28} />, category: 'FACILITY' },
  { id: 'mountain_view', label: '산 전망', icon: <Mountain size={28} />, category: 'VIEW' },
  { id: 'game_console', label: '게임 콘솔', icon: <Gamepad2 size={28} />, category: 'ENTERTAINMENT' },
  { id: 'baby_crib', label: '아기 침대', icon: <Baby size={28} />, category: 'FAMILY' },
  { id: 'smoking_allowed', label: '흡연 가능', icon: <Cigarette size={28} />, category: 'POLICY' },
];

const Amenities = ({ data, onDataChange }: StepProps) => {
  const [customInput, setCustomInput] = useState('');
  
  const amenities = data.amenities || { wifi: false, parking: false, pet: false, kitchen: false };
  const appliances = data.appliances || {
    airConditioner: 1,
    hairDryer: 1,
    refrigerator: 1,
    television: 1,
    washer: 1,
    dryer: 0,
  };
  const extraAmenities = data.extraAmenities || [];

  const toggleAmenity = (id: AmenityKey) => {
    onDataChange({
      amenities: {
        ...amenities,
        [id]: !amenities[id],
      },
    });
  };

  const updateApplianceCount = (id: ApplianceKey, delta: number) => {
    const currentValue = appliances[id] || 0;
    const newValue = Math.max(0, currentValue + delta);
    onDataChange({
      appliances: {
        ...appliances,
        [id]: newValue,
      },
    });
  };

  const toggleExtraAmenity = (id: string) => {
    const newExtraAmenities = extraAmenities.includes(id)
      ? extraAmenities.filter((item) => item !== id)
      : [...extraAmenities, id];
    onDataChange({ extraAmenities: newExtraAmenities });
  };

  const addCustomAmenity = () => {
    const trimmed = customInput.trim();
    if (trimmed && !extraAmenities.includes(trimmed)) {
      onDataChange({ extraAmenities: [...extraAmenities, trimmed] });
      setCustomInput('');
    }
  };

  const removeCustomAmenity = (amenity: string) => {
    onDataChange({ extraAmenities: extraAmenities.filter((item) => item !== amenity) });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomAmenity();
    }
  };

  const customAmenities = extraAmenities.filter(
    (item) => !extraAmenityOptions.some((opt) => opt.id === item)
  );

  return (
    <AmenitiesContainer>
      <TitleSection>
        <Title>숙소 편의시설 정보를 추가하세요</Title>
        <Subtitle>
          게스트가 숙소에서 이용할 수 있는 편의시설을 선택해주세요.
        </Subtitle>
      </TitleSection>

      <Section>
        <SectionTitle>기본 편의시설</SectionTitle>
        <AmenityGrid>
          {basicAmenities.map((amenity) => (
            <AmenityItem
              key={amenity.id}
              $selected={amenities[amenity.id]}
              onClick={() => toggleAmenity(amenity.id)}
            >
              <IconWrapper>{amenity.icon}</IconWrapper>
              <Label>{amenity.label}</Label>
            </AmenityItem>
          ))}
        </AmenityGrid>
      </Section>

      <Section>
        <SectionTitle>가전제품 개수</SectionTitle>
        <ApplianceList>
          {applianceItems.map((appliance) => (
            <ApplianceItem key={appliance.id}>
              <ApplianceInfo>
                <IconWrapper>{appliance.icon}</IconWrapper>
                <ApplianceLabel>{appliance.label}</ApplianceLabel>
              </ApplianceInfo>
              <ApplianceControls>
                <ApplianceButton 
                  onClick={() => updateApplianceCount(appliance.id, -1)}
                  disabled={appliances[appliance.id] <= 0}
                >
                  <Minus size={16} />
                </ApplianceButton>
                <ApplianceValue>{appliances[appliance.id]}</ApplianceValue>
                <ApplianceButton onClick={() => updateApplianceCount(appliance.id, 1)}>
                  <Plus size={16} />
                </ApplianceButton>
              </ApplianceControls>
            </ApplianceItem>
          ))}
        </ApplianceList>
      </Section>

      <Section>
        <SectionTitle>특별히 내세울 만한 편의시설이 있나요?</SectionTitle>
        <AmenityGrid>
          {extraAmenityOptions.map((amenity) => (
            <AmenityItem
              key={amenity.id}
              $selected={extraAmenities.includes(amenity.id)}
              onClick={() => toggleExtraAmenity(amenity.id)}
            >
              <IconWrapper>{amenity.icon}</IconWrapper>
              <Label>{amenity.label}</Label>
            </AmenityItem>
          ))}
        </AmenityGrid>

        <CustomAmenitySection>
          <CustomAmenityInputWrapper>
            <CustomAmenityInput
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="직접 입력 (예: 바비큐 그릴, 노래방 기기)"
            />
            <AddButton onClick={addCustomAmenity} disabled={!customInput.trim()}>
              추가
            </AddButton>
          </CustomAmenityInputWrapper>

          {customAmenities.length > 0 && (
            <CustomAmenityList>
              {customAmenities.map((amenity) => (
                <CustomAmenityTag key={amenity}>
                  {amenity}
                  <RemoveButton onClick={() => removeCustomAmenity(amenity)}>
                    <CloseIcon size={14} />
                  </RemoveButton>
                </CustomAmenityTag>
              ))}
            </CustomAmenityList>
          )}
        </CustomAmenitySection>
      </Section>
    </AmenitiesContainer>
  );
};

export default Amenities;

