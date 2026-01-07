import React, { useState } from 'react';
import {
  CategoryContainer,
  Title,
  CategoryGrid,
  CategoryItem,
  Icon,
  Label,
} from './CategorySelect.styles';
import { Home, Building2, Warehouse, Tent, Ship, Landmark } from 'lucide-react';

const categories = [
  { id: 'house', label: '주택(예: 펜션, 한옥 등)', icon: <Home size={32} /> },
  { id: 'apartment', label: '아파트', icon: <Building2 size={32} /> },
  { id: 'cabin', label: '통나무집', icon: <Warehouse size={32} /> },
  { id: 'camping', label: '캠핑카', icon: <Tent size={32} /> },
  { id: 'boat', label: '보트', icon: <Ship size={32} /> },
  { id: 'castle', label: '캐슬', icon: <Landmark size={32} /> },
];

const CategorySelect: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <CategoryContainer>
      <Title>다음 중 숙소를 가장 잘 설명하는 것은 무엇인가요?</Title>
      <CategoryGrid>
        {categories.map((cat) => (
          <CategoryItem
            key={cat.id}
            $selected={selected === cat.id}
            onClick={() => setSelected(cat.id)}
          >
            <Icon>{cat.icon}</Icon>
            <Label>{cat.label}</Label>
          </CategoryItem>
        ))}
      </CategoryGrid>
    </CategoryContainer>
  );
};

export default CategorySelect;

