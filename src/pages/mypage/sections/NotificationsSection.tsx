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

const NotificationsSection = () => {
  const reservationNotifications = [
    {
      label: "예약 알림",
      value: "예약 확인, 체크인 알림, 리뷰 요청 등을 받습니다.",
      action: "관리",
    },
    {
      label: "메시지",
      value: "호스트 및 게스트로부터 새 메시지가 도착하면 알림을 받습니다.",
      action: "관리",
    },
  ];

  const promotionNotifications = [
    {
      label: "프로모션 및 팁",
      value: "CozyStay의 특별 할인 및 여행 팁을 받습니다.",
      action: "수정",
    },
    {
      label: "추천 숙소",
      value: "관심 있을 만한 숙소 추천을 받습니다.",
      action: "수정",
    },
    {
      label: "뉴스레터",
      value: "구독 중",
      action: "구독 취소",
    },
  ];

  const notificationMethods = [
    {
      label: "이메일",
      value: "y***3@gmail.com으로 알림을 받습니다.",
      action: "관리",
    },
    {
      label: "푸시 알림",
      value: "모바일 기기로 푸시 알림을 받습니다.",
      action: "관리",
    },
    {
      label: "SMS",
      value: "등록된 전화번호가 없습니다.",
      action: "추가",
    },
  ];

  return (
    <>
      <ContentTitle>알림</ContentTitle>

      {/* 예약 관련 알림 */}
      <Section>
        <SectionTitle>예약 관련</SectionTitle>
        <InfoList>
          {reservationNotifications.map((item, index) => (
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

      {/* 프로모션 알림 */}
      <Section>
        <SectionTitle>프로모션</SectionTitle>
        <InfoList>
          {promotionNotifications.map((item, index) => (
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

      {/* 알림 수신 방법 */}
      <Section>
        <SectionTitle>알림 수신 방법</SectionTitle>
        <InfoList>
          {notificationMethods.map((item, index) => (
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

export default NotificationsSection;

