import axios from 'axios';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { inviteGuest, type InviteGuestRequest } from '@/api/booking';
import {
  ErrorText,
  FooterRight,
  InputGroup,
  ModalBody,
  ModalCloseButton,
  ModalContainer,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  SaveButton,
} from './InviteFriendModal.styles';

interface InviteFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: number | null;
  onSuccess?: () => void;
}

type InviteErrorResponse = {
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      setFormData({ guestEmail: '' });
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!bookingId) return;

    const guestEmail = formData.guestEmail.trim();

    if (!guestEmail) {
      setError('이메일을 입력해주세요.');
      return;
    }

    if (!EMAIL_PATTERN.test(guestEmail)) {
      setError('올바른 이메일 형식으로 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await inviteGuest(bookingId, { guestEmail });
      alert('동반자 초대가 전송되었습니다.');
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);

      if (axios.isAxiosError<InviteErrorResponse>(err)) {
        setError(
          err.response?.data?.message ||
            '가입된 회원의 이메일만 초대할 수 있습니다.',
        );
        return;
      }

      setError('동반자 초대에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalCloseButton onClick={onClose} aria-label="닫기">
            <X size={20} />
          </ModalCloseButton>
          <div />
        </ModalHeader>

        <ModalBody as="form" id="invite-friend-form" onSubmit={handleSubmit}>
          <ModalTitle style={{ marginBottom: '24px' }}>
            동반 게스트 초대
          </ModalTitle>

          <InputGroup>
            <label htmlFor="guestEmail">초대할 회원 이메일</label>
            <input
              id="guestEmail"
              name="guestEmail"
              type="email"
              placeholder="friend@example.com"
              value={formData.guestEmail}
              onChange={handleChange}
              disabled={loading}
              autoFocus
            />
          </InputGroup>

          {error && <ErrorText>{error}</ErrorText>}
        </ModalBody>

        <FooterRight>
          <SaveButton
            type="submit"
            form="invite-friend-form"
            disabled={loading}
          >
            {loading ? '초대 중...' : '초대하기'}
          </SaveButton>
        </FooterRight>
      </ModalContainer>
    </ModalOverlay>,
    document.body,
  );
};

export default InviteFriendModal;
