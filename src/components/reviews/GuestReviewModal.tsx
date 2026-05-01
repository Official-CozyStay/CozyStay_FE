import { useState } from 'react';
import styled from 'styled-components';
import type { UserReviewCreateRequest } from '@/api/types';
import axios from 'axios';

// 재사용 가능한 모달 스타일들 (ReviewFormModal 참조)
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.overlay.default};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.modalOverlay};
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.common.white};
  padding: 32px;
  border-radius: ${({ theme }) => theme.radius.md};
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  z-index: ${({ theme }) => theme.zIndex.modalContainer};
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 24px;
  font-size: 24px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radius.sm};
  min-height: 120px;
  font-family: inherit;
  resize: vertical;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-weight: bold;
  cursor: pointer;
  border: none;
  background-color: ${({ $primary, theme }) =>
    $primary ? theme.colors.primary.main : theme.colors.background.active};
  color: ${({ $primary, theme }) =>
    $primary ? theme.colors.common.white : theme.colors.text.primary};

  &:hover {
    opacity: 0.9;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: ${({ theme }) => theme.radius.xs};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  font-size: ${({ theme }) => theme.font.size.md};
`;

interface GuestReviewModalProps {
  bookingId: number;
  guestId: number;
  onClose: () => void;
  onSubmit: (data: UserReviewCreateRequest) => Promise<void>;
}

const GuestReviewModal = ({
  bookingId,
  guestId,
  onClose,
  onSubmit,
}: GuestReviewModalProps) => {
  const [rating, setRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      alert('리뷰 내용을 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({
        bookingId,
        targetGuestId: guestId,
        rating,
        reviewComment,
      });
      onClose();
    } catch (error) {
      console.error('리뷰 제출 실패:', error);
      let errorMessage = '리뷰 제출에 실패했습니다. 다시 시도해주세요.';
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Title>게스트 리뷰 작성</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>평점</Label>
            <Select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value={5}>5 - 아주 훌륭해요!</option>
              <option value={4}>4 - 좋아요</option>
              <option value={3}>3 - 보통이에요</option>
              <option value={2}>2 - 별로예요</option>
              <option value={1}>1 - 최악이에요</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>리뷰 코멘트</Label>
            <TextArea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="게스트에 대한 솔직한 평가를 남겨주세요."
            />
          </FormGroup>

          <ButtonGroup>
            <Button type="button" onClick={onClose} disabled={isSubmitting}>
              취소
            </Button>
            <Button type="submit" $primary disabled={isSubmitting}>
              {isSubmitting ? '제출 중...' : '제출하기'}
            </Button>
          </ButtonGroup>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default GuestReviewModal;
