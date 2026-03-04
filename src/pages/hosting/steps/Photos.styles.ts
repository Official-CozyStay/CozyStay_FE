import styled from 'styled-components';
import {
  StepContainer,
  TitleSection as BaseTitleSection,
  StepTitle,
  Subtitle as BaseSubtitle,
  SelectableGrid,
} from './shared.styles';

// 공통 스타일 재사용
export const PhotosContainer = styled(StepContainer)`
  gap: ${({ theme }) => theme.spacing.xl};
`;
export const TitleSection = BaseTitleSection;
export const Title = StepTitle;
export const Subtitle = BaseSubtitle;
export const PhotoGrid = SelectableGrid;

// Photos 전용 스타일
export const DropZone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  background-color: ${({ theme }) => theme.colors.background.hover};
  border-radius: ${({ theme }) => theme.radius.lg};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.normal};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.active};
  }
`;

export const CameraImage = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const AddButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.common.white};
  border: 1px solid ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.hover};
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const PhotoItem = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background.hover};
`;

export const PhotoPreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.common.white};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    transform: scale(1.1);
  }
`;
