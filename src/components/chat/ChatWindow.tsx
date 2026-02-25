import { useEffect, useState, useCallback, useRef, Fragment } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { fetchMessages, type MessageResponseDTO } from "@/api/messages";
import {
  getOrCreateStompClient,
  sendMessageOverWs,
  subscribeToConversation,
  type NormalizedMessage,
} from "@/api/chatWebSocket";
import type { ConversationSummary } from "./ConversationList";
import {
  Wrapper,
  Header,
  PartnerName,
  Body,
  DateDivider,
  DividerLine,
  Messages,
  BubbleRow,
  Bubble,
  TimeText,
  InputArea,
  TextInput,
  SendButton,
  EmptyState,
} from "./ChatWindow.styles";

type ChatMessage = {
  id: number;
  sender: "me" | "other";
  text: string;
  time: string;
  createdAt: string;
};

type Props = {
  /** API 호출용 대화방 ID (대화 선택 시 전달) */
  conversationId: number | null;
  /** 헤더/표시용 대화 정보 (상대 이름 등) */
  conversation: ConversationSummary | null;
};

function formatMessageTime(isoString: string): string {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/** 현재 로그인 사용자 ID와 발신자 ID가 같은지 (내 메시지인지) 판별 */
function isMyMessage(senderId: number | string, currentUserId: string): boolean {
  if (currentUserId === "" || currentUserId == null) return false;
  const a = String(senderId).trim();
  const b = String(currentUserId).trim();
  if (a === b) return true;
  const numA = Number(senderId);
  const numB = Number(currentUserId);
  if (!Number.isNaN(numA) && !Number.isNaN(numB) && numA === numB) return true;
  return false;
}

function mapToChatMessage(
  dto: MessageResponseDTO | NormalizedMessage,
  currentUserId: string
): ChatMessage {
  const content = "content" in dto ? dto.content : (dto as NormalizedMessage).content;
  const id = dto.id;
  const sender: "me" | "other" = isMyMessage(dto.senderId, currentUserId)
    ? "me"
    : "other";
  return {
    id,
    sender,
    text: content,
    time: formatMessageTime(dto.createdAt),
    createdAt: dto.createdAt,
  };
}

export default function ChatWindow({
  conversationId,
  conversation,
}: Props) {
  const { user, accessToken } = useAuth();
  const currentUserId = user?.id ?? "";

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [sendLoading, setSendLoading] = useState(false);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const didPrependRef = useRef(false);
  const scrollRestoreRef = useRef<{ scrollHeight: number; scrollTop: number } | null>(null);
  const scrollToBottomAfterLoadRef = useRef(false);
  const prevMessagesLengthRef = useRef(0);

  const loadMessages = useCallback(async () => {
    if (conversationId == null || !accessToken) return;
    setMessagesLoading(true);
    setMessagesError(null);
    try {
      const result = await fetchMessages(conversationId, accessToken, null);
      setMessages(
        result.messages.map((dto) => mapToChatMessage(dto, currentUserId))
      );
      setNextCursor(result.nextCursor);
      setHasMore(result.hasMore);
      scrollToBottomAfterLoadRef.current = true;
    } catch (err) {
      setMessagesError(
        err instanceof Error ? err.message : "메시지를 불러오지 못했습니다."
      );
      setMessages([]);
      setNextCursor(null);
      setHasMore(false);
    } finally {
      setMessagesLoading(false);
    }
  }, [conversationId, accessToken, currentUserId]);

  const loadOlderMessages = useCallback(async () => {
    if (
      conversationId == null ||
      !accessToken ||
      nextCursor == null ||
      !hasMore ||
      loadingOlder
    )
      return;
    setLoadingOlder(true);
    const el = bodyRef.current;
    try {
      const result = await fetchMessages(
        conversationId,
        accessToken,
        nextCursor
      );
      const older = result.messages.map((dto) =>
        mapToChatMessage(dto, currentUserId)
      );
      if (el) {
        scrollRestoreRef.current = {
          scrollHeight: el.scrollHeight,
          scrollTop: el.scrollTop,
        };
      }
      didPrependRef.current = true;
      setMessages((prev) => [...older, ...prev]);
      setNextCursor(result.nextCursor);
      setHasMore(result.hasMore);
    } catch {
      setLoadingOlder(false);
      return;
    } finally {
      setLoadingOlder(false);
    }
  }, [
    conversationId,
    accessToken,
    currentUserId,
    nextCursor,
    hasMore,
    loadingOlder,
  ]);

  const handleScroll = useCallback(() => {
    const el = bodyRef.current;
    if (!el || !hasMore || nextCursor == null || loadingOlder) return;
    if (el.scrollTop < 80) loadOlderMessages();
  }, [hasMore, nextCursor, loadingOlder, loadOlderMessages]);

  useEffect(() => {
    if (conversationId != null) {
      setMessages([]);
      setMessagesError(null);
      setNextCursor(null);
      setHasMore(false);
      loadMessages();
    } else {
      setMessages([]);
      setMessagesError(null);
      setNextCursor(null);
      setHasMore(false);
    }
  }, [conversationId, loadMessages]);

  // 초기 로드 후, 또는 새 메시지 전송/수신 시 스크롤을 맨 아래로 (최신 메시지가 보이도록)
  useEffect(() => {
    const scrollToBottom = () => {
      requestAnimationFrame(() => {
        const target = bodyRef.current;
        if (target) target.scrollTop = target.scrollHeight - target.clientHeight;
      });
    };

    if (scrollToBottomAfterLoadRef.current) {
      scrollToBottomAfterLoadRef.current = false;
      scrollToBottom();
    } else if (
      messages.length > prevMessagesLengthRef.current &&
      !didPrependRef.current
    ) {
      // 새 메시지가 맨 아래에 추가됨 (내가 보냄 or 상대가 보냄)
      scrollToBottom();
    }

    prevMessagesLengthRef.current = messages.length;
  }, [messages]);

  // 스크롤 위치 복구 (이전 메시지 prepend 후)
  useEffect(() => {
    if (!didPrependRef.current || !bodyRef.current || !scrollRestoreRef.current) return;
    const el = bodyRef.current;
    const saved = scrollRestoreRef.current;
    scrollRestoreRef.current = null;
    didPrependRef.current = false;
    requestAnimationFrame(() => {
      const newScrollHeight = el.scrollHeight;
      el.scrollTop = saved.scrollTop + (newScrollHeight - saved.scrollHeight);
    });
  }, [messages]);

  // WebSocket 구독: 선택한 대화방으로 새 메시지 수신
  useEffect(() => {
    if (conversationId == null || !accessToken) return;

    getOrCreateStompClient(accessToken)
      .then((client) => {
        unsubscribeRef.current?.();
        unsubscribeRef.current = subscribeToConversation(
          client,
          conversationId,
          (normalized) => {
            setMessagesError(null);
            setMessages((prev) => {
              if (prev.some((m) => m.id === normalized.id)) return prev;
              return [...prev, mapToChatMessage(normalized, currentUserId)];
            });
          }
        );
      })
      .catch((err) => {
        console.error("WebSocket connection failed:", err);
      });

    return () => {
      unsubscribeRef.current?.();
      unsubscribeRef.current = null;
    };
  }, [conversationId, accessToken, currentUserId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text || conversationId == null || !accessToken || sendLoading) return;

    setSendLoading(true);
    setMessagesError(null);
    getOrCreateStompClient(accessToken)
      .then((client) => {
        sendMessageOverWs(client, conversationId, text);
        setInputValue("");
      })
      .catch((err) => {
        setMessagesError(
          err instanceof Error ? err.message : "메시지 전송에 실패했습니다."
        );
      })
      .finally(() => {
        setSendLoading(false);
      });
  };

  const displayName =
    conversationId != null && conversation?.opponentName
      ? conversation.opponentName
      : "메시지";

  /** createdAt 기준 날짜 라벨 (예: 2026년 2월 12일) */
  const formatDateLabel = (isoString: string) =>
    new Date(isoString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  /** 날짜가 바뀌는 지점에 구분선을 넣은 메시지 목록 렌더 */
  const messagesWithDateDividers = messages.map((msg, index) => {
    const prevDate =
      index > 0
        ? new Date(messages[index - 1].createdAt).toDateString()
        : "";
    const thisDate = new Date(msg.createdAt).toDateString();
    const showDateDivider = index === 0 || prevDate !== thisDate;

    return (
      <Fragment key={msg.id}>
        {showDateDivider && (
          <DateDivider>
            <DividerLine />
            <span>{formatDateLabel(msg.createdAt)}</span>
            <DividerLine />
          </DateDivider>
        )}
        <BubbleRow $align={msg.sender === "me" ? "right" : "left"}>
          <div>
            <Bubble $mine={msg.sender === "me"}>{msg.text}</Bubble>
            <TimeText $align={msg.sender === "me" ? "right" : "left"}>
              {msg.time}
            </TimeText>
          </div>
        </BubbleRow>
      </Fragment>
    );
  });

  return (
    <Wrapper>
      {conversationId != null && (
        <Header>
          <PartnerName>{displayName}</PartnerName>
        </Header>
      )}

      {conversationId == null ? (
        <EmptyState $large>채팅방을 선택하면 채팅을 시작할 수 있습니다.</EmptyState>
      ) : (
        <>
          <Body ref={bodyRef} onScroll={handleScroll}>
            {messagesLoading ? (
              <EmptyState>메시지를 불러오는 중…</EmptyState>
            ) : messagesError ? (
              <EmptyState>{messagesError}</EmptyState>
            ) : (
              <Messages>{messagesWithDateDividers}</Messages>
            )}
          </Body>

          <InputArea onSubmit={handleSubmit}>
            <TextInput
              placeholder="메시지를 작성하세요.."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as unknown as React.FormEvent);
                }
              }}
              disabled={sendLoading}
            />
            <SendButton type="submit" disabled={sendLoading}>
              ↑
            </SendButton>
          </InputArea>
        </>
      )}
    </Wrapper>
  );
}

