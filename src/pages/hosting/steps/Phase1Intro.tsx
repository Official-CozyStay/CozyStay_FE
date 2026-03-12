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
          src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80"
          alt="모던한 숙소 인테리어"
        />
      </ImageSection>
    </IntroContainer>
  );
};

export default Phase1Intro;
