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
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80" 
          alt="밝은 주방과 거실 공간" 
        />
      </ImageSection>
    </IntroContainer>
  );
};

export default Phase3Intro;

