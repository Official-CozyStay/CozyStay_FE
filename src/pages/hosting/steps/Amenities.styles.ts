import styled from 'styled-components';
import { 
  StepContainer, 
  TitleSection as BaseTitleSection,
  StepTitle,
  Subtitle as BaseSubtitle,
  Section as BaseSection,
  SectionTitle as BaseSectionTitle,
  SelectableGrid,
  SelectableCard,
  CardIcon,
  CardLabel,
} from './shared.styles';

// 공통 스타일 재사용
export const AmenitiesContainer = styled(StepContainer)`
  gap: ${({ theme }) => theme.spacing['3xl']};
`;
export const TitleSection = BaseTitleSection;
export const Title = StepTitle;
export const Subtitle = BaseSubtitle;
export const Section = BaseSection;
export const SectionTitle = BaseSectionTitle;
export const AmenityGrid = SelectableGrid;
export const AmenityItem = SelectableCard;
export const IconWrapper = CardIcon;
export const Label = CardLabel;

