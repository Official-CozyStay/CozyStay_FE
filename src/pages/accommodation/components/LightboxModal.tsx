// 이미지 확대해서 보여주는 UI 컴포넌트

import * as S from '../accommodationDetail.styles';
import type { AccommodationImageDTO } from '../../../api/types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  isOpen: boolean;
  activeIndex: number | null;
  images: AccommodationImageDTO[];
  title: string;
  onClose: () => void;
  onPrev: (e: React.MouseEvent) => void;
  onNext: (e: React.MouseEvent) => void;
};

export default function LightboxModal({
  isOpen, // 모달이 열렸는지
  activeIndex, // 지금 몇번째 이미지인지
  images, // 이미지 배열
  title, // alt텍스트로 사용
  onClose, // 닫기 함수 (hook)
  onPrev, // 이전 이미지
  onNext, // 다음 이미지
}: Props) {
  if (!isOpen || activeIndex === null) return null;

  return (
    <S.LightboxOverlay onClick={onClose}>
      <S.LightboxInner onClick={(e) => e.stopPropagation()}>
        <S.LightboxClose onClick={onClose}>
          <X />
        </S.LightboxClose>
        <S.LightboxPrev onClick={onPrev}>
          <ChevronLeft />
        </S.LightboxPrev>
        <S.LightboxNext onClick={onNext}>
          <ChevronRight />
        </S.LightboxNext>
        <S.LightboxImage src={images[activeIndex].imageUrl} alt={title} />
      </S.LightboxInner>
    </S.LightboxOverlay>
  );
}
