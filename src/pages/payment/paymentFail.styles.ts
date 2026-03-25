import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PaymentFailPageContainer = styled.div`
  padding: 24px;
  max-width: 720px;
  margin: 0 auto;
`;

export const PaymentFailTitle = styled.h1`
  font-size: 24px;
  font-weight: 800;
`;

export const PaymentFailDescription = styled.p`
  margin-top: 12px;
  color: #666;
  line-height: 1.6;
`;

export const PaymentFailButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

export const PaymentFailRetryButton = styled.button<{ $disabled: boolean }>`
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #333;
  background: #fff;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

export const PaymentFailLinkButton = styled(Link)`
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #ddd;
  text-decoration: none;
  color: #333;
  background: #fff;
`;

export const PaymentFailNotice = styled.div`
  margin-top: 28px;
  color: #777;
  font-size: 13px;
  line-height: 1.6;
`;

export const PaymentFailSummaryCard = styled.div`
  margin-top: 24px;
  padding: 24px;
  border: 1px solid #e9e9e9;
  border-radius: 16px;
  background: #fff;
`;

export const PaymentFailSummaryTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
`;

export const PaymentFailSummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & + & {
    margin-top: 12px;
  }
`;

export const PaymentFailSummaryLabel = styled.span`
  color: #666;
  font-size: 15px;
`;

export const PaymentFailSummaryValue = styled.span`
  color: #222;
  font-size: 15px;
  font-weight: 600;
`;
