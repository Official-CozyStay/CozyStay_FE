import styled from 'styled-components';
import { media } from '@/styles/media';

export const PageContainer = styled.div`
  padding-top: ${({ theme }) => theme.spacing['6xl']};
  padding-bottom: ${({ theme }) => theme.spacing['5xl']};
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding-left: ${({ theme }) => theme.spacing['3xl']};
  padding-right: ${({ theme }) => theme.spacing['3xl']};
  background: ${({ theme }) => theme.colors.background.default};

  ${media.mobile} {
    padding-top: ${({ theme }) => theme.spacing['5xl']};
    padding-left: ${({ theme }) => theme.spacing.lg};
    padding-right: ${({ theme }) => theme.spacing.lg};
  }
`;

export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.font.size.xxl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.xl};
  text-align: center;

  ${media.mobile} {
    font-size: ${({ theme }) => theme.font.size.xl};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  ${media.mobile} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const WishlistCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radius.xl};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.normal};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  text-decoration: none;
  color: inherit;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`;

export const WishlistCardImage = styled.div<{ $imageUrl?: string | null }>`
  width: 100%;
  aspect-ratio: 1;
  background: ${({ $imageUrl, theme }) =>
    $imageUrl
      ? `url(${$imageUrl}) center/cover`
      : `linear-gradient(135deg, ${theme.colors.border.light} 0%, ${theme.colors.border.primary} 100%)`};
`;

export const WishlistCardBody = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

export const WishlistCardTitle = styled.div`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 2px;
`;

export const WishlistCardSubtitle = styled.div`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing['5xl']}
    ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.font.size.md};
`;

export const LoadingState = styled.div`
  padding: ${({ theme }) => theme.spacing['5xl']}
    ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`;
