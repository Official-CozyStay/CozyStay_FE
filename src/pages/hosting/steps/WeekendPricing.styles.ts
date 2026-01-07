import styled from 'styled-components';
import { 
  StepContainer, 
  TitleSection as BaseTitleSection,
  StepTitle,
  Subtitle as BaseSubtitle,
} from './shared.styles';

// 공통 스타일 재사용
export const WeekendContainer = styled(StepContainer)`
  gap: ${({ theme }) => theme.spacing['3xl']};
  align-items: flex-start;
  justify-content: center;
`;

export const TitleSection = BaseTitleSection;
export const Title = StepTitle;
export const Subtitle = BaseSubtitle;

// WeekendPricing 전용 스타일
export const PriceDisplaySection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
`;

export const BigPrice = styled.div`
  font-size: 64px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  letter-spacing: -2px;
`;

export const GuestPrice = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.font.size.md};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const SliderSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const SliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const SliderLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const SliderTitle = styled.span`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SliderHint = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const PercentBadge = styled.div`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SliderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SliderInput = styled.input`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.text.primary} 0%,
    ${({ theme }) => theme.colors.text.primary} var(--progress, 29%),
    ${({ theme }) => theme.colors.border.light} var(--progress, 29%),
    ${({ theme }) => theme.colors.border.light} 100%
  );
  outline: none;
  -webkit-appearance: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.text.primary};
    cursor: pointer;
    border: 4px solid ${({ theme }) => theme.colors.common.white};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  &::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.text.primary};
    cursor: pointer;
    border: 4px solid ${({ theme }) => theme.colors.common.white};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
`;

export const SliderRange = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const InfoCard = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background.hover};
  border-radius: ${({ theme }) => theme.radius.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const InfoIcon = styled.span`
  font-size: 24px;
`;

export const InfoText = styled.p`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.5;
  margin: 0;
`;
