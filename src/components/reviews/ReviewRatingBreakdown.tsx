import styled from "styled-components";
import type { ReviewRatingBreakdown as IReviewRatingBreakdown } from "../../api/types";

interface Props {
    data: IReviewRatingBreakdown;
}

export default function ReviewRatingBreakdown({ data }: Props) {
    const items = [
        { label: "청결도", value: data.cleanliness },
        { label: "정확도", value: data.accuracy },
        { label: "의사소통", value: data.communication },
        { label: "위치", value: data.location },
        { label: "체크인", value: data.checkIn },
        { label: "가격 대비 만족도", value: data.value },
    ];

    return (
        <Container>
            {items.map((item) => (
                <Item key={item.label}>
                    <Label>{item.label}</Label>
                    <BarContainer>
                        <Bar>
                            <Fill style={{ width: `${(item.value / 5) * 100}%` }} />
                        </Bar>
                        <Value>{item.value.toFixed(1)}</Value>
                    </BarContainer>
                </Item>
            ))}
        </Container>
    );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 80px;
  row-gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    column-gap: 0;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.size.md};
`;

const BarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 140px;
`;

const Bar = styled.div`
  flex: 1;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.border.light};
  border-radius: 2px;
  overflow: hidden;
`;

const Fill = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.text.primary};
  border-radius: 2px;
`;

const Value = styled.div`
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  width: 24px;
  text-align: right;
`;
