const getBaseUrl = () =>
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:8080";

function authHeaders(accessToken: string | null): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (accessToken) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${accessToken}`;
  }
  return headers;
}

// 대화 목록 응답 한 건
export type ConversationResponseDTO = {
  conversationId: number;
  accommodationId: number;
  otherUserId: number;
  otherUserName: string;
  otherUserProfileImage: string | null;
  lastMessageText: string;
  lastMessageTime: string;
};

// 메시지 응답 한 건
export type MessageResponseDTO = {
  id: number;
  conversationId: number;
  senderId: number;
  content: string;
  createdAt: string;
};

// 메시지 목록 응답 
type ChatMessageListResponseDTO = {
  messages: Array<{
    messageId: number;
    conversationId: number;
    senderId: number;
    messageText: string;
    createdAt: string | number[];
  }>;
  nextCursor: number | null;
  hasMore: boolean;
};

// 응답이 { success, data } 래핑인 경우
type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

function unwrap<T>(body: unknown): T {
  if (
    body &&
    typeof body === "object" &&
    "success" in body &&
    (body as ApiResponse<T>).success &&
    "data" in body
  ) {
    return (body as ApiResponse<T>).data;
  }
  return body as T;
}

function normalizeCreatedAt(value: unknown): string {
  if (typeof value === "string") return value;

  if (Array.isArray(value) && value.length >= 3) {
    const [y, mon = 1, d = 1, h = 0, min = 0, s = 0] = value;
    return new Date(
      Number(y),
      Number(mon) - 1,
      Number(d),
      Number(h),
      Number(min),
      Number(s)
    ).toISOString();
  }

  return "";
}

// 에러 응답 시 JSON에서 message 추출 후 사용자용 메시지로 throw
async function throwApiError(res: Response, fallback: string): Promise<never> {
  const text = await res.text();
  try {
    const json = JSON.parse(text) as { message?: string; success?: boolean };
    const msg =
      typeof json.message === "string" && json.message.length > 0
        ? json.message
        : fallback;
    throw new Error(msg);
  } catch (err) {
    if (err instanceof Error && err.message !== fallback) throw err;
    throw new Error(text || fallback);
  }
}

/**
 * 대화 목록 조회
 * - 인증: Authorization Bearer 토큰 사용 (accessToken 전달)
 */
export async function fetchConversations(
  accessToken: string | null
): Promise<ConversationResponseDTO[]> {
  const url = `${getBaseUrl()}/api/conversations`;
  const res = await fetch(url, {
    method: "GET",
    headers: authHeaders(accessToken),
  });

  if (!res.ok) {
    await throwApiError(res, "대화 목록을 불러오지 못했습니다.");
  }

  const body = await res.json();
  const data = unwrap<ConversationResponseDTO[]>(body);
  return Array.isArray(data) ? data : [];
}

export type FetchMessagesResult = {
  messages: MessageResponseDTO[];
  nextCursor: number | null;
  hasMore: boolean;
};

/**
 * 특정 대화의 메시지 목록 조회
 * 백엔드: GET /api/conversations/{id}/messages → { messages, nextCursor, hasMore }
 * @param before - 이 ID보다 오래된 메시지 조회 (스크롤 시 이전 페이지용), 없으면 최근 size개
 */
export async function fetchMessages(
  conversationId: number,
  accessToken: string | null,
  before?: number | null,
  size: number = 10
): Promise<FetchMessagesResult> {
  const params = new URLSearchParams({ size: String(size) });
  if (before != null) params.set("before", String(before));
  const url = `${getBaseUrl()}/api/conversations/${conversationId}/messages?${params}`;
  const res = await fetch(url, {
    method: "GET",
    headers: authHeaders(accessToken),
  });

  if (!res.ok) {
    await throwApiError(res, "메시지를 불러오지 못했습니다.");
  }

  const body = await res.json();
  const list = body as ChatMessageListResponseDTO;
  const raw = list?.messages ?? unwrap<MessageResponseDTO[]>(body);
  const arr = Array.isArray(raw) ? raw : [];

  const mapped = arr.map((m): MessageResponseDTO => {
    const row = m as Record<string, unknown>;
    if (typeof row.messageId !== "undefined" && typeof row.messageText !== "undefined") {
      return {
        id: row.messageId as number,
        conversationId: row.conversationId as number,
        senderId: row.senderId as number,
        content: row.messageText as string,
        createdAt: normalizeCreatedAt(row.createdAt),
      };
    }
    return m as unknown as MessageResponseDTO;
  });
  // 백엔드는 최신순(Id 내림차순)으로 반환 → 채팅 UI용으로 오래된 순으로 뒤집기
  const messages = mapped.reverse();
  return {
    messages,
    nextCursor: list?.nextCursor ?? null,
    hasMore: list?.hasMore ?? false,
  };
}
