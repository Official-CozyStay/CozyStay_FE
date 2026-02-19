import { useNavigate } from "react-router-dom";
import { ClipboardList } from "lucide-react";
import {
  ContentTitle,
  EditButton,
  ProfileCard,
  ProfileCardLeft,
  ProfileAvatar,
  ProfileName,
  ProfileRole,
  ProfileCardRight,
  ProfileCompleteBox,
  ProfileCompleteTitle,
  ProfileCompleteDesc,
  PrimaryButton,
  ReviewSection,
  ReviewIcon,
  ReviewText,
} from "../profile.styles";

interface IntroSectionProps {
  userName: string;
  userInitial: string;
}

const IntroSection = ({ userName, userInitial }: IntroSectionProps) => {
  const navigate = useNavigate();

  return (
    <>
      <ContentTitle>
        자기소개
        <EditButton>수정</EditButton>
      </ContentTitle>

      <ProfileCard>
        <ProfileCardLeft>
          <ProfileAvatar>{userInitial}</ProfileAvatar>
          <ProfileName>{userName}</ProfileName>
          <ProfileRole>게스트</ProfileRole>
        </ProfileCardLeft>

        <ProfileCardRight>
          <ProfileCompleteBox>
            <ProfileCompleteTitle>프로필 작성 완료하기</ProfileCompleteTitle>
            <ProfileCompleteDesc>
              프로필은 CozyStay를 통한 예약 과정에서 중요한 역할을 합니다.
              <br />
              다른 호스트와 게스트에게 나를 알릴 수 있도록 프로필 작성을 완료해
              주세요.
            </ProfileCompleteDesc>
            <PrimaryButton onClick={() => navigate("/account")}>
              시작하기
            </PrimaryButton>
          </ProfileCompleteBox>
        </ProfileCardRight>
      </ProfileCard>

      <ReviewSection>
        <ReviewIcon>
          <ClipboardList size={24} />
        </ReviewIcon>
        <ReviewText>내가 작성한 후기</ReviewText>
      </ReviewSection>
    </>
  );
};

export default IntroSection;
