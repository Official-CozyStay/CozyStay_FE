import React, { useState } from 'react';
import { User, Users, UserPlus } from 'lucide-react';
import {
  OccupantsContainer,
  TitleSection,
  Title,
  Subtitle,
  OccupantGrid,
  OccupantItem,
  IconWrapper,
  Label,
  FooterText,
} from './Occupants.styles';

const occupantTypes = [
  { id: 'host', label: '호스트', icon: <User size={32} /> },
  { id: 'family', label: '호스트의 가족', icon: <Users size={32} /> },
  { id: 'other_guests', label: '다른 게스트', icon: <UserPlus size={32} /> },
  { id: 'roommate', label: '룸메이트', icon: <Users size={32} /> },
];

const Occupants: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <OccupantsContainer>
      <TitleSection>
        <Title>게스트 외에 숙소에 있을 수 있는 사람은 누구인가요?</Title>
        <Subtitle>숙박 중 다른 사람과 마주치는지 여부를 게스트에게 알려야 합니다.</Subtitle>
      </TitleSection>

      <OccupantGrid>
        {occupantTypes.map((type) => (
          <OccupantItem
            key={type.id}
            $selected={selectedIds.includes(type.id)}
            onClick={() => toggleSelection(type.id)}
          >
            <IconWrapper>{type.icon}</IconWrapper>
            <Label>{type.label}</Label>
          </OccupantItem>
        ))}
      </OccupantGrid>

      <FooterText>이 정보는 리스팅 페이지와 검색 결과에 표시됩니다.</FooterText>
    </OccupantsContainer>
  );
};

export default Occupants;

