import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { media } from '@/styles/media';

export const PageContainer = styled.div`
  padding-top: ${({ theme }) => theme.spacing['6xl']};
  padding-bottom: ${({ theme }) => theme.spacing['5xl']};
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding-left: ${({ theme }) => theme.spacing['3xl']};
  padding-right: ${({ theme }) => theme.spacing['3xl']};
  background: ${({ theme }) => theme.colors.background.default};
  min-height: 100vh;

  ${media.mobile} {
    padding-top: ${({ theme }) => theme.spacing['5xl']};
    padding-left: ${({ theme }) => theme.spacing.lg};
    padding-right: ${({ theme }) => theme.spacing.lg};
  }
`;

export const DetailHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  gap: ${({ theme }) => theme.spacing.md};
`;

export const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: none;
  background: ${({ theme }) => theme.colors.common.white};
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  flex-shrink: 0;
  transition: ${({ theme }) => theme.transition.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.border.light};
  }
`;

export const DetailTitle = styled.h1`
  flex: 1;
  min-width: 0;
  font-size: ${({ theme }) => theme.font.size.xxl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  text-align: center;

  ${media.mobile} {
    font-size: ${({ theme }) => theme.font.size.xl};
    text-align: left;
  }
`;

export const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: none;
  background: ${({ theme }) => theme.colors.common.white};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  flex-shrink: 0;
  font-size: 20px;
  line-height: 1;
  transition: ${({ theme }) => theme.transition.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.border.light};
  }
`;

export const AccList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

export const AccCard = styled(Link)`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radius.xl};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.common.white};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  text-decoration: none;
  color: inherit;
  transition: ${({ theme }) => theme.transition.normal};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`;

export const AccCardImageWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
`;

export const AccCardImage = styled.div<{ $imageUrl?: string | null }>`
  position: absolute;
  inset: 0;
  background: ${({ $imageUrl, theme }) =>
    $imageUrl
      ? `url(${$imageUrl}) center/cover`
      : `linear-gradient(135deg, ${theme.colors.border.light} 0%, ${theme.colors.border.primary} 100%)`};
`;

export const AccCardBadge = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  left: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.common.white};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const AccCardHeart = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: ${({ theme }) => theme.colors.common.white};
  color: ${({ theme }) => theme.colors.status.error};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.full};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: ${({ theme }) => theme.transition.normal};

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const AccCardBody = styled.div`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const AccCardTitleRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const AccCardTitle = styled.div`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  min-width: 0;
  flex: 1;
`;

export const AccCardMeta = styled.div`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.4;
`;

export const AccCardPrice = styled.div`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const AccCardMemo = styled.div`
  margin: 0 ${({ theme }) => theme.spacing.lg}
    ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  pointer-events: none;
`;

export const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing['5xl']};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.font.size.md};
`;

export const LoadingState = styled.div`
  padding: ${({ theme }) => theme.spacing['5xl']};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`;
