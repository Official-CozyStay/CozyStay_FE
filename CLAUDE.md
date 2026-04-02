# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server (proxies /api/* to localhost:8080)
npm run build      # Type-check (tsc -b) + Vite production build
npm run lint       # ESLint check
npm run format     # Prettier format
npm run check      # Prettier check + ESLint (combined validation)
npm run preview    # Preview production build locally
```

There are no test commands — this project has no test suite.

Pre-commit hooks (Husky + lint-staged) auto-run Prettier + ESLint on staged TypeScript/JS files.

## Architecture

**CozyStay** is an Airbnb-inspired accommodation booking SPA (React 19 + TypeScript + Vite).

### Key layers

- **`src/api/`** — Axios HTTP client + domain-specific API modules. `client.ts` is the single Axios instance: auto-attaches `Bearer {accessToken}` from localStorage, strips the `.data` wrapper from responses, and handles 401s. All request/response types live in `api/types.ts`.
- **`src/contexts/AuthContext.tsx`** — Auth state (user, isAuthenticated, accessToken). Token stored in localStorage. Fetches `/api/users/me` on login.
- **`src/store/accommodationStore.ts`** — Zustand store (the only one). Holds accommodation detail, check-in/out dates, guests, and loading states for the detail page.
- **`src/router/index.tsx`** — React Router v7. Two layout trees: `PublicLayout` (header + footer) for all user-facing pages, and a separate `HostingPage` layout for host registration.
- **`src/styles/`** — styled-components design system. Design tokens are in `styles/tokens/` (spacing, typography, shadow, radius, zIndex, transition, layout). Use these tokens instead of hardcoded values. `theme.ts` aggregates them all.
- **`src/api/chatWebSocket.ts`** — STOMP over SockJS for real-time chat. Connects to the backend WebSocket endpoint.

### Path alias

`@/` maps to `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`).

### Environment

`VITE_API_BASE_URL` sets the backend base URL (defaults to `http://localhost:8080` in dev via Vite proxy).

## Conventions

From `.github/CONTRIBUTING.md`:

**Commit format:**
```
type(scope): summary
- detail
- issue: #number
```
Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Naming:**
- Components/files: `PascalCase`
- Style files: `[Component].styles.ts`
- Functions/variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Folders: `kebab-case`

**Branches:** `feature/kebab-name` off `develop`; `hotfix/xxx` off `main`.

**Code style:** 2-space indent, semicolons required, single quotes.
