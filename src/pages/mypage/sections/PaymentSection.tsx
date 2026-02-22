import { useState } from 'react';
import {
  ContentTitle,
  TabNav,
  TabItem,
  Section,
  SectionTitle,
} from '../mypage.styles';
import InfoItemList from '../components/InfoItemList';
import type { InfoItemData } from '../components/InfoItemList';

type PaymentTab = 'payment' | 'payout';

const PaymentSection = () => {
  const [activeTab, setActiveTab] = useState<PaymentTab>('payment');

  const tabs = [
    { key: 'payment' as const, label: '결제 수단' },
    { key: 'payout' as const, label: '대금 수령' },
  ];

  const paymentMethods: InfoItemData[] = [
    {
      id: 'payment-method',
      label: '결제 수단',
      value:
        '등록된 결제 수단이 없습니다. 결제 수단을 추가하면 더 빠르게 예약할 수 있습니다.',
      action: '추가',
    },
  ];

  const paymentSettings: InfoItemData[] = [
    {
      id: 'coupon',
      label: '쿠폰',
      value: '사용 가능한 쿠폰이 없습니다.',
      action: '쿠폰 추가',
    },
    {
      id: 'credit',
      label: '크레딧',
      value: '₩0',
      action: '보기',
    },
    {
      id: 'gift-card',
      label: '기프트 카드',
      value: '기프트 카드를 추가하여 결제에 사용하세요.',
      action: '추가',
    },
  ];

  const payoutMethods: InfoItemData[] = [
    {
      id: 'payout-method',
      label: '대금 수령 방법',
      value:
        '등록된 대금 수령 방법이 없습니다. 호스팅 대금을 받으려면 수령 방법을 추가하세요.',
      action: '설정',
    },
  ];

  const payoutSettings: InfoItemData[] = [
    {
      id: 'payout-schedule',
      label: '대금 수령 일정',
      value: '예약 체크인 24시간 후 대금이 지급됩니다.',
      action: '자세히 알아보기',
    },
    {
      id: 'transaction-history',
      label: '거래 내역',
      value: '완료된 거래 내역을 확인합니다.',
      action: '보기',
    },
  ];

  return (
    <>
      <ContentTitle>결제 및 대금 수령</ContentTitle>

      <TabNav>
        {tabs.map((tab) => (
          <TabItem
            key={tab.key}
            $active={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </TabItem>
        ))}
      </TabNav>

      {activeTab === 'payment' ? (
        <>
          <Section>
            <SectionTitle>결제 수단</SectionTitle>
            <InfoItemList items={paymentMethods} />
          </Section>

          <Section>
            <SectionTitle>쿠폰 및 크레딧</SectionTitle>
            <InfoItemList items={paymentSettings} />
          </Section>
        </>
      ) : (
        <>
          <Section>
            <SectionTitle>대금 수령 방법</SectionTitle>
            <InfoItemList items={payoutMethods} />
          </Section>

          <Section>
            <SectionTitle>설정</SectionTitle>
            <InfoItemList items={payoutSettings} />
          </Section>
        </>
      )}
    </>
  );
};

export default PaymentSection;
