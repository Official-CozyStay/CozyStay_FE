import { useRef, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownItem,
  DropdownDivider,
  DropdownSection,
  DropdownHeader,
  DropdownHeaderTitle,
  DropdownHeaderDesc,
  DropdownHeaderImage,
} from './ProfileDropdown.styles';
import {
  Heart,
  Home,
  MessageCircle,
  User,
  Settings,
  Globe,
  HelpCircle,
  LogOut,
  UserPlus,
  Users,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

type ProfileDropdownProps = {
  onClose: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement>;
};

const ProfileDropdown = ({ onClose, buttonRef }: ProfileDropdownProps) => {
  const { logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isClickInsideDropdown = dropdownRef.current?.contains(target);
      const isClickOnButton = buttonRef?.current?.contains(target);

      if (!isClickInsideDropdown && !isClickOnButton) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, buttonRef]);

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <DropdownMenu ref={dropdownRef}>
      <DropdownSection>
        <DropdownItem>
          <Heart />
          위시리스트
        </DropdownItem>
        <DropdownItem>
          <Home />
          여행
        </DropdownItem>
        <DropdownItem>
          <MessageCircle />
          메시지
        </DropdownItem>
        <DropdownItem>
          <User />
          프로필
        </DropdownItem>
      </DropdownSection>

      <DropdownDivider />

      <DropdownSection>
        <DropdownItem>
          <Settings />
          계정 관리
        </DropdownItem>
        <DropdownItem>
          <Globe />
          언어 및 통화
        </DropdownItem>
        <DropdownItem>
          <HelpCircle />
          도움말 센터
        </DropdownItem>
      </DropdownSection>

      <DropdownDivider />

      <DropdownSection>
        <DropdownHeader>
          <DropdownHeaderImage>
            <Home />
          </DropdownHeaderImage>
          <div>
            <DropdownHeaderTitle>호스팅 하기</DropdownHeaderTitle>
            <DropdownHeaderDesc>
              간단하게 호스팅을 시작하고 부수입을 올릴 수 있습니다.
            </DropdownHeaderDesc>
          </div>
        </DropdownHeader>
      </DropdownSection>

      <DropdownDivider />

      <DropdownSection>
        <DropdownItem>
          <UserPlus />
          호스트 추천하기
        </DropdownItem>
        <DropdownItem>
          <Users />
          공동 호스트 찾기
        </DropdownItem>
      </DropdownSection>

      <DropdownDivider />

      <DropdownSection>
        <DropdownItem onClick={handleLogout}>
          <LogOut />
          로그아웃
        </DropdownItem>
      </DropdownSection>
    </DropdownMenu>
  );
};

export default ProfileDropdown;

