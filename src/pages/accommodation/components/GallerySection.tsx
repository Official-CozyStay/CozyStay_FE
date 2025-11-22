import * as S from "../accommodationDetail.styles";

type Props = {
    primary: { imageUrl: string };
    primaryIndex: number;
    thumbs: Array<{ imageId: number; imageUrl: string; idx: number }>;
    onOpen: (index: number) => void;
};

export default function GallerySection({
                                           primary,
                                           primaryIndex,
                                           thumbs,
                                           onOpen,
                                       }: Props) {
    return (
        <S.Gallery>
            <S.MainImage>
                <S.Img
                    src={primary.imageUrl}
                    alt="대표 이미지"
                    onClick={() => onOpen(primaryIndex)}
                    style={{ cursor: "pointer" }}
                />
            </S.MainImage>

            {thumbs.map((item) => (
                <S.Thumb key={item.imageId}>
                    <S.Img
                        src={item.imageUrl}
                        alt={`이미지 ${item.idx + 1}`}
                        onClick={() => onOpen(item.idx)}
                        style={{ cursor: "pointer" }}
                    />
                </S.Thumb>
            ))}
        </S.Gallery>
    );
}