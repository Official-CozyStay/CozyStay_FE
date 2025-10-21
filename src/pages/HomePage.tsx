import { NavLink } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <h2>AI 기반 기억 보관함으로 만드는 따뜻한 돌봄</h2>
        <p className="subtitle">
          데이터와 감성을 함께 담은 로컬 기반 AI 지원 시스템 —
          보호사·가족·기관이 함께 만드는 통합 돌봄 플랫폼.
        </p>
        <div className="cta">
          <NavLink className="btn primary" to="/get-started">
            프로젝트 시작
          </NavLink>
          <NavLink className="btn ghost" to="/features">
            주요 기능 보기
          </NavLink>
        </div>
      </section>
    </>
  );
}
