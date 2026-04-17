import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchFavorites } from '@/api/favorite';
import type { FavoriteResponseDTO } from '@/api/types';
import {
  PageContainer,
  PageTitle,
  CardGrid,
  WishlistCard,
  WishlistCardImage,
  WishlistCardBody,
  WishlistCardTitle,
  WishlistCardSubtitle,
  EmptyState,
  LoadingState,
} from './WishlistPage.styles';

const WishlistPage = () => {
  const [favorites, setFavorites] = useState<FavoriteResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchFavorites()
      .then((list) => {
        if (!cancelled) setFavorites(list);
      })
      .catch(() => {
        if (!cancelled) setFavorites([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PageContainer>
      <PageTitle>위시리스트</PageTitle>

      {loading && <LoadingState>목록을 불러오는 중...</LoadingState>}

      {!loading && favorites.length === 0 && (
        <EmptyState>저장한 위시리스트가 없습니다.</EmptyState>
      )}

      {!loading && favorites.length > 0 && (
        <CardGrid>
          {favorites.map((fav) => (
            <WishlistCard
              key={fav.favoriteId}
              as={Link}
              to={`/wishlist/${fav.favoriteId}`}
            >
              <WishlistCardImage $imageUrl={fav.coverImageUrl ?? null} />
              <WishlistCardBody>
                <WishlistCardTitle>{fav.name}</WishlistCardTitle>
                <WishlistCardSubtitle>
                  저장된 항목 {fav.accommodationCount}개
                </WishlistCardSubtitle>
              </WishlistCardBody>
            </WishlistCard>
          ))}
        </CardGrid>
      )}
    </PageContainer>
  );
};

export default WishlistPage;
