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

// Title 전용 스타일
export const TitleContainer = styled(StepContainer)`
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: flex-start;
  justify-content: center;
`;

export const TextArea = styled(TextAreaBase)`
  min-height: 140px;
  font-size: ${({ theme }) => theme.font.size.lg};
`;
