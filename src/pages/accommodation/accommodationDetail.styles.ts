import styled, { css } from "styled-components";
import { media } from "@/styles/media";

export const Container = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.primary};

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  }
`;

export const Header = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Title = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.font.size.xxl};
  line-height: ${({ theme }) => theme.font.lineHeight.tight};
  font-weight: ${({ theme }) => theme.font.weight.extrabold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SubMeta = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.font.size.sm};

  a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

export const Dot = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Gallery = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 220px 220px;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  ${media.desktop} {
    grid-template-rows: 260px 260px;
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const MainImage = styled.div`
  grid-row: 1 / 3;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.md};

  ${media.mobile} {
    grid-row: 1;
  }
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
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.colors.normal};

  &:hover {
    opacity: 0.9;
  }
`;

export const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: ${({ theme }) => theme.spacing["2xl"]};
  align-items: start;

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

export const Left = styled.div``;
export const Right = styled.aside``;

export const Section = styled.section`
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  padding: ${({ theme }) => theme.spacing.lg} 0;
`;

export const H2 = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.extrabold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const H3 = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Meta = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.font.size.sm};
`;

export const P = styled.p`
  white-space: pre-wrap;
  margin: 0;
  font-size: ${({ theme }) => theme.font.size.md};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const AmenityList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const StickyCard = styled.div`
  position: sticky;
  top: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadow.md};
  background: ${({ theme }) => theme.colors.common.white};
`;

export const Price = styled.div`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};

  span {
    font-weight: ${({ theme }) => theme.font.weight.regular};
    font-size: ${({ theme }) => theme.font.size.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const Small = styled.div<{ $compact?: boolean }>`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.font.size.xs};
  margin-top: ${({ $compact, theme }) =>
    $compact ? theme.spacing.xs : theme.spacing.sm};
`;

export const FormSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Label = styled.div`
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

export const NumberInput = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing.md};
  outline: none;
  font-size: ${({ theme }) => theme.font.size.md};
  color: ${({ theme }) => theme.colors.text.primary};
  transition: ${({ theme }) => theme.transition.colors.normal};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.main}33;
  }
`;

export const HelperText = styled.div`
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const Summary = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SummaryTotal = styled(SummaryRow)`
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

export const ErrorText = styled.div<{ $compact?: boolean }>`
  margin-top: ${({ $compact, theme }) =>
    $compact ? theme.spacing.xs : theme.spacing.sm};
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.colors.primary.main};
`;

export const ReserveButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing.md};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-radius: ${({ theme }) => theme.radius.md};
  border: none;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.primary.main},
    ${({ theme }) => theme.colors.primary.hover}
  );
  color: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.size.md};
  transition: ${({ theme }) => theme.transition.fast};

  &:hover:not(:disabled) {
    filter: brightness(1.05);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.border.light};
    cursor: not-allowed;
  }
`;

export const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.overlay.default};
  z-index: ${({ theme }) => theme.zIndex.modalOverlay};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LightboxInner = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: ${({ theme }) => theme.colors.common.black};
  border-radius: ${({ theme }) => theme.radius.lg};
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
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.md};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.common.white};
  font-size: ${({ theme }) => theme.font.size.xxl};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.colors.normal};

  &:hover {
    opacity: 0.8;
  }
`;

const arrowBase = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.overlay.default};
  color: ${({ theme }) => theme.colors.common.white};
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.colors.normal};

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

export const LightboxPrev = styled.button`
  ${arrowBase}
  left: ${({ theme }) => theme.spacing.md};
`;

export const LightboxNext = styled.button`
  ${arrowBase}
  right: ${({ theme }) => theme.spacing.md};
`;
