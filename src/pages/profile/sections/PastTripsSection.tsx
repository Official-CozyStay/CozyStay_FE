import { useNavigate } from "react-router-dom";
import {
  ContentTitle,
  EmptyState,
  EmptyText,
  PrimaryButton,
} from "../profile.styles";
import styled from "styled-components";

const TripImage = styled.div`
  width: 180px;
  height: 180px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 120px;
`;

const PastTripsSection = () => {
  const navigate = useNavigate();

  const handleBookTrip = () => {
    navigate("/");
  };

  return (
    <>
      <ContentTitle>이전 여행</ContentTitle>

      <EmptyState>
        <TripImage>🧳</TripImage>
        <EmptyText>
          CozyStay에서 첫 여행을 마치면 이곳에 이전 예약
          <br />
          내역이 표시됩니다.
        </EmptyText>
        <PrimaryButton onClick={handleBookTrip}>여행 예약</PrimaryButton>
      </EmptyState>
    </>
  );
};

export default PastTripsSection;
