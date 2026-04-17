import React, { useState } from 'react';
import styled from 'styled-components';
import { REGIONS } from '@/constants/regions';

const PopupContainer = styled.div`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing.sm});
  left: 0;
  background: ${({ theme }) => theme.colors.common.white};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  padding: ${({ theme }) => theme.spacing.md};
  min-width: 500px;
  z-index: ${({ theme }) => theme.zIndex.searchBar};
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  max-height: 400px;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border.primary};
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const ColumnTitle = styled.div`
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: ${({ theme }) => theme.spacing.sm};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.colors.common.white};
`;

const ListItem = styled.button<{ $isSelected?: boolean }>`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.border.light : 'transparent'};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary.main : theme.colors.text.primary};
  font-weight: ${({ $isSelected, theme }) =>
    $isSelected ? theme.font.weight.bold : theme.font.weight.regular};
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.border.light};
  }
`;

const Divider = styled.div`
  width: 1px;
  background: ${({ theme }) => theme.colors.border.primary};
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

interface RegionPopupProps {
  onSelect: (province: string, city: string, district?: string) => void;
  selectedProvince?: string;
  selectedCity?: string;
  selectedDistrict?: string;
}

const RegionPopup = React.forwardRef<HTMLDivElement, RegionPopupProps>(
  ({ onSelect, selectedProvince, selectedCity, selectedDistrict }, ref) => {
    const defaultProvince = selectedProvince || '서울';
    const defaultCity = selectedCity || '';

    const [province, setProvince] = useState<string>(defaultProvince);
    const [city, setCity] = useState<string>(defaultCity);

    const provinces = Object.keys(REGIONS);
    const cities = Object.keys(REGIONS[province] || {});
    const districts = city ? REGIONS[province]?.[city] || [] : [];

    const handleProvinceClick = (e: React.MouseEvent, p: string) => {
      e.stopPropagation();
      setProvince(p);
      setCity('');
    };

    const handleCityClick = (e: React.MouseEvent, c: string) => {
      e.stopPropagation();
      setCity(c);

      const cityDistricts = REGIONS[province]?.[c] || [];
      // If there are no districts, selecting the city completes the action
      if (cityDistricts.length === 0) {
        onSelect(province, c);
      }
    };

    const handleDistrictClick = (e: React.MouseEvent, d: string) => {
      e.stopPropagation();
      // '전체' 옵션 처리
      if (d === '전체') {
        onSelect(province, city);
      } else {
        onSelect(province, city, d);
      }
    };

    return (
      <PopupContainer ref={ref} onClick={(e) => e.stopPropagation()}>
        <Column>
          <ColumnTitle>시/도</ColumnTitle>
          {provinces.map((p) => (
            <ListItem
              key={p}
              $isSelected={p === province}
              onClick={(e) => handleProvinceClick(e, p)}
            >
              {p}
            </ListItem>
          ))}
        </Column>
        <Divider />
        <Column>
          <ColumnTitle>시/군/구</ColumnTitle>
          {cities.map((c) => (
            <ListItem
              key={c}
              $isSelected={
                province === selectedProvince &&
                c === selectedCity &&
                !selectedDistrict
              }
              onClick={(e) => handleCityClick(e, c)}
            >
              {c}
            </ListItem>
          ))}
        </Column>
        {districts.length > 0 && (
          <>
            <Divider />
            <Column>
              <ColumnTitle>동/읍/면</ColumnTitle>
              <ListItem
                $isSelected={
                  province === selectedProvince &&
                  city === selectedCity &&
                  !selectedDistrict
                }
                onClick={(e) => handleDistrictClick(e, '전체')}
              >
                전체
              </ListItem>
              {districts.map((d) => (
                <ListItem
                  key={d}
                  $isSelected={
                    province === selectedProvince &&
                    city === selectedCity &&
                    d === selectedDistrict
                  }
                  onClick={(e) => handleDistrictClick(e, d)}
                >
                  {d}
                </ListItem>
              ))}
            </Column>
          </>
        )}
      </PopupContainer>
    );
  },
);

RegionPopup.displayName = 'RegionPopup';

export default RegionPopup;
