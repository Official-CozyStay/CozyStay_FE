import styled from 'styled-components';
import { 
  StepContainer, 
  TitleSection as BaseTitleSection,
  StepTitleLarge,
  CounterList as BaseCounterList,
  CounterItem as BaseCounterItem,
  CounterControls as BaseCounterControls,
  CounterButton,
  CounterValue as BaseCounterValue,
  CounterLabel as BaseCounterLabel,
} from './shared.styles';

// 공통 스타일 재사용
export const BasicsContainer = StepContainer;
export const TitleSection = BaseTitleSection;
export const Title = StepTitleLarge;
export const CounterList = BaseCounterList;
export const CounterItem = BaseCounterItem;
export const CounterControls = BaseCounterControls;
export const IconButton = CounterButton;
export const CounterValue = BaseCounterValue;
export const CounterLabel = BaseCounterLabel;

// GuestCapacity 전용 스타일
export const Subtitle = styled.h3`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const QuestionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
`;

export const RadioInput = styled.input`
  width: 24px;
  height: 24px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.primary.main};
`;

export const RadioLabel = styled.span`
  font-size: ${({ theme }) => theme.font.size.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

