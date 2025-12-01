import { useState } from 'react';
import {
  AuthButton,
  AuthButtons,
  CloseButton,
  Divider,
  DividerLine,
  Form,
  Input,
  KakaoIcon,
  Label,
  LoginCard,
  ModalHeader,
  ModalSubtitle,
  ModalTitle,
  Page,
  PolicyText,
  ProviderIcon,
  Select,
  ContinueButton,
} from './login.styles';

const countries = [
  { value: '+82', label: '한국 (+82)' },
  { value: '+81', label: '일본 (+81)' },
  { value: '+1', label: '미국/캐나다 (+1)' },
] as const;

const disabledProvider = {
  id: 'google',
  label: '구글로 로그인하기',
  badge: 'G',
} as const;


type LoginModalProps = {
  open: boolean;
  onClose: () => void;
};

type CountryCode = (typeof countries)[number]['value'];

const LoginModal = ({ open, onClose }: LoginModalProps) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(
    countries[0].value
  );
  const [phone, setPhone] = useState('');

  const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:8080';
  const kakaoLoginUrl = `${backendBaseUrl}/oauth2/authorization/kakao`;

  const handlePhoneSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: 실제 전화번호 인증 API 연결
    alert('전화번호 인증 API가 아직 연결되지 않았어요.');
  };

  const handleKakaoLogin = () => {
    window.location.href = kakaoLoginUrl;
  };

  if (!open) {
    return null;
  }

  return (
    <Page onClick={onClose}>
      <LoginCard
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <CloseButton type="button" aria-label="닫기" onClick={onClose}>
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

        <Form onSubmit={handlePhoneSubmit}>
          <div>
            <Label htmlFor="country">국가/지역</Label>
            <Select
              id="country"
              value={selectedCountry}
              onChange={(event) =>
                setSelectedCountry(event.target.value as CountryCode)
              }
            >
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="phone">전화번호</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="전화번호를 입력하세요"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>

          <ContinueButton type="submit">계속</ContinueButton>
        </Form>

        <Divider>
          <DividerLine />
          또는
          <DividerLine />
        </Divider>

        <AuthButtons>
          <AuthButton type="button" $variant="kakao" onClick={handleKakaoLogin}>
            <KakaoIcon>K</KakaoIcon>
            카카오로 로그인하기
          </AuthButton>
          <AuthButton type="button" disabled>
            <ProviderIcon>{disabledProvider.badge}</ProviderIcon>
            {disabledProvider.label}
          </AuthButton>
        </AuthButtons>

        <PolicyText>
          계속 진행하면 CozyStay의 서비스 약관과 개인정보 처리방침에 동의하게
          됩니다.
        </PolicyText>
      </LoginCard>
    </Page>
  );
};

export default LoginModal;
