import React, { useState } from 'react';
import { CalendarCheck, Zap } from 'lucide-react';
import {
  BookingContainer,
  TitleSection,
  Title,
  Subtitle,
  OptionList,
  OptionCard,
  OptionContent,
  OptionTitle,
  RecommendTag,
  OptionDescription,
  IconWrapper,
} from './BookingSettings.styles';

type BookingOption = 'review' | 'instant';

const BookingSettings: React.FC = () => {
  const [selected, setSelected] = useState<BookingOption>('review');

  return (
    <BookingContainer>
      <TitleSection>
        <Title>예약 설정 선택</Title>
        <Subtitle>이 설정은 언제든지 변경하실 수 있습니다.</Subtitle>
      </TitleSection>

      <OptionList>
        <OptionCard
          $selected={selected === 'review'}
          onClick={() => setSelected('review')}
        >
          <OptionContent>
            <OptionTitle>최초 5건 예약은 직접 검토 후 승인</OptionTitle>
            <RecommendTag>추천</RecommendTag>
            <OptionDescription>
              처음 몇 건의 예약에 대해서는 요청을 직접 검토한 후 승인 여부를 결정하고, 그 이후에는 즉시 예약 기능을 사용해 예약을 자동 확정합니다.
            </OptionDescription>
          </OptionContent>
          <IconWrapper>
            <CalendarCheck size={32} />
          </IconWrapper>
        </OptionCard>

        <OptionCard
          $selected={selected === 'instant'}
          onClick={() => setSelected('instant')}
        >
          <OptionContent>
            <OptionTitle>즉시 예약 사용</OptionTitle>
            <OptionDescription>
              게스트가 바로 예약할 수 있도록 즉시 예약 기능을 설정해 보세요.
            </OptionDescription>
          </OptionContent>
          <IconWrapper>
            <Zap size={32} />
          </IconWrapper>
        </OptionCard>
      </OptionList>
    </BookingContainer>
  );
};

export default BookingSettings;

