import styled from "styled-components";

export const Container = styled.main`
  --max: 1440px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Hero = styled.section`
  position: relative;
  max-width: var(--max);
  margin: 60px auto 100px;
  padding: 0 16px;
  min-height: 542px;
`;

export const HeroCard = styled.div`
  position: absolute;
  top: 50%;
  left: 32px;
  transform: translateY(-50%);
  width: 420px;
  max-width: 520px;
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 24px;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.md};
  z-index: 2;
`;

export const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.font.size.xxl};
  line-height: ${({ theme }) => theme.font.lineHeight.tight};
  margin: 0 0 8px;
  font-weight: ${({ theme }) => theme.font.weight.extrabold};
  word-break: keep-all;
`;

export const HeroDesc = styled.p`
  color: #666;
  font-size: ${({ theme }) => theme.font.size.sm};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
  margin-bottom: 16px;
`;

export const HeroImageWrap = styled.div`
  position: relative;
  margin-left: 330px;
  z-index: 1;
`;

export const HeroImage = styled.img`
  width: 960px;
  height: 542px;
  border-radius: ${({ theme }) => theme.radius.lg};
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: block;
`;

export const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FieldLabel = styled.span`
  font-size: ${({ theme }) => theme.font.size.xs};
  color: #666;
`;

export const Input = styled.input`
  height: 40px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  outline: none;
  font-size: ${({ theme }) => theme.font.size.sm};
  transition: border 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }
`;

export const Select = styled.select`
  height: 40px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  outline: none;
  font-size: ${({ theme }) => theme.font.size.sm};
  transition: border 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }
`;

export const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

export const Submit = styled.button`
  height: 44px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.primaryHover}
  );
  color: #fff;
  margin-top: 4px;
  transition: 0.15s ease;

  &:hover {
    filter: brightness(1.05);
  }
`;

export const Features = styled.section`
  max-width: var(--max);
  margin: 48px auto 100px;
  padding: 0 16px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
`;

export const Feature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

export const FeatureIcon = styled.div`
  align-self: flex-start;
  margin-bottom: 6px;

  svg {
    width: 28px;
    height: 28px;
    stroke-width: 2;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const FeatureTitle = styled.h3`
  margin: 0 0 6px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.lg};
  line-height: ${({ theme }) => theme.font.lineHeight.tight};
`;

export const FeatureDesc = styled.p`
  margin: 0;
  color: #666;
  font-size: ${({ theme }) => theme.font.size.sm};
  line-height: ${({ theme }) => theme.font.lineHeight.relaxed};
`;

export const List = styled.section`
  max-width: var(--max);
  margin: 40px auto 100px;
  padding: 0 16px;
`;

export const ListTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.extrabold};
  line-height: ${({ theme }) => theme.font.lineHeight.tight};
  margin: 0 0 6px;
`;

export const ListDesc = styled.p`
  color: #666;
  font-size: ${({ theme }) => theme.font.size.sm};
  margin-bottom: 18px;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
`;

export const Card = styled.article`
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  background: #fff;
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

export const Badge = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 2;
  font-size: ${({ theme }) => theme.font.size.xs};
  background: #fff;
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 6px 10px;
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

export const CardImg = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
`;

export const CardBody = styled.div`
  padding: 12px;
`;

export const CardTitle = styled.h4`
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.md};
  margin: 0 0 6px;
`;

export const CardMeta = styled.p`
  color: #666;
  font-size: ${({ theme }) => theme.font.size.sm};
  margin: 0 0 4px;
`;

export const CardPrice = styled.p`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.extrabold};
`;

export const LearnMoreButton = styled.button`
  display: block;
  margin: 40px 0 0 0;
  padding: 10px 22px;
  border: 1.5px solid ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  background: #fff;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
  }

  &:active {
    background: #eaeaea;
  }
`;

export const Footer = styled.footer`
  max-width: var(--max);
  margin: 48px auto 24px;
  padding: 16px 16px 0;
  color: #777;
  font-size: ${({ theme }) => theme.font.size.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Faq = styled.section`
  max-width: var(--max);
  margin: 80px auto 120px;
  padding: 0 16px;
`;

export const FaqGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 48px;
  align-items: start;
`;

export const FaqHeading = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.font.size.display};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  line-height: ${({ theme }) => theme.font.lineHeight.tight};
`;

export const FaqItems = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const FaqQuestion = styled.button`
  width: 100%;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 4px;
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    width: 22px;
    height: 22px;
    transition: transform 0.25s ease;
  }

  &.open svg {
    transform: rotate(180deg);
  }
`;

export const FaqItem = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0;

  &:last-child {
    border-bottom: none;
  }

  &:first-child ${FaqQuestion} {
    padding-top: 0;
  }
`;

export const FaqAnswer = styled.div`
  padding: 0 4px 24px 4px;
  color: #555;
  font-size: ${({ theme }) => theme.font.size.md};
  line-height: ${({ theme }) => theme.font.lineHeight.relaxed};
`;
