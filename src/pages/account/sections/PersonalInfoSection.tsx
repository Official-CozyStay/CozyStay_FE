import { ContentTitle } from '../account.styles';
import InfoItemList from '../components/InfoItemList';
import type { InfoItemData } from '../components/InfoItemList';

const PersonalInfoSection = () => {
  const personalInfo: InfoItemData[] = [
    {
      id: 'name',
      label: '실명',
      value: '예은 박',
      action: '수정',
    },
    {
      id: 'preferred-name',
      label: '선호하는 이름',
      value: '미제출',
      action: '추가',
    },
    {
      id: 'email',
      label: '이메일 주소',
      value: 'y***3@gmail.com',
      action: '수정',
    },
    {
      id: 'phone',
      label: '전화번호',
      value:
        '예약이 확정된 게스트나 CozyStay로부터 연락을 받을 전화번호를 입력하세요. 전화번호를 여러 개 추가하고 번호별 사용 목적을 정하실 수 있습니다.',
      action: '추가',
    },
    {
      id: 'identity',
      label: '본인 인증',
      value: '시작 안 함',
      action: '시작',
    },
    {
      id: 'address',
      label: '거주지 주소',
      value: '제출 완료',
      action: '수정',
    },
    {
      id: 'postal',
      label: '우편 주소',
      value: '미제출',
      action: '추가',
    },
    {
      id: 'emergency',
      label: '비상 연락처',
      value: '미제출',
      action: '추가',
    },
  ];

  return (
    <>
      <ContentTitle>개인 정보</ContentTitle>
      <InfoItemList items={personalInfo} />
    </>
  );
};

export default PersonalInfoSection;
