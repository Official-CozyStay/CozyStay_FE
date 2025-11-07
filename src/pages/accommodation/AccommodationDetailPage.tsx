import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAccommodationStore } from "../../store/accommodationStore.ts";
import styled from "styled-components";

export default function AccommodationDetailPage(){
    const { id = "1" } = useParams();
    const { detail, loading, error, load} = useAccommodationStore();

    // 페이지 진입/ID 변경 시 데이터 로드
    useEffect(() => { load(id); }, [id, load]);

    if(loading) return <div style={{ padding : 20 }}>불러오는 중...</div>;
    if(error) return <div style={{ padding: 20 }}> 에러 : {error}</div>;
    if(!detail) return <div style={{padding: 20}}>데이터 없음</div>;

    // 갤러리용 데이터 가공
    const primary =
        detail.images.find(i => i.isPrimary)?.imageUrl ??
        detail.images[0]?.imageUrl;
    const thumbs = detail.images
        .filter(i=>!i.isPrimary)
        .slice(0,4)
        .map(i => i.imageUrl);

    return (
        <Container>
            <Header>
                <Title>{detail.title}</Title>
                <SubMeta>
                    <span>★ {detail.reviewSummary.average.toFixed(2)}</span>
                    <Dot>·</Dot>
                    <a href="#reviews">후기 {detail.reviewSummary.count}개</a>
                    <Dot>·</Dot>
                    <span>
            {detail.city}, {detail.country}
          </span>
                </SubMeta>
            </Header>

            {/* 이미지 갤러리 */}
            <Gallery>
                <MainImage>
                    {primary && <Img src={primary} alt="대표 이미지" />}
                </MainImage>
                {thumbs.map((src, idx) => (
                    <Thumb key={idx}>
                        <Img src={src} alt={`이미지 ${idx + 1}`} />
                    </Thumb>
                ))}
            </Gallery>

            <Main>
                <Left>
                    {/* 숙소 기본 정보 */}
                    <Section>
                        <H2>호스트: {detail.host.nickName}</H2>
                        <Meta>
                            최대 {detail.maxGuests}명 · 침실 {detail.bedrooms}개 · 침대{" "}
                            {detail.beds}개 · 욕실 {detail.bathrooms}개
                        </Meta>
                        <P>{detail.description}</P>
                    </Section>

                    {/* 편의시설 */}
                    <Section>
                        <H3>편의시설</H3>
                        <AmenityList>
                            {detail.amenities.map((a) => (
                                <li key={a.amenityId}>{a.name}</li>
                            ))}
                        </AmenityList>
                    </Section>

                    {/* TODO: 리뷰 섹션, 지도 섹션 등 추가 */}
                </Left>

                <Right>
                    {/* TODO: 이후 가격/예약 카드 컴포넌트 자리 */}
                    <StickyCard>
                        <Price>
                            ₩{detail.pricePerNight.toLocaleString()}{" "}
                            <span>/박</span>
                        </Price>
                        <Small>가격 카드/예약 위젯은 다음 단계에서 연결</Small>
                    </StickyCard>
                </Right>
            </Main>
        </Container>
    );
}

/* ========== styled-components ========== */

const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 24px 20px;
  color: #222;
`;

const Header = styled.header`
  margin-bottom: 14px;
`;

const Title = styled.h1`
  margin: 0 0 6px;
  font-size: 28px;
  line-height: 1.25;
`;

const SubMeta = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  color: #6b6b6b;

  a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

const Dot = styled.span`
  color: #aaa;
`;

const Gallery = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 220px 220px;
  gap: 6px;
  margin-bottom: 24px;

  @media (min-width: 900px) {
    grid-template-rows: 260px 260px;
  }
`;

const MainImage = styled.div`
  grid-row: 1 / 3;
  overflow: hidden;
  border-radius: 12px;
`;

const Thumb = styled.div`
  overflow: hidden;
  border-radius: 12px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 32px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Left = styled.div``;

const Right = styled.aside``;

const Section = styled.section`
  border-top: 1px solid #eee;
  padding: 18px 0;
`;

const H2 = styled.h2`
  margin: 0 0 8px;
  font-size: 22px;
`;

const H3 = styled.h3`
  margin: 0 0 10px;
  font-size: 18px;
`;

const Meta = styled.div`
  color: #6b6b6b;
  margin-bottom: 12px;
`;

const P = styled.p`
  white-space: pre-wrap;
  margin: 0;
`;

const AmenityList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const StickyCard = styled.div`
  position: sticky;
  top: 24px;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
`;

const Price = styled.div`
  font-size: 20px;
  font-weight: 700;

  span {
    font-weight: 400;
    font-size: 14px;
    color: #6b6b6b;
  }
`;

const Small = styled.div`
  color: #6b6b6b;
  font-size: 12px;
  margin-top: 8px;
`;

