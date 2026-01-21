import React, { useState } from "react";
import {
  ContentTitle,
  TabNav,
  TabItem,
  Section,
  SectionTitle,
  InfoList,
  InfoItem,
  InfoContent,
  InfoLabel,
  InfoValue,
  InfoAction,
} from "../mypage.styles";

type PaymentTab = "payment" | "payout";

const PaymentSection = () => {
  const [activeTab, setActiveTab] = useState<PaymentTab>("payment");

  const tabs = [
    { key: "payment" as const, label: "결제 수단" },
    { key: "payout" as const, label: "대금 수령" },
  ];

  // 결제 수단 탭 데이터
  const paymentMethods = [
    {
      label: "결제 수단",
      value: "등록된 결제 수단이 없습니다. 결제 수단을 추가하면 더 빠르게 예약할 수 있습니다.",
      action: "추가",
    },
  ];

  const paymentSettings = [
    {
      label: "쿠폰",
      value: "사용 가능한 쿠폰이 없습니다.",
      action: "쿠폰 추가",
    },
    {
      label: "크레딧",
      value: "₩0",
      action: "보기",
    },
    {
      label: "기프트 카드",
      value: "기프트 카드를 추가하여 결제에 사용하세요.",
      action: "추가",
    },
  ];

  // 대금 수령 탭 데이터
  const payoutMethods = [
    {
      label: "대금 수령 방법",
      value: "등록된 대금 수령 방법이 없습니다. 호스팅 대금을 받으려면 수령 방법을 추가하세요.",
      action: "설정",
    },
  ];

  const payoutSettings = [
    {
      label: "대금 수령 일정",
      value: "예약 체크인 24시간 후 대금이 지급됩니다.",
      action: "자세히 알아보기",
    },
    {
      label: "거래 내역",
      value: "완료된 거래 내역을 확인합니다.",
      action: "보기",
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

      {activeTab === "payment" ? (
        <>
          {/* 결제 수단 섹션 */}
          <Section>
            <SectionTitle>결제 수단</SectionTitle>
            <InfoList>
              {paymentMethods.map((item, index) => (
                <InfoItem key={index}>
                  <InfoContent>
                    <InfoLabel>{item.label}</InfoLabel>
                    <InfoValue>{item.value}</InfoValue>
                  </InfoContent>
                  <InfoAction>{item.action}</InfoAction>
                </InfoItem>
              ))}
            </InfoList>
          </Section>

          {/* 쿠폰 및 크레딧 섹션 */}
          <Section>
            <SectionTitle>쿠폰 및 크레딧</SectionTitle>
            <InfoList>
              {paymentSettings.map((item, index) => (
                <InfoItem key={index}>
                  <InfoContent>
                    <InfoLabel>{item.label}</InfoLabel>
                    <InfoValue>{item.value}</InfoValue>
                  </InfoContent>
                  <InfoAction>{item.action}</InfoAction>
                </InfoItem>
              ))}
            </InfoList>
          </Section>
        </>
      ) : (
        <>
          {/* 대금 수령 방법 섹션 */}
          <Section>
            <SectionTitle>대금 수령 방법</SectionTitle>
            <InfoList>
              {payoutMethods.map((item, index) => (
                <InfoItem key={index}>
                  <InfoContent>
                    <InfoLabel>{item.label}</InfoLabel>
                    <InfoValue>{item.value}</InfoValue>
                  </InfoContent>
                  <InfoAction>{item.action}</InfoAction>
                </InfoItem>
              ))}
            </InfoList>
          </Section>

          {/* 대금 수령 설정 섹션 */}
          <Section>
            <SectionTitle>설정</SectionTitle>
            <InfoList>
              {payoutSettings.map((item, index) => (
                <InfoItem key={index}>
                  <InfoContent>
                    <InfoLabel>{item.label}</InfoLabel>
                    <InfoValue>{item.value}</InfoValue>
                  </InfoContent>
                  <InfoAction>{item.action}</InfoAction>
                </InfoItem>
              ))}
            </InfoList>
          </Section>
        </>
      )}
    </>
  );
};

export default PaymentSection;

