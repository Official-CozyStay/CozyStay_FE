import styled from 'styled-components';
import { 
  StepContainer, 
  TitleSection as BaseTitleSection,
  StepTitle,
  Subtitle as BaseSubtitle,
} from './shared.styles';

// 공통 스타일 재사용
export const DiscountsContainer = styled(StepContainer)`
  gap: ${({ theme }) => theme.spacing['2xl']};
  align-items: flex-start;
  justify-content: center;
`;

export const TitleSection = BaseTitleSection;
export const Title = StepTitle;
export const Subtitle = BaseSubtitle;

// Discounts 전용 스타일
export const DiscountList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const DiscountItem = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radius.lg};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transition.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.hover};
  }
`;

export const DiscountLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const Checkbox = styled.div<{ $checked?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 2px solid ${({ theme, $checked }) => 
    $checked ? theme.colors.text.primary : theme.colors.border.primary};
  background-color: ${({ theme, $checked }) => 
    $checked ? theme.colors.text.primary : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transition.fast};
  flex-shrink: 0;

  svg {
    color: ${({ theme }) => theme.colors.common.white};
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const DiscountInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const DiscountTitle = styled.span`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const DiscountDescription = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const DiscountPercent = styled.span<{ $active?: boolean }>`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme, $active }) => 
    $active ? theme.colors.text.primary : theme.colors.text.tertiary};
  transition: color ${({ theme }) => theme.transition.fast};
  flex-shrink: 0;
`;

