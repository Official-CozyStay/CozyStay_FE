import { useState } from "react";
import type { ConversationSummary } from "./ConversationList";
import {
  ItemContainer,
  Avatar,
  Info,
  TopRow,
  Name,
  DateText,
  LastMessage,
} from "./ConversationItem.styles";

type Props = {
  conversation: ConversationSummary;
  isSelected: boolean;
  onClick: () => void;
};

function formatDateLabel(isoString: string) {
  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) {
    return isoString;
  }

  const year = String(date.getFullYear()).slice(2);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}. ${month}. ${day}.`;
}

export default function ConversationItem({
  conversation,
  isSelected,
  onClick,
}: Props) {
  const initial = conversation.opponentName?.charAt(0) ?? "?";
  const [imageError, setImageError] = useState(false);
  const showImage =
    conversation.opponentProfileImage &&
    conversation.opponentProfileImage.trim() !== "" &&
    !imageError;

  return (
    <ItemContainer type="button" onClick={onClick} $selected={isSelected}>
      <Avatar>
        {showImage ? (
          <img
            src={conversation.opponentProfileImage!}
            alt=""
            onError={() => setImageError(true)}
          />
        ) : (
          initial
        )}
      </Avatar>
      <Info>
        <TopRow>
          <Name>{conversation.opponentName}</Name>
          <DateText>{formatDateLabel(conversation.updatedAt)}</DateText>
        </TopRow>
        <LastMessage>{conversation.lastMessage}</LastMessage>
      </Info>
    </ItemContainer>
  );
}

