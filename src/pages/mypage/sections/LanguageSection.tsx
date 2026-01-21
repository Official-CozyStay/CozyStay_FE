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

const LanguageSection = () => {
  const languageSettings = [
    {
      label: "언어",
      value: "한국어",
      action: "변경",
    },
    {
      label: "번역",
      value: "자동으로 설명과 리뷰를 번역합니다.",
      action: "관리",
    },
  ];

  const currencySettings = [
    {
      label: "통화",
      value: "대한민국 원 (₩)",
      action: "변경",
    },
    {
      label: "시간대",
      value: "서울 (GMT+9)",
      action: "변경",
    },
  ];

  return (
    <>
      <ContentTitle>언어 및 통화</ContentTitle>

      {/* 언어 설정 섹션 */}
      <Section>
        <SectionTitle>언어</SectionTitle>
        <InfoList>
          {languageSettings.map((item, index) => (
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

      {/* 통화 설정 섹션 */}
      <Section>
        <SectionTitle>통화 및 시간대</SectionTitle>
        <InfoList>
          {currencySettings.map((item, index) => (
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

export default LanguageSection;

