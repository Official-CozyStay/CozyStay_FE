import { useState } from 'react';
import ConversationList, {
  type ConversationSummary,
} from '@/components/chat/ConversationList';
import ChatWindow from '@/components/chat/ChatWindow';
import {
  PageContainer,
  ContentWrapper,
  ConversationsColumn,
  ChatColumn,
} from './MessagePage.styles';

const MessagePage = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationSummary | null>(null);

  return (
    <PageContainer>
      <ContentWrapper>
        <ConversationsColumn>
          <ConversationList
            selectedId={selectedId}
            onSelect={setSelectedId}
            onSelectConversation={setSelectedConversation}
          />
        </ConversationsColumn>

        <ChatColumn>
          <ChatWindow
            conversationId={selectedId}
            conversation={selectedConversation}
          />
        </ChatColumn>
      </ContentWrapper>
    </PageContainer>
  );
};

export default MessagePage;