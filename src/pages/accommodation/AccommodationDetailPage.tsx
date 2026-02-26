import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAccommodationStore } from "../../store/accommodationStore";
import * as S from "./accommodationDetail.styles";

import GallerySection from "./components/GallerySection";
import InfoSection from "./components/InfoSection";
import BookingCard from "./components/BookingCard";
import LightboxModal from "./components/LightboxModal";
import AllPhotosModal from "./components/AllPhotosModal"; // 모달 추가
import ReviewSection from "./components/ReviewSection";
import { useLightbox } from "./hooks/useLightbox";

import type { AccommodationImageDTO, ReviewListResponse } from "../../api/types";
import { fetchAccommodationReviews } from "../../api/accommodation";

type ThumbImage = AccommodationImageDTO & { idx: number };

export default function AccommodationDetailPage() {
  const { id = "1" } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<ReviewListResponse | null>(null);

  // 전체 사진 모달 상태
  const [isAllPhotosOpen, setIsAllPhotosOpen] = useState(false);

  const {
    detail,
    loading,
    error,
    load,
    checkIn,
    checkOut,
    guests,
    setDates,
    setGuests,
  } = useAccommodationStore();

  const openAllPhotos = () => setIsAllPhotosOpen(true);
  const closeAllPhotos = () => setIsAllPhotosOpen(false);

  useEffect(() => {
    load(id);
    fetchAccommodationReviews(id)
      .then(setReviews)
      .catch((err) => {
        console.error("리뷰 로딩 실패:", err);
      });
  }, [id, load]);

  /* 
    임시: 백엔드 데이터가 없을 경우를 대비한 더미 이미지 데이터
    실제 데이터가 들어오면 이 부분은 사용되지 않습니다.
  */
  const MOCK_IMAGES: AccommodationImageDTO[] = Array.from({ length: 5 }).map(
    (_, i) => ({
      imageId: 1000 + i,
      imageUrl: `https://picsum.photos/seed/cozy${1000 + i}/800/600`,
      isPrimary: i === 0,
      displayOrder: i,
    })
  );

  const images: AccommodationImageDTO[] =
    detail?.images && detail.images.length > 0
      ? detail.images
      : MOCK_IMAGES;

  const totalImages = images.length;

  const { primary, primaryIndex, thumbs } = useMemo<{
    primary: AccommodationImageDTO | null;
    primaryIndex: number;
    thumbs: ThumbImage[];
  }>(() => {
    if (images.length === 0) {
      return {
        primary: null,
        primaryIndex: 0,
        thumbs: [],
      };
    }

    const primaryIndexRaw = images.findIndex((i) => i.isPrimary);
    const primaryIndex = primaryIndexRaw === -1 ? 0 : primaryIndexRaw;

    const primary = images[primaryIndex];

    const thumbs = images
      .map((img, idx) => ({ ...img, idx }))
      .filter((item) => item.idx !== primaryIndex)
      .slice(0, 4);

    return { primary, primaryIndex, thumbs };
  }, [images]);

  const {
    lightboxOpen,
    activeImageIndex,
    openLightbox,
    closeLightbox,
    showPrevImage,
    showNextImage,
  } = useLightbox(totalImages);

  if (loading) return <S.Container>불러오는 중...</S.Container>;
  if (error) return <S.Container>에러 : {error}</S.Container>;
  if (!detail) return <S.Container>데이터 없음</S.Container>;

  const averageRating = reviews?.summary?.average ?? 0;
  const reviewCount = reviews?.summary?.count ?? 0;

  const handleGoToPayment = () => {
    const params = new URLSearchParams();

    if(checkIn) params.set("checkin:", checkIn);
    if(checkOut) params.set("checkout", checkOut);

    params.set("numberOfGuest", String(guests));
    params.set("guestCurrency", "KRW");

    navigate(`/payment/${id}?${params.toString()}`);
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>{detail.title}</S.Title>
        <S.SubMeta>
          <span>★ {averageRating.toFixed(2)}</span>
          <S.Dot>.</S.Dot>
          <a href="#reviews">후기 {reviewCount}개</a>
          <S.Dot>.</S.Dot>
          <span>
            {detail.city}, {detail.country}
          </span>
        </S.SubMeta>
      </S.Header>

      {/* 갤러리 */}
      {primary && (
        <GallerySection
          primary={primary}
          primaryIndex={primaryIndex}
          thumbs={thumbs}
          onOpen={openLightbox}
          onShowAll={openAllPhotos} // 추가: 핸들러 전달
        />
      )}

      <S.Main>
        <S.Left>
          <InfoSection detail={detail} />
          {reviews && <ReviewSection reviews={reviews} />}
        </S.Left>

        <S.Right>
          <BookingCard
            detail={detail}
            checkIn={checkIn}
            checkOut={checkOut}
            guests={guests}
            setDates={(ci, co) => setDates(ci ?? null, co ?? null)}
            setGuests={setGuests}
            onReserve={handleGoToPayment}
          />
        </S.Right>
      </S.Main>

      <LightboxModal
        isOpen={lightboxOpen}
        activeIndex={activeImageIndex}
        images={images}
        title={detail.title}
        onClose={closeLightbox}
        onPrev={showPrevImage}
        onNext={showNextImage}
      />

      {/* 새 기능: 전체 사진 보기 모달 */}
      <AllPhotosModal
        isOpen={isAllPhotosOpen}
        onClose={closeAllPhotos}
        images={images}
      />
    </S.Container>
  );
}
