import {
  ContentTitle,
  Section,
  SectionTitle,
} from "../mypage.styles";
import InfoItemList from "../components/InfoItemList";
import type { InfoItemData } from "../components/InfoItemList";

const LanguageSection = () => {
  const languageSettings: InfoItemData[] = [
    {
      id: "language",
      label: "언어",
      value: "한국어",
      action: "변경",
    },
    {
      id: "translation",
      label: "번역",
      value: "자동으로 설명과 리뷰를 번역합니다.",
      action: "관리",
    },
  ];

  const currencySettings: InfoItemData[] = [
    {
      id: "currency",
      label: "통화",
      value: "대한민국 원 (₩)",
      action: "변경",
    },
    {
      id: "timezone",
      label: "시간대",
      value: "서울 (GMT+9)",
      action: "변경",
    },
  ];

  return (
    <>
      <ContentTitle>언어 및 통화</ContentTitle>

      <Section>
        <SectionTitle>언어</SectionTitle>
        <InfoItemList items={languageSettings} />
      </Section>

      <Section>
        <SectionTitle>통화 및 시간대</SectionTitle>
        <InfoItemList items={currencySettings} />
      </Section>
    </>
  );
};

export default LanguageSection;
