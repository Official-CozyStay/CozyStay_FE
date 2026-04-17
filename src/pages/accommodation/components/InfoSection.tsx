import * as S from '../accommodationDetail.styles';
import type { AccommodationDetailDTO } from '../../../api/types';

type Props = {
  detail: AccommodationDetailDTO;
};

export default function InfoSection({ detail }: Props) {
  return (
    <S.Left>
      <S.Section>
        <S.H2>호스트: {detail.hostNickname || '알 수 없음'}</S.H2>
        <S.Meta>
          최대 {detail.maxGuests}명 · 침실 {detail.detail?.bedroomCount ?? 0}개
          · 침대 {detail.detail?.bedCount ?? 0}개 · 욕실{' '}
          {detail.detail?.bathroomCount ?? 0}개
        </S.Meta>
        <S.P>{detail.description}</S.P>
      </S.Section>

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
