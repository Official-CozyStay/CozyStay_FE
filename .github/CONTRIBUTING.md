# 📝 Git 협업 컨벤션

본 문서는 팀원 모두가 일관된 규칙으로 개발을 진행하기 위해 작성되었습니다.  
브랜치 전략, 커밋 메시지 규칙, 코드 컨벤션을 정리했습니다.

## 목차

- [브랜치 전략](#-브랜치-전략)
- [커밋 컨벤션](#-커밋-컨벤션)
- [코드 컨벤션](#-코드-컨벤션)

## 브랜치 전략

- **main**: 배포용 브랜치
- **develop**: 통합 개발용 브랜치
- **feature/xxx**: 기능 개발 브랜치
- **release/xxx**: 배포 전 점검 브랜치
- **hotfix/xxx**: 배포 후 긴급 수정

> 모든 기능 개발은 `feature/기능명` 브랜치에서 진행해주세요.  
> 브랜치명은 **소문자 + 하이픈(-)** 형식을 통일합니다.

예시:

```bash
git checkout -b feature/login
git checkout -b feature/board-details
```

### 브랜치 플로우 요약

```
main ← release ← develop ← feature/xxx
                         ↳ hotfix/xxx (from main)
```

## 커밋 컨벤션

| 타입     | 설명                                         |
| -------- | -------------------------------------------- |
| feat     | 새로운 기능 추가                             |
| fix      | 버그 수정                                    |
| docs     | 문서 수정                                    |
| style    | 코드 포맷팅, 세미콜론 누락 등 기능 변경 없음 |
| refactor | 코드 리팩토링                                |
| test     | 테스트 코드 관련 작업                        |
| chore    | 빌드/패키지 관리 등 기타 수정                |

### 커밋 메시지 형식

```
타입(스코프): 변경사항 요약
- 상세 변경사항1
- 상세 변경사항2
- issue: #번호
```

예시:

```
feat(login): 로그인 기능 구현
- 로그인 서비스 로직 작성
- 인증 필터 추가
- issue: #12

fix(auth): 회원가입 시 비밀번호 검증 오류 수정
- 비밀번호 최소 길이 검증 추가
- 이메일 중복 체크 보완
- issue: #15
```

> 💡 **스코프(scope)**: 해당 커밋이 영향을 주는 영역 (예: `login`, `user`, `api`, `ui` 등)

## 코드 컨벤션 (React / TypeScript 기준)

### 공통 스타일

- 들여쓰기: **2칸 스페이스**
- 세미콜론(`;`) 필수
- 문자열: **작은따옴표('')**
- 컴포넌트 파일명: `PascalCase`
- 스타일 파일명: `[Component].styles.ts`
- 불필요한 줄임말, 축약 지양 (`usr` → `user`, `cnt` → `count`)

### 네이밍 규칙

| 대상      | 규칙             | 예시                        |
| --------- | ---------------- | --------------------------- |
| 컴포넌트  | PascalCase       | `UserCard`, `LoginModal`    |
| 함수/변수 | camelCase        | `handleClick`, `userList`   |
| 상수      | UPPER_SNAKE_CASE | `API_BASE_URL`, `MAX_COUNT` |
| 폴더명    | kebab-case       | `user-profile`, `my-page`   |

### 주석 규칙

- 설명이 필요한 로직에는 한 줄 주석 추가
- TODO, FIXME는 반드시 구체적인 설명 포함
- 불필요한 주석은 지양 (`// 버튼 클릭` 같은 설명은 삭제)

예시:

```tsx
/** 사용자 로그인 폼 컴포넌트 */
function LoginForm() {
  // TODO: 폼 검증 로직 추가 예정
}
```

> 💬 모든 팀원은 브랜치 전략과 커밋/코드 컨벤션을 준수하여  
> 협업 품질과 코드 일관성을 유지합니다.
