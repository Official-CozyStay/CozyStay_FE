import styled from 'styled-components';
import { media } from '@/styles/media';
import { StepContainer, StepTitleLarge, SelectableGrid, SelectableCardCompact, CardLabel } from './shared.styles';

// 공통 스타일 재사용
export const CategoryContainer = StepContainer;
export const CategoryGrid = SelectableGrid;
export const Label = CardLabel;

// CategorySelect 전용 스타일
export const Title = styled(StepTitleLarge)`
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
  text-align: center;

  ${media.mobile} {
    text-align: left;
  }
`;

export const CategoryItem = styled(SelectableCardCompact)`
  border-color: ${({ theme, $selected }) => 
    $selected ? theme.colors.primary.main : theme.colors.border.primary};
  outline: ${({ $selected, theme }) => 
    $selected ? `2px solid ${theme.colors.primary.main}` : 'none'};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const Icon = styled.div`
  font-size: 32px;
`;

