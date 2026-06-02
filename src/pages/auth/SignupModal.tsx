import React, { useState, useEffect } from 'react';
import axios from 'axios';
import client from '@/api/client';
import {
  Page,
  SignupCard,
  CloseButton,
  ModalHeader,
  ModalTitle,
  ModalSubtitle,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  ActionButton,
  SubmitButton,
  ErrorText,
  SuccessText,
} from './signup.styles';

type SignupModalProps = {
  open: boolean;
  onClose: () => void;
};

const SignupModal = ({ open, onClose }: SignupModalProps) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    nickName: '',
    email: '',
    verificationCode: '',
  });

  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent'>(
    'idle',
  );
  const [verificationStatus, setVerificationStatus] = useState<
    'idle' | 'verifying' | 'success' | 'failed'
  >('idle');
  const [emailError, setEmailError] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (!open) {
      setFormData({
        username: '',
        password: '',
        passwordConfirm: '',
        nickName: '',
        email: '',
        verificationCode: '',
      });
      setEmailStatus('idle');
      setVerificationStatus('idle');
      setEmailError('');
      setVerificationError('');
      setSubmitError('');
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 입력 값 변경 시 기존 관련 오류 메시지 클리어
    if (name === 'email') {
      setEmailError('');
    } else if (name === 'verificationCode') {
      setVerificationError('');
    }
    setSubmitError('');
  };

  const handleSendVerification = async () => {
    if (!formData.email) {
      setEmailError('이메일을 입력해주세요.');
      return;
    }
    setEmailError('');
    setEmailStatus('sending');
    try {
      // client defaults to stripping out {data}, so if response doesn't throw it's 2xx
      await client.post(
        `/api/auth/email-verification/request?email=${formData.email}`,
      );
      setEmailStatus('sent');
    } catch (error: unknown) {
      console.error('Send verification error:', error);
      setEmailStatus('idle');
      let errorMessage = '인증번호 발송에 실패했습니다. 다시 시도해주세요.';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      setEmailError(errorMessage);
    }
  };

  const handleVerifyCode = async () => {
    if (!formData.verificationCode) {
      setVerificationError('인증번호를 입력해주세요.');
      return;
    }
    setVerificationError('');
    setVerificationStatus('verifying');
    try {
      await client.post('/api/auth/verify', {
        email: formData.email,
        code: formData.verificationCode,
      });
      setVerificationStatus('success');
    } catch (error: unknown) {
      console.error('Verify code error:', error);
      setVerificationStatus('failed');
      let errorMessage = '인증에 실패했습니다. 코드를 다시 확인해주세요.';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      setVerificationError(errorMessage);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError('');

    if (formData.password !== formData.passwordConfirm) {
      setSubmitError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (verificationStatus !== 'success') {
      setSubmitError('이메일 인증을 완료해주세요.');
      return;
    }

    try {
      const result = (await client.post('/api/auth/signup', {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        nickName: formData.nickName,
      })) as { success?: boolean; message?: string } | null;

      if (result?.success || result) {
        alert('회원가입이 완료되었습니다!');
        onClose();
      } else {
        throw new Error(result?.message || '회원가입 실패');
      }
    } catch (error: unknown) {
      console.error('Signup error:', error);
      let errorMessage = '회원가입 중 오류가 발생했습니다.';
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || error.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      setSubmitError(errorMessage);
    }
  };

  if (!open) return null;

  return (
    <Page onClick={onClose}>
      <SignupCard
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton type="button" aria-label="닫기" onClick={onClose}>
          ×
        </CloseButton>
        <ModalHeader>
          <ModalTitle id="signup-modal-title">코지스테이 회원가입</ModalTitle>
          <ModalSubtitle>
            여정을 시작하기 위해 계정을 만들어주세요.
          </ModalSubtitle>
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">아이디</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="사용할 아이디를 입력하세요"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요 (8자 이상)"
              value={formData.password}
              onChange={handleChange}
              minLength={8}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
            <Input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              placeholder="비밀번호를 다시 한 번 입력하세요"
              value={formData.passwordConfirm}
              onChange={handleChange}
              required
            />
            {formData.passwordConfirm &&
              formData.password !== formData.passwordConfirm && (
                <ErrorText>비밀번호가 일치하지 않습니다.</ErrorText>
              )}
            {formData.passwordConfirm &&
              formData.password === formData.passwordConfirm && (
                <SuccessText>비밀번호가 일치합니다.</SuccessText>
              )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="nickName">닉네임</Label>
            <Input
              id="nickName"
              name="nickName"
              type="text"
              placeholder="사용할 닉네임을 입력하세요"
              value={formData.nickName}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">이메일</Label>
            <InputGroup>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="이메일 주소를 입력하세요"
                value={formData.email}
                onChange={handleChange}
                disabled={emailStatus === 'sent'}
                required
              />
              <ActionButton
                type="button"
                $variant="secondary"
                onClick={handleSendVerification}
                disabled={
                  emailStatus === 'sending' ||
                  emailStatus === 'sent' ||
                  !formData.email
                }
              >
                {emailStatus === 'sending'
                  ? '발송 중...'
                  : emailStatus === 'sent'
                    ? '발송됨'
                    : '인증번호 발송'}
              </ActionButton>
            </InputGroup>
            {emailError && <ErrorText>{emailError}</ErrorText>}
            {emailStatus === 'sent' && !emailError && (
              <SuccessText>
                인증번호가 발송되었습니다. 이메일을 확인해주세요.
              </SuccessText>
            )}
          </FormGroup>

          {emailStatus === 'sent' && (
            <FormGroup>
              <Label htmlFor="verificationCode">인증번호</Label>
              <InputGroup>
                <Input
                  id="verificationCode"
                  name="verificationCode"
                  type="text"
                  placeholder="인증번호 6자리 입력"
                  value={formData.verificationCode}
                  onChange={handleChange}
                  disabled={verificationStatus === 'success'}
                  maxLength={6}
                />
                <ActionButton
                  type="button"
                  $variant="secondary"
                  onClick={handleVerifyCode}
                  disabled={
                    verificationStatus === 'success' ||
                    verificationStatus === 'verifying' ||
                    !formData.verificationCode
                  }
                >
                  {verificationStatus === 'success' ? '인증완료' : '인증확인'}
                </ActionButton>
              </InputGroup>
              {verificationError && <ErrorText>{verificationError}</ErrorText>}
              {verificationStatus === 'success' && (
                <SuccessText>이메일 인증이 완료되었습니다.</SuccessText>
              )}
            </FormGroup>
          )}

          {submitError && (
            <ErrorText
              style={{
                marginBottom: '1rem',
                textAlign: 'center',
                display: 'block',
              }}
            >
              {submitError}
            </ErrorText>
          )}
          <SubmitButton type="submit" $variant="primary">
            가입하기
          </SubmitButton>
        </Form>
      </SignupCard>
    </Page>
  );
};

export default SignupModal;
