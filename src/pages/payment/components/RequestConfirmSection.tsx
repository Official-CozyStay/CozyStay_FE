import * as S from "../payment.styles";

type Props = {
    disabled: boolean;
    onSubmit: () => void;
};

export default function RequestConfirmSection({
                                                  disabled,
                                                  onSubmit,
                                              }: Props) {
    return (
        <S.SectionCard>
            <S.SectionTitle>3. 요청 내용 확인</S.SectionTitle>

            <S.SmallText>
                버튼을 선택하면 예약 약관에 동의하게 됩니다.
            </S.SmallText>

            <S.PrimaryButton disabled={disabled} onClick={onSubmit}>
                예약 요청
            </S.PrimaryButton>
        </S.SectionCard>
    );
}