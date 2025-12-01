// 반응형 미디어 쿼리 유틸리티
const breakpoints = {
  mobile: "768px",
  tablet: "1024px",
  desktop: "1440px",
};

export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.tablet})`,
  desktopLarge: `@media (min-width: ${breakpoints.desktop})`,
};

