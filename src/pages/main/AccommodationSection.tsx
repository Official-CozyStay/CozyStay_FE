import React, { useRef, useCallback } from "react";
import { useTheme } from "styled-components";
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
  CARD_WIDTH,
} from "./MainPage.styles";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AccommodationSectionProps {
  title: string;
  accommodations: Accommodation[];
}

// 카드 너비 + gap을 기반으로 스크롤 양 계산
const getScrollAmount = (cardWidth: string, gap: string) => {
  const cardWidthValue = parseInt(cardWidth.replace("px", ""), 10);
  const gapValue = parseInt(gap.replace("px", ""), 10);
  return cardWidthValue + gapValue;
};

const AccommodationSection: React.FC<AccommodationSectionProps> = ({
  title,
  accommodations,
}) => {
  const theme = useTheme();
  const listRef = useRef<HTMLDivElement>(null);
  const scrollAmount = getScrollAmount(CARD_WIDTH, theme.spacing.xl); // CardList의 gap과 동일

  const scrollList = useCallback(
    (direction: "left" | "right") => {
      if (listRef.current) {
        listRef.current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    },
    [scrollAmount]
  );

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
