import React from 'react';
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
  Divider,
  ButtonGroup,
  OptionButton,
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
  const isBusiness = data.isBusiness;

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
        <Title>몇 가지 세부사항을 입력해 주세요</Title>
        <Subtitle>
          금융 규정 준수와 사기 방지를 위해 필요한 절차입니다.
        </Subtitle>
      </TitleSection>

      <Section>
        <SectionTitle>거주지 주소 정보</SectionTitle>
        <SectionDescription>
          이 정보는 게스트에게 공개되지 않습니다.
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
              placeholder="도/특별·광역시"
              value={location.province}
              onChange={(e) => updateLocation('province', e.target.value)}
            />
            <Input
              type="text"
              placeholder="도시(해당하는 경우)"
              value={location.city}
              onChange={(e) => updateLocation('city', e.target.value)}
            />
            <Input
              type="text"
              placeholder="군/구(해당하는 경우)"
              value={location.district}
              onChange={(e) => updateLocation('district', e.target.value)}
            />
            <Input
              type="text"
              placeholder="도로명 주소"
              value={location.streetAddress}
              onChange={(e) => updateLocation('streetAddress', e.target.value)}
            />
            <Input
              type="text"
              placeholder="아파트 층수/호수, 건물명(해당하는 경우)"
              value={location.detailAddress}
              onChange={(e) => updateLocation('detailAddress', e.target.value)}
            />
            <Input
              type="text"
              placeholder="우편번호(해당하는 경우)"
              value={location.postalCode}
              onChange={(e) => updateLocation('postalCode', e.target.value)}
            />
          </InputGroup>
        </FormGroup>
      </Section>

      <Divider />

      <Section>
        <SectionTitle>사업자로 호스팅하시나요?</SectionTitle>
        <SectionDescription>
          관할 세무서에 사업자로 등록하신 경우를 말합니다.{' '}
          <a href="#">자세히 알아보기</a>
        </SectionDescription>

        <ButtonGroup>
          <OptionButton
            $selected={isBusiness === true}
            onClick={() => onDataChange({ isBusiness: true })}
          >
            예
          </OptionButton>
          <OptionButton
            $selected={isBusiness === false}
            onClick={() => onDataChange({ isBusiness: false })}
          >
            아니요
          </OptionButton>
        </ButtonGroup>
      </Section>
    </DetailsContainer>
  );
};

export default HostDetails;
