import styled from "styled-components";

/** Footer가 차지하는 높이만큼 하단 여백 (가려지지 않도록) */
const FOOTER_OFFSET = 96;

/**
 * 메시지 페이지만의 레이아웃: PublicLayout을 건드리지 않고
 * fixed로 헤더 바로 아래 ~ (뷰포트 하단 - Footer 여백)까지 채움.
 * top: 6xl로 메인 페이지(MainContainer padding-top: 6xl)와 동일한 시작선 맞춤.
 */
export const PageContainer = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.spacing["6xl"]};
  left: 0;
  right: 0;
  bottom: ${FOOTER_OFFSET}px;
  z-index: 0;
  box-sizing: border-box;
  padding: 0 ${({ theme }) => theme.spacing["5xl"]}
    ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background.default};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  gap: ${({ theme }) => theme.spacing["2xl"]};
`;

export const ConversationsColumn = styled.section`
  width: 340px;
  min-width: 280px;
  max-width: 380px;
  min-height: 0;
  border-radius: ${({ theme }) => theme.radius.xl};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.common.white};
  display: flex;
  flex-direction: column;
`;

export const ChatColumn = styled.section`
  flex: 1;
  min-width: 0;
  min-height: 0;
  border-radius: ${({ theme }) => theme.radius.xl};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  background: ${({ theme }) => theme.colors.common.white};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

