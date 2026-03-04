import { ContentTitle, Section, SectionTitle } from '../account.styles';
import InfoItemList from '../components/InfoItemList';
import type { InfoItemData } from '../components/InfoItemList';

const BusinessSection = () => {
  const businessProfile: InfoItemData[] = [
    {
      id: 'business-email',
      label: '출장 이메일',
      value:
        '출장용 이메일을 등록하면 회사에서 여행 경비를 쉽게 관리할 수 있습니다.',
      action: '추가',
    },
    {
      id: 'company',
      label: '회사',
      value: '연결된 회사가 없습니다.',
      action: '추가',
    },
  ];

  const businessSettings: InfoItemData[] = [
    {
      id: 'expense',
      label: '경비 처리',
      value: '출장 예약 내역과 영수증을 자동으로 받아보세요.',
      action: '설정',
    },
    {
      id: 'program',
      label: '출장 프로그램',
      value: '회사의 출장 프로그램에 참여하세요.',
      action: '자세히 알아보기',
    },
  ];

  return (
    <>
      <ContentTitle>출장</ContentTitle>

      <Section>
        <SectionTitle>출장 프로필</SectionTitle>
        <InfoItemList items={businessProfile} />
      </Section>

      <Section>
        <SectionTitle>설정</SectionTitle>
        <InfoItemList items={businessSettings} />
      </Section>
    </>
  );
};

export default BusinessSection;
