import React from 'react';
import {
  MainContent,
  LeftSection,
  Title,
  RightSection,
  StepItem,
  StepNumber,
  StepContent,
  StepTitle,
  StepDesc,
} from '../becomeHost.styles';

const Overview = () => {
  return (
    <MainContent style={{ paddingBottom: 0, marginTop: 0 }}>
      <LeftSection>
        <Title>CozyStay 호스트가 되는 방법은 간단합니다</Title>
      </LeftSection>

      <RightSection>
        <StepItem>
          <StepNumber>1</StepNumber>
          <StepContent>
            <StepTitle>숙소 정보를 입력하세요</StepTitle>
            <StepDesc>
              위치, 숙박 가능 인원 등 기본 정보를 공유해 주세요.
            </StepDesc>
          </StepContent>
        </StepItem>

        <StepItem>
          <StepNumber>2</StepNumber>
          <StepContent>
            <StepTitle>돋보이는 숙소를 만드세요</StepTitle>
            <StepDesc>사진 5장 이상과 제목, 설명을 추가하세요.</StepDesc>
          </StepContent>
        </StepItem>

        <StepItem>
          <StepNumber>3</StepNumber>
          <StepContent>
            <StepTitle>등록을 완료하세요</StepTitle>
            <StepDesc>요금을 설정하고 리스팅을 게시하세요.</StepDesc>
          </StepContent>
        </StepItem>
      </RightSection>
    </MainContent>
  );
};

export default Overview;
