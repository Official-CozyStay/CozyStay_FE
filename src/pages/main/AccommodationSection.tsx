import React, { useRef } from "react";
import AccommodationCard from "@/components/AccommodationCard/AccommodationCard";
import { Accommodation } from "@/types/accommodation";
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

const SCROLL_AMOUNT = 400;

const AccommodationSection: React.FC<AccommodationSectionProps> = ({
  title,
  accommodations,
}) => {
  const listRef = useRef<HTMLDivElement>(null);

  const scrollList = (direction: "left" | "right") => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
        behavior: "smooth",
      });
    }
  };

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
