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

type SecurityTab = "login" | "access";

const SecuritySection = () => {
  const [activeTab, setActiveTab] = useState<SecurityTab>("login");

  const tabs = [
    { key: "login" as const, label: "로그인" },
    { key: "access" as const, label: "접근 권한 공유" },
  ];

  // 로그인 탭 데이터
  const loginData = {
    password: {
      label: "비밀번호",
      value: "생성되지 않음",
      action: "비밀번호 생성",
    },
  };

  const snsAccounts = [
    {
      label: "구글",
      value: "연결됨",
      action: "연결 해제",
    },
  ];

  const accountSettings = [
    {
      label: "계정 비활성화",
      value: "이 작업은 되돌릴 수 없습니다.",
      action: "비활성화",
    },
  ];

  // 접근 권한 공유 탭 데이터 (목업)
  const accessData = [
    {
      label: "공유된 접근 권한",
      value: "다른 사람과 공유한 접근 권한이 없습니다.",
      action: "관리",
    },
  ];

  return (
    <>
      <ContentTitle>로그인 및 보안</ContentTitle>

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

      {activeTab === "login" ? (
        <>
          {/* 로그인 섹션 */}
          <Section>
            <SectionTitle>로그인</SectionTitle>
            <InfoList>
              <InfoItem>
                <InfoContent>
                  <InfoLabel>{loginData.password.label}</InfoLabel>
                  <InfoValue>{loginData.password.value}</InfoValue>
                </InfoContent>
                <InfoAction>{loginData.password.action}</InfoAction>
              </InfoItem>
            </InfoList>
          </Section>

          {/* SNS 계정 섹션 */}
          <Section>
            <SectionTitle>SNS 계정</SectionTitle>
            <InfoList>
              {snsAccounts.map((account, index) => (
                <InfoItem key={index}>
                  <InfoContent>
                    <InfoLabel>{account.label}</InfoLabel>
                    <InfoValue>{account.value}</InfoValue>
                  </InfoContent>
                  <InfoAction>{account.action}</InfoAction>
                </InfoItem>
              ))}
            </InfoList>
          </Section>

          {/* 계정 섹션 */}
          <Section>
            <SectionTitle>계정</SectionTitle>
            <InfoList>
              {accountSettings.map((setting, index) => (
                <InfoItem key={index}>
                  <InfoContent>
                    <InfoLabel>{setting.label}</InfoLabel>
                    <InfoValue>{setting.value}</InfoValue>
                  </InfoContent>
                  <InfoAction>{setting.action}</InfoAction>
                </InfoItem>
              ))}
            </InfoList>
          </Section>
        </>
      ) : (
        /* 접근 권한 공유 탭 */
        <Section>
          <InfoList>
            {accessData.map((item, index) => (
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
      )}
    </>
  );
};

export default SecuritySection;

