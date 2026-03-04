import styled from 'styled-components';
import { media } from '@/styles/media';

export const LocationContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const HeaderSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.font.size["2xl"]};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.primary};

  ${media.mobile} {
    font-size: ${({ theme }) => theme.font.size.xl};
  }
`;

export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.font.size.md};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: ${({ theme }) => theme.colors.background.hover};
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border.light};

  ${media.mobile} {
    aspect-ratio: 4 / 3;
  }
`;

export const SearchInputWrapper = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.lg};
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 400px;
  z-index: 1;
`;

export const SearchInput = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.common.white};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.full};
  box-shadow: ${({ theme }) => theme.shadow.md};
  cursor: pointer;
  border: 1px solid transparent;
  transition: all ${({ theme }) => theme.transition.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const SearchText = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

export const PlaceholderMap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('https://maps.googleapis.com/maps/api/staticmap?center=37.5665,126.9780&zoom=13&size=800x450&scale=2&key=YOUR_API_KEY_MOCK');
  background-size: cover;
  background-position: center;
`;

