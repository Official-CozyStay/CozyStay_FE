import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, MoreHorizontal, Heart } from 'lucide-react';
import {
  fetchFavoriteDetail,
  updateFavorite,
  deleteFavorite,
  removeAccommodationFromFavorite,
} from '@/api/favorite';
import type { FavoriteDetailResponseDTO } from '@/api/types';
import {
  PageContainer,
  DetailHeader,
  BackButton,
  DetailTitle,
  MenuButton,
  AccList,
  AccCard,
  AccCardImageWrap,
  AccCardImage,
  AccCardBadge,
  AccCardHeart,
  AccCardBody,
  AccCardTitleRow,
  AccCardTitle,
  AccCardMeta,
  AccCardPrice,
  AccCardMemo,
  EmptyState,
  LoadingState,
} from './WishlistDetailPage.styles';
import WishlistSettingsModal from './WishlistSettingsModal';
import RenameWishlistModal from './RenameWishlistModal';

const formatPrice = (price: number): string => {
  return `₩${price.toLocaleString('ko-KR')} / 박`;
};

export default function WishlistDetailPage() {
  const { favoriteId } = useParams<{ favoriteId: string }>();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<FavoriteDetailResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const loadDetail = async () => {
    if (!favoriteId) return;
    setLoading(true);
    try {
      const data = await fetchFavoriteDetail(favoriteId);
      setDetail(data);
    } catch {
      setDetail(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetail();
  }, [favoriteId]);

  const handleRename = () => {
    setRenameOpen(true);
  };

  const handleRenameConfirm = async (newName: string) => {
    if (!favoriteId) return;
    setRenameLoading(true);
    try {
      await updateFavorite(favoriteId, { name: newName });
      await loadDetail();
      setRenameOpen(false);
    } catch {
      alert('이름 변경에 실패했습니다.');
    } finally {
      setRenameLoading(false);
    }
  };

  const handleDelete = () => {
    if (!favoriteId) return;
    if (!window.confirm('이 위시리스트를 삭제하시겠습니까?')) return;
    deleteFavorite(favoriteId)
      .then(() => navigate('/wishlist'))
      .catch(() => alert('삭제에 실패했습니다.'));
  };

  const handleRemoveAccommodation = async (
    e: React.MouseEvent,
    accommodationId: number,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!favoriteId) return;
    try {
      await removeAccommodationFromFavorite(
        favoriteId,
        String(accommodationId),
      );
      await loadDetail();
    } catch {
      alert('즐겨찾기에서 삭제에 실패했습니다.');
    }
  };

  if (!favoriteId) {
    return (
      <PageContainer>
        <LoadingState>잘못된 경로입니다.</LoadingState>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <DetailHeader>
        <BackButton to="/wishlist">
          <ChevronLeft size={24} />
        </BackButton>
        <DetailTitle>{detail?.name ?? '위시리스트'}</DetailTitle>
        <MenuButton
          type="button"
          onClick={() => setSettingsOpen(true)}
          aria-label="메뉴"
        >
          <MoreHorizontal size={24} />
        </MenuButton>
      </DetailHeader>

      {loading && <LoadingState>불러오는 중...</LoadingState>}

      {!loading && detail && detail.accommodations.length === 0 && (
        <EmptyState>저장된 숙소가 없습니다.</EmptyState>
      )}

      {!loading && detail && detail.accommodations.length > 0 && (
        <AccList>
          {detail.accommodations.map((acc) => (
            <AccCard
              key={acc.accommodationId}
              to={`/accommodation/${acc.accommodationId}`}
            >
              <AccCardImageWrap>
                <AccCardImage $imageUrl={acc.imageUrl ?? null} />
                <AccCardBadge>게스트 선호</AccCardBadge>
                <AccCardHeart
                  type="button"
                  onClick={(e) =>
                    handleRemoveAccommodation(e, acc.accommodationId)
                  }
                  aria-label="이 위시리스트에서 삭제"
                >
                  <Heart size={20} fill="currentColor" />
                </AccCardHeart>
              </AccCardImageWrap>
              <AccCardBody>
                <AccCardTitleRow>
                  <AccCardTitle>{acc.title}</AccCardTitle>
                </AccCardTitleRow>
                <AccCardMeta>
                  {[acc.city, acc.country].filter(Boolean).join(' · ')}
                </AccCardMeta>
                <AccCardPrice>
                  {formatPrice(Number(acc.pricePerNight))}
                </AccCardPrice>
              </AccCardBody>
              <AccCardMemo>메모 추가</AccCardMemo>
            </AccCard>
          ))}
        </AccList>
      )}

      <WishlistSettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onRename={handleRename}
        onDelete={handleDelete}
      />

      <RenameWishlistModal
        isOpen={renameOpen}
        onClose={() => setRenameOpen(false)}
        currentName={detail?.name ?? ''}
        onConfirm={handleRenameConfirm}
        isLoading={renameLoading}
      />
    </PageContainer>
  );
}
