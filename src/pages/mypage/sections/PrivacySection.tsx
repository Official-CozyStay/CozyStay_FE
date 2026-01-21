import {
  ContentTitle,
  Section,
  SectionTitle,
  InfoList,
  InfoItem,
  InfoContent,
  InfoLabel,
  InfoValue,
  InfoAction,
} from "../mypage.styles";

const PrivacySection = () => {
  const sharingData = [
    {
      label: "활동 공유",
      value: "리뷰, 프로필 등 나의 활동을 다른 사용자에게 공유할지 결정하세요.",
      action: "관리",
    },
    {
      label: "검색 엔진 노출",
      value: "노출 안 함",
      action: "수정",
    },
  ];

  const dataManagement = [
    {
      label: "개인정보 요청",
      value: "CozyStay가 보유한 내 개인정보 사본을 요청하세요.",
      action: "요청",
    },
    {
      label: "데이터 삭제",
      value:
        "계정과 개인정보를 영구적으로 삭제합니다. 이 작업은 되돌릴 수 없습니다.",
      action: "삭제 요청",
    },
  ];

  const servicesData = [
    {
      label: "연결된 서비스",
      value: "CozyStay 계정에 연결된 외부 서비스가 없습니다.",
      action: "관리",
    },
    {
      label: "메시지 암호화",
      value: "활성화됨",
      action: "관리",
    },
  ];

  return (
    <>
      <ContentTitle>개인정보 보호</ContentTitle>

      {/* 공유 설정 섹션 */}
      <Section>
        <SectionTitle>공유 설정</SectionTitle>
        <InfoList>
          {sharingData.map((item, index) => (
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

      {/* 데이터 관리 섹션 */}
      <Section>
        <SectionTitle>데이터 관리</SectionTitle>
        <InfoList>
          {dataManagement.map((item, index) => (
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

      {/* 서비스 섹션 */}
      <Section>
        <SectionTitle>서비스</SectionTitle>
        <InfoList>
          {servicesData.map((item, index) => (
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
  );
};

export default PrivacySection;
