// 모듈 보강 - styled-components의 DefaultTheme 타입 확장
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: {
        main: string;
        hover: string;
        light: string;
      };
      text: {
        primary: string;
        secondary: string;
      };
      border: {
        primary: string;
        light: string;
      };
      background: {
        default: string;
      };
      common: {
        white: string;
        black: string;
      };
      overlay: {
        default: string;
      };
    };
    radius: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      full: string;
    };
    shadow: {
      sm: string;
      md: string;
      lg: string;
    };
    spacing: {
      xxs: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      "2xl": string;
      "3xl": string;
      "4xl": string;
      "5xl": string;
      "6xl": string;
    };
    size: Record<string, never>; // 컴포넌트 특정적인 크기 값은 각 컴포넌트 내부 상수로 관리
    layout: {
      maxWidth: string;
    };
    zIndex: {
      base: number;
      dropdown: number;
      sticky: number;
      fixed: number;
      modalBackdrop: number;
      modal: number;
      popover: number;
      tooltip: number;
      searchBar: number;
      header: number;
      modalOverlay: number;
      modalContainer: number;
      sidebarOverlay: number;
      sidebar: number;
    };
    transition: {
      fast: string;
      normal: string;
      slow: string;
      all: {
        fast: string;
        normal: string;
        slow: string;
      };
      transform: {
        fast: string;
        normal: string;
        slow: string;
      };
      colors: {
        fast: string;
        normal: string;
        slow: string;
      };
    };
    font: {
      size: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        display: string;
      };
      weight: {
        regular: number;
        medium: number;
        bold: number;
        extrabold: number;
      };
      lineHeight: {
        tight: number;
        normal: number;
        relaxed: number;
      };
    };
  }
}
