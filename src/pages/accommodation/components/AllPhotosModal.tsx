import { useEffect } from 'react';
import * as S from '../accommodationDetail.styles';
import type { AccommodationImageDTO } from '../../../api/types';
import { ChevronLeft } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  images: AccommodationImageDTO[];
};

export default function AllPhotosModal({ isOpen, onClose, images }: Props) {
  // 모달이 열리면 바디 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <S.PhotoModalOverlay>
      <S.PhotoModalHeader>
        <S.CloseButton onClick={onClose}>
          <ChevronLeft size={24} />
        </S.CloseButton>
      </S.PhotoModalHeader>

      <S.PhotoModalBody>
        <S.PhotoGrid>
          {images.map((img) => (
            <S.PhotoItem key={img.imageId}>
              <img src={img.imageUrl} alt={`숙소 이미지 ${img.imageId}`} />
            </S.PhotoItem>
          ))}
        </S.PhotoGrid>
      </S.PhotoModalBody>
    </S.PhotoModalOverlay>
  );
}
