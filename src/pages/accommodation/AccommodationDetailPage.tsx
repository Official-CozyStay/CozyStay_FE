import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAccommodationStore } from "../../store/accommodationStore.ts";
import * as S from "./accommodationDetail.styles.ts";
import BookingDatePicker from "../../components/accommodation/BookingDatePicker.tsx";
import { nightsBetween, calcTotal, formatKRW } from "../../utils/price.ts";

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

    // 숙박 일수 계산
    const nights = nightsBetween(checkIn, checkOut);

    // 총액 계산
    const { room, service, total } = calcTotal(
        nights,
        detail.pricePerNight,
        detail.cleaningFee,
        detail.serviceFeePercentage
    );

    // 유효성 검사 메시지
    const guestError =
        guests > detail.maxGuests
            ?`최대 인원은 ${detail.maxGuests}명입니다.`
            : undefined;

    const dateError =
        checkIn && checkOut && nights === 0
            ?"최소 1박 이상 선택해주세요."
            : undefined;

    //예약 버튼 활성 조건
    const canReserve =
        !!checkIn && !!checkOut &&
        nights > 0 && guests >= 1 &&
        guests <= detail.maxGuests;

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

                {/* 예약 카드 */}
                <S.Right>
                    <S.StickyCard>
                        {/* 가격 헤더 */}
                        <S.Price>
                            ₩{detail.pricePerNight.toLocaleString()} <span>/박</span>
                        </S.Price>

                        {/* 날짜 + 인원 입력 */}
                        <div
                            style={{
                                marginTop: 12,
                                display: "flex",
                                flexDirection: "column",
                                gap: 12,
                            }}
                        >
                            {/* 날짜 선택 */}
                            <div>
                                <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>날짜</div>
                                <BookingDatePicker
                                    checkIn={checkIn}
                                    checkOut={checkOut}
                                    onChange={(ci, co) => setDates(ci, co)}
                                />
                            </div>

                            {/* 인원 선택 */}
                            <div>
                                <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>인원</div>
                                <input
                                    type="number"
                                    min={1}
                                    max={detail.maxGuests}
                                    value={guests}
                                    onChange={(e) => {
                                        const v = Number(e.target.value) || 1;
                                        setGuests(Math.max(1, Math.min(detail.maxGuests, v)));
                                    }}
                                    style={{
                                        width: "100%",
                                        border: "1px solid #ddd",
                                        borderRadius: 12,
                                        padding: "10px 12px",
                                    }}
                                />
                                <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
                                    최대 {detail.maxGuests}명
                                </div>
                            </div>
                        </div>

                        {/* 요약 / 총액 */}
                        <div style={{ marginTop: 16, fontSize: 14 }}>
                            {nights > 0 ? (
                                <>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            marginBottom: 4,
                                        }}
                                    >
            <span>
              ₩{formatKRW(detail.pricePerNight)} x {nights}박
            </span>
                                        <span>₩{formatKRW(room)}</span>
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            marginBottom: 4,
                                        }}
                                    >
                                        <span>청소비</span>
                                        <span>₩{formatKRW(detail.cleaningFee)}</span>
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            marginBottom: 4,
                                        }}
                                    >
                                        <span>서비스 수수료 ({detail.serviceFeePercentage}%)</span>
                                        <span>₩{formatKRW(service)}</span>
                                    </div>

                                    <div
                                        style={{
                                            marginTop: 8,
                                            paddingTop: 8,
                                            borderTop: "1px solid #eee",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            fontWeight: 700,
                                        }}
                                    >
                                        <span>총액</span>
                                        <span>₩{formatKRW(total)}</span>
                                    </div>
                                </>
                            ) : (
                                <S.Small style={{ marginTop: 4 }}>
                                    날짜를 선택하면 예상 총액이 계산됩니다.
                                </S.Small>
                            )}
                        </div>

                        {/* 에러 메시지 */}
                        {guestError && (
                            <div
                                style={{
                                    marginTop: 8,
                                    fontSize: 12,
                                    color: "#c03434",
                                }}
                            >
                                {guestError}
                            </div>
                        )}
                        {dateError && (
                            <div
                                style={{
                                    marginTop: 4,
                                    fontSize: 12,
                                    color: "#c03434",
                                }}
                            >
                                {dateError}
                            </div>
                        )}

                        {/* 예약 버튼 */}
                        <button
                            type="button"
                            disabled={!canReserve}
                            onClick={() => {
                                if (!canReserve) return;
                                // TODO: 나중에 예약 페이지로 라우팅 or API 호출
                                alert(
                                    `예약 요청: ${checkIn} ~ ${checkOut}, ${guests}명 (총액: ₩${formatKRW(
                                        total
                                    )})`
                                );
                            }}
                            style={{
                                marginTop: 12,
                                width: "100%",
                                padding: "12px 0",
                                borderRadius: 12,
                                border: "none",
                                fontWeight: 600,
                                backgroundColor: canReserve ? "#FF385C" : "#ddd",
                                color: "#fff",
                                cursor: canReserve ? "pointer" : "not-allowed",
                            }}
                        >
                            {canReserve ? "예약 요청하기" : "날짜와 인원을 선택해주세요"}
                        </button>
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
