import React from 'react';
import { Minus, Plus } from 'lucide-react';
import {
  BasicsContainer,
  TitleSection,
  Title,
  Subtitle,
  CounterList,
  CounterItem,
  CounterLabel,
  CounterControls,
  IconButton,
  CounterValue,
  QuestionSection,
  RadioGroup,
  RadioOption,
  RadioInput,
  RadioLabel,
} from './GuestCapacity.styles';
import type { StepProps } from '../BecomeHostPage';

const GuestCapacity = ({ data, onDataChange }: StepProps) => {
  const guests = data.guests || 1;
  const bedrooms = data.bedrooms || 1;
  const beds = data.beds || 1;

  const updateCount = (type: 'guests' | 'bedrooms' | 'beds', delta: number) => {
    if (type === 'guests') {
      onDataChange({ guests: Math.max(1, guests + delta) });
    }
    if (type === 'bedrooms') {
      onDataChange({ bedrooms: Math.max(1, bedrooms + delta) });
    }
    if (type === 'beds') {
      onDataChange({ beds: Math.max(1, beds + delta) });
    }
  };

  return (
    <BasicsContainer>
      <TitleSection>
        <Title>기본 사항 작성하기</Title>
        <Subtitle>숙박 가능한 인원은 몇 명인가요?</Subtitle>
      </TitleSection>

      <CounterList>
        <CounterItem>
          <CounterLabel>게스트</CounterLabel>
          <CounterControls>
            <IconButton onClick={() => updateCount('guests', -1)} disabled={guests <= 1}>
              <Minus size={18} />
            </IconButton>
            <CounterValue>{guests}</CounterValue>
            <IconButton onClick={() => updateCount('guests', 1)}>
              <Plus size={18} />
            </IconButton>
          </CounterControls>
        </CounterItem>

        <CounterItem>
          <CounterLabel>침실</CounterLabel>
          <CounterControls>
            <IconButton onClick={() => updateCount('bedrooms', -1)} disabled={bedrooms <= 1}>
              <Minus size={18} />
            </IconButton>
            <CounterValue>{bedrooms}</CounterValue>
            <IconButton onClick={() => updateCount('bedrooms', 1)}>
              <Plus size={18} />
            </IconButton>
          </CounterControls>
        </CounterItem>

        <CounterItem>
          <CounterLabel>침대</CounterLabel>
          <CounterControls>
            <IconButton onClick={() => updateCount('beds', -1)} disabled={beds <= 1}>
              <Minus size={18} />
            </IconButton>
            <CounterValue>{beds}</CounterValue>
            <IconButton onClick={() => updateCount('beds', 1)}>
              <Plus size={18} />
            </IconButton>
          </CounterControls>
        </CounterItem>
      </CounterList>

      <QuestionSection>
        <Subtitle>모든 침실에 잠금 장치가 설치되어 있나요?</Subtitle>
        <RadioGroup>
          <RadioOption>
            <RadioInput 
              type="radio" 
              name="lock" 
              value="yes" 
            />
            <RadioLabel>예</RadioLabel>
          </RadioOption>
          <RadioOption>
            <RadioInput 
              type="radio" 
              name="lock" 
              value="no" 
            />
            <RadioLabel>아니요</RadioLabel>
          </RadioOption>
        </RadioGroup>
      </QuestionSection>
    </BasicsContainer>
  );
};

export default GuestCapacity;

