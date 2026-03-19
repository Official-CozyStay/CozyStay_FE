import { ContentTitle, Section, SectionTitle } from '../account.styles';
import InfoItemList from '../components/InfoItemList';
import type { InfoItemData } from '../components/InfoItemList';

const HostingToolsSection = () => {
  const hostingTools: InfoItemData[] = [
    {
      id: 'pro-tools',
      label: '전문 호스팅 도구',
      value: '여러 숙소를 관리하는 전문 호스트를 위한 도구입니다.',
      action: '시작하기',
    },
    {
      id: 'team',
      label: '팀 관리',
      value: '공동 호스트와 팀원을 추가하여 숙소를 함께 관리하세요.',
      action: '설정',
    },
  ];

  const apiSettings: InfoItemData[] = [
    {
      id: 'api',
      label: 'API 연동',
      value: '외부 채널 관리자나 PMS와 연동할 수 있습니다.',
      action: '관리',
    },
    {
      id: 'export',
      label: '내보내기',
      value: '예약 데이터 및 수입 내역을 내보냅니다.',
      action: '내보내기',
    },
  ];

  const promotionTools: InfoItemData[] = [
    {
      id: 'promotion',
      label: '프로모션',
      value: '특별 할인 및 프로모션을 설정하여 더 많은 예약을 받으세요.',
      action: '만들기',
    },
    {
      id: 'analytics',
      label: '성과 분석',
      value: '숙소 성과와 시장 동향을 분석합니다.',
      action: '보기',
    },
  ];

  return (
    <>
      <ContentTitle>전문 호스팅 도구</ContentTitle>

      <Section>
        <SectionTitle>관리 도구</SectionTitle>
        <InfoItemList items={hostingTools} />
      </Section>

      <Section>
        <SectionTitle>연동 및 내보내기</SectionTitle>
        <InfoItemList items={apiSettings} />
      </Section>

      <Section>
        <SectionTitle>프로모션 및 분석</SectionTitle>
        <InfoItemList items={promotionTools} />
      </Section>
    </>
  );
};

export default HostingToolsSection;
