import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import IntroSection from './sections/IntroSection';
import PastTripsSection from './sections/PastTripsSection';
import ConnectionsSection from './sections/ConnectionsSection';
import {
  PageContainer,
  ContentWrapper,
  Sidebar,
  SidebarTitle,
  SidebarNav,
  SidebarMenuItem,
  MenuIcon,
  UserInitialIcon,
  MenuItemText,
  MainContent,
} from './profile.styles';

type MenuKey = 'intro' | 'trips' | 'connections';

interface MenuItem {
  key: MenuKey;
  icon: string;
  label: string;
  component:
    | ComponentType<{ userName: string; userInitial: string }>
    | ComponentType;
}

const menuItems: MenuItem[] = [
  { key: 'intro', icon: 'user', label: '자기소개', component: IntroSection },
  {
    key: 'trips',
    icon: 'luggage',
    label: '예약',
    component: PastTripsSection,
  },
  {
    key: 'connections',
    icon: 'users',
    label: '인연',
    component: ConnectionsSection,
  },
];

const ProfilePage = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [activeMenu, setActiveMenu] = useState<MenuKey>('intro');

  const userName = user?.nickname || '예은';
  const userInitial = userName.charAt(0);

  useEffect(() => {
    const menuParam = searchParams.get('menu');
    if (
      menuParam === 'intro' ||
      menuParam === 'trips' ||
      menuParam === 'connections'
    ) {
      setActiveMenu(menuParam);
    }
  }, [searchParams]);

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'user':
        return (
          <MenuIcon>
            <UserInitialIcon>{userInitial}</UserInitialIcon>
          </MenuIcon>
        );
      case 'luggage':
        return (
          <MenuIcon>
            <span style={{ fontSize: 28 }}>🧳</span>
          </MenuIcon>
        );
      case 'users':
        return (
          <MenuIcon>
            <span style={{ fontSize: 28 }}>👥</span>
          </MenuIcon>
        );
      default:
        return null;
    }
  };

  const activeItem = menuItems.find((item) => item.key === activeMenu);
  const ActiveComponent = activeItem?.component;

  return (
    <PageContainer>
      <ContentWrapper>
        <Sidebar>
          <SidebarTitle>프로필</SidebarTitle>
          <SidebarNav>
            {menuItems.map((item) => (
              <SidebarMenuItem
                key={item.key}
                $active={activeMenu === item.key}
                onClick={() => setActiveMenu(item.key)}
              >
                {renderIcon(item.icon)}
                <MenuItemText>{item.label}</MenuItemText>
              </SidebarMenuItem>
            ))}
          </SidebarNav>
        </Sidebar>

        <MainContent>
          {ActiveComponent &&
            (activeMenu === 'intro' ? (
              <IntroSection userName={userName} userInitial={userInitial} />
            ) : (
              <ActiveComponent userName={userName} userInitial={userInitial} />
            ))}
        </MainContent>
      </ContentWrapper>
    </PageContainer>
  );
};

export default ProfilePage;
