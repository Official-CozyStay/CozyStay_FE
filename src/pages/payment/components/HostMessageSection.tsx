import * as S from "../payment.styles";

type Props = {
    value: string;
    onChange: (v: string) => void;
    hostName: string;
};

export default function HostMessageSection({
                                               value,
                                               onChange,
                                               hostName,
                                           }: Props) {
    return (
        <S.SectionCard>
            <S.SectionTitle>2. 호스트에게 보낼 메시지 작성</S.SectionTitle>

            <S.HostInfo>
                <S.HostAvatar />
                <div>
                    <div>{hostName}</div>
                    <S.SmallText>호스트</S.SmallText>
                </div>
            </S.HostInfo>

            <S.TextArea
                placeholder="여행 목적과 예약 이유를 간단히 작성해주세요."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </S.SectionCard>
    );
}