import styled from 'styled-components';

export const SearchPageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${({ theme }) => theme.layout.headerHeight.default});
  padding-top: ${({ theme }) =>
    theme.spacing['5xl']}; /* 헤더 높이만큼 패딩 추가 */
  background: ${({ theme }) => theme.colors.background.default};
`;

export const FilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  background: ${({ theme }) => theme.colors.background.default};
  flex-shrink: 0;
  position: sticky;
  top: ${({ theme }) => theme.spacing['4xl']}; /* 헤더가 작아졌을 때의 높이 */
  z-index: ${({ theme }) => theme.zIndex.sticky};
`;

export const FilterButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['6px']};
  padding: ${({ theme }) => theme.spacing['10px']}
    ${({ theme }) => theme.spacing.lg};
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
  transition: ${({ theme }) => theme.transition.all.fast};
  white-space: nowrap;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  svg {
    width: ${({ theme }) => theme.size.icon.md};
    height: ${({ theme }) => theme.size.icon.md};
  }
`;

export const FilterDivider = styled.div`
  width: ${({ theme }) => theme.spacing['1px']};
  height: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.border.light};
`;

export const ResultCount = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-left: auto;
`;

export const ContentArea = styled.div`
  display: flex;
  min-height: calc(
    100vh - ${({ theme }) => theme.layout.headerHeight.default} -
      ${({ theme }) => theme.layout.filterBarHeight}
  );
`;

export const ListSection = styled.section`
  width: 55%;
  min-width: ${({ theme }) => theme.size.width.md};
  padding: ${({ theme }) => theme.spacing['20px']}
    ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.default};
`;

export const ListHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const ListTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.regular};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
`;

export const ListCount = styled.p`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  margin: 0;
`;

export const AccommodationGrid = styled.div`
  display: grid;
  /* 6개의 고정된 아이템을 위해 명시적인 3열 그리드 사용 */
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};

  /* ListSection의 너비가 줄어들면 2열로 변경하여 카드가 너무 작아지는 것을 방지 */
  @media (max-width: 1440px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const AccommodationCard = styled.article<{ $selected?: boolean }>`
  min-width: 0;
  cursor: pointer;
  transition:
    ${({ theme }) => theme.transition.transform.fast},
    box-shadow ${({ theme }) => theme.transition.fast};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.sm};
  margin: -${({ theme }) => theme.spacing.sm};

  ${({ $selected, theme }) =>
    $selected &&
    `
    background: ${theme.colors.primary.light};
    box-shadow: ${theme.shadow.focus};
  `}

  &:hover {
    transform: ${({ theme }) => theme.transition.translateY.sm};
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
  top: ${({ theme }) => theme.spacing['10px']};
  left: ${({ theme }) => theme.spacing['10px']};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.common.white};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

export const FavoriteButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing['10px']};
  right: ${({ theme }) => theme.spacing['10px']};
  width: ${({ theme }) => theme.size.button.sm};
  height: ${({ theme }) => theme.size.button.sm};
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: ${({ theme }) => theme.size.icon.xl};
    height: ${({ theme }) => theme.size.icon.xl};
    color: ${({ theme }) => theme.colors.common.white};
    fill: rgba(0, 0, 0, 0.5);
    stroke-width: 2;
    transition: ${({ theme }) => theme.transition.all.fast};
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

export const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing['10px']} 0;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
`;

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin: 0;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CardRating = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.font.size.sm};
  flex-shrink: 0;
  margin-left: ${({ theme }) => theme.spacing.sm};

  svg {
    width: ${({ theme }) => theme.size.icon.sm};
    height: ${({ theme }) => theme.size.icon.sm};
    fill: currentColor;
  }
`;

export const CardMeta = styled.p`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.xxs};
`;

export const CardPrice = styled.p`
  font-size: ${({ theme }) => theme.font.size.md};
  margin: ${({ theme }) => theme.spacing.xs} 0 0;

  strong {
    font-weight: ${({ theme }) => theme.font.weight.bold};
  }
