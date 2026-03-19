import {
  IntroContainer,
  TextSection,
  StepLabel,
  Title,
  Description,
  ImageSection,
  Illustration,
} from './Phase2Intro.styles';

const Phase2Intro = () => {
  return (
    <IntroContainer>
      <TextSection>
        <StepLabel>2단계</StepLabel>
        <Title>숙소의 매력을{'\n'}돋보이게 하세요</Title>
        <Description>
          이 단계에서는 숙소에 갖춰진 편의시설과 사진 5장 이상을 추가한 후 숙소
          이름과 설명을 작성하시면 됩니다.
        </Description>
      </TextSection>
      <ImageSection>
        <Illustration
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
          alt="아늑한 거실 인테리어"
        />
      </ImageSection>
    </IntroContainer>
  );
};

export default Phase2Intro;
