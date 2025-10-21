// 모듈 보강 - styled-components의 DefaultTheme 타입 확장
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryHover: string;
      primaryLight: string;
      border: string;
      borderLight: string;
      text: string;
      white: string;
    };
    radius: {
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
