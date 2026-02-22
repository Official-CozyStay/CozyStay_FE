import { ContentTitle, Section, SectionTitle } from '../mypage.styles';
import InfoItemList from '../components/InfoItemList';
import type { InfoItemData } from '../components/InfoItemList';

const TaxSection = () => {
  const taxInfo: InfoItemData[] = [
    {
      id: 'taxpayer-info',
      label: '납세자 정보',
      value:
        '납세자 정보가 제출되지 않았습니다. 대금을 받으려면 납세자 정보를 제출하세요.',
      action: '추가',
    },
    {
      id: 'vat-id',
      label: '부가가치세(VAT) ID',
      value: '미제출',
      action: '추가',
    },
  ];

  const taxDocuments: InfoItemData[] = [
    {
      id: 'tax-documents',
      label: '세금 서류',
      value: '사용 가능한 세금 서류가 없습니다.',
      action: '보기',
    },
    {
      id: 'annual-summary',
      label: '연간 수입 요약',
      value: '호스팅 수입이 있을 경우 연간 요약을 확인할 수 있습니다.',
      action: '보기',
    },
  ];

  return (
    <>
      <ContentTitle>세금</ContentTitle>

      <Section>
        <SectionTitle>세금 정보</SectionTitle>
        <InfoItemList items={taxInfo} />
      </Section>

      <Section>
        <SectionTitle>서류</SectionTitle>
        <InfoItemList items={taxDocuments} />
      </Section>
    </>
  );
};

export default TaxSection;
