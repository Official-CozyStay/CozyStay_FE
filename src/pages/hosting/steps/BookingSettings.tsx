import { CalendarCheck, Zap } from 'lucide-react';
import {
  BookingContainer,
  TitleSection,
  Title,
  Subtitle,
  OptionList,
  OptionCard,
  OptionContent,
  OptionTitle,
  RecommendTag,
  OptionDescription,
  IconWrapper,
  TimeSection,
  TimeSectionTitle,
  TimeInputGroup,
  TimeInputWrapper,
  TimeLabel,
  TimeSelect,
} from './BookingSettings.styles';
import type { StepProps } from '../BecomeHostPage';

type BookingOption = 'review' | 'instant';

const timeOptions = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
];

const BookingSettings = ({ data, onDataChange }: StepProps) => {
  const selected: BookingOption = data.bookingSettings || 'review';
  const checkInTime = data.checkInTime || '15:00';
  const checkOutTime = data.checkOutTime || '11:00';

  const handleSelect = (option: BookingOption) => {
    onDataChange({ bookingSettings: option });
  };

  const handleCheckInChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onDataChange({ checkInTime: e.target.value });
  };

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onDataChange({ checkOutTime: e.target.value });
  };

  return (
    <BookingContainer>
      <TitleSection>
        <Title>예약 설정 선택</Title>
        <Subtitle>이 설정은 언제든지 변경하실 수 있습니다.</Subtitle>
      </TitleSection>

      <OptionList>
        <OptionCard
          $selected={selected === 'review'}
          onClick={() => handleSelect('review')}
        >
          <OptionContent>
            <OptionTitle>최초 5건 예약은 직접 검토 후 승인</OptionTitle>
            <RecommendTag>추천</RecommendTag>
            <OptionDescription>
              처음 몇 건의 예약에 대해서는 요청을 직접 검토한 후 승인 여부를
              결정하고, 그 이후에는 즉시 예약 기능을 사용해 예약을 자동
              확정합니다.
            </OptionDescription>
          </OptionContent>
          <IconWrapper>
            <CalendarCheck size={32} />
          </IconWrapper>
        </OptionCard>

        <OptionCard
          $selected={selected === 'instant'}
          onClick={() => handleSelect('instant')}
        >
          <OptionContent>
            <OptionTitle>즉시 예약 사용</OptionTitle>
            <OptionDescription>
              게스트가 바로 예약할 수 있도록 즉시 예약 기능을 설정해 보세요.
            </OptionDescription>
          </OptionContent>
          <IconWrapper>
            <Zap size={32} />
          </IconWrapper>
        </OptionCard>
      </OptionList>

      <TimeSection>
        <TimeSectionTitle>체크인/체크아웃 시간</TimeSectionTitle>
        <TimeInputGroup>
          <TimeInputWrapper>
            <TimeLabel>체크인</TimeLabel>
            <TimeSelect value={checkInTime} onChange={handleCheckInChange}>
              {timeOptions.map((time) => (
                <option key={`checkin-${time}`} value={time}>
                  {time}
                </option>
              ))}
            </TimeSelect>
          </TimeInputWrapper>
          <TimeInputWrapper>
            <TimeLabel>체크아웃</TimeLabel>
            <TimeSelect value={checkOutTime} onChange={handleCheckOutChange}>
              {timeOptions.map((time) => (
                <option key={`checkout-${time}`} value={time}>
                  {time}
                </option>
              ))}
            </TimeSelect>
          </TimeInputWrapper>
        </TimeInputGroup>
      </TimeSection>
    </BookingContainer>
  );
};

export default BookingSettings;
