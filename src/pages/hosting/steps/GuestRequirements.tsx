import React from 'react';
import {
  GuestContainer,
  TitleSection,
  Title,
  Subtitle,
  OptionList,
  OptionCard,
  RadioButton,
  HiddenRadio,
  OptionContent,
  OptionTitle,
  OptionDescription,
} from './GuestRequirements.styles';
import type { StepProps } from '../BecomeHostPage';

type GuestOption = 'anyone' | 'experienced';

const GuestRequirements = ({ data, onDataChange }: StepProps) => {
  const selected: GuestOption = data.guestRequirements || 'anyone';

  const handleSelect = (option: GuestOption) => {
    onDataChange({ guestRequirements: option });
  };

  return (
    <GuestContainer>
      <TitleSection>
        <Title>첫 예약의 게스트 조건을 선택해주세요</Title>
        <Subtitle>첫 번째 게스트의 예약을 받은 후에는 누구나 숙소를 예약할 수 있습니다.</Subtitle>
      </TitleSection>

      <OptionList>
        <OptionCard $selected={selected === 'anyone'}>
          <HiddenRadio
            type="radio"
            name="guestRequirement"
            value="anyone"
            checked={selected === 'anyone'}
            onChange={() => handleSelect('anyone')}
          />
          <RadioButton $selected={selected === 'anyone'} />
          <OptionContent>
            <OptionTitle>모든 CozyStay 게스트</OptionTitle>
            <OptionDescription>
              모든 CozyStay 게스트를 맞이하겠다고 설정하면 예약을 더 빨리 받으실 수 있습니다.
            </OptionDescription>
          </OptionContent>
        </OptionCard>

        <OptionCard $selected={selected === 'experienced'}>
          <HiddenRadio
            type="radio"
            name="guestRequirement"
            value="experienced"
            checked={selected === 'experienced'}
            onChange={() => handleSelect('experienced')}
          />
          <RadioButton $selected={selected === 'experienced'} />
          <OptionContent>
            <OptionTitle>경험이 풍부한 게스트</OptionTitle>
            <OptionDescription>
              CozyStay 이용 실적이 우수하며, 유용한 호스팅 팁도 제공할 수 있는 사람을 첫 번째 게스트로 수락하세요.
            </OptionDescription>
          </OptionContent>
        </OptionCard>
      </OptionList>
    </GuestContainer>
  );
};

export default GuestRequirements;

