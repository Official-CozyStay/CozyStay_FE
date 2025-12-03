// 반응형 미디어 쿼리 유틸리티
const breakpoints = {
  mobile: "768px",
  tablet: "1024px",
  desktop: "1440px",
};

export const media = {
  mobile: `@media (max-width: ${parseInt(breakpoints.mobile, 10) - 1}px)`,
  tablet: `@media (min-width: ${breakpoints.mobile}) and (max-width: ${parseInt(breakpoints.tablet, 10) - 1}px)`,
  desktop: `@media (min-width: ${breakpoints.tablet})`,
  desktopLarge: `@media (min-width: ${breakpoints.desktop})`,
};

