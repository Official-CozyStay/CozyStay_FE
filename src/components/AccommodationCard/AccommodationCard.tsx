import React, { useState } from "react";
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
import WishlistModal from "@/components/WishlistModal/WishlistModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite && onFavoriteClick) {
      onFavoriteClick();
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCreateWishlist = (name: string) => {
    // 위시리스트 생성 로직 (나중에 API로 대체)
    console.log(`위시리스트 생성: ${name}`);
    if (onFavoriteClick) {
      onFavoriteClick();
    }
  };

  return (
    <>
      <CardContainer>
        <CardImage src={image} alt={title} />
        {badge && <CardBadge>{badge}</CardBadge>}
        <CardHeartButton onClick={handleHeartClick} $isFavorite={isFavorite}>
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
      <WishlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateWishlist}
      />
    </>
  );
};

export default AccommodationCard;

