import React, { useState } from 'react';
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
} from './AccommodationCard.styles';
import { Heart, Star } from 'lucide-react';
import WishlistModal from '@/components/WishlistModal/WishlistModal';

export interface AccommodationCardProps {
  image: string;
  badge?: string;
  title: string;
  date?: {
    start: Date;
    end: Date;
  };
  price: number;
  nights?: number;
  rating?: number | null;
  isFavorite?: boolean;
  onFavoriteClick?: () => void;
}

// 날짜 포맷팅 함수
const formatDateRange = (start: Date, end: Date): string => {
  const startMonth = start.getMonth() + 1;
  const startDay = start.getDate();
  const endMonth = end.getMonth() + 1;
  const endDay = end.getDate();

  if (startMonth === endMonth) {
    return `${startMonth}월 ${startDay}일~${endDay}일`;
  }
  return `${startMonth}월 ${startDay}일~${endMonth}월 ${endDay}일`;
};

// 가격 포맷팅 함수
const formatPrice = (price: number): string => {
  return `₩${price.toLocaleString('ko-KR')}`;
};

// 박수 포맷팅 함수
const formatNights = (nights: number): string => {
  return `${nights}박`;
};

const AccommodationCard = ({
  image,
  badge,
  title,
  date,
  price,
  nights,
  rating,
  isFavorite = false,
  onFavoriteClick,
}: AccommodationCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasDate = !!date;
  const hasNights = typeof nights === 'number' && nights > 0;
  const hasRating = typeof rating === 'number' && rating > 0;

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
          <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
        </CardHeartButton>
        <CardBody>
          <CardTitle>{title}</CardTitle>
          {hasDate && (
            <CardDate>{formatDateRange(date.start, date.end)}</CardDate>
          )}
          <CardPrice>
            {formatPrice(price)}
            {hasNights ? ` · ${formatNights(nights)}` : ' /박'}
          </CardPrice>
          {hasRating && (
            <CardRating>
              <Star size={14} fill="currentColor" />
              {rating.toFixed(2)}
            </CardRating>
          )}
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
