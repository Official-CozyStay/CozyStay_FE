import { 
  StepContainer, 
  TitleSection as BaseTitleSection,
  StepTitleLarge,
  Subtitle as BaseSubtitle,
  SelectableGrid,
  SelectableCardCompact,
  CardIcon,
  CardLabel,
  FooterText as BaseFooterText,
} from './shared.styles';

// 공통 스타일 재사용
export const OccupantsContainer = StepContainer;
export const TitleSection = BaseTitleSection;
export const Title = StepTitleLarge;
export const Subtitle = BaseSubtitle;
export const OccupantGrid = SelectableGrid;
export const OccupantItem = SelectableCardCompact;
export const IconWrapper = CardIcon;
export const Label = CardLabel;
export const FooterText = BaseFooterText;

