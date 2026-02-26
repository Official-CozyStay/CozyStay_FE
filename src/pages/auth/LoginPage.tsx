import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  AuthButton,
  AuthButtons,
  CloseButton,
  KakaoIcon,
  LoginCard,
  ModalHeader,
  ModalSubtitle,
  ModalTitle,
  Page,
  PolicyText,
  ProviderIcon,
} from './login.styles';
import { Input, FormGroup, Label, SubmitButton } from './signup.styles'; // Reusing signup styling for the inputs

const DISABLED_PROVIDER = {
  id: 'google',
  label: '구글로 로그인하기',
  badge: 'G',
} as const;

type LoginModalProps = {
  open: boolean;
  onClose: () => void;
  onOpenSignup?: () => void;
};

const LoginModal = ({ open, onClose, onOpenSignup }: LoginModalProps) => {
  const [loginStep, setLoginStep] = useState<'options' | 'general'>('options');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { login } = useAuth(); // Assuming login context provides manual auth methods or state updates.
  // In a real scenario, the context might need to be explicitly adapted for the API call.

  const backendBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
  const kakaoLoginUrl = `${backendBaseUrl}/oauth2/authorization/kakao`;

  const handleKakaoLogin = () => {
    window.location.href = kakaoLoginUrl;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGeneralLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const response = await fetch(`${backendBaseUrl}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && (result?.success || response.status === 200)) {
        // Check if backend provides token inside data or directly on the result object
        const token = result?.data?.accessToken || result?.accessToken || result?.token || '';
        const refreshToken = result?.data?.refreshToken || result?.refreshToken || '';

        setLoginStep('options');
        setFormData({ username: '', password: '' });
        onClose();

        if (token) {
          if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
          if (login) await login(token);
        } else {
          console.warn('Login succeeded but no token was provided in the response.');
        }
      } else {
        throw new Error(result?.message || '로그인 실패. 아이디와 비밀번호를 확인해주세요.');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      alert(error.message || '서버 오류가 발생했습니다.');
    }
  };

  const handleClose = () => {
    setLoginStep('options');
    setFormData({ username: '', password: '' });
    onClose();
  }

  if (!open) {
    return null;
  }

  return (
    <Page onClick={handleClose}>
      <LoginCard
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <CloseButton type="button" aria-label="닫기" onClick={handleClose}>
          ×
        </CloseButton>
        <ModalHeader>
          <ModalTitle id="login-modal-title">
            코지스테이에서 안락함을 누리세요
          </ModalTitle>
          <ModalSubtitle>
            한 계정으로 CozyStay와 Airbnb 서비스를 모두 이용해 보세요.
          </ModalSubtitle>
        </ModalHeader>

        {loginStep === 'options' ? (
          <AuthButtons>
            <AuthButton type="button" $variant="general" onClick={() => setLoginStep('general')}>
              일반 로그인
            </AuthButton>
            <AuthButton type="button" $variant="kakao" onClick={handleKakaoLogin}>
              <KakaoIcon>K</KakaoIcon>
              카카오로 로그인하기
            </AuthButton>
            <AuthButton type="button" disabled>
              <ProviderIcon>{DISABLED_PROVIDER.badge}</ProviderIcon>
              {DISABLED_PROVIDER.label}
            </AuthButton>
          </AuthButtons>
        ) : (
          <form onSubmit={handleGeneralLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <FormGroup>
              <Label htmlFor="login-username">아이디</Label>
              <Input
                id="login-username"
                name="username"
                type="text"
                placeholder="아이디를 입력하세요"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="login-password">비밀번호</Label>
              <Input
                id="login-password"
                name="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <SubmitButton type="submit" $variant="primary">
              로그인
            </SubmitButton>

            <button
              type="button"
              onClick={() => setLoginStep('options')}
              style={{ background: 'none', border: 'none', color: '#666', fontSize: '14px', cursor: 'pointer', marginTop: '8px', textDecoration: 'underline' }}
            >
              돌아가기
            </button>
          </form>
        )}

        {onOpenSignup && loginStep === 'options' && (
          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
            계정이 없으신가요?{' '}
            <button
              type="button"
              onClick={onOpenSignup}
              style={{ background: 'none', border: 'none', color: '#E51D53', fontWeight: 'bold', cursor: 'pointer', padding: 0 }}
            >
              회원가입
            </button>
          </div>
        )}

        <PolicyText>
          계속 진행하면 CozyStay의 서비스 약관과 개인정보 처리방침에 동의하게
          됩니다.
        </PolicyText>
      </LoginCard>
    </Page>
  );
};

export default LoginModal;
