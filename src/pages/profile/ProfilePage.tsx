import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import IntroSection from './sections/IntroSection';
import PastTripsSection from './sections/PastTripsSection';
import ConnectionsSection from './sections/ConnectionsSection';
import ReviewsPage from './reviews/ReviewsPage';
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

type MenuKey = 'intro' | 'trips' | 'connections' | 'reviews';

interface MenuItem {
  key: MenuKey;
  icon: string;
  label: string;
  component?:
    | ComponentType<{ userName: string; userInitial: string }>
    | ComponentType;
  path?: string;
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
  {
    key: 'reviews',
    icon: 'clipboard',
    label: '리뷰',
    component: ReviewsPage,
    path: '/profile/reviews',
  },
];

const ProfilePage = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState<MenuKey>('intro');

  const userName = user?.nickname || '예은';
  const userInitial = userName.charAt(0);

  useEffect(() => {
    if (location.pathname === '/profile/reviews') {
      setActiveMenu('reviews');
      return;
    }

    const menuParam = searchParams.get('menu');
    if (
      menuParam === 'intro' ||
      menuParam === 'trips' ||
      menuParam === 'connections' ||
      menuParam === 'reviews'
    ) {
      setActiveMenu(menuParam);
    }
  }, [searchParams, location.pathname]);

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
      case 'clipboard':
        return (
          <MenuIcon>
            <span style={{ fontSize: 28 }}>📋</span>
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
                onClick={() => {
                  const targetPath = item.path || `/profile?menu=${item.key}`;
                  navigate(targetPath);
                }}
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
