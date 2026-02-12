import * as S from "../accommodationDetail.styles";
import type { AccommodationImageDTO } from "../../../api/types";
import { Grip } from "lucide-react";

type ThumbImage = AccommodationImageDTO & { idx: number };

type Props = {
  primary: AccommodationImageDTO;
  primaryIndex: number;
  thumbs: ThumbImage[];
  onOpen: (index: number) => void;
  onShowAll: () => void;
};

export default function GallerySection({
  primary,
  primaryIndex,
  thumbs,
  onOpen,
  onShowAll,
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

      <S.ShowAllButton onClick={onShowAll}>
        <Grip size={16} />
        사진 모두 보기
      </S.ShowAllButton>
    </S.Gallery>
  );
}