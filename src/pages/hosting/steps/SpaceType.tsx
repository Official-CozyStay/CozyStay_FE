import React from 'react';
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
import type { StepProps } from '../BecomeHostPage';

// 백엔드 API accommodationType 값에 맞춤
const types = [
  {
    id: 'entire_place',
    label: '공간 전체',
    description: '게스트가 숙소 전체를 단독으로 사용합니다.',
    icon: <Home size={32} />,
  },
  {
    id: 'private_room',
    label: '개인실',
    description: '단독으로 사용하는 개인실이 있고, 공용 공간도 있는 형태입니다.',
    icon: <DoorOpen size={32} />,
  },
  {
    id: 'shared_room',
    label: '다인실',
    description: '게스트가 다른 사람과 함께 사용하는 공용 공간에서 머무릅니다.',
    icon: <Users size={32} />,
  },
];

const SpaceType = ({ data, onDataChange }: StepProps) => {
  const selected = data.spaceType || null;

  const handleSelect = (spaceTypeId: string) => {
    onDataChange({ spaceType: spaceTypeId });
  };

  return (
    <TypeContainer>
      <Title>게스트가 사용할 숙소 유형</Title>
      <TypeList>
        {types.map((type) => (
          <TypeItem
            key={type.id}
            $selected={selected === type.id}
            onClick={() => handleSelect(type.id)}
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

