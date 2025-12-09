import styled from "styled-components";
import { media } from "@/styles/media";

export const Container = styled.main`
  --max: 1440px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Hero = styled.section`
  position: relative;
  max-width: var(--max);
  margin: 60px auto 100px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  min-height: 542px;

  ${media.mobile} {
    margin: ${({ theme }) => theme.spacing["3xl"]} auto
      ${({ theme }) => theme.spacing["5xl"]};
    min-height: auto;
  }
`;

export const HeroCard = styled.div`
  position: absolute;
  top: 50%;
  left: ${({ theme }) => theme.spacing["2xl"]};
  transform: translateY(-50%);
  width: 420px;
  max-width: 520px;
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.common.white};
  box-shadow: ${({ theme }) => theme.shadow.md};
  z-index: ${({ theme }) => theme.zIndex.dropdown};

  ${media.tablet} {
    width: 360px;
    left: ${({ theme }) => theme.spacing.xl};
    padding: ${({ theme }) => theme.spacing.xl};
  }

  ${media.mobile} {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    width: 100%;
    max-width: 100%;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

export const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.font.size.xxl};
  line-height: ${({ theme }) => theme.font.lineHeight.tight};
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.font.weight.extrabold};
  word-break: keep-all;
`;

export const HeroDesc = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.font.size.sm};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const HeroImageWrap = styled.div`
  position: relative;
  margin-left: 330px;
  z-index: ${({ theme }) => theme.zIndex.base};

  ${media.tablet} {
    margin-left: 280px;
  }

  ${media.mobile} {
    margin-left: 0;
  }
`;

export const HeroImage = styled.img`
  width: 960px;
  height: 542px;
  border-radius: ${({ theme }) => theme.radius.lg};
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  display: block;

  ${media.tablet} {
    width: 100%;
    max-width: 600px;
    height: auto;
    aspect-ratio: 16 / 9;
  }

  ${media.mobile} {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
  }
`;

export const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const FieldLabel = styled.span`
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Input = styled.input`
  height: ${({ theme }) => theme.spacing["3xl"]};
  padding: 0 ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  outline: none;
  font-size: ${({ theme }) => theme.font.size.sm};
  transition: ${({ theme }) => theme.transition.colors.normal},
    ${({ theme }) => theme.transition.normal};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.main}33;
  }
`;

export const Select = styled.select`
  height: ${({ theme }) => theme.spacing["3xl"]};
  padding: 0 ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  outline: none;
  font-size: ${({ theme }) => theme.font.size.sm};
  transition: ${({ theme }) => theme.transition.colors.normal},
    ${({ theme }) => theme.transition.normal};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.main}33;
  }
`;

export const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
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
    ${({ theme }) => theme.colors.primary.main},
    ${({ theme }) => theme.colors.primary.hover}
  );
  color: ${({ theme }) => theme.colors.common.white};
  margin-top: ${({ theme }) => theme.spacing.xs};
  transition: ${({ theme }) => theme.transition.fast};

  &:hover {
    filter: brightness(1.05);
  }
`;

export const Features = styled.section`
  max-width: var(--max);
  margin: ${({ theme }) => theme.spacing["4xl"]} auto 100px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};

  ${media.tablet} {
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
    margin: ${({ theme }) => theme.spacing["2xl"]} auto
      ${({ theme }) => theme.spacing["5xl"]};
  }
`;

export const Feature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const FeatureIcon = styled.div`
  align-self: flex-start;
  margin-bottom: 6px;

  svg {
    width: 28px;
    height: 28px;
    stroke-width: 2;
    color: ${({ theme }) => theme.colors.primary.main};
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
  color: ${({ theme }) => theme.colors.text.secondary};
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
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.font.size.sm};
  margin-bottom: 18px;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.lg};
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

export const Card = styled.article`
  position: relative;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.common.white};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

export const Badge = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 2;
  font-size: ${({ theme }) => theme.font.size.xs};
  background: ${({ theme }) => theme.colors.common.white};
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
  padding: ${({ theme }) => theme.spacing.md};
`;

export const CardTitle = styled.h4`
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.md};
  margin: 0 0 6px;
`;

export const CardMeta = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
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
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  background: ${({ theme }) => theme.colors.common.white};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background.hover};
  }

  &:active {
    background: ${({ theme }) => theme.colors.background.active};
  }
`;

export const Faq = styled.section`
  max-width: var(--max);
  margin: ${({ theme }) => theme.spacing["6xl"]} auto 120px;
  padding: 0 16px;
`;

export const FaqGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: ${({ theme }) => theme.spacing["4xl"]};
  align-items: start;

  ${media.tablet} {
    gap: ${({ theme }) => theme.spacing["2xl"]};
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

export const FaqHeading = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.font.size.display};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  line-height: ${({ theme }) => theme.font.lineHeight.tight};
`;

export const FaqItems = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
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
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }

  svg {
    width: 22px;
    height: 22px;
    transition: transform 0.25s ease;
  }
`;

export const FaqItem = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
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
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.font.size.md};
  line-height: ${({ theme }) => theme.font.lineHeight.relaxed};
`;
