import * as S from "../payment.styles";

export type UiPaymentMethod = "CARD" | "NAVERPAY" | "KAKAOPAY";

type Props = {
    value: UiPaymentMethod;
    onChange: (method: UiPaymentMethod) => void;
};

export default function PaymentMethodSection({ value, onChange }: Props) {
    return (
        <S.SectionCard>
            <S.SectionTitle>1. 결제 수단 추가</S.SectionTitle>

            <S.RadioItem>
                <input
                    type="radio"
                    checked={value === "CARD"}
                    onChange={() => onChange("CARD")}
                />
                <span>신용카드 또는 체크카드</span>
            </S.RadioItem>

            {value === "CARD" && (
                <S.CardForm>
                    <S.Input placeholder="카드 번호" />
                    <S.Row>
                        <S.Input placeholder="만료일" />
                        <S.Input placeholder="CVV" />
                    </S.Row>
                </S.CardForm>
            )}

            <S.RadioItem>
                <input
                    type="radio"
                    checked={value === "NAVERPAY"}
                    onChange={() => onChange("NAVERPAY")}
                />
                <span>네이버페이</span>
            </S.RadioItem>

            <S.RadioItem>
                <input
                    type="radio"
                    checked={value === "KAKAOPAY"}
                    onChange={() => onChange("KAKAOPAY")}
                />
                <span>카카오페이</span>
            </S.RadioItem>
        </S.SectionCard>
    );
}