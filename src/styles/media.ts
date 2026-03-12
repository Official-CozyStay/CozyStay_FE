// 반응형 미디어 쿼리 유틸리티
const breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
};

export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile - 1}px)`,
  tablet: `@media (min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.tablet - 1}px)`,
  desktop: `@media (min-width: ${breakpoints.tablet}px)`,
  desktopLarge: `@media (min-width: ${breakpoints.desktop}px)`,
};
