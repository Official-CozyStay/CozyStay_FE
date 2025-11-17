import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAccommodationStore } from "../../store/accommodationStore.ts";
import * as S from "./accommodationDetail.styles.ts";
import BookingDatePicker from "../../components/accommodation/BookingDatePicker.tsx";

export default function AccommodationDetailPage(){
    const { id = "1" } = useParams();

    // 이미지 확대 부분 => 어떤 이미지 클릭했는지 + 모달 열고/닫기
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

    const openLightbox = (index: number) =>{
        setActiveImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        setActiveImageIndex(null);
    }

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

    // 이미지 객체 + index
    const images = detail.images;
    const totalImages = images.length;

    // 대표 이미지 인덱스 찾기 ( 없으면 0번)
    const primaryIndexRaw = images.findIndex((i) => i.isPrimary);
    const primaryIndex = primaryIndexRaw === -1 ? 0 : primaryIndexRaw;
    const primary = images[primaryIndex];

    // 썸네일용 : index를 같이 들고 있음
    const thumbs = images
        .map((img, idx) => ({...img, idx}))
        .filter((item) => item.idx !== primaryIndex)
        .slice(0, 4);

    const showPrevImage = (e : React.MouseEvent) => {
        e.stopPropagation();
        setActiveImageIndex((current) => {
            if(current === null) return 0;
            return current === 0 ? totalImages - 1 : current - 1;
        });
    };

    const showNextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveImageIndex((current) => {
            if(current === null) return 0;
            return current === totalImages -1 ? 0 : current + 1;
        });
    };



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
                <S.MainImage>
                    {primary && (
                        <S.Img
                            src = {primary.imageUrl}
                            alt = "대표 이미지"
                            onClick = {() => openLightbox(primaryIndex)}
                            style={{ cursor : "pointer" }}
                        />
                    )}
                </S.MainImage>

                {thumbs.map((item) => (
                    <S.Thumb key={item.imageId}>
                        <S.Img
                            src = {item.imageUrl}
                            alt = {`이미지 ${item.idx + 1}`}
                            onClick={() => openLightbox(item.idx)}
                            style={{ cursor : "pointer" }}
                        />
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

        {/*  확대 이미지 모달  */}
            {lightboxOpen && activeImageIndex !== null && (
                <S.LightboxOverlay onClick={closeLightbox}>
                    <S.LightboxInner onClick={(e) => e.stopPropagation()}>
                        <S.LightboxClose onClick={closeLightbox}>x</S.LightboxClose>
                        {/* 좌우 화살표 */}
                        <S.LightboxPrev onClick={showPrevImage}> ‹ </S.LightboxPrev>
                        <S.LightboxNext onClick={showNextImage}> › </S.LightboxNext>
                        <S.LightboxImage
                            src={detail.images[activeImageIndex].imageUrl}
                            alt={detail.title}
                        />
                    </S.LightboxInner>
                </S.LightboxOverlay>
            )}
        </S.Container>


    )

}
