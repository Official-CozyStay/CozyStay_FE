import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, User } from 'lucide-react';
import logo from '@/assets/images/logo.svg';
import { useAuth } from '@/contexts/AuthContext';
import ProfileDropdown from '@/components/ProfileDropdown';
import {
  HeaderContainer,
  HeaderLeft,
  Logo,
  LogoText,
  HeaderRight,
  SwitchModeButton,
  ProfileButton,
  ProfilePlaceholder,
  MenuIconButton,
  MenuDropdownWrapper,
} from './HostingHeader.styles';

const HostingHeader = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <HeaderContainer>
      <HeaderLeft to="/">
        <Logo src={logo} alt="CozyStay Logo" />
        <LogoText>CozyStay</LogoText>
      </HeaderLeft>

      <HeaderRight>
        <SwitchModeButton onClick={() => navigate('/')}>
          게스트 모드로 전환
        </SwitchModeButton>
        
        {isAuthenticated && user ? (
          <ProfileButton type="button" onClick={() => navigate('/mypage')}>
            <ProfilePlaceholder>
              {user.nickname?.charAt(0)?.toUpperCase() || '?'}
            </ProfilePlaceholder>
          </ProfileButton>
        ) : (
          <ProfileButton type="button" onClick={() => navigate('/mypage')}>
            <ProfilePlaceholder>
              <User size={18} />
            </ProfilePlaceholder>
          </ProfileButton>
        )}

        <MenuDropdownWrapper>
          <MenuIconButton
            ref={menuButtonRef}
            onClick={() => setIsMenuOpen(prev => !prev)}
          >
            <Menu size={20} />
          </MenuIconButton>
          {isMenuOpen && (
            <ProfileDropdown
              onClose={() => setIsMenuOpen(false)}
              buttonRef={menuButtonRef}
            />
          )}
        </MenuDropdownWrapper>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default HostingHeader;

