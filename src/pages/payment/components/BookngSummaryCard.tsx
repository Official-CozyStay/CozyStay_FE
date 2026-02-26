import * as S from "../payment.styles";

type Props = {
    title : string;
    thumbnailUrl?: string;
    averageRating: number;
    reviewCount : number;
    checkIn: string | null;
    checkOut: string | null;
    guests: number;
    nights: number;
    pricePerNight: number;
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
    total,}: Props){
    return (
        <S.SummaryCard>
            <S.SummaryTop>
                {thumbnailUrl && <S.Thumbnail src={thumbnailUrl}/>}
                <div>
                    <S.SummaryTitle>{title}</S.SummaryTitle>
                    <S.SummaryMeta>
                        ★ {averageRating.toFixed(1)} (후기 {reviewCount}개)
                    </S.SummaryMeta>
                </div>
            </S.SummaryTop>

            <S.Divider/>

            <S.SummaryRow>
                <span>날짜</span>
                <span>
                    {checkIn} ~ {checkOut}
                </span>
            </S.SummaryRow>

            <S.SummaryRow>
                <span>게스트</span>
                <span>{guests}명</span>
            </S.SummaryRow>

            <S.Divider/>

            <S.SummaryRow>
                <span>
                     ₩{pricePerNight.toLocaleString()} × {nights}박
                </span>
            </S.SummaryRow>

            {total && (
                <S.TotalRow>
                    <span>총액 KRW</span>
                    <span>₩{total.toLocaleString()}</span>
                </S.TotalRow>
            )}
        </S.SummaryCard>
    );
}