import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import {
  BathroomContainer,
  Title,
  CounterList,
  CounterItem,
  TextSection,
  Label,
  Description,
  CounterControls,
  IconButton,
  CounterValue,
} from './Bathrooms.styles';

const Bathrooms = () => {
  const [counts, setCounts] = useState({
    attached: 0,
    dedicated: 0,
    shared: 0,
  });

  const updateCount = (type: keyof typeof counts, delta: number) => {
    setCounts((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  };

  return (
    <BathroomContainer>
      <Title>게스트가 사용하게 될 욕실은 어떤 유형인가요?</Title>

      <CounterList>
        <CounterItem>
          <TextSection>
            <Label>침실에 딸린 전용 욕실</Label>
            <Description>단독으로 사용하며 게스트 침실과 연결되어 있습니다.</Description>
          </TextSection>
          <CounterControls>
            <IconButton onClick={() => updateCount('attached', -1)} disabled={counts.attached === 0}>
              <Minus size={18} />
            </IconButton>
            <CounterValue>{counts.attached}</CounterValue>
            <IconButton onClick={() => updateCount('attached', 1)}>
              <Plus size={18} />
            </IconButton>
          </CounterControls>
        </CounterItem>

        <CounterItem>
          <TextSection>
            <Label>전용</Label>
            <Description>단독으로 사용하지만, 출입하려면 복도와 같은 공용 공간을 지나야 합니다.</Description>
          </TextSection>
          <CounterControls>
            <IconButton onClick={() => updateCount('dedicated', -1)} disabled={counts.dedicated === 0}>
              <Minus size={18} />
            </IconButton>
            <CounterValue>{counts.dedicated}</CounterValue>
            <IconButton onClick={() => updateCount('dedicated', 1)}>
              <Plus size={18} />
            </IconButton>
          </CounterControls>
        </CounterItem>

        <CounterItem>
          <TextSection>
            <Label>공용</Label>
            <Description>다른 사람과 공동으로 사용합니다.</Description>
          </TextSection>
          <CounterControls>
            <IconButton onClick={() => updateCount('shared', -1)} disabled={counts.shared === 0}>
              <Minus size={18} />
            </IconButton>
            <CounterValue>{counts.shared}</CounterValue>
            <IconButton onClick={() => updateCount('shared', 1)}>
              <Plus size={18} />
            </IconButton>
          </CounterControls>
        </CounterItem>
      </CounterList>
    </BathroomContainer>
  );
};

export default Bathrooms;

