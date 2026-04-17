import styled from 'styled-components';

export const PaymentPageLayout = styled.div`
  max-width: 1240px;
  margin: 36px auto 88px;
  padding: 0 24px;
  display: grid;
  grid-template-columns: minmax(260px, 320px) minmax(0, 1fr);
  gap: 24px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
    margin-top: 24px;
  }
`;

export const PaymentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const SectionCard = styled.section`
  border: 1px solid #e9e3dd;
  background: #fffdfb;
  border-radius: 20px;
  padding: 22px 24px;
  box-shadow: 0 4px 18px rgba(28, 19, 12, 0.04);

  @media (max-width: 768px) {
    padding: 20px 18px;
  }
`;

export const SectionTitle = styled.h3`
  margin: 0 0 16px;
  font-size: 27px;
  line-height: 1.3;
  font-weight: 700;
  color: #2e2a27;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

export const IntroRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
`;

export const IntroIcon = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #d9d5d1;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
`;

export const IntroTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const IntroTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #3c3733;
`;

export const IntroDescription = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: #8f867f;
`;

export const BrandCard = styled.div`
  border: 1px solid #ede6e0;
  border-radius: 14px;
  padding: 18px 18px 16px;
  background: #fff;
`;

export const BrandHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

export const BrandDot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1570ef 0%, #3f8cff 100%);
  box-shadow: 8px 0 0 #5aa8ff;
`;

export const BrandTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: #4a4541;
`;

export const BrandSubText = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: #8f867f;
`;

export const MethodPillRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
`;

export const MethodPill = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  background: #f7f2ee;
  color: #736a63;
  font-size: 12px;
  font-weight: 600;
`;

export const MessageGuide = styled.p`
  margin: 0 0 12px;
  font-size: 13px;
  line-height: 1.5;
  color: #8f867f;
`;

export const MessageBox = styled.textarea`
  width: 100%;
  min-height: 72px;
  resize: vertical;
  border: 1px solid #e5ded8;
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 14px;
  line-height: 1.5;
  outline: none;
  background: #fff;
  color: #2e2a27;

  &::placeholder {
    color: #b0a7a0;
  }

  &:focus {
    border-color: #d5c7be;
    box-shadow: 0 0 0 3px rgba(213, 199, 190, 0.18);
  }
`;

export const SummaryCard = styled.div`
  border: 1px solid #ede6e0;
  border-radius: 14px;
  padding: 8px 16px;
  background: #fff;
`;

export const SummaryRow = styled.div<{ $isTotal?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
  font-size: ${({ $isTotal }) => ($isTotal ? '16px' : '14px')};
  font-weight: ${({ $isTotal }) => ($isTotal ? 700 : 500)};
  color: ${({ $isTotal }) => ($isTotal ? '#2f2a26' : '#4f4945')};
`;

export const SummaryLabel = styled.span`
  color: inherit;
`;

export const SummaryValue = styled.span`
  color: inherit;
`;

export const SummaryDivider = styled.div`
  height: 1px;
  background: #f0e8e2;
`;

export const AgreementLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  font-size: 12px;
  line-height: 1.5;
  color: #736a63;
  cursor: pointer;
`;

export const AgreementCheckbox = styled.input`
  width: 14px;
  height: 14px;
  accent-color: #ff4f73;
`;

export const SubmitErrorBox = styled.div`
  margin-top: 14px;
  border-radius: 12px;
  padding: 12px 14px;
  background: #fff3f5;
  border: 1px solid #f6c6cf;
  color: #d3405c;
  font-size: 13px;
  line-height: 1.5;
`;

export const SubmitButton = styled.button<{ $disabled: boolean }>`
  width: 100%;
  margin-top: 18px;
  border: none;
  border-radius: 12px;
  padding: 16px 20px;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  background: ${({ $disabled }) => ($disabled ? '#f8b7c4' : '#ff4c74')};
  box-shadow: none;
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;

  &:hover {
    opacity: ${({ $disabled }) => ($disabled ? 1 : 0.94)};
    transform: ${({ $disabled }) => ($disabled ? 'none' : 'translateY(-1px)')};
  }
`;

export const SubmitHint = styled.p`
  margin: 10px 0 0;
  text-align: center;
  font-size: 12px;
  color: #9b928b;
`;

export const SideCard = styled.aside`
  position: sticky;
  top: 28px;
  border: 1px solid #e9e3dd;
  border-radius: 16px;
  background: #fffdfb;
  padding: 18px 16px 20px;
  box-shadow: 0 4px 18px rgba(28, 19, 12, 0.04);

  @media (max-width: 1024px) {
    position: static;
  }
`;

export const SideTop = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 18px;
`;

export const Thumbnail = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;
`;

export const SideTitle = styled.h2`
  margin: 0 0 6px;
  font-size: 20px;
  line-height: 1.35;
  font-weight: 700;
  color: #2e2a27;
`;

export const SideMeta = styled.p`
  margin: 0;
  font-size: 13px;
  color: #8b8179;
`;

export const Divider = styled.div`
  height: 1px;
  background: #f0e8e2;
  margin: 14px 0;
`;

export const SideInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding: 8px 0;
  font-size: 14px;
  color: #3f3935;
`;

export const SidePriceRow = styled.div`
  padding: 12px 0 8px;
  font-size: 14px;
  color: #3f3935;
`;

export const SideTotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding-top: 12px;
  font-size: 15px;
  color: #2f2a26;

  strong {
    font-size: 16px;
    font-weight: 700;
  }
`;

export const SummaryTop = SideTop;
export const SummaryTitle = SideTitle;
export const SummaryMeta = SideMeta;
export const TotalRow = SideTotalRow;

export const HostInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
`;

export const HostAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #e9e2db;
`;

export const SmallText = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: #8f867f;
`;

export const TextArea = MessageBox;

export const PrimaryButton = styled.button`
  width: 100%;
  border: none;
  border-radius: 12px;
  padding: 14px 18px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  background: #ff4c74;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    background: #f8b7c4;
  }
`;

export const RadioItem = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 0;
  font-size: 14px;
  color: #3f3935;
`;

export const CardForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 4px 0 12px 28px;
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid #e5ded8;
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 14px;
  outline: none;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;
