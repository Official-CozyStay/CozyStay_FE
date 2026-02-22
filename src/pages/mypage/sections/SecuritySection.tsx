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

type SecurityTab = 'login' | 'access';

const SecuritySection = () => {
  const [activeTab, setActiveTab] = useState<SecurityTab>('login');

  const tabs = [
    { key: 'login' as const, label: '로그인' },
    { key: 'access' as const, label: '접근 권한 공유' },
  ];

  // 로그인 탭 데이터
  const passwordData: InfoItemData[] = [
    {
      id: 'password',
      label: '비밀번호',
      value: '생성되지 않음',
      action: '비밀번호 생성',
    },
  ];

  const snsAccounts: InfoItemData[] = [
    {
      id: 'google',
      label: '구글',
      value: '연결됨',
      action: '연결 해제',
    },
  ];

  const accountSettings: InfoItemData[] = [
    {
      id: 'deactivate',
      label: '계정 비활성화',
      value: '이 작업은 되돌릴 수 없습니다.',
      action: '비활성화',
    },
  ];

  // 접근 권한 공유 탭 데이터
  const accessData: InfoItemData[] = [
    {
      id: 'shared-access',
      label: '공유된 접근 권한',
      value: '다른 사람과 공유한 접근 권한이 없습니다.',
      action: '관리',
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

      {activeTab === 'login' ? (
        <>
          <Section>
            <SectionTitle>로그인</SectionTitle>
            <InfoItemList items={passwordData} />
          </Section>

          <Section>
            <SectionTitle>SNS 계정</SectionTitle>
            <InfoItemList items={snsAccounts} />
          </Section>

          <Section>
            <SectionTitle>계정</SectionTitle>
            <InfoItemList items={accountSettings} />
          </Section>
        </>
      ) : (
        <Section>
          <InfoItemList items={accessData} />
        </Section>
      )}
    </>
  );
};

export default SecuritySection;
