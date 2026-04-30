---
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git add:*), Bash(git commit:*)
description: 변경사항을 분석해 한국어 커밋 메시지 초안을 제안하고, 확인 후 커밋
---

## Context

- 현재 git 상태: !`git status`
- 변경 내용 (staged + unstaged): !`git diff HEAD`
- 현재 브랜치: !`git branch --show-current`
- 최근 커밋 이력: !`git log --oneline -10`

## 커밋 메시지 규칙

타입은 아래 중 하나를 선택:

| 타입       | 사용 시점                |
| ---------- | ------------------------ |
| `feat`     | 새 기능 추가             |
| `fix`      | 버그 수정                |
| `refactor` | 기능 변화 없는 코드 개선 |
| `style`    | UI/스타일 변경           |
| `chore`    | 설정, 의존성, 기타 잡무  |
| `docs`     | 문서 수정                |

형식: `타입: 한국어로 작업 내용 요약`

예시:

- `feat: 로그인 페이지 6자리 코드 입력 UI 추가`
- `fix: 관리자 대시보드 날짜 파라미터 오류 수정`
- `refactor: AuthContext 역할 분리 및 useAuth 훅 정리`

## 진행 순서

1. 변경사항을 분석해 커밋 메시지 초안을 **제안만** 한다 (커밋 X)
2. 사용자에게 아래 형식으로 확인을 요청한다:

```
커밋 메시지 초안:
  feat: (작업 내용)

이대로 커밋할까요? 수정이 필요하면 알려주세요.
```

3. 사용자가 승인하면 그때 `git add` + `git commit` 실행
4. push는 하지 않는다
5. `.env`, `.env.local` 등 민감한 파일은 절대 포함하지 않는다
