export default function FeaturesPage() {
  return (
    <section className="features">
      <div className="card">
        <h3>🗓️ 돌봄 기록 관리</h3>
        <p>대화·활동·정서 상태를 기록하고 대시보드로 시각화.</p>
      </div>
      <div className="card">
        <h3>🧠 기억 아카이빙</h3>
        <p>사진·음악·이야기·방문지를 업로드하고 교감의 매개로.</p>
      </div>
      <div className="card">
        <h3>💬 인지 자극 활동</h3>
        <p>아카이빙/기록 기반 ‘오늘의 대화 주제’ 자동 추천.</p>
      </div>
      <div className="card">
        <h3>🚨 안전 관리</h3>
        <p>선호 장소 학습 → 실종 시 예상 위치·알림.</p>
      </div>
      <div className="card">
        <h3>👥 통합 계정</h3>
        <p>환자별 정보 통합, 권한 기반 접근 제어.</p>
      </div>
    </section>
  );
}
