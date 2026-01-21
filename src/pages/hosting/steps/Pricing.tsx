import React from 'react';
import {
  PricingContainer,
  TitleSection,
  Title,
  Subtitle,
  PriceInputSection,
  PriceInputWrapper,
  PriceInput,
  CurrencyLabel,
  PriceHint,
  QuickPriceButtons,
  QuickPriceButton,
  InfoCard,
  InfoTitle,
  InfoText,
  PriceBreakdown,
  BreakdownRow,
  BreakdownLabel,
  BreakdownValue,
} from './Pricing.styles';
import type { StepProps } from '../BecomeHostPage';

const QUICK_PRICES = [30000, 50000, 70000, 100000, 150000];
const SERVICE_FEE_RATE = 0.03; // 3% 서비스 수수료

const formatPrice = (price: number): string => {
  return price.toLocaleString('ko-KR');
};

const Pricing = ({ data, onDataChange }: StepProps) => {
  const price = data.pricing?.basePrice || 50000;

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      onDataChange({ pricing: { ...data.pricing, basePrice: numValue, weekendPremium: data.pricing?.weekendPremium || 0 } });
    } else if (value === '') {
      onDataChange({ pricing: { ...data.pricing, basePrice: 0, weekendPremium: data.pricing?.weekendPremium || 0 } });
    }
  };

  const setPrice = (newPrice: number) => {
    onDataChange({ pricing: { ...data.pricing, basePrice: newPrice, weekendPremium: data.pricing?.weekendPremium || 0 } });
  };

  const serviceFee = Math.round(price * SERVICE_FEE_RATE);
  const hostEarnings = price - serviceFee;

  return (
    <PricingContainer>
      <TitleSection>
        <Title>주중 기본 요금 설정</Title>
        <Subtitle>
          게스트가 1박당 지불할 금액을 설정하세요. 나중에 언제든지 변경할 수 있습니다.
        </Subtitle>
      </TitleSection>

      <PriceInputSection>
        <PriceInputWrapper>
          <CurrencyLabel>₩</CurrencyLabel>
          <PriceInput
            type="text"
            value={formatPrice(price)}
            onChange={handlePriceChange}
            placeholder="0"
          />
        </PriceInputWrapper>

        <PriceHint>1박 기준 가격</PriceHint>

        <QuickPriceButtons>
          {QUICK_PRICES.map((quickPrice) => (
            <QuickPriceButton
              key={quickPrice}
              $active={price === quickPrice}
              onClick={() => setPrice(quickPrice)}
            >
              ₩{formatPrice(quickPrice)}
            </QuickPriceButton>
          ))}
        </QuickPriceButtons>
      </PriceInputSection>

      <InfoCard>
        <InfoTitle>💡 비슷한 숙소의 평균 가격</InfoTitle>
        <InfoText>
          이 지역의 비슷한 숙소는 평균 ₩55,000 ~ ₩85,000의 가격대로 운영되고 있습니다.
        </InfoText>

        <PriceBreakdown>
          <BreakdownRow>
            <BreakdownLabel>기본 요금</BreakdownLabel>
            <BreakdownValue>₩{formatPrice(price)}</BreakdownValue>
          </BreakdownRow>
          <BreakdownRow>
            <BreakdownLabel>서비스 수수료 (3%)</BreakdownLabel>
            <BreakdownValue>-₩{formatPrice(serviceFee)}</BreakdownValue>
          </BreakdownRow>
          <BreakdownRow>
            <BreakdownLabel>예상 수익</BreakdownLabel>
            <BreakdownValue $highlight>₩{formatPrice(hostEarnings)}</BreakdownValue>
          </BreakdownRow>
        </PriceBreakdown>
      </InfoCard>
    </PricingContainer>
  );
};

export default Pricing;

