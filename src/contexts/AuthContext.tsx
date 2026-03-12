/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import type { ReactNode } from 'react';

export type UserRole = "USER" | "HOST" | "ADMIN";

export type User = {
  id: string;
  nickname: string;
  profileImage?: string;
  email?: string;
  role?: UserRole;
  grade?: string;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

type UserProfileResponse = {
  id: number;
  nickName: string;
  profileImageUrl?: string;
  email?: string;
  role?: string;
  grade?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API에서 사용자 정보 가져오기
const fetchUserProfile = async (token: string): Promise<User | null> => {
  const backendBaseUrl =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
  const url = `${backendBaseUrl}/api/users/me`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return null;
      }

      const errorText = await response.text();
      throw new Error(
        `API 호출 실패: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    const apiResponse: ApiResponse<UserProfileResponse> = await response.json();

    if (!apiResponse.success || !apiResponse.data) {
      return null;
    }

    const { data } = apiResponse;

    const userInfo: User = {
      id: String(data.id),
      nickname: data.nickName || '사용자',
      profileImage: data.profileImageUrl || undefined,
      email: data.email || undefined,
      role: (data.role as UserRole) || 'USER',
      grade: data.grade || undefined,
    };

    return userInfo;
  } catch (error) {
    if (
      error instanceof TypeError &&
      error.message.includes('Failed to fetch')
    ) {
      // 네트워크 오류는 조용히 처리
      return null;
    }
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const isLoadingRef = useRef(false);

  // 사용자 정보 로드 함수
  const loadUserInfo = useCallback(async (token: string) => {
    // 중복 호출 방지
    if (isLoadingRef.current) {
      return;
    }

    isLoadingRef.current = true;

    try {
      const userInfo = await fetchUserProfile(token);
      if (userInfo) {
        setAccessToken(token);
        setUser(userInfo);
      } else {
        // 사용자 정보를 가져올 수 없으면 토큰 제거
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setAccessToken(null);
        setUser(null);
      }
    } finally {
      isLoadingRef.current = false;
    }
  }, []);

  // 초기 로드 및 URL 토큰 처리
  useEffect(() => {
    // 1. URL에서 토큰을 받아온 경우 (로그인 직후)
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');

    if (urlToken && refreshToken) {
      localStorage.setItem('accessToken', urlToken);
      localStorage.setItem('refreshToken', refreshToken);
      loadUserInfo(urlToken);
      // URL 정리
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    // 2. localStorage에서 토큰 확인 (새로고침 시)
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken && !user) {
      loadUserInfo(storedToken);
    }
  }, [loadUserInfo, user]);

  const login = async (token: string) => {
    localStorage.setItem('accessToken', token);
    await loadUserInfo(token);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user && !!accessToken,
        accessToken,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
