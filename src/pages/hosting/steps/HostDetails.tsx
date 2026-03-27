import { ChevronDown } from 'lucide-react';
import {
  DetailsContainer,
  TitleSection,
  Title,
  Subtitle,
  Section,
  SectionTitle,
  SectionDescription,
  FormGroup,
  SelectWrapper,
  SelectLabel,
  Select,
  SelectIcon,
  InputGroup,
  Input,
} from './HostDetails.styles';
import type { StepProps } from '../BecomeHostPage';

const HostDetails = ({ data, onDataChange }: StepProps) => {
  const location = data.location || {
    country: '한국',
    province: '',
    city: '',
    district: '',
    streetAddress: '',
    detailAddress: '',
    postalCode: '',
  };

  const updateLocation = (field: string, value: string) => {
    onDataChange({
      location: {
        ...location,
        [field]: value,
      },
    });
  };

  return (
    <DetailsContainer>
      <TitleSection>
        <Title>숙소 주소 정보를 입력해 주세요</Title>
        <Subtitle>
          정확한 주소를 입력해주세요. 예약 확정 전까지 게스트에게 공개되지
          않습니다.
        </Subtitle>
      </TitleSection>

      <Section>
        <SectionTitle>주소 정보</SectionTitle>
        <SectionDescription>
          숙소의 정확한 위치를 입력해주세요.
        </SectionDescription>

        <FormGroup>
          <SelectWrapper>
            <SelectLabel>국가/지역</SelectLabel>
            <Select
              value={location.country}
              onChange={(e) => updateLocation('country', e.target.value)}
            >
              <option value="한국">한국</option>
              <option value="미국">미국</option>
              <option value="일본">일본</option>
              <option value="중국">중국</option>
            </Select>
            <SelectIcon>
              <ChevronDown size={20} />
            </SelectIcon>
          </SelectWrapper>
        </FormGroup>

        <FormGroup>
          <InputGroup>
            <Input
              type="text"
              placeholder="도/특별·광역시 *"
              value={location.province}
              onChange={(e) => updateLocation('province', e.target.value)}
            />
            <Input
              type="text"
              placeholder="시/군/구 *"
              value={location.city}
              onChange={(e) => updateLocation('city', e.target.value)}
            />
            <Input
              type="text"
              placeholder="읍/면/동(해당하는 경우)"
              value={location.district}
              onChange={(e) => updateLocation('district', e.target.value)}
            />
            <Input
              type="text"
              placeholder="도로명 주소 *"
              value={location.streetAddress}
              onChange={(e) => updateLocation('streetAddress', e.target.value)}
            />
            <Input
              type="text"
              placeholder="상세주소 (아파트 동/호수, 건물명 등)"
              value={location.detailAddress}
              onChange={(e) => updateLocation('detailAddress', e.target.value)}
            />
            <Input
              type="text"
              placeholder="우편번호"
              value={location.postalCode}
              onChange={(e) => updateLocation('postalCode', e.target.value)}
            />
          </InputGroup>
        </FormGroup>
      </Section>
    </DetailsContainer>
  );
};

export default HostDetails;
