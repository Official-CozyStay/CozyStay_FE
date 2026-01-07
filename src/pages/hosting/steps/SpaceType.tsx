import React, { useState } from 'react';
import {
  TypeContainer,
  Title,
  TypeList,
  TypeItem,
  TextContent,
  Label,
  Description,
  IconWrapper,
} from './SpaceType.styles';
import { Home, DoorOpen, Users } from 'lucide-react';

const types = [
  {
    id: 'entire',
    label: '공간 전체',
    description: '게스트가 숙소 전체를 단독으로 사용합니다.',
    icon: <Home size={32} />,
  },
  {
    id: 'room',
    label: '방',
    description: '단독으로 사용하는 개인실이 있고, 공용 공간도 있는 형태입니다.',
    icon: <DoorOpen size={32} />,
  },
  {
    id: 'hostel',
    label: '호스텔 내 다인실',
    description: '게스트는 연중무휴 직원이 상주하는 전문 숙박시설인 호스텔 내부 다인실에서 머무릅니다.',
    icon: <Users size={32} />,
  },
];

const SpaceType: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <TypeContainer>
      <Title>게스트가 사용할 숙소 유형</Title>
      <TypeList>
        {types.map((type) => (
          <TypeItem
            key={type.id}
            $selected={selected === type.id}
            onClick={() => setSelected(type.id)}
          >
            <TextContent>
              <Label>{type.label}</Label>
              <Description>{type.description}</Description>
            </TextContent>
            <IconWrapper>{type.icon}</IconWrapper>
          </TypeItem>
        ))}
      </TypeList>
    </TypeContainer>
  );
};

export default SpaceType;

