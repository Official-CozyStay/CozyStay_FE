import {
  InfoList,
  InfoItem,
  InfoContent,
  InfoLabel,
  InfoValue,
  InfoAction,
} from "../account.styles";

export interface InfoItemData {
  id: string;
  label: string;
  value: string;
  action: string;
  onAction?: () => void;
}

interface InfoItemListProps {
  items: InfoItemData[];
}

const InfoItemList = ({ items }: InfoItemListProps) => {
  return (
    <InfoList>
      {items.map((item) => (
        <InfoItem key={item.id}>
          <InfoContent>
            <InfoLabel>{item.label}</InfoLabel>
            <InfoValue>{item.value}</InfoValue>
          </InfoContent>
          <InfoAction onClick={item.onAction} disabled={!item.onAction}>
            {item.action}
          </InfoAction>
        </InfoItem>
      ))}
    </InfoList>
  );
};

export default InfoItemList;
