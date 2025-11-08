import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAccommodationStore } from "../../store/accommodationStore.ts";
import * as S from "./accommodationDetail.styles.ts";
import BookingDatePicker from "../../components/accommodation/BookingDatePicker.tsx";

export default function AccommodationDetailPage(){
    const { id = "1" } = useParams();

    // 필요 상태/액션 가져오기
    const { detail, loading, error, load,
            checkIn, checkOut, guests,
            setDates, setGuests,} = useAccommodationStore();

    useEffect(()=>{
        load(id);
    }, [id, load]);

    if(loading) return <S.Container> 불러오는 중...</S.Container>;
    if(error) return <S.Container>에러 : {error}</S.Container>;
    if(!detail) return <S.Container> 데이터 없음 </S.Container>;

    const primary =
        detail.images.find((i) => i.isPrimary)?.imageUrl ??
        detail.images[0]?.imageUrl;
    const thumbs = detail.images
        .filter((i) => !i.isPrimary)
        .slice(0, 4)
        .map((i) => i.imageUrl);

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

            {/*  이미지 갤러리  */}
            <S.Gallery>
                <S.MainImage>{primary && <S.Img src={primary} alt="대표 이미지"></S.Img>}</S.MainImage>
                {thumbs.map((src, idx) => (
                    <S.Thumb key={idx}>
                        <S.Img src={src} alt={`이미지 ${idx + 1}`}/>
                    </S.Thumb>
                ))}
            </S.Gallery>

            <S.Main>
                <S.Left>
                {/* 숙소 정보 */}
                    <S.Section>
                        <S.H2>호스트 : {detail.host.nickName}</S.H2>
                        <S.Meta>
                            최대 {detail.maxGuests}명 · 침실 {detail.bedrooms}개 · 침대 {detail.beds}개 · 욕실 {detail.bathrooms}개
                        </S.Meta>
                        <S.P>{detail.description}</S.P>
                    </S.Section>

                {/* 편의시설 */}
                    <S.Section>
                        <S.H3>편의시설</S.H3>
                        <S.AmenityList>
                            {detail.amenities.map((a) => (
                                <li key={a.amenityId}>{a.name}</li>
                            ))}
                        </S.AmenityList>
                    </S.Section>
                </S.Left>
            {/* 예약 카드 자리 */}
                <S.Right>
                    <S.StickyCard>
                        <S.Price>
                            ₩{detail.pricePerNight.toLocaleString()} <span>/박</span>
                        </S.Price>

                    {/* 임시 입력 ( 나중에 컴포넌트 분리 예정) */}
                    {/*  달력 입력 + 인원 입력  */}
                        <div style={{ display: "flex, gap: 8, marginTop: 12"}}>
                            {/* 달력 */}
                            <div style={{marginTop : 12}}>
                                <BookingDatePicker
                                    checkIn={checkIn}
                                    checkOut={checkOut}
                                    onChange={(ci, co) => setDates(ci, co)}
                                    />
                            </div>
                            <input
                                type="number"
                                min={1}
                                value={guests}
                                onChange={(e) => setGuests(Number(e.target.value))}
                                style={{ width: 80 }}
                            />
                        </div>

                        <S.Small>총액 계산/예약 버튼은 커밍쑨</S.Small>
                    </S.StickyCard>
                </S.Right>
            </S.Main>
        </S.Container>


    )

}
