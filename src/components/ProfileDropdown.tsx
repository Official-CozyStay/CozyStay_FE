import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownItem,
  DropdownDivider,
  DropdownSection,
  DropdownHeader,
  DropdownHeaderTitle,
  DropdownHeaderDesc,
  DropdownHeaderImage,
} from "./ProfileDropdown.styles";
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
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

type ProfileDropdownProps = {
  onClose: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
};

// 메뉴 텍스트 상수 (향후 i18n 적용 시 쉽게 교체 가능)
const MENU_LABELS = {
  wishlist: "위시리스트",
  trips: "여행",
  messages: "메시지",
  profile: "프로필",
  accountSettings: "계정 관리",
  languageAndCurrency: "언어 및 통화",
  helpCenter: "도움말 센터",
  hosting: "호스팅 하기",
  hostingDescription: "간단하게 호스팅을 시작하고 부수입을 올릴 수 있습니다.",
  recommendHost: "호스트 추천하기",
  findCoHost: "공동 호스트 찾기",
  logout: "로그아웃",
} as const;

const ProfileDropdown = ({ onClose, buttonRef }: ProfileDropdownProps) => {
  const navigate = useNavigate();
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, buttonRef]);

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <DropdownMenu ref={dropdownRef}>
      <DropdownSection>
        <DropdownItem>
          <Heart />
          {MENU_LABELS.wishlist}
        </DropdownItem>
        <DropdownItem>
          <Home />
          {MENU_LABELS.trips}
        </DropdownItem>
        <DropdownItem>
          <MessageCircle />
          {MENU_LABELS.messages}
        </DropdownItem>
        <DropdownItem>
          <User />
          {MENU_LABELS.profile}
        </DropdownItem>
      </DropdownSection>

      <DropdownDivider />

      <DropdownSection>
        <DropdownItem onClick={() => handleNavigate("/account")}>
          <Settings />
          {MENU_LABELS.accountSettings}
        </DropdownItem>
        <DropdownItem>
          <Globe />
          {MENU_LABELS.languageAndCurrency}
        </DropdownItem>
        <DropdownItem>
          <HelpCircle />
          {MENU_LABELS.helpCenter}
        </DropdownItem>
      </DropdownSection>

      <DropdownDivider />

      <DropdownSection>
        <DropdownHeader>
          <DropdownHeaderImage>
            <Home />
          </DropdownHeaderImage>
          <div>
            <DropdownHeaderTitle>{MENU_LABELS.hosting}</DropdownHeaderTitle>
            <DropdownHeaderDesc>
              {MENU_LABELS.hostingDescription}
            </DropdownHeaderDesc>
          </div>
        </DropdownHeader>
      </DropdownSection>

      <DropdownDivider />

      <DropdownSection>
        <DropdownItem>
          <UserPlus />
          {MENU_LABELS.recommendHost}
        </DropdownItem>
        <DropdownItem>
          <Users />
          {MENU_LABELS.findCoHost}
        </DropdownItem>
      </DropdownSection>

      <DropdownDivider />

      <DropdownSection>
        <DropdownItem onClick={handleLogout}>
          <LogOut />
          {MENU_LABELS.logout}
        </DropdownItem>
      </DropdownSection>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
