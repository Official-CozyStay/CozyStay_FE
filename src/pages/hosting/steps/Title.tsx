import React from 'react';
import {
  TitleContainer,
  TitleSection,
  Title,
  Subtitle,
  TextArea,
  CharCount,
} from './Title.styles';
import type { StepProps } from '../BecomeHostPage';

const MAX_LENGTH = 50;

const TitleStep = ({ data, onDataChange }: StepProps) => {
  const name = data.title || '';

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_LENGTH) {
      onDataChange({ title: value });
    }
  };

  return (
    <TitleContainer>
      <TitleSection>
        <Title>이제 숙소에 이름을 지어주세요</Title>
        <Subtitle>
          숙소 이름은 짧을수록 효과적입니다. 나중에 언제든지 변경할 수 있으니,
          너무 걱정하지 마세요.
        </Subtitle>
      </TitleSection>

      <TextArea value={name} onChange={handleChange} maxLength={MAX_LENGTH} />

      <CharCount>
        {name.length}/{MAX_LENGTH}
      </CharCount>
    </TitleContainer>
  );
};

export default TitleStep;
