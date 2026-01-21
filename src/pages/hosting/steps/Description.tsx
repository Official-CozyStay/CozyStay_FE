import React from 'react';
import {
  DescriptionContainer,
  TitleSection,
  Title,
  Subtitle,
  TextArea,
  CharCount,
} from './Description.styles';
import type { StepProps } from '../BecomeHostPage';

const MAX_LENGTH = 500;

const Description = ({ data, onDataChange }: StepProps) => {
  const description = data.description || '';

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_LENGTH) {
      onDataChange({ description: value });
    }
  };

  return (
    <DescriptionContainer>
      <TitleSection>
        <Title>숙소 설명 작성하기</Title>
        <Subtitle>숙소의 특징과 장점을 알려주세요.</Subtitle>
      </TitleSection>

      <TextArea
        value={description}
        onChange={handleChange}
        maxLength={MAX_LENGTH}
      />

      <CharCount>{description.length}/{MAX_LENGTH}</CharCount>
    </DescriptionContainer>
  );
};

export default Description;

