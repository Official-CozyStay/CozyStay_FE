// 레이아웃 관련 토큰
export const layout = {
  maxWidth: "1440px", // 프로젝트 전반에서 사용하는 표준 최대 너비 (landing 페이지와 일관성 유지)
  // 헤더 높이 관련
  headerHeight: {
    default: "64px",
    scrolled: "64px", // 현재는 같은 값이지만 향후 변경될 수 있음
  },
  // 필터바 높이
  filterBarHeight: "73px", // 대략적인 값, 추후 계산식으로 변경 가능
  // 계산된 높이들
  contentOffset: {
    withHeader: "calc(100vh - 64px)",
    withHeaderAndFilter: "calc(100vh - 137px)",
  },
};
