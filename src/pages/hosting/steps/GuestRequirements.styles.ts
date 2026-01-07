import styled from 'styled-components';
import { 
  StepContainer, 
  TitleSection,
  StepTitle,
  Subtitle,
  OptionList,
  OptionCard as BaseOptionCard,
  OptionContent,
  OptionTitle,
  OptionDescription,
  RadioButton,
  HiddenInput,
} from './shared.styles';

// 공통 스타일 재export
export { 
  TitleSection, 
  Subtitle, 
  OptionList, 
  OptionContent, 
  OptionTitle, 
  OptionDescription, 
  RadioButton,
  HiddenInput as HiddenRadio,
};
export const Title = StepTitle;

// GuestRequirements 전용 스타일
export const GuestContainer = styled(StepContainer)`
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: flex-start;
  justify-content: center;
`;

export const OptionCard = styled(BaseOptionCard).attrs({ as: 'label' })``;
