import React, { useState } from 'react';
import { Check } from 'lucide-react';
import {
  DiscountsContainer,
  TitleSection,
  Title,
  Subtitle,
  DiscountList,
  DiscountItem,
  DiscountLeft,
  Checkbox,
  HiddenInput,
  DiscountInfo,
  DiscountTitle,
  DiscountDescription,
  DiscountPercent,
} from './Discounts.styles';

interface DiscountOption {
  id: string;
  title: string;
  description: string;
  percent: number;
}

const discountOptions: DiscountOption[] = [
  {
    id: 'new_listing',
    title: '신규 숙소 할인',
    description: '첫 3건의 예약에 20% 할인을 제공합니다.',
    percent: 20,
  },
  {
    id: 'weekly',
    title: '주간 할인',
    description: '7박 이상 예약 시 할인을 제공합니다.',
    percent: 10,
  },
  {
    id: 'monthly',
    title: '월간 할인',
    description: '28박 이상 예약 시 할인을 제공합니다.',
    percent: 15,
  },
];

const Discounts: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['new_listing']);

  const toggleDiscount = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  return (
    <DiscountsContainer>
      <TitleSection>
        <Title>할인을 추가하여 예약을 늘려보세요</Title>
        <Subtitle>
          할인을 제공하면 게스트의 관심을 끌고 예약을 더 빨리 받을 수 있습니다.
        </Subtitle>
      </TitleSection>

      <DiscountList>
        {discountOptions.map((option) => {
          const isChecked = selectedIds.includes(option.id);
          return (
            <DiscountItem key={option.id}>
              <DiscountLeft>
                <HiddenInput
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleDiscount(option.id)}
                />
                <Checkbox $checked={isChecked}>
                  {isChecked && <Check size={16} />}
                </Checkbox>
                <DiscountInfo>
                  <DiscountTitle>{option.title}</DiscountTitle>
                  <DiscountDescription>{option.description}</DiscountDescription>
                </DiscountInfo>
              </DiscountLeft>
              <DiscountPercent $active={isChecked}>
                {option.percent}%
              </DiscountPercent>
            </DiscountItem>
          );
        })}
      </DiscountList>
    </DiscountsContainer>
  );
};

export default Discounts;

