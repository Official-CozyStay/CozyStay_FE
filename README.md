# 🏡 CozyStay (Frontend)

> **숙소 검색/예약/리뷰/호스트 관리**
> React 기반

## 주요 기능

| 도메인         | 기능                                                                 |
|-------------|----------------------------------------------------------------------|
| 인증/보안       | 회원가입, 로그인(JWT), 소셜로그인(선택), 역할(Role: USER/HOST/ADMIN) |
| 숙소(Listing) | 숙소 등록/수정/조회, 사진 업로드(사전서명 URL), 편의시설/정책 관리   |
| 검색/필터       | 지역/날짜/인원/가격/유형 필터, 정렬(평점/가격/리뷰수 등)             |
| 예약(Booking) | 가용성 체크, 예약 생성/취소/환불 규칙, 캘린더 블로킹                 |
| 리뷰(Review)  | 예약 완료 사용자만 작성 가능, 평점/코멘트, 신고/숨김                 |
| 결제          | 결제 요청/콜백(모의/PG 연동), 영수증(모의)                            |


## 기술 스택

| 항목                 | 내용              |
| -------------------- | ----------------- |
| **Framework**        | React 18 + Vite   |
| **Language**         | TypeScript        |
| **State Management** | Zustand / Recoil  |
| **Styling**          | styled-components |
| **Routing**          | React Router v6   |
| **API**              | Axios             |
| **Build Tool**       | Vite              |
| **Package Manager**  | npm               |

## 프로젝트 구조

```bash
frontend/
├── public/                    # 정적 리소스 (favicon, index.html 등)
├── src/
│   ├── api/                   # 서버 통신 (axios 인스턴스, API 함수)
│   ├── assets/                # 이미지, 폰트, 아이콘 등 정적 파일
│   ├── components/            # 공용 컴포넌트 (Button, Modal, Card 등)
│   ├── hooks/                 # 커스텀 훅 (useFetch, useModal 등)
│   ├── layouts/               # 공통 레이아웃 (Header, Footer 등)
│   ├── pages/                 # 라우트 단위 페이지 컴포넌트
│   ├── router/                # 라우팅 설정
│   ├── store/                 # 전역 상태관리 (Zustand / Recoil 등)
│   ├── styles/                # 전역 스타일, 테마
│   ├── utils/                 # 헬퍼 함수 및 상수
│   └── main.tsx               # 진입점
├── .env                       # 환경 변수 파일
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 실행 방법

```bash
# 1. 패키지 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 빌드
npm run build

# 4. 배포 전 확인
npm run preview

```

## 라이센스

본 프로젝트 소스 코드는 **CozyStay 팀 내부 사용**을 목적으로 하며,  
허가되지 않은 무단 복제 및 배포를 금합니다.
