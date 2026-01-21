import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, User } from 'lucide-react';
import logo from '@/assets/images/logo.svg';
import { useAuth } from '@/contexts/AuthContext';
import {
  HeaderContainer,
  HeaderLeft,
  Logo,
  LogoText,
  HeaderCenter,
  NavItem,
  HeaderRight,
  SwitchModeButton,
  ProfileButton,
  ProfilePlaceholder,
  MenuIconButton,
} from './HostingHeader.styles';

const HostingHeader = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  // TODO: 향후 다른 경로에 따라 탭 활성화 로직 추가 필요 (예: /hosting/calendar → '달력', /hosting/listings → '리스팅')
  const activeTab = '투데이';

  return (
    <HeaderContainer>
      <HeaderLeft to="/">
        <Logo src={logo} alt="CozyStay Logo" />
        <LogoText>CozyStay</LogoText>
      </HeaderLeft>

      <HeaderCenter>
        <NavItem $active={activeTab === '투데이'}>투데이</NavItem>
        <NavItem $active={activeTab === '달력'}>달력</NavItem>
        <NavItem $active={activeTab === '리스팅'}>리스팅</NavItem>
        <NavItem $active={activeTab === '메시지'}>메시지</NavItem>
      </HeaderCenter>

      <HeaderRight>
        <SwitchModeButton onClick={() => navigate('/')}>
          게스트 모드로 전환
        </SwitchModeButton>
        
        {isAuthenticated && user ? (
          <ProfileButton type="button" onClick={() => {}}>
            <ProfilePlaceholder>
              {user.nickname?.charAt(0)?.toUpperCase() || '?'}
            </ProfilePlaceholder>
          </ProfileButton>
        ) : (
          <ProfileButton type="button" onClick={() => {}}>
            <ProfilePlaceholder>
              <User size={18} />
            </ProfilePlaceholder>
          </ProfileButton>
        )}

        <MenuIconButton>
          <Menu size={20} />
        </MenuIconButton>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default HostingHeader;

