import styled from "styled-components";
import { media } from "@/styles/media";

export {
  PageContainer,
  PageHeader,
  Logo,
  LogoText,
  HeaderLeft,
  HeaderRight,
  HostingButton,
  ProfileIconButton,
  MenuButton,
  ContentTitle,
  Divider,
  ToggleSwitch,
  AvatarCircle,
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
} from "@/styles/shared/pageLayout.styles";

export { SaveButton as CompleteButton } from "@/styles/shared/modal.styles";

export const ContentWrapper = styled.div`
  display: flex;
  max-width: 1100px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing["3xl"]} ${theme.spacing["2xl"]}`};
  gap: ${({ theme }) => theme.spacing["6xl"]};

  ${media.tablet} {
    flex-direction: column;
    padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.lg}`};
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

// 왼쪽 프로필 이미지 영역
export const ProfileImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 120px;
  align-self: flex-start;

  ${media.tablet} {
    position: static;
    width: 100%;
  }
`;

export const AvatarWrapper = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;


export const AddPhotoButton = styled.button`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: ${({ theme }) => theme.colors.common.white};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  transition: ${({ theme }) => theme.transition.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.background.hover};
  }
`;

// 오른쪽 메인 콘텐츠 영역
export const MainContent = styled.main`
  flex: 1;
  min-width: 0;
`;


export const LearnMoreLink = styled.button`
  padding: 0;
  border: none;
  background: none;
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: underline;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.normal};

  &:hover {
    opacity: 0.7;
  }
`;

// 프로필 항목 그리드
export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const ProfileItem = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.lg} 0`};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  background: none;
  text-align: left;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};

    svg {
      color: ${({ theme }) => theme.colors.primary.main};
    }

    span {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }

  svg {
    color: ${({ theme }) => theme.colors.text.secondary};
    flex-shrink: 0;
  }
`;

export const ProfileItemText = styled.span`
  font-size: ${({ theme }) => theme.font.size.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

// 자기소개 영역
export const IntroBox = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px dashed ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.md};
`;

export const IntroPlaceholder = styled.p`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const IntroAddLink = styled.button`
  padding: 0;
  border: none;
  background: none;
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: underline;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.normal};

  &:hover {
    opacity: 0.7;
  }
`;

// 여행지 영역
export const TravelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;


export const TravelStamps = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  overflow-x: auto;
  padding-bottom: ${({ theme }) => theme.spacing.sm};

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border.light};
    border-radius: ${({ theme }) => theme.radius.full};
  }
`;

export const StampCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-shrink: 0;
`;

export const StampIcon = styled.div<{ $shape?: "square" | "rounded" | "hexagon" | "circle" }>`
  width: 120px;
  height: 100px;
  border: 2px solid ${({ theme }) => theme.colors.border.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.border.primary};

  ${({ $shape, theme }) => {
    switch ($shape) {
      case "rounded":
        return `border-radius: ${theme.radius.xl};`;
      case "hexagon":
        return `
          clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
          border: none;
          background: ${theme.colors.border.primary};
          color: ${theme.colors.common.white};
        `;
      case "circle":
        return `border-radius: ${theme.radius.full};`;
      default:
        return `border-radius: ${theme.radius.md};`;
    }
  }}
`;

export const StampLabel = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const EditStampsButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.full};
  background: none;
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.normal};

  &:hover {
    opacity: 0.7;
  }
`;

// 관심사 영역
export const InterestTags = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const AddInterestButton = styled.button`
  width: 80px;
  height: 80px;
  border: 2px dashed ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.full};
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.tertiary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.normal};

  &:hover {
    opacity: 0.7;
  }
`;

export const SelectedInterestTag = styled.div`
  width: 80px;
  height: 80px;
  border: 2px solid ${({ theme }) => theme.colors.common.black};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.common.black};
  color: ${({ theme }) => theme.colors.common.white};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  padding: ${({ theme }) => theme.spacing.sm};
  word-break: keep-all;
`;

export const AddInterestTextButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.common.white};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.normal};

  &:hover {
    opacity: 0.7;
  }
`;

// 하단 완료 버튼
export const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing["2xl"]}`};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  background: ${({ theme }) => theme.colors.background.default};
  position: sticky;
  bottom: 0;
`;

