import styled from 'styled-components';

export const SearchPageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 64px);
`;

export const FilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  background: ${({ theme }) => theme.colors.common.white};
  flex-shrink: 0;
  position: sticky;
  top: 64px;
  z-index: 10;
`;

export const FilterButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.primary.main : theme.colors.border.primary};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary.light : theme.colors.common.white};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const FilterDivider = styled.div`
  width: 1px;
  height: 24px;
  background: ${({ theme }) => theme.colors.border.light};
`;

export const ResultCount = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-left: auto;
`;

export const ContentArea = styled.div`
  display: flex;
  min-height: calc(100vh - 137px);
`;

export const ListSection = styled.section`
  width: 55%;
  min-width: 400px;
  padding: 20px 24px;
  background: ${({ theme }) => theme.colors.common.white};
`;

export const ListHeader = styled.div`
  margin-bottom: 16px;
`;

export const ListTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.regular};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 4px;
`;

export const ListCount = styled.p`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  margin: 0;
`;

export const AccommodationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

export const AccommodationCard = styled.article<{ $selected?: boolean }>`
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 8px;
  margin: -8px;

  ${({ $selected, theme }) =>
    $selected &&
    `
    background: ${theme.colors.primary.light};
    box-shadow: 0 0 0 2px ${theme.colors.primary.main};
  `}

  &:hover {
    transform: translateY(-2px);
  }
`;

export const CardImageWrapper = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  aspect-ratio: 1 / 0.95;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CardBadge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 8px;
  background: ${({ theme }) => theme.colors.common.white};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

export const FavoriteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.colors.common.white};
    fill: rgba(0, 0, 0, 0.5);
    stroke-width: 2;
    transition: all 0.15s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

export const CardContent = styled.div`
  padding: 10px 0;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2px;
`;

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin: 0;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CardRating = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.font.size.sm};
  flex-shrink: 0;
  margin-left: 8px;

  svg {
    width: 14px;
    height: 14px;
    fill: currentColor;
  }
`;

export const CardMeta = styled.p`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 2px;
`;

export const CardPrice = styled.p`
  font-size: ${({ theme }) => theme.font.size.md};
  margin: 4px 0 0;

  strong {
    font-weight: ${({ theme }) => theme.font.weight.bold};
  }
`;

export const MapSection = styled.section`
  flex: 1;
  position: sticky;
  top: 137px;
  height: calc(100vh - 137px);
  background: #e5e3df;
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: sticky;
  top: 0;
`;

export const MapPriceMarker = styled.button<{ $selected?: boolean }>`
  padding: 6px 10px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: none;
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.text.primary : theme.colors.common.white};
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.common.white : theme.colors.text.primary};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    transform: scale(1.05);
    z-index: 10;
  }
`;

// Filter Dropdown Styles
export const FilterDropdown = styled.div`
  position: absolute;
  min-width: 320px;
  background: ${({ theme }) => theme.colors.common.white};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  padding: 20px;
  z-index: 100;
`;

export const FilterSection = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const FilterLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-bottom: 8px;
`;

export const FilterInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.font.size.sm};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const PriceRangeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const PriceInput = styled(FilterInput)`
  width: 120px;
`;

export const GuestCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  &:last-child {
    border-bottom: none;
  }
`;

export const GuestLabel = styled.div`
  span {
    display: block;
    font-size: ${({ theme }) => theme.font.size.md};
    font-weight: ${({ theme }) => theme.font.weight.medium};
  }

  small {
    font-size: ${({ theme }) => theme.font.size.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const CounterControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const CounterButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  background: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.text.primary};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const CounterValue = styled.span`
  min-width: 20px;
  text-align: center;
  font-size: ${({ theme }) => theme.font.size.md};
`;

export const FilterActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const ClearButton = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const ApplyButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.common.white};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.hover};
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 24px;
  gap: 4px;
`;

export const PaginationButton = styled.button<{ $active?: boolean }>`
  min-width: 32px;
  height: 32px;
  padding: 0 12px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.text.primary : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.common.white : theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.font.weight.bold : theme.font.weight.medium};
  cursor: pointer;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: ${({ theme, $active }) =>
      $active ? theme.colors.text.primary : theme.colors.border.light};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const PaginationEllipsis = styled.span`
  padding: 0 4px;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.font.size.sm};
`;

