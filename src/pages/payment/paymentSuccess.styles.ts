import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PaymentSuccessContainer = styled.div`
  padding: 24px;
  max-width: 720px;
  margin: 0 auto;
`;

export const PaymentSuccessTitle = styled.h1`
  font-size: 24px;
  font-weight: 800;
`;

export const PaymentSuccessDescription = styled.p`
  margin-top: 12px;
  color: #666;
`;

export const PaymentSuccessButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

export const PaymentSuccessLink = styled(Link)`
  text-decoration: underline;
`;
