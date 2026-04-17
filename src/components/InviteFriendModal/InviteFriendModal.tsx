import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { inviteGuest, type InviteGuestRequest } from '@/api/booking';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalCloseButton,
  ModalTitle,
  ModalBody,
  SaveButton,
  FooterRight,
  InputGroup,
  ErrorText,
} from './InviteFriendModal.styles';

interface InviteFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: number | null;
  onSuccess?: () => void;
}

const InviteFriendModal = ({
  isOpen,
  onClose,
  bookingId,
  onSuccess,
}: InviteFriendModalProps) => {
  const [formData, setFormData] = useState<InviteGuestRequest>({
    guestEmail: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        guestEmail: '',
      });
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!bookingId) return;

    // 간단한 유효성 검사
    if (!formData.guestEmail.trim()) {
      setError('이메일을 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await inviteGuest(bookingId, formData);
      alert('친구 초대가 완료되었습니다.');
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setError('친구 초대에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalCloseButton onClick={onClose}>
            <X size={20} />
          </ModalCloseButton>
          <div />
        </ModalHeader>

        <ModalBody>
          <ModalTitle style={{ marginBottom: '24px' }}>
            동반 게스트 초대
          </ModalTitle>

          <InputGroup>
            <label htmlFor="guestEmail">초대할 친구 이메일</label>
            <input
              id="guestEmail"
              name="guestEmail"
              type="email"
              placeholder="예: friend@example.com"
              value={formData.guestEmail}
              onChange={handleChange}
              disabled={loading}
            />
          </InputGroup>

          {error && <ErrorText>{error}</ErrorText>}
        </ModalBody>

        <FooterRight>
          <SaveButton onClick={handleSubmit} disabled={loading}>
            {loading ? '초대 중...' : '초대하기'}
          </SaveButton>
        </FooterRight>
      </ModalContainer>
    </ModalOverlay>,
    document.body,
  );
};

export default InviteFriendModal;
