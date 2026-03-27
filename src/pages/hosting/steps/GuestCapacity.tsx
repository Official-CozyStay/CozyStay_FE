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
} from './GuestCapacity.styles';
import type { StepProps } from '../BecomeHostPage';

const GuestCapacity = ({ data, onDataChange }: StepProps) => {
  const guests = data.guests || 1;
  const rooms = data.rooms || 1;
  const bedrooms = data.bedrooms || 1;
  const beds = data.beds || 1;
  const bathrooms = data.bathrooms || 1;

  const updateCount = (
    type: 'guests' | 'rooms' | 'bedrooms' | 'beds' | 'bathrooms',
    delta: number,
  ) => {
    const currentValue = data[type] || 1;
    onDataChange({ [type]: Math.max(1, currentValue + delta) });
  };

  return (
    <BasicsContainer>
      <TitleSection>
        <Title>기본 사항 작성하기</Title>
        <Subtitle>숙소의 기본 정보를 알려주세요.</Subtitle>
      </TitleSection>

      <CounterList>
        <CounterItem>
          <CounterLabel>게스트</CounterLabel>
          <CounterControls>
            <IconButton
              onClick={() => updateCount('guests', -1)}
              disabled={guests <= 1}
            >
              <Minus size={18} />
            </IconButton>
            <CounterValue>{guests}</CounterValue>
            <IconButton onClick={() => updateCount('guests', 1)}>
              <Plus size={18} />
            </IconButton>
          </CounterControls>
        </CounterItem>

        <CounterItem>
          <CounterLabel>방</CounterLabel>
          <CounterControls>
            <IconButton
              onClick={() => updateCount('rooms', -1)}
              disabled={rooms <= 1}
            >
              <Minus size={18} />
            </IconButton>
            <CounterValue>{rooms}</CounterValue>
            <IconButton onClick={() => updateCount('rooms', 1)}>
              <Plus size={18} />
            </IconButton>
          </CounterControls>
        </CounterItem>

        <CounterItem>
          <CounterLabel>침실</CounterLabel>
          <CounterControls>
            <IconButton
              onClick={() => updateCount('bedrooms', -1)}
              disabled={bedrooms <= 1}
            >
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
            <IconButton
              onClick={() => updateCount('beds', -1)}
              disabled={beds <= 1}
            >
              <Minus size={18} />
            </IconButton>
            <CounterValue>{beds}</CounterValue>
            <IconButton onClick={() => updateCount('beds', 1)}>
              <Plus size={18} />
            </IconButton>
          </CounterControls>
        </CounterItem>

        <CounterItem>
          <CounterLabel>욕실</CounterLabel>
          <CounterControls>
            <IconButton
              onClick={() => updateCount('bathrooms', -1)}
              disabled={bathrooms <= 1}
            >
              <Minus size={18} />
            </IconButton>
            <CounterValue>{bathrooms}</CounterValue>
            <IconButton onClick={() => updateCount('bathrooms', 1)}>
              <Plus size={18} />
            </IconButton>
          </CounterControls>
        </CounterItem>
      </CounterList>
    </BasicsContainer>
  );
};

export default GuestCapacity;
