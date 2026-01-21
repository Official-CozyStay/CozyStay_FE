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

const HostingToolsSection = () => {
  const hostingTools = [
    {
      label: "전문 호스팅 도구",
      value: "여러 숙소를 관리하는 전문 호스트를 위한 도구입니다.",
      action: "시작하기",
    },
    {
      label: "팀 관리",
      value: "공동 호스트와 팀원을 추가하여 숙소를 함께 관리하세요.",
      action: "설정",
    },
  ];

  const apiSettings = [
    {
      label: "API 연동",
      value: "외부 채널 관리자나 PMS와 연동할 수 있습니다.",
      action: "관리",
    },
    {
      label: "내보내기",
      value: "예약 데이터 및 수입 내역을 내보냅니다.",
      action: "내보내기",
    },
  ];

  const promotionTools = [
    {
      label: "프로모션",
      value: "특별 할인 및 프로모션을 설정하여 더 많은 예약을 받으세요.",
      action: "만들기",
    },
    {
      label: "성과 분석",
      value: "숙소 성과와 시장 동향을 분석합니다.",
      action: "보기",
    },
  ];

  return (
    <>
      <ContentTitle>전문 호스팅 도구</ContentTitle>

      {/* 호스팅 도구 섹션 */}
      <Section>
        <SectionTitle>관리 도구</SectionTitle>
        <InfoList>
          {hostingTools.map((item, index) => (
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

      {/* API 설정 섹션 */}
      <Section>
        <SectionTitle>연동 및 내보내기</SectionTitle>
        <InfoList>
          {apiSettings.map((item, index) => (
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

      {/* 프로모션 도구 섹션 */}
      <Section>
        <SectionTitle>프로모션 및 분석</SectionTitle>
        <InfoList>
          {promotionTools.map((item, index) => (
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

export default HostingToolsSection;

