import React from 'react';
import {
  IntroContainer,
  TextSection,
  StepLabel,
  Title,
  Description,
  ImageSection,
  Illustration,
} from './Phase3Intro.styles';

const Phase3Intro = () => {
  return (
    <IntroContainer>
      <TextSection>
        <StepLabel>3단계</StepLabel>
        <Title>등록을 완료하세요</Title>
        <Description>
          마지막으로, 예약 설정을 선택하고 요금을 설정한 후 숙소 등록을 완료할 차례입니다.
        </Description>
      </TextSection>
      <ImageSection>
        <Illustration 
          src="https://a0.muscache.com/im/pictures/65ec27a0-2900-41e7-8cf0-908042739983.jpg" 
          alt="Step 3 Illustration" 
        />
      </ImageSection>
    </IntroContainer>
  );
};

export default Phase3Intro;

