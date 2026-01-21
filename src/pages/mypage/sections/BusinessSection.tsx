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

const BusinessSection = () => {
  const businessProfile = [
    {
      label: "출장 이메일",
      value: "출장용 이메일을 등록하면 회사에서 여행 경비를 쉽게 관리할 수 있습니다.",
      action: "추가",
    },
    {
      label: "회사",
      value: "연결된 회사가 없습니다.",
      action: "추가",
    },
  ];

  const businessSettings = [
    {
      label: "경비 처리",
      value: "출장 예약 내역과 영수증을 자동으로 받아보세요.",
      action: "설정",
    },
    {
      label: "출장 프로그램",
      value: "회사의 출장 프로그램에 참여하세요.",
      action: "자세히 알아보기",
    },
  ];

  return (
    <>
      <ContentTitle>출장</ContentTitle>

      {/* 출장 프로필 섹션 */}
      <Section>
        <SectionTitle>출장 프로필</SectionTitle>
        <InfoList>
          {businessProfile.map((item, index) => (
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

      {/* 출장 설정 섹션 */}
      <Section>
        <SectionTitle>설정</SectionTitle>
        <InfoList>
          {businessSettings.map((item, index) => (
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

export default BusinessSection;

