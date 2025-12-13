import { useState } from "react";

export function useLightbox(totalImages: number) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setActiveImageIndex(null);
  };

  const showPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((current) => {
      if (current === null) return 0;
      return current === 0 ? totalImages - 1 : current - 1;
    });
  };

  const showNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((current) => {
      if (current === null) return 0;
      return current === totalImages - 1 ? 0 : current + 1;
    });
  };

  return {
    lightboxOpen,
    activeImageIndex,
    openLightbox,
    closeLightbox,
    showPrevImage,
    showNextImage,
  };
}