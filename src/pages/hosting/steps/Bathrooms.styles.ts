import { 
  StepContainer, 
  StepTitleLarge,
  CounterList as BaseCounterList,
  CounterItem as BaseCounterItem,
  CounterTextSection,
  CounterLabel as BaseLabel,
  CounterDescription,
  CounterControls as BaseCounterControls,
  CounterButton,
  CounterValue as BaseCounterValue,
} from './shared.styles';

// 공통 스타일 재사용
export const BathroomContainer = StepContainer;
export const Title = StepTitleLarge;
export const CounterList = BaseCounterList;
export const CounterItem = BaseCounterItem;
export const TextSection = CounterTextSection;
export const Label = BaseLabel;
export const Description = CounterDescription;
export const CounterControls = BaseCounterControls;
export const IconButton = CounterButton;
export const CounterValue = BaseCounterValue;

