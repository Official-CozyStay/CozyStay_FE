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
import {
  fetchFavorites,
  createFavorite,
  addAccommodationToFavorite,
} from '@/api/favorite';
import type { FavoriteResponseDTO } from '@/api/types';

export interface AccommodationCardProps {
  accommodationId?: number;
  image: string;
  badge?: string;
  title: string;
  date: {
    start: Date;
    end: Date;
  };
  price: number;
  nights: number;
  rating: number;
  isFavorite?: boolean;
  onFavoriteClick?: () => void;
}

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

const formatPrice = (price: number): string => {
  return `₩${price.toLocaleString('ko-KR')}`;
};

const formatNights = (nights: number): string => {
  return `${nights}박`;
};

const AccommodationCard = ({
  accommodationId,
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
  const [favoritesList, setFavoritesList] = useState<FavoriteResponseDTO[]>([]);
  const [isListLoading, setIsListLoading] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);

  const handleHeartClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite && onFavoriteClick) {
      onFavoriteClick();
      return;
    }
    setIsModalOpen(true);
    setIsListLoading(true);
    try {
      const list = await fetchFavorites();
      setFavoritesList(list);
    } catch {
      setFavoritesList([]);
    } finally {
      setIsListLoading(false);
    }
  };

  const handleAddToFavorite = async (favoriteId: number) => {
    if (accommodationId == null) return;
    try {
      await addAccommodationToFavorite(
        String(favoriteId),
        String(accommodationId),
      );
      onFavoriteClick?.();
    } catch {
      alert('위시리스트에 추가하지 못했습니다.');
    }
  };

  const handleCreateWishlist = async (name: string) => {
    setIsCreateLoading(true);
    try {
      const res = await createFavorite({
        name,
        description: '',
        isPrivate: false,
      });
      if (accommodationId != null) {
        await addAccommodationToFavorite(
          String(res.favoriteId),
          String(accommodationId),
        );
      }
      onFavoriteClick?.();
    } catch {
      alert('위시리스트 생성에 실패했습니다.');
    } finally {
      setIsCreateLoading(false);
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
          <CardDate>{formatDateRange(date.start, date.end)}</CardDate>
          <CardPrice>
            {formatPrice(price)} · {formatNights(nights)}
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
        favorites={favoritesList}
        isLoadingList={isListLoading}
        onAddToFavorite={handleAddToFavorite}
        onCreate={handleCreateWishlist}
        isLoading={isCreateLoading}
      />
    </>
  );
};

export default AccommodationCard;
