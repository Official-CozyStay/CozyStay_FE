import React, { useRef, useCallback } from "react";
import AccommodationCard from "@/components/AccommodationCard/AccommodationCard";
import type { Accommodation } from "@/types/accommodation";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionArrow,
  CardListWrapper,
  CardList,
  ScrollButton,
} from "./MainPage.styles";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AccommodationSectionProps {
  title: string;
  accommodations: Accommodation[];
}

const AccommodationSection: React.FC<AccommodationSectionProps> = ({
  title,
  accommodations,
}) => {
  const listRef = useRef<HTMLDivElement>(null);

  const scrollList = useCallback((direction: "left" | "right") => {
    if (listRef.current) {
      // 실제 렌더링된 첫 번째 카드 요소의 크기를 사용하여 스크롤 양 계산
      const firstCard = listRef.current.children[0] as HTMLElement;
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth;
        const gap = parseFloat(getComputedStyle(listRef.current).gap || "0");
        const scrollAmount = cardWidth + gap;

        listRef.current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    }
  }, []);

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
        <SectionArrow>›</SectionArrow>
      </SectionHeader>
      <CardListWrapper>
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
        <ScrollButton $position="left" onClick={() => scrollList("left")}>
          <ChevronLeft size={20} />
        </ScrollButton>
        <ScrollButton $position="right" onClick={() => scrollList("right")}>
          <ChevronRight size={20} />
        </ScrollButton>
      </CardListWrapper>
    </Section>
  );
};

export default AccommodationSection;
