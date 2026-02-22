import React from 'react';
import {
  IntroContainer,
  TextSection,
  StepLabel,
  Title,
  Description,
  ImageSection,
  Illustration,
} from './Phase1Intro.styles';

const Phase1Intro = () => {
  return (
    <IntroContainer>
      <TextSection>
        <StepLabel>1단계</StepLabel>
        <Title>숙소 정보를 알려주세요</Title>
        <Description>
          먼저 숙소 유형을 선택하고, 게스트가 예약할 수 있는 숙소가 공간
          전체인지 개인실 또는 다인실인지 알려주세요. 그런 다음 숙소 위치와 수용
          가능 인원을 알려주세요.
        </Description>
      </TextSection>
      <ImageSection>
        <Illustration
          src="https://a0.muscache.com/im/pictures/content-listing-assets/72002598-a00e-436f-8012-680f4f780879/original/8701918a-f509-4828-89f4-18080a25694b.png"
          alt="Step 1 Illustration"
        />
      </ImageSection>
    </IntroContainer>
  );
};

export default Phase1Intro;
