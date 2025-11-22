import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 24px 20px;
  color: ${({ theme }) => theme.colors.text.primary};
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
  color: ${({ theme }) => theme.colors.text.secondary};

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
  border-radius: ${({ theme }) => theme.radius.md};
`;

export const Thumb = styled.div`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.md};
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
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
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
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 16px;
  box-shadow: ${({ theme }) => theme.shadow.md};
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

export const FormSection = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Label = styled.div`
  font-size: 12px;
  color: #666;
`;

export const NumberInput = styled.input`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 10px 12px;
  outline: none;

  &:focus {
    border-color: #222;
  }
`;

export const HelperText = styled.div`
  font-size: 12px;
  color: #888;
  margin-top: 4px;
`;

export const Summary = styled.div`
  margin-top: 16px;
  font-size: 14px;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const SummaryTotal = styled(SummaryRow)`
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #eee;
  font-weight: 700;
`;

export const ErrorText = styled.div<{ $compact?: boolean }>`
  margin-top: ${({ $compact }) => ($compact ? '4px' : '8px')};
  font-size: 12px;
  color: #c03434;
`;

export const ReserveButton = styled.button`
  margin-top: 12px;
  width: 100%;
  padding: 12px 0;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  background-color: #ff385c;
  color: #fff;
  cursor: pointer;

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

export const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LightboxInner = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: #000;
  border-radius: 12px;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LightboxImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

export const LightboxClose = styled.button`
  position: absolute;
  top: 8px;
  right: 12px;
  border: none;
  background: transparent;
  color: #fff;
  font-size: 28px;
  cursor: pointer;
`;

const arrowBase = `
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

export const LightboxPrev = styled.button`
  ${arrowBase};
  left: 12px;
`;

export const LightboxNext = styled.button`
  ${arrowBase};
  right: 12px;
`;
