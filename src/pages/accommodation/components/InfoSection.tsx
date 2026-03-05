import * as S from '../accommodationDetail.styles';
import type { AccommodationDetailDTO } from '../../../api/types';

type Props = {
  detail: AccommodationDetailDTO;
};

export default function InfoSection({ detail }: Props) {
  return (
    <S.Left>
      {/* 숙소 정보 */}
      <S.Section>
        {/* HostDTO가 제거되어 닉네임을 알 수 없음 */}
        <S.H2>호스트 : 알 수 없음</S.H2>
        <S.Meta>
          최대 {detail.maxGuests}명 · 침실 {detail.detail?.bedrooms ?? 0}개 ·
          침대 {detail.detail?.beds ?? 0}개 · 욕실{' '}
          {detail.detail?.bathrooms ?? 0}개
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
