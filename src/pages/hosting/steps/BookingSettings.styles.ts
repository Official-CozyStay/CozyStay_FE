import styled from 'styled-components';
import { 
  StepContainer, 
  TitleSection,
  StepTitle,
  Subtitle,
  OptionList as BaseOptionList,
  OptionCard as BaseOptionCard,
  OptionContent,
  OptionTitle,
  OptionDescription,
  IconWrapper,
} from './shared.styles';

// 공통 스타일 재export
export { TitleSection, Subtitle, OptionContent, OptionTitle, OptionDescription, IconWrapper };
export const Title = StepTitle;

// BookingSettings 전용 스타일
export const BookingContainer = styled(StepContainer)`
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: flex-start;
  justify-content: center;
`;

export const OptionList = BaseOptionList;

export const OptionCard = styled(BaseOptionCard).attrs({ as: 'button' })`
  justify-content: space-between;
  text-align: left;
`;

export const RecommendTag = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.status.success};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;
