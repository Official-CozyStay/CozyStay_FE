import { ContentTitle, Section, SectionTitle } from '../account.styles';
import InfoItemList from '../components/InfoItemList';
import type { InfoItemData } from '../components/InfoItemList';

const NotificationsSection = () => {
  const reservationNotifications: InfoItemData[] = [
    {
      id: 'reservation-alert',
      label: '예약 알림',
      value: '예약 확인, 체크인 알림, 리뷰 요청 등을 받습니다.',
      action: '관리',
    },
    {
      id: 'messages',
      label: '메시지',
      value: '호스트 및 게스트로부터 새 메시지가 도착하면 알림을 받습니다.',
      action: '관리',
    },
  ];

  const promotionNotifications: InfoItemData[] = [
    {
      id: 'promotions',
      label: '프로모션 및 팁',
      value: 'CozyStay의 특별 할인 및 여행 팁을 받습니다.',
      action: '수정',
    },
    {
      id: 'recommendations',
      label: '추천 숙소',
      value: '관심 있을 만한 숙소 추천을 받습니다.',
      action: '수정',
    },
    {
      id: 'newsletter',
      label: '뉴스레터',
      value: '구독 중',
      action: '구독 취소',
    },
  ];

  const notificationMethods: InfoItemData[] = [
    {
      id: 'email',
      label: '이메일',
      value: 'y***3@gmail.com으로 알림을 받습니다.',
      action: '관리',
    },
    {
      id: 'push',
      label: '푸시 알림',
      value: '모바일 기기로 푸시 알림을 받습니다.',
      action: '관리',
    },
    {
      id: 'sms',
      label: 'SMS',
      value: '등록된 전화번호가 없습니다.',
      action: '추가',
    },
  ];

  return (
    <>
      <ContentTitle>알림</ContentTitle>

      <Section>
        <SectionTitle>예약 관련</SectionTitle>
        <InfoItemList items={reservationNotifications} />
      </Section>

      <Section>
        <SectionTitle>프로모션</SectionTitle>
        <InfoItemList items={promotionNotifications} />
      </Section>

      <Section>
        <SectionTitle>알림 수신 방법</SectionTitle>
        <InfoItemList items={notificationMethods} />
      </Section>
    </>
  );
};

export default NotificationsSection;
