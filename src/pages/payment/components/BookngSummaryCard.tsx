import * as S from '../payment.styles';

type Props = {
  title: string;
  thumbnailUrl?: string;
  averageRating: number;
  reviewCount: number;
  checkIn: string | null;
  checkOut: string | null;
  guests: number;
  nights: number;
  pricePerNight: number;
  cleaningFee: number;
  serviceFee: number;
  total?: number;
};

export default function BookingSummaryCard({
  title,
  thumbnailUrl,
  averageRating,
  reviewCount,
  checkIn,
  checkOut,
  guests,
  nights,
  pricePerNight,
  cleaningFee,
  serviceFee,
  total,
}: Props) {
  return (
    <S.SideCard>
      <S.SideTop>
        {thumbnailUrl && <S.Thumbnail src={thumbnailUrl} alt={title} />}
        <div>
          <S.SideTitle>{title}</S.SideTitle>
          <S.SideMeta>
            ★ {averageRating.toFixed(1)} (후기 {reviewCount}개)
          </S.SideMeta>
        </div>
      </S.SideTop>

      <S.Divider />

      <S.SideInfoRow>
        <span>날짜</span>
        <span>
          {checkIn} - {checkOut}
        </span>
      </S.SideInfoRow>

      <S.SideInfoRow>
        <span>게스트</span>
        <span>{guests}명</span>
      </S.SideInfoRow>

      <S.Divider />

      <S.SidePriceRow>
        ₩ {pricePerNight.toLocaleString()} × {nights}박
      </S.SidePriceRow>

      {nights > 0 && (
        <>
          <S.SideInfoRow>
            <span>청소비</span>
            <span>₩{cleaningFee.toLocaleString()}</span>
          </S.SideInfoRow>

          <S.SideInfoRow>
            <span>서비스 수수료</span>
            <span>₩{serviceFee.toLocaleString()}</span>
          </S.SideInfoRow>
        </>
      )}

      {total && (
        <S.SideTotalRow>
          <span>총액 KRW</span>
          <strong>₩{total.toLocaleString()}</strong>
        </S.SideTotalRow>
      )}
    </S.SideCard>
  );
}
