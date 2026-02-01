import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAccommodationStore } from "../../store/accommodationStore";
import * as S from "./accommodationDetail.styles";

import GallerySection from "./components/GallerySection";
import InfoSection from "./components/InfoSection";
import BookingCard from "./components/BookingCard";
import LightboxModal from "./components/LightboxModal";
import ReviewSection from "./components/ReviewSection";
import { useLightbox } from "./hooks/useLightbox";

import type { AccommodationImageDTO, ReviewListResponse } from "../../api/types";
import { fetchAccommodationReviews } from "../../api/accommodation";

type ThumbImage = AccommodationImageDTO & { idx: number };

export default function AccommodationDetailPage() {
  const { id = "1" } = useParams();
  const [reviews, setReviews] = useState<ReviewListResponse | null>(null);

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

  useEffect(() => {
    load(id);
    fetchAccommodationReviews(id).then(setReviews);
  }, [id, load]);

  const images: AccommodationImageDTO[] = detail?.images ?? [];
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

  return (
    <S.Container>
      <S.Header>
        <S.Title>{detail.title}</S.Title>
        <S.SubMeta>
          <span>★ {detail.reviewSummary.average.toFixed(2)}</span>
          <S.Dot>.</S.Dot>
          <a href="#reviews">후기 {detail.reviewSummary.count}개</a>
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
    </S.Container>
  );
}
