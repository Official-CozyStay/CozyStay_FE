import {
  ContentTitle,
  InfoList,
  InfoItem,
  InfoContent,
  InfoLabel,
  InfoValue,
  InfoAction,
} from "../mypage.styles";

const PersonalInfoSection = () => {
  const personalInfo = [
    {
      label: "실명",
      value: "예은 박",
      action: "수정",
    },
    {
      label: "선호하는 이름",
      value: "미제출",
      action: "추가",
    },
    {
      label: "이메일 주소",
      value: "y***3@gmail.com",
      action: "수정",
    },
    {
      label: "전화번호",
      value:
        "예약이 확정된 게스트나 에어비앤비로부터 연락을 받을 전화번호를 입력하세요. 전화번호를 여러 개 추가하고 번호별 사용 목적을 정하실 수 있습니다.",
      action: "추가",
    },
    {
      label: "본인 인증",
      value: "시작 안 함",
      action: "시작",
    },
    {
      label: "거주지 주소",
      value: "제출 완료",
      action: "수정",
    },
    {
      label: "우편 주소",
      value: "미제출",
      action: "추가",
    },
    {
      label: "비상 연락처",
      value: "미제출",
      action: "추가",
    },
  ];

  return (
    <>
      <ContentTitle>개인 정보</ContentTitle>
      <InfoList>
        {personalInfo.map((info, index) => (
          <InfoItem key={index}>
            <InfoContent>
              <InfoLabel>{info.label}</InfoLabel>
              <InfoValue>{info.value}</InfoValue>
            </InfoContent>
            <InfoAction>{info.action}</InfoAction>
          </InfoItem>
        ))}
      </InfoList>
    </>
  );
};

export default PersonalInfoSection;

