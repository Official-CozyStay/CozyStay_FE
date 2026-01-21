// 색상 변수 추가시 styled.d.ts 파일에 타입 선언 후 사용
import { radius } from "./tokens/radius";
import { shadow } from "./tokens/shadow";
import { spacing } from "./tokens/spacing";
import { size } from "./tokens/size";
import { layout } from "./tokens/layout";
import { zIndex } from "./tokens/zIndex";
import { transition } from "./tokens/transition";
import { fontSize, fontWeight, lineHeight } from "./tokens/typography";

export const theme = {
  colors: {
    // 주요 색상
    primary: {
      main: "#345342",
      hover: "#2a4335",
      light: "#e8f5e9",
    },
    // 텍스트 계열
    text: {
      primary: "#222",
      secondary: "#7b7b7bff",
      tertiary: "#b0b0b0",
    },
    // Border(경계선) 계열
    border: {
      primary: "#afb0afff",
      light: "#eee",
    },
    // Background (배경) 계열
    background: {
      default: "#F5EFE6", // 페이지 기본 배경
      hover: "#f5f5f5", // 버튼 호버 배경
      active: "#eaeaea", // 버튼 active 배경
      // paper: "#f9f9f9" // 카드 컴포넌트 등
    },
    // 공통 색상 (항상 고정되는 값)
    common: {
      white: "#fff",
      black: "#000",
    },
    // 오버레이 색상
    overlay: {
      default: "rgba(0, 0, 0, 0.5)",
    },
    // 상태별 색상
    status: {
      error: "#d32f2f",
      warning: "#ffa000",
      success: "#388e3c",
    },
  },
  radius,
  shadow,
  spacing,
  size,
  layout,
  zIndex,
  transition,
  font: {
    size: fontSize,
    weight: fontWeight,
    lineHeight,
  },
};
