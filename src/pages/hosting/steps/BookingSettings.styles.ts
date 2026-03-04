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

// 체크인/체크아웃 시간 스타일
export const TimeSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const TimeSectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const TimeInputGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const TimeInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
`;

export const TimeLabel = styled.label`
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const TimeSelect = styled.select`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.font.size.md};
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.text.primary};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.text.primary};
  }
`;
