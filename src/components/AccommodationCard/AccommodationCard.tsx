import React from "react";
import {
  CardContainer,
  CardImage,
  CardBadge,
  CardHeartButton,
  CardBody,
  CardTitle,
  CardDate,
  CardPrice,
  CardRating,
} from "./AccommodationCard.styles";
import { Heart, Star } from "lucide-react";

export interface AccommodationCardProps {
  image: string;
  badge?: string;
  title: string;
  date: string;
  price: string;
  nights: string;
  rating: number;
  isFavorite?: boolean;
  onFavoriteClick?: () => void;
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({
  image,
  badge,
  title,
  date,
  price,
  nights,
  rating,
  isFavorite = false,
  onFavoriteClick,
}) => {
  return (
    <CardContainer>
      <CardImage src={image} alt={title} />
      {badge && <CardBadge>{badge}</CardBadge>}
      <CardHeartButton
        onClick={(e) => {
          e.stopPropagation();
          onFavoriteClick?.();
        }}
        $isFavorite={isFavorite}
      >
        <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
      </CardHeartButton>
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardDate>{date}</CardDate>
        <CardPrice>
          {price} · {nights}
        </CardPrice>
        <CardRating>
          <Star size={14} fill="currentColor" />
          {rating.toFixed(2)}
        </CardRating>
      </CardBody>
    </CardContainer>
  );
};

export default AccommodationCard;

