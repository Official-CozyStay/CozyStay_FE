import styled from 'styled-components';
import { 
  StepContainer, 
  TitleSection,
  StepTitle,
  Subtitle,
  TextAreaBase,
  CharCount,
} from './shared.styles';

// 공통 스타일 재export
export { TitleSection, Subtitle, CharCount };
export const Title = StepTitle;

// Description 전용 스타일
export const DescriptionContainer = styled(StepContainer)`
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: flex-start;
  justify-content: center;
`;

export const TextArea = styled(TextAreaBase)`
  min-height: 180px;
  font-size: ${({ theme }) => theme.font.size.md};
  line-height: 1.5;
`;
