import { useEffect } from 'react';
import * as S from '../accommodationDetail.styles';
import type {
  AccommodationImageCategoryDTO,
  AccommodationImageDTO,
} from '../../../api/types';
import { ChevronLeft } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  images: AccommodationImageDTO[];
  categories?: AccommodationImageCategoryDTO[];
};

export default function AllPhotosModal({
  isOpen,
  onClose,
  images,
  categories = [],
}: Props) {
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

  const validCategories = categories.filter(
    (category) => category.images.length > 0,
  );
  const hasCategorizedImages = validCategories.length > 0;
  const getCategoryLabel = (categoryName: string) =>
    !categoryName || categoryName === '미분류' ? '숙소 내부' : categoryName;

  return (
    <S.PhotoModalOverlay>
      <S.PhotoModalHeader>
        <S.CloseButton onClick={onClose}>
          <ChevronLeft size={24} />
        </S.CloseButton>
      </S.PhotoModalHeader>

      <S.PhotoModalBody>
        {hasCategorizedImages ? (
          <S.CategorySectionList>
            {validCategories.map((category) => (
              <S.CategorySection
                key={category.categoryId ?? category.categoryName}
              >
                <S.CategoryTitle>
                  {getCategoryLabel(category.categoryName)}
                </S.CategoryTitle>
                <S.PhotoGrid>
                  {category.images.map((img) => (
                    <S.PhotoItem key={img.imageId}>
                      <img
                        src={img.imageUrl}
                        alt={`${getCategoryLabel(category.categoryName)} ${img.imageId}`}
                      />
                    </S.PhotoItem>
                  ))}
                </S.PhotoGrid>
              </S.CategorySection>
            ))}
          </S.CategorySectionList>
        ) : (
          <S.PhotoGrid>
            {images.map((img) => (
              <S.PhotoItem key={img.imageId}>
                <img src={img.imageUrl} alt={`숙소 이미지 ${img.imageId}`} />
              </S.PhotoItem>
            ))}
          </S.PhotoGrid>
        )}
      </S.PhotoModalBody>
    </S.PhotoModalOverlay>
  );
}
