import styled from 'styled-components';
import { 
  StepContainer, 
  TitleSection as BaseTitleSection,
  StepTitle,
  Subtitle as BaseSubtitle,
} from './shared.styles';

// 공통 스타일 재사용
export const PricingContainer = styled(StepContainer)`
  gap: ${({ theme }) => theme.spacing['3xl']};
  align-items: flex-start;
  justify-content: center;
`;

export const TitleSection = BaseTitleSection;
export const Title = StepTitle;
export const Subtitle = BaseSubtitle;

// Pricing 전용 스타일
export const PriceInputSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const PriceInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

export const PriceInput = styled.input`
  width: 100%;
  max-width: 280px;
  padding: ${({ theme }) => theme.spacing.xl};
  border: 2px solid ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.radius.lg};
  font-size: 48px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all ${({ theme }) => theme.transition.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  /* 숫자 입력 스피너 제거 */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

export const CurrencyLabel = styled.span`
  font-size: 32px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const PriceHint = styled.p`
  font-size: ${({ theme }) => theme.font.size.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
`;

export const QuickPriceButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  justify-content: center;
`;

export const QuickPriceButton = styled.button<{ $active?: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme, $active }) => 
    $active ? theme.colors.text.primary : theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.full};
  background-color: ${({ theme, $active }) => 
    $active ? theme.colors.text.primary : theme.colors.common.white};
  color: ${({ theme, $active }) => 
    $active ? theme.colors.common.white : theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const InfoCard = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background.hover};
  border-radius: ${({ theme }) => theme.radius.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const InfoTitle = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const InfoText = styled.p`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.5;
  margin: 0;
`;

export const PriceBreakdown = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const BreakdownRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BreakdownLabel = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const BreakdownValue = styled.span<{ $highlight?: boolean }>`
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme, $highlight }) => 
    $highlight ? theme.font.weight.bold : theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

// 청소비 스타일
export const CleaningFeeSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const CleaningFeeLabel = styled.label`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const CleaningFeeInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const CleaningFeeInput = styled.input`
  width: 150px;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all ${({ theme }) => theme.transition.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.text.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

