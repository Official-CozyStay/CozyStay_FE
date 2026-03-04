import styled from 'styled-components';
import { media } from '@/styles/media';

export const TypeContainer = styled.div`
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.font.size["2xl"]};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
  text-align: center;

  ${media.mobile} {
    font-size: ${({ theme }) => theme.font.size.xl};
    text-align: left;
  }
`;

export const TypeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const TypeItem = styled.button<{ $selected?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme, $selected }) =>
    $selected ? `calc(${theme.spacing.xl} - 1px)` : theme.spacing.xl};
  border: ${({ theme, $selected }) =>
    $selected
      ? `2px solid ${theme.colors.primary.main}`
      : `1px solid ${theme.colors.border.primary}`};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme, $selected }) => ($selected ? theme.colors.background.hover : theme.colors.common.white)};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.normal};
  text-align: left;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
    border-width: 3px;
    padding: calc(${({ theme }) => theme.spacing.xl} - 2px);
  }
`;

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Label = styled.span`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

export const IconWrapper = styled.div`
  font-size: 32px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

