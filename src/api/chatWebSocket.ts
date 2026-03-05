import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import type { IMessage } from "@stomp/stompjs";

const getBaseUrl = () =>
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:8080";

// WebSocket으로 수신한 메시지 (백엔드 ChatMessageResponseDTO)
export type WsMessagePayload = {
  messageId: number;
  conversationId: number;
  senderId: number;
  messageText: string;
  createdAt: string;
};

// 프론트에서 쓰는 메시지 한 건 (MessageResponseDTO와 동일)
export type NormalizedMessage = {
  id: number;
  conversationId: number;
  senderId: number;
  content: string;
  createdAt: string;
};

function normalizeWsMessage(raw: WsMessagePayload): NormalizedMessage {
  return {
    id: raw.messageId,
    conversationId: raw.conversationId,
    senderId: raw.senderId,
    content: raw.messageText,
    createdAt:
      typeof raw.createdAt === "string"
        ? raw.createdAt
        : Array.isArray((raw as unknown as { createdAt: number[] }).createdAt)
          ? (() => {
              const [y, mon = 1, d = 1, h = 0, min = 0, s = 0] = (raw as unknown as { createdAt: number[] }).createdAt;
              return new Date(y, mon - 1, d, h, min, s).toISOString();
            })()
          : "",
  };
}

let sharedClient: Client | null = null;
let sharedToken: string | null = null;

/**
 * accessToken으로 STOMP 클라이언트 생성 후 연결.
 * 이미 같은 토큰으로 연결돼 있으면 그 클라이언트 반환.
 */
export function getOrCreateStompClient(
  accessToken: string | null
): Promise<Client> {
  if (!accessToken) {
    return Promise.reject(new Error("로그인이 필요합니다."));
  }

  if (sharedClient?.connected && sharedToken === accessToken) {
    return Promise.resolve(sharedClient);
  }

  if (sharedClient) {
    sharedClient.deactivate();
    sharedClient = null;
    sharedToken = null;
  }

  const wsUrl = `${getBaseUrl()}/ws/chat`;

  return new Promise((resolve, reject) => {
    const client = new Client({
      webSocketFactory: () => new SockJS(wsUrl) as unknown as WebSocket,
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      onConnect: () => {
        sharedClient = client;
        sharedToken = accessToken;
        resolve(client);
      },
      onStompError: (frame) => {
        reject(new Error(frame.headers?.message || "WebSocket 연결 실패"));
      },
    });

    client.activate();
  });
}

/**
 * 메시지 전송 (백엔드: /pub/conversations/{conversationId}/messages, body: { messageText })
 */
export function sendMessageOverWs(
  client: Client,
  conversationId: number,
  messageText: string
): void {
  if (!client.connected) {
    throw new Error("WebSocket이 연결되지 않았습니다.");
  }
  client.publish({
    destination: `/pub/conversations/${conversationId}/messages`,
    body: JSON.stringify({ messageText }),
  });
}

/**
 * 대화방 구독 (백엔드 브로드캐스트: /sub/conversations/{conversationId})
 * 새 메시지 수신 시 onMessage 호출.
 */
export function subscribeToConversation(
  client: Client,
  conversationId: number,
  onMessage: (msg: NormalizedMessage) => void
): () => void {
  if (!client.connected) {
    return () => {};
  }

  const sub = client.subscribe(
    `/sub/conversations/${conversationId}`,
    (message: IMessage) => {
      try {
        const raw = JSON.parse(message.body) as WsMessagePayload;
        onMessage(normalizeWsMessage(raw));
      } catch {
        // ignore parse error
      }
    }
  );

  return () => sub.unsubscribe();
}