`;

export const MapSection = styled.section`
  flex: 1;
  position: sticky;
  top: calc(
    ${({ theme }) => theme.layout.headerHeight.default} +
      ${({ theme }) => theme.layout.filterBarHeight}
  );
  height: calc(
    100vh - ${({ theme }) => theme.layout.headerHeight.default} -
      ${({ theme }) => theme.layout.filterBarHeight}
  );
  padding: 0 ${({ theme }) => theme.spacing['40px']}
    ${({ theme }) => theme.spacing.xl} 0;
  background: ${({ theme }) => theme.colors.background.default};
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: sticky;
  top: 0;
  border-radius: ${({ theme }) => theme.radius.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

export const MapPriceMarker = styled.button<{ $selected?: boolean }>`
  padding: ${({ theme }) => theme.spacing['6px']}
    ${({ theme }) => theme.spacing['10px']};
  border-radius: ${({ theme }) => theme.radius.full};
  border: none;
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.text.primary : theme.colors.common.white};
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.common.white : theme.colors.text.primary};
  font-size: 13px; /* 특수한 경우라 토큰에 없는 값 */
  font-weight: ${({ theme }) => theme.font.weight.bold};
  box-shadow: ${({ theme }) => theme.shadow.mapMarker};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.all.fast};
  white-space: nowrap;

  &:hover {
    transform: scale(1.05);
    z-index: ${({ theme }) => theme.zIndex.tooltip};
  }
`;

// 카카오맵 마커 스타일 상수
// MapPriceMarker styled component와 동일한 스타일을 유지합니다.
// 카카오맵 CustomOverlay는 DOM 요소를 직접 받기 때문에 styled-components를 사용할 수 없어
// 인라인 스타일로 적용하기 위한 상수입니다.
// MapPriceMarker의 스타일이 변경되면 이 상수도 함께 업데이트해야 합니다.
export const MAP_MARKER_STYLES = {
  base: `
    padding: 6px 10px;
    border-radius: 9999px;
    border: none;
    background: #fff;
    color: #222;
    font-size: 13px;
    font-weight: 700;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.15s ease;
  `,
  hover: `
    background: #222;
    color: #fff;
    transform: scale(1.05);
    z-index: 10;
  `,
} as const;

// Filter Dropdown Styles
export const FilterDropdown = styled.div`
  position: absolute;
  /* left와 top은 FilterDropdownPanel에서 동적으로 계산하여 인라인 스타일로 설정 */
  min-width: ${({ theme }) => theme.size.width.sm};
  background: ${({ theme }) => theme.colors.common.white};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  padding: ${({ theme }) => theme.spacing['20px']};
  z-index: ${({ theme }) => theme.zIndex.dropdown};
`;

export const FilterSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['20px']};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const FilterLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const FilterInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing['10px']}
    ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.font.size.sm};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const SearchInputField = styled(FilterInput)`
  border-radius: ${({ theme }) => theme.radius.full};
  width: 200px;
  padding-right: 40px;
`;

export const SearchSubmitButton = styled.button`
  position: absolute;
  right: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  padding: 0;
  color: ${({ theme }) => theme.colors.text.secondary};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const FilterItemWrapper = styled.div`
  position: relative;
`;

export const PriceRangeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const PriceInput = styled(FilterInput)`
  width: ${({ theme }) => theme.size.width.xs};
`;

export const GuestCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} 0;
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
  gap: ${({ theme }) => theme.spacing.md};
`;

export const CounterButton = styled.button`
  width: ${({ theme }) => theme.size.button.sm};
  height: ${({ theme }) => theme.size.button.sm};
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  background: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${({ theme }) => theme.transition.all.fast};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.text.primary};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  svg {
    width: ${({ theme }) => theme.size.icon.sm};
    height: ${({ theme }) => theme.size.icon.sm};
  }
`;

export const CounterValue = styled.span`
  min-width: ${({ theme }) => theme.spacing['20px']};
  text-align: center;
  font-size: ${({ theme }) => theme.font.size.md};
`;

export const FilterActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
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
  padding: ${({ theme }) => theme.spacing['10px']}
    ${({ theme }) => theme.spacing['20px']};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.common.white};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.colors.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.hover};
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing['5xl']}
    ${({ theme }) => theme.spacing['2xl']};
  gap: ${({ theme }) => theme.spacing.xxs};
`;

export const PaginationButton = styled.button<{ $active?: boolean }>`
  min-width: ${({ theme }) => theme.size.button.sm};
  height: ${({ theme }) => theme.size.button.sm};
  padding: 0 ${({ theme }) => theme.spacing.md};
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
  transition: ${({ theme }) => theme.transition.all.fast};
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
    width: ${({ theme }) => theme.size.icon.md};
    height: ${({ theme }) => theme.size.icon.md};
  }
`;

export const PaginationEllipsis = styled.span`
  padding: 0 ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.font.size.sm};
`;
