import styled from 'styled-components';
import { media } from '@/styles/media';

export const HostingContainer = styled.div`
  padding-top: ${({ theme }) => theme.spacing['6xl']};
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.default};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TabSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing['4xl']};
  flex-shrink: 0;
`;

export const ListingsSection = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: ${({ theme }) => theme.spacing['3xl']};

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const AddListingButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.common.white};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.normal};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.hover};
  }
`;

export const ListingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const ListingCard = styled.div`
  background-color: ${({ theme }) => theme.colors.common.white};
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all ${({ theme }) => theme.transition.normal};
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

export const ListingImagePlaceholder = styled.div`
  width: 100%;
  height: 180px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background.hover} 0%,
    ${({ theme }) => theme.colors.background.active} 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
`;

export const ListingInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const ListingTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const ListingLocation = styled.p`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const ListingPrice = styled.p`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};

  span {
    font-weight: ${({ theme }) => theme.font.weight.regular};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const ListingStatus = styled.span<{ $status: 'draft' | 'published' }>`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-top: ${({ theme }) => theme.spacing.sm};

  ${({ $status, theme }) =>
    $status === 'published'
      ? `
    background-color: ${theme.colors.status.success}20;
    color: ${theme.colors.status.success};
  `
      : `
    background-color: ${theme.colors.status.warning}20;
    color: ${theme.colors.status.warning};
  `}
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radius.full};
  border: none;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.text.primary : theme.colors.background.hover};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.common.white : theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.normal};

  &:hover {
    background-color: ${({ theme, $active }) =>
      $active ? theme.colors.text.primary : theme.colors.background.active};
  }
`;

export const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 600px;
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  /* 상단바와 버튼 영역만큼의 오프셋을 고려하여 시각적 중앙을 맞춤 */
  padding-bottom: ${({ theme }) => theme.spacing['6xl']};
`;

export const EmptyIcon = styled.div`
  font-size: 120px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1;
`;

export const EmptyTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const EmptyDesc = styled.p`
  font-size: ${({ theme }) => theme.font.size.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

export const ActionButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md}
    ${({ theme }) => theme.spacing['2xl']};
  background-color: ${({ theme }) => theme.colors.background.hover};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.normal};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.active};
  }
`;
