import { useRef, useState, useEffect, useCallback } from 'react';
import AccommodationCard from '@/components/AccommodationCard/AccommodationCard';
import type { Accommodation } from '@/types/accommodation';
import {
  Section,
  SectionHeader,
  SectionTitle,
  CardListWrapper,
  CardList,
  ScrollButtonGroup,
  ScrollButton,
} from './MainPage.styles';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AccommodationSectionProps {
  title: string;
  accommodations: Accommodation[];
}

const AccommodationSection = ({
  title,
  accommodations,
}: AccommodationSectionProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (listRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    checkScrollPosition();
    list.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', checkScrollPosition);

    return () => {
      list.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [accommodations]);

  const scrollList = useCallback((direction: 'left' | 'right') => {
    if (listRef.current) {
      // 실제 렌더링된 첫 번째 카드 요소의 크기를 사용하여 스크롤 양 계산
      const firstCard = listRef.current.children[0] as HTMLElement;
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth;
        const gap = parseFloat(getComputedStyle(listRef.current).gap || '0');
        const scrollAmount = cardWidth + gap;

        listRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
      </SectionHeader>
      <CardListWrapper>
        <ScrollButtonGroup>
          <ScrollButton
            $position="left"
            onClick={() => scrollList('left')}
            disabled={!canScrollLeft}
            $disabled={!canScrollLeft}
          >
            <ChevronLeft size={16} />
          </ScrollButton>
          <ScrollButton
            $position="right"
            onClick={() => scrollList('right')}
            disabled={!canScrollRight}
            $disabled={!canScrollRight}
          >
            <ChevronRight size={16} />
          </ScrollButton>
        </ScrollButtonGroup>
        <CardList ref={listRef}>
          {accommodations.map((accommodation) => (
            <AccommodationCard
              key={accommodation.id}
              image={accommodation.image}
              badge={accommodation.badge}
              title={accommodation.title}
              date={accommodation.date}
              price={accommodation.price}
              nights={accommodation.nights}
              rating={accommodation.rating}
            />
          ))}
        </CardList>
      </CardListWrapper>
    </Section>
  );
};

export default AccommodationSection;
