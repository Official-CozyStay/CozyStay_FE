import styled from "styled-components";

export const CardContainer = styled.article`
  position: relative;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transition.normal},
    box-shadow ${({ theme }) => theme.transition.normal};

  &:hover {
    transform: translateY(-${({ theme }) => theme.spacing.xs});
    box-shadow: ${({ theme }) => theme.shadow.lg};
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: ${({ theme }) => theme.size.cardImage.default};
  object-fit: cover;
  display: block;
`;

export const CardBadge = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
  top: ${({ theme }) => theme.spacing.md};
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  background: ${({ theme }) => theme.colors.common.white};
  border-radius: ${({ theme }) => theme.radius.full};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

export const CardHeartButton = styled.button<{ $isFavorite?: boolean }>`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  top: ${({ theme }) => theme.spacing.md};
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  width: ${({ theme }) => theme.spacing["2xl"]};
  height: ${({ theme }) => theme.spacing["2xl"]};
  border: none;
  background: ${({ theme }) => theme.colors.common.white};
  border-radius: ${({ theme }) => theme.radius.full};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, $isFavorite }) =>
    $isFavorite ? theme.colors.primary.main : theme.colors.text.primary};
  transition: ${({ theme }) => theme.transition.all.normal};
  box-shadow: ${({ theme }) => theme.shadow.sm};

  &:hover {
    transform: scale(1.1);
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const CardBody = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

export const CardTitle = styled.h4`
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.md};
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CardDate = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.font.size.sm};
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
`;

export const CardPrice = styled.p`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const CardRating = styled.p`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;
