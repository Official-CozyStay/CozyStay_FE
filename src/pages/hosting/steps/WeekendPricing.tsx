import React, { useState } from 'react';
import {
  WeekendContainer,
  TitleSection,
  Title,
  Subtitle,
  PriceDisplaySection,
  BigPrice,
  GuestPrice,
  SliderSection,
  SliderHeader,
  SliderLabel,
  SliderTitle,
  SliderHint,
  PercentBadge,
  SliderWrapper,
  SliderInput,
  SliderRange,
  InfoCard,
  InfoIcon,
  InfoText,
} from './WeekendPricing.styles';

const BASE_PRICE = 60000; // 기본 주중 요금 (실제로는 이전 페이지에서 가져와야 함)
const SERVICE_FEE_RATE = 0.14; // 게스트 서비스 수수료 14%

const formatPrice = (price: number): string => {
  return price.toLocaleString('ko-KR');
};

const WeekendPricing = () => {
  const [premium, setPremium] = useState(29);

  const weekendPrice = Math.round(BASE_PRICE * (1 + premium / 100));
  const guestPrice = Math.round(weekendPrice * (1 + SERVICE_FEE_RATE));

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPremium(parseInt(e.target.value, 10));
  };

  return (
    <WeekendContainer>
      <TitleSection>
        <Title>주말 요금을 설정하세요</Title>
        <Subtitle>금요일과 토요일에는 주말 할증을 추가하세요.</Subtitle>
      </TitleSection>

      <PriceDisplaySection>
        <BigPrice>₩{formatPrice(weekendPrice)}</BigPrice>
        <GuestPrice>
          게스트 지불 요금: ₩{formatPrice(guestPrice)}
        </GuestPrice>
      </PriceDisplaySection>

      <SliderSection>
        <SliderHeader>
          <SliderLabel>
            <SliderTitle>주말 프리미엄</SliderTitle>
            <SliderHint>제안 할증률: 29%</SliderHint>
          </SliderLabel>
          <PercentBadge>{premium}%</PercentBadge>
        </SliderHeader>

        <SliderWrapper>
          <SliderInput
            type="range"
            min="0"
            max="99"
            value={premium}
            onChange={handleSliderChange}
            style={{ '--progress': `${premium}%` } as React.CSSProperties}
          />
          <SliderRange>
            <span>0%</span>
            <span>99%</span>
          </SliderRange>
        </SliderWrapper>
      </SliderSection>

      <InfoCard>
        <InfoIcon>💡</InfoIcon>
        <InfoText>
          주말에는 수요가 높아 평균 20~30% 더 높은 가격을 책정할 수 있습니다.
          금요일과 토요일 밤에 적용됩니다.
        </InfoText>
      </InfoCard>
    </WeekendContainer>
  );
};

export default WeekendPricing;
