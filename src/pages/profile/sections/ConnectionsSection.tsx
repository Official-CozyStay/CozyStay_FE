import { useNavigate } from "react-router-dom";
import {
  ContentTitle,
  EmptyState,
  EmptyText,
  EmptyLink,
  PrimaryButton,
} from "../profile.styles";
import styled from "styled-components";

const ConnectionImage = styled.div`
  width: 200px;
  height: 150px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 100px;
`;

const ConnectionsSection = () => {
  const navigate = useNavigate();

  const handleBookTrip = () => {
    navigate("/");
  };

  return (
    <>
      <ContentTitle>인연</ContentTitle>

      <EmptyState>
        <ConnectionImage>👥</ConnectionImage>
        <EmptyText>
          체험에 참여하거나 여행에 일행을 초대하면, 다른
          <br />
          게스트의 프로필이 여기에 표시됩니다.
        </EmptyText>
        <EmptyLink>자세히 알아보기</EmptyLink>
        <PrimaryButton onClick={handleBookTrip}>여행 예약</PrimaryButton>
      </EmptyState>
    </>
  );
};

export default ConnectionsSection;
