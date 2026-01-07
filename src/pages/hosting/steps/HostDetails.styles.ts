import styled from 'styled-components';
import { media } from '@/styles/media';
import {
  StepContainer,
  TitleSection,
  StepTitle,
  Subtitle as BaseSubtitle,
} from './shared.styles';

// 공통 스타일 재export
export { TitleSection };
export const Title = StepTitle;

export const DetailsContainer = styled(StepContainer)`
  gap: ${({ theme }) => theme.spacing['2xl']};
  align-items: flex-start;
  max-width: 560px;
`;

export const Subtitle = styled(BaseSubtitle)`
  text-align: left;
`;

// 섹션 스타일 (거주지 정보, 사업자 정보 공통)
export const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SectionDescription = styled.p`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;

  a {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;

// 폼 관련 스타일
export const FormGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const SelectLabel = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  left: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  pointer-events: none;
`;

export const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.font.size.md};
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;
  appearance: none;
  transition: all ${({ theme }) => theme.transition.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.text.primary};
    border-width: 2px;
  }
`;

export const SelectIcon = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing.lg};
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const InputGroup = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
`;

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
  font-size: ${({ theme }) => theme.font.size.md};
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all ${({ theme }) => theme.transition.fast};

  &:last-child {
    border-bottom: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  &:focus {
    outline: none;
    background-color: ${({ theme }) => theme.colors.background.hover};
  }
`;

export const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

// 버튼 그룹
export const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;

  ${media.mobile} {
    flex-direction: column;
  }
`;

export const OptionButton = styled.button<{ $selected?: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme, $selected }) => 
    $selected ? theme.colors.text.primary : theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.common.white};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};

  ${({ $selected, theme }) => $selected && `
    border-width: 2px;
    background-color: ${theme.colors.background.hover};
  `}

  &:hover {
    border-color: ${({ theme }) => theme.colors.text.primary};
  }
`;
