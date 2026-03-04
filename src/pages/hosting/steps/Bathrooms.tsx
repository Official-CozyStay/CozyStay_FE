import React from 'react';
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
import type { StepProps } from '../BecomeHostPage';

const Bathrooms = ({ data, onDataChange }: StepProps) => {
  // bathrooms 필드를 총 욕실 개수로 사용
  const bathrooms = data.bathrooms || 0;

  const updateCount = (delta: number) => {
    onDataChange({ bathrooms: Math.max(0, bathrooms + delta) });
  };

  return (
    <BathroomContainer>
      <Title>게스트가 사용하게 될 욕실은 어떤 유형인가요?</Title>

      <CounterList>
        <CounterItem>
          <TextSection>
            <Label>욕실 개수</Label>
            <Description>
              게스트가 사용할 수 있는 욕실의 총 개수입니다.
            </Description>
          </TextSection>
          <CounterControls>
            <IconButton
              onClick={() => updateCount(-1)}
              disabled={bathrooms === 0}
            >
              <Minus size={18} />
            </IconButton>
            <CounterValue>{bathrooms}</CounterValue>
            <IconButton onClick={() => updateCount(1)}>
              <Plus size={18} />
            </IconButton>
          </CounterControls>
        </CounterItem>
      </CounterList>
    </BathroomContainer>
  );
};

export default Bathrooms;
