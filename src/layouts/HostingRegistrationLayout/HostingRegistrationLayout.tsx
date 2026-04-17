import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/images/logo.svg';
import {
  LayoutContainer,
  Header,
  LogoLink,
  LogoImage,
  LogoText,
  HeaderButtons,
  HeaderButton,
  Main,
  Footer,
  ProgressBarContainer,
  ProgressSegment,
  FooterControls,
  BackButton,
  NextButton,
} from './HostingRegistrationLayout.styles';

interface HostingRegistrationLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onBack?: () => void;
  nextDisabled?: boolean;
  backDisabled?: boolean;
  nextLabel?: string;
  showProgressBar?: boolean;
}

const HostingRegistrationLayout = ({
  children,
  currentStep,
  totalSteps,
  onNext,
  onBack,
  nextDisabled,
  backDisabled,
  nextLabel = '다음',
  showProgressBar = true,
}: HostingRegistrationLayoutProps) => {
  const navigate = useNavigate();

  return (
    <LayoutContainer>
      <Header>
        <LogoLink onClick={() => navigate('/')}>
          <LogoImage src={logo} alt="CozyStay Logo" />
          <LogoText>CozyStay</LogoText>
        </LogoLink>
        <HeaderButtons>
          <HeaderButton onClick={() => {}}>궁금하신 점이 있나요?</HeaderButton>
          <HeaderButton onClick={() => navigate('/hosting')}>
            저장 후 나가기
          </HeaderButton>
        </HeaderButtons>
      </Header>

      <Main>{children}</Main>

      <Footer>
        {showProgressBar && (
          <ProgressBarContainer>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <ProgressSegment
                key={i}
                $active={i === currentStep - 1}
                $completed={i < currentStep - 1}
              />
            ))}
          </ProgressBarContainer>
        )}
        <FooterControls>
          <BackButton onClick={onBack} disabled={backDisabled}>
            뒤로
          </BackButton>
          <NextButton onClick={onNext} disabled={nextDisabled}>
            {nextLabel}
          </NextButton>
        </FooterControls>
      </Footer>
    </LayoutContainer>
  );
};

export default HostingRegistrationLayout;
