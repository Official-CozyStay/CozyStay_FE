import styled from "styled-components";

export const Container = styled.div`
    max-width: 1120px;
    margin: 0 auto;
    padding: 24px 20px;
    color: #222;
`;

export const Header = styled.header`
    margin-bottom: 14px;
`;

export const Title = styled.h1`
  margin: 0 0 6px;
  font-size: 28px;
  line-height: 1.25;
`;

export const SubMeta = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  color: #6b6b6b;

  a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

export const Dot = styled.span`
  color: #aaa;
`;

export const Gallery = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 220px 220px;
  gap: 6px;
  margin-bottom: 24px;

  @media (min-width: 900px) {
    grid-template-rows: 260px 260px;
  }
`;

export const MainImage = styled.div`
  grid-row: 1 / 3;
  overflow: hidden;
  border-radius: 12px;
`;

export const Thumb = styled.div`
  overflow: hidden;
  border-radius: 12px;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

export const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 32px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const Left = styled.div``;
export const Right = styled.aside``;

export const Section = styled.section`
  border-top: 1px solid #eee;
  padding: 18px 0;
`;

export const H2 = styled.h2`
  margin: 0 0 8px;
  font-size: 22px;
`;

export const H3 = styled.h3`
  margin: 0 0 10px;
  font-size: 18px;
`;

export const Meta = styled.div`
  color: #6b6b6b;
  margin-bottom: 12px;
`;

export const P = styled.p`
  white-space: pre-wrap;
  margin: 0;
`;

export const AmenityList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const StickyCard = styled.div`
  position: sticky;
  top: 24px;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
`;

export const Price = styled.div`
  font-size: 20px;
  font-weight: 700;

  span {
    font-weight: 400;
    font-size: 14px;
    color: #6b6b6b;
  }
`;

export const Small = styled.div`
  color: #6b6b6b;
  font-size: 12px;
  margin-top: 8px;
`;