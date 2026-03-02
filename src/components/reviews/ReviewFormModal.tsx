import React, { useState } from "react";
import styled from "styled-components";
import { Star } from "lucide-react";
import type { AccommodationReviewRequest } from "../../api/types";

interface ReviewFormModalProps {
    bookingId: number;
    onClose: () => void;
    onSubmit: (data: AccommodationReviewRequest) => Promise<void>;
}

const RATING_CATEGORIES = [
    { id: "cleanliness", label: "청결도" },
    { id: "accuracy", label: "정확성" },
    { id: "checkin", label: "체크인" },
    { id: "communication", label: "의사소통" },
    { id: "location", label: "위치" },
] as const;

type RatingState = {
    overall: number;
    cleanliness: number;
    accuracy: number;
    checkin: number;
    communication: number;
    location: number;
};

export default function ReviewFormModal({
    bookingId,
    onClose,
    onSubmit,
}: ReviewFormModalProps) {
    const [ratings, setRatings] = useState<RatingState>({
        overall: 0,
        cleanliness: 0,
        accuracy: 0,
        checkin: 0,
        communication: 0,
        location: 0,
    });
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRatingChange = (key: keyof RatingState, value: number) => {
        setRatings((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 간단한 유효성 검사
        if (Object.values(ratings).some((val) => val === 0)) {
            alert("모든 항목에 별점을 입력해주세요.");
            return;
        }
        if (comment.trim().length < 10) {
            alert("리뷰 내용을 10자 이상 작성해주세요.");
            return;
        }

        try {
            setIsSubmitting(true);
            await onSubmit({
                bookingId,
                ratingOverall: ratings.overall,
                ratingCleanliness: ratings.cleanliness,
                ratingAccuracy: ratings.accuracy,
                ratingCheckin: ratings.checkin,
                ratingCommunication: ratings.communication,
                ratingLocation: ratings.location,
                reviewComment: comment,
            });
            onClose();
        } catch (error) {
            console.error("리뷰 제출 실패:", error);
            alert("리뷰 제출에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // 배경 클릭 시 닫기
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <Overlay onClick={handleOverlayClick}>
            <ModalContainer role="dialog" aria-modal="true">
                <ModalHeader>
                    <ModalTitle>숙소 후기 쓰기</ModalTitle>
                    <CloseButton onClick={onClose} aria-label="닫기">
                        ✕
                    </CloseButton>
                </ModalHeader>
                <ModalBody onSubmit={handleSubmit}>
                    <FormGroup>
                        <RatingLabel>전체 평점</RatingLabel>
                        <StarRating
                            rating={ratings.overall}
                            onChange={(val) => handleRatingChange("overall", val)}
                            size={32}
                        />
                    </FormGroup>

                    <Divider />

                    <SubRatingsGrid>
                        {RATING_CATEGORIES.map(({ id, label }) => (
                            <SubRatingItem key={id}>
                                <SubRatingLabel>{label}</SubRatingLabel>
                                <StarRating
                                    rating={ratings[id]}
                                    onChange={(val) => handleRatingChange(id, val)}
                                    size={24}
                                />
                            </SubRatingItem>
                        ))}
                    </SubRatingsGrid>

                    <Divider />

                    <FormGroup>
                        <RatingLabel>후기 내용 (최소 10자)</RatingLabel>
                        <TextArea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="이번 숙소에서의 경험은 어떠셨나요? 자세히 적어주시면 다른 게스트와 호스트에게 큰 도움이 됩니다."
                            rows={5}
                        />
                    </FormGroup>

                    <FormActions>
                        <SecondaryButton type="button" onClick={onClose}>
                            취소
                        </SecondaryButton>
                        <SubmitButton type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "제출 중..." : "리뷰 제출"}
                        </SubmitButton>
                    </FormActions>
                </ModalBody>
            </ModalContainer>
        </Overlay>
    );
}

// -- 하위 별점 컴포넌트 --
interface StarRatingProps {
    rating: number;
    onChange: (value: number) => void;
    size?: number;
}
function StarRating({ rating, onChange, size = 24 }: StarRatingProps) {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <StarContainer>
            {[1, 2, 3, 4, 5].map((star) => (
                <StarIconButton
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => onChange(star)}
                    $active={star <= (hoverRating || rating)}
                >
                    <Star
                        size={size}
                        fill={star <= (hoverRating || rating) ? "currentColor" : "none"}
                        stroke="currentColor"
                    />
                </StarIconButton>
            ))}
        </StarContainer>
    );
}

// -- Styled Components --
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.overlay.default};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.common.white};
  border-radius: ${({ theme }) => theme.radius.xl};
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  box-shadow: ${({ theme }) => theme.shadow.lg};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const ModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  line-height: 1;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const ModalBody = styled.form`
  padding: ${({ theme }) => theme.spacing.xl};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const RatingLabel = styled.label`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const SubRatingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SubRatingItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const SubRatingLabel = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  margin: 0;
`;

const StarContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const StarIconButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${({ theme, $active }) =>
        $active ? theme.colors.primary.main : theme.colors.border.primary};
  transition: color 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.font.size.md};
  font-family: inherit;
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.light};
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const ButtonBase = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xl}`};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  cursor: pointer;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled(ButtonBase)`
  background: ${({ theme }) => theme.colors.common.white};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.background.hover};
  }
`;

const SubmitButton = styled(ButtonBase)`
  background: ${({ theme }) => theme.colors.primary.main};
  border: none;
  color: ${({ theme }) => theme.colors.common.white};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary.hover};
  }
`;
