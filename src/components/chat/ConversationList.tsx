import { useEffect, useState } from "react";
import { MoreHorizontal, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  fetchConversations as fetchConversationsApi,
  type ConversationResponseDTO,
} from "@/api/messages";
import ConversationItem from "./ConversationItem";
import {
  ListContainer,
  Header,
  Title,
  HeaderActions,
  IconButton,
  FilterBar,
  FilterChip,
  ListBody,
  StateText,
} from "./ConversationList.styles";

export type ConversationSummary = {
  id: number;
  accommodationId: number;
  opponentId: number;
  opponentName: string;
  opponentProfileImage: string | null;
  lastMessage: string;
  updatedAt: string;
};

type Props = {
  selectedId: number | null;
  onSelect: (conversationId: number) => void;
  onSelectConversation?: (conversation: ConversationSummary) => void;
};

function mapToSummary(dto: ConversationResponseDTO): ConversationSummary {
  return {
    id: dto.conversationId,
    accommodationId: dto.accommodationId,
    opponentId: dto.otherUserId,
    opponentName: dto.otherUserName,
    opponentProfileImage: dto.otherUserProfileImage,
    lastMessage: dto.lastMessageText,
    updatedAt: dto.lastMessageTime,
  };
}

export default function ConversationList({
  selectedId,
  onSelect,
  onSelectConversation,
}: Props) {
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { accessToken } = useAuth();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setIsLoading(true);
        setErrorMsg(null);

        if (!accessToken) {
          setErrorMsg("로그인이 필요합니다.");
          return;
        }

        const data = await fetchConversationsApi(accessToken);
        if (cancelled) return;
        const mapped = (Array.isArray(data) ? data : []).map(mapToSummary);
        setConversations(mapped);
      } catch (err) {
        if (cancelled) return;
        const message =
          err instanceof Error
            ? err.message
            : "대화방 목록을 불러오지 못했습니다.";
        setErrorMsg(message);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [accessToken]);

  return (
    <ListContainer>
      <Header>
        <Title>메시지</Title>
        <HeaderActions>
          <IconButton aria-label="검색">
            <Search size={18} />
          </IconButton>
          <IconButton aria-label="더 보기">
            <MoreHorizontal size={18} />
          </IconButton>
        </HeaderActions>
      </Header>

      <FilterBar>
        <FilterChip $active>전체</FilterChip>
        <FilterChip>읽지 않음</FilterChip>
      </FilterBar>

      <ListBody>
        {isLoading && <StateText>불러오는 중…</StateText>}

        {!isLoading && errorMsg && <StateText>{errorMsg}</StateText>}

        {!isLoading && !errorMsg && conversations.length === 0 && (
          <StateText>아직 대화방이 없어요.</StateText>
        )}

        {!isLoading && !errorMsg && conversations.length > 0 && (
          <>
            {conversations.map((conv) => (
              <ConversationItem
                key={conv.id}
                conversation={conv}
                isSelected={selectedId === conv.id}
                onClick={() => {
                  onSelect(conv.id);
                  onSelectConversation?.(conv);
                }}
              />
            ))}
          </>
        )}
      </ListBody>
    </ListContainer>
  );
}
