import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PaymentSuccessContainer = styled.div`
  padding: 40px 24px;
  max-width: 720px;
  margin: 0 auto;
`;

export const PaymentSuccessTitle = styled.h1`
  font-size: 32px;
  font-weight: 800;
  line-height: 1.3;
`;

export const PaymentSuccessDescription = styled.p`
  margin-top: 12px;
  color: #666;
  font-size: 16px;
  line-height: 1.6;
`;

/* ⭐ 요약 카드 (추가된 부분) */
export const PaymentSuccessSummaryCard = styled.div`
  margin-top: 28px;
  padding: 24px;
  border: 1px solid #e9e9e9;
  border-radius: 16px;
  background: #fff;
`;

export const PaymentSuccessSummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & + & {
    margin-top: 14px;
  }
`;

export const PaymentSuccessSummaryLabel = styled.span`
  color: #666;
  font-size: 15px;
`;

export const PaymentSuccessSummaryValue = styled.span`
  font-weight: 700;
  font-size: 16px;
  color: #222;
`;

export const PaymentSuccessButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
`;

export const PaymentSuccessLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  padding: 12px 18px;
  border-radius: 10px;
  background: #222;
  color: #fff;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    opacity: 0.92;
  }
`;
