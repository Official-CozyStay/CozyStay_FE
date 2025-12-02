import React, { useRef, useState, useEffect } from "react";
import AccommodationCard from "@/components/AccommodationCard/AccommodationCard";
import {
  Section,
  SectionHeader,
  SectionTitle,
  CardListWrapper,
  CardList,
  ScrollButtonGroup,
  ScrollButton,
} from "./MainPage.styles";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Accommodation {
  id: number;
  image: string;
  badge: string;
  title: string;
  date: string;
  price: string;
  nights: string;
  rating: number;
}

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
    list.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      list.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [accommodations]);

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
        <ScrollButtonGroup>
          <ScrollButton
            $position="left"
            onClick={() => scrollList("left")}
            disabled={!canScrollLeft}
            $disabled={!canScrollLeft}
          >
            <ChevronLeft size={16} />
          </ScrollButton>
          <ScrollButton
            $position="right"
            onClick={() => scrollList("right")}
            disabled={!canScrollRight}
            $disabled={!canScrollRight}
          >
            <ChevronRight size={16} />
          </ScrollButton>
        </ScrollButtonGroup>
      </CardListWrapper>
    </Section>
  );
};

export default AccommodationSection;

