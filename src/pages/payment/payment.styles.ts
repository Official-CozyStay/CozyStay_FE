import styled from 'styled-components';

export const SummaryCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 16px;
  padding: 20px;
`;

export const SectionCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 16px;
  padding: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
`;

export const Divider = styled.hr`
  margin: 16px 0;
  border: none;
  border-top: 1px solid #eee;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 6px 0;
`;

export const TotalRow = styled(SummaryRow)`
  font-weight: 800;
  margin-top: 12px;
`;

export const RadioItem = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

export const CardForm = styled.div`
  margin: 12px 0;
`;

export const Row = styled.div`
  display: flex;
  gap: 8px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ccc;
`;

export const PrimaryButton = styled.button`
  width: 100%;
  margin-top: 16px;
  padding: 14px;
  border-radius: 12px;
  border: none;
  font-weight: 700;
  background: #ff385c;
  color: white;
  cursor: pointer;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const SmallText = styled.p`
  font-size: 14px;
  color: #666;
`;

export const SummaryTop = styled.div`
  display: flex;
  gap: 12px;
`;

export const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  object-fit: cover;
`;

export const SummaryTitle = styled.h3`
  font-weight: 700;
`;

export const SummaryMeta = styled.div`
  font-size: 14px;
  color: #666;
`;

export const HostInfo = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
`;

export const HostAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #ddd;
`;

export const PaymentPageLayout = styled.div`
  display: grid;
  grid-template-columns: 360px minmax(0, 700px);
  gap: 24px;
  padding: 24px;
  padding-top: 24px;
  justify-content: center;
`;

export const PaymentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SubmitErrorBox = styled.div`
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #fca5a5;
  background: #fef2f2;
  color: #991b1b;
  font-size: 14px;
`;
