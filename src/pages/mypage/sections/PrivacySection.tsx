import {
  ContentTitle,
  Section,
  SectionTitle,
} from "../mypage.styles";
import InfoItemList from "../components/InfoItemList";
import type { InfoItemData } from "../components/InfoItemList";

const PrivacySection = () => {
  const sharingData: InfoItemData[] = [
    {
      id: "activity-sharing",
      label: "활동 공유",
      value: "리뷰, 프로필 등 나의 활동을 다른 사용자에게 공유할지 결정하세요.",
      action: "관리",
    },
    {
      id: "search-engine",
      label: "검색 엔진 노출",
      value: "노출 안 함",
      action: "수정",
    },
  ];

  const dataManagement: InfoItemData[] = [
    {
      id: "data-request",
      label: "개인정보 요청",
      value: "CozyStay가 보유한 내 개인정보 사본을 요청하세요.",
      action: "요청",
    },
    {
      id: "data-delete",
      label: "데이터 삭제",
      value:
        "계정과 개인정보를 영구적으로 삭제합니다. 이 작업은 되돌릴 수 없습니다.",
      action: "삭제 요청",
    },
  ];

  const servicesData: InfoItemData[] = [
    {
      id: "connected-services",
      label: "연결된 서비스",
      value: "CozyStay 계정에 연결된 외부 서비스가 없습니다.",
      action: "관리",
    },
    {
      id: "encryption",
      label: "메시지 암호화",
      value: "활성화됨",
      action: "관리",
    },
  ];

  return (
    <>
      <ContentTitle>개인정보 보호</ContentTitle>

      <Section>
        <SectionTitle>공유 설정</SectionTitle>
        <InfoItemList items={sharingData} />
      </Section>

      <Section>
        <SectionTitle>데이터 관리</SectionTitle>
        <InfoItemList items={dataManagement} />
      </Section>

      <Section>
        <SectionTitle>서비스</SectionTitle>
        <InfoItemList items={servicesData} />
      </Section>
    </>
  );
};

export default PrivacySection;
