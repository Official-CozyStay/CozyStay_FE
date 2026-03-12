import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalContent,
  ModalInput,
  ModalInputLabel,
  ModalCharCount,
  ModalFooter,
  ModalButton,
  ModalCancelButton,
  ModalCreateButton,
  ListScroll,
  WishlistList,
  WishlistItem,
  WishlistItemThumb,
  WishlistItemBody,
  WishlistItemTitle,
  WishlistItemCount,
  ModalNewWishlistButton,
} from './WishlistModal.styles';
import { X } from 'lucide-react';
import type { FavoriteResponseDTO } from '@/api/types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** 조회한 즐겨찾기 목록. 빈 배열이면 생성 폼만 표시 */
  favorites?: FavoriteResponseDTO[];
  isLoadingList?: boolean;
  /** 목록에서 항목 클릭 시 해당 즐겨찾기에 숙소 추가 */
  onAddToFavorite?: (favoriteId: number) => void | Promise<void>;
  /** 새 위시리스트 이름으로 생성 (Promise 반환 시 완료 후 모달 닫힘) */
  onCreate?: (name: string) => void | Promise<void>;
  isLoading?: boolean;
}

const WishlistModal = ({
  isOpen,
  onClose,
  favorites = [],
  isLoadingList = false,
  onAddToFavorite,
  onCreate,
  isLoading = false,
}: WishlistModalProps) => {
  const [name, setName] = useState('');
  const [view, setView] = useState<'list' | 'create'>('list');
  const inputRef = useRef<HTMLInputElement>(null);
  const MAX_LENGTH = 50;

  const hasFavorites = favorites.length > 0;
  const showList = hasFavorites && view === 'list';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setView(hasFavorites ? 'list' : 'create');
      if (!hasFavorites) setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      setName('');
      setView('list');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, hasFavorites]);

  useEffect(() => {
    if (isOpen && !showList) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen, showList]);

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [isOpen, onClose]);

  const handleCreate = async () => {
    if (!name.trim() || !onCreate) return;
    await onCreate(name.trim());
    setName('');
    onClose();
  };

  const handleAdd = async (favoriteId: number) => {
    if (!onAddToFavorite) return;
    await onAddToFavorite(favoriteId);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  const modalContent = (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            {showList ? '위시리스트에 저장하기' : '위시리스트 만들기'}
          </ModalTitle>
          <ModalCloseButton onClick={onClose}>
            <X size={20} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalContent>
          {isLoadingList ? (
            <div>목록 불러오는 중...</div>
          ) : showList ? (
            <>
              <ListScroll>
                <WishlistList>
                  {favorites.map((fav) => (
                    <WishlistItem
                      key={fav.favoriteId}
                      type="button"
                      onClick={() => handleAdd(fav.favoriteId)}
                    >
                      <WishlistItemThumb
                        $imageUrl={fav.coverImageUrl ?? null}
                      />
                      <WishlistItemBody>
                        <WishlistItemTitle>{fav.name}</WishlistItemTitle>
                        <WishlistItemCount>
                          저장된 항목 {fav.accommodationCount}개
                        </WishlistItemCount>
                      </WishlistItemBody>
                    </WishlistItem>
                  ))}
                </WishlistList>
              </ListScroll>
              <ModalNewWishlistButton
                type="button"
                onClick={() => setView('create')}
              >
                새로운 위시리스트 만들기
              </ModalNewWishlistButton>
            </>
          ) : (
            <>
              {hasFavorites && (
                <ModalButton
                  type="button"
                  onClick={() => setView('list')}
                  style={{
                    marginBottom: 12,
                    background: 'transparent',
                    color: 'inherit',
                  }}
                >
                  ← 목록으로
                </ModalButton>
              )}
              <ModalInputLabel>이름</ModalInputLabel>
              <ModalInput
                ref={inputRef}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="위시리스트 이름을 입력하세요"
                maxLength={MAX_LENGTH}
              />
              <ModalCharCount>
                {name.length}/{MAX_LENGTH}자
              </ModalCharCount>
            </>
          )}
        </ModalContent>
        {!showList && !isLoadingList && (
          <ModalFooter>
            <ModalCancelButton onClick={onClose}>취소</ModalCancelButton>
            <ModalCreateButton
              onClick={handleCreate}
              disabled={!name.trim() || isLoading}
            >
              {isLoading ? '만드는 중...' : '새로 만들기'}
            </ModalCreateButton>
          </ModalFooter>
        )}
      </ModalContainer>
    </ModalOverlay>
  );

  return createPortal(modalContent, document.body);
};

export default WishlistModal;
