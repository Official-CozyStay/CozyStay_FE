import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

/** 채팅창 헤더 높이 (대화 목록 헤더와 동일) */
const CHAT_HEADER_MIN_HEIGHT = 56;

export const Header = styled.header`
  min-height: ${CHAT_HEADER_MIN_HEIGHT}px;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

export const PartnerName = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

export const Body = styled.div`
  flex: 1;
  min-height: 0;
  padding: ${({ theme }) => theme.spacing["2xl"]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing["2xl"]};
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.common.white};
`;

export const DateDivider = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  justify-content: center;
`;

export const DividerLine = styled.span`
  flex: 1;
  height: 1px;
  background: ${({ theme }) => theme.colors.border.primary};
`;

export const Messages = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const BubbleRow = styled.div<{ $align: "left" | "right" }>`
  display: flex;
  justify-content: ${({ $align }) =>
    $align === "left" ? "flex-start" : "flex-end"};
  align-items: flex-end;

  & > div {
    max-width: 85%;
    width: max-content;
  }
`;

export const Bubble = styled.div<{ $mine?: boolean }>`
  display: inline-block;
  width: max-content;
  max-width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme, $mine }) =>
    $mine ? theme.colors.text.primary : theme.colors.background.hover};
  color: ${({ theme, $mine }) =>
    $mine ? theme.colors.common.white : theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.size.sm};
  line-height: 1.5;
  word-break: break-word;
  white-space: pre-wrap;
`;

export const TimeText = styled.span<{ $align?: "left" | "right" }>`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: ${({ $align }) => $align ?? "left"};
`;

export const InputArea = styled.form`
  border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  background: ${({ theme }) => theme.colors.common.white};
`;

export const TextInput = styled.textarea`
  flex: 1;
  min-height: 56px;
  max-height: 120px;
  resize: none;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-family: inherit;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

export const SendButton = styled.button`
  width: ${({ theme }) => theme.spacing["3xl"]};
  height: ${({ theme }) => theme.spacing["3xl"]};
  border-radius: ${({ theme }) => theme.radius.full};
  border: none;
  background: ${({ theme }) => theme.colors.text.primary};
  color: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.font.size.lg};
`;

export const EmptyState = styled.div<{ $large?: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme, $large }) =>
    $large ? theme.font.size.lg : theme.font.size.sm};
`;
