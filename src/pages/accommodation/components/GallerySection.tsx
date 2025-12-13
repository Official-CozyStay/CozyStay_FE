import * as S from "../accommodationDetail.styles";
import type { AccommodationImageDTO } from "../../../api/types";

type ThumbImage = AccommodationImageDTO & { idx: number };

type Props = {
  primary: AccommodationImageDTO;
  primaryIndex: number;
  thumbs: ThumbImage[];
  onOpen: (index: number) => void;
};

export default function GallerySection({
  primary,
  primaryIndex,
  thumbs,
  onOpen,
}: Props) {
  return (
    <S.Gallery>
      <S.MainImage>
        <S.Img
          src={primary.imageUrl}
          alt="대표 이미지"
          onClick={() => onOpen(primaryIndex)}
        />
      </S.MainImage>

      {thumbs.map((item) => (
        <S.Thumb key={item.imageId}>
          <S.Img
            src={item.imageUrl}
            alt={`이미지 ${item.idx + 1}`}
            onClick={() => onOpen(item.idx)}
          />
        </S.Thumb>
      ))}
    </S.Gallery>
  );
}