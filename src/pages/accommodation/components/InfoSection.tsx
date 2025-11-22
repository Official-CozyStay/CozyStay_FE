import * as S from "../accommodationDetail.styles";

type Amenity = {
    amenityId: number;
    name: string;
};

type InfoDetail = {
    host: {
        nickName: string;
    };
    maxGuests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
    description: string;
    amenities: Amenity[];
};

type Props = {
    detail: InfoDetail;
};

export default function InfoSection({ detail }: Props) {
    return (
        <S.Left>
            {/* 숙소 정보 */}
            <S.Section>
                <S.H2>호스트 : {detail.host.nickName}</S.H2>
                <S.Meta>
                    최대 {detail.maxGuests}명 · 침실 {detail.bedrooms}개 · 침대{" "}
                    {detail.beds}개 · 욕실 {detail.bathrooms}개
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
    );
}
