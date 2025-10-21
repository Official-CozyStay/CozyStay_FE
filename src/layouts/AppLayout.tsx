import { NavLink, Outlet } from "react-router-dom";
import "../styles/app.css";

export default function AppLayout() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <span className="brand-badge">YY</span>
          <h1 className="brand-title">청춘여행</h1>
        </div>
        <details className="nav-mobile">
          <summary aria-label="메뉴 열기">☰</summary>
          <nav
            className="nav-drawer"
            onClick={(e) => {
              const details = e.currentTarget.closest(
                "details"
              ) as HTMLDetailsElement | null;
              if (details) details.open = false;
            }}
          >
            <NavLink to="/" end>
              홈
            </NavLink>
            <NavLink to="/features">기능</NavLink>
            <NavLink to="/get-started">시작하기</NavLink>
          </nav>
        </details>
        <nav className="nav-desktop">
          <NavLink to="/" end>
            홈
          </NavLink>
          <NavLink to="/features">기능</NavLink>
          <NavLink to="/get-started">시작하기</NavLink>
        </nav>
      </header>

      <main className="content">
        <Outlet />
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} 청춘여행 — with React + Vite</span>
      </footer>
    </div>
  );
}
