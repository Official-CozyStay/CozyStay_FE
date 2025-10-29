// 색상 변수 추가시 styled.d.ts 파일에 타입 선언 후 사용
import { radius } from "./tokens/radius";
import { shadow } from "./tokens/shadow";

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
    },
    // Border(경계선) 계열
    border: {
      primary: "#afb0afff",
      light: "#eee",
    },
    // Background (배경) 계열
    background: {
      default: "#F5EFE6", // 페이지 기본 배경
      // paper: "#f9f9f9" // 카드 컴포넌트 등
    },
    // 공통 색상 (항상 고정되는 값)
    common: {
      white: "#fff",
      black: "#000",
    },
    // 상태별 색상 (추후 필요시 확장)
    // status: {
    //   error: "#d32f2f",
    //   warning: "#ffa000",
    //   success: "#388e3c",
    // }
  },
  radius,
  shadow,
  font: {
    size: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "20px",
      xl: "24px",
      xxl: "32px",
      display: "40px",
    },
    weight: {
      regular: 400,
      medium: 500,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.7,
    },
  },
};
