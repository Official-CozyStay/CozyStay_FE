// 모듈 보강 - styled-components의 DefaultTheme 타입 확장
import 'styled-components';

declare module 'styled-components' {
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
        tertiary: string;
      };
      border: {
        primary: string;
        light: string;
      };
      background: {
        default: string;
        hover: string;
        active: string;
      };
      common: {
        white: string;
        black: string;
      };
      overlay: {
        default: string;
      };
      status: {
        error: string;
        warning: string;
        success: string;
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
      mapMarker: string;
      focus: string;
      header: string;
    };
    spacing: {
      xxs: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
      '6xl': string;
      '1px': string;
      '2px': string;
      '6px': string;
      '10px': string;
      '18px': string;
      '20px': string;
      '40px': string;
    };
    size: {
      icon: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
      };
      button: {
        sm: string;
        md: string;
        lg: string;
      };
      input: {
        sm: string;
        md: string;
        lg: string;
      };
      width: {
        xs: string;
        sm: string;
        md: string;
      };
      cardImage: {
        default: string;
      };
    };
    layout: {
      maxWidth: string;
      headerHeight: {
        default: string;
        scrolled: string;
      };
      filterBarHeight: string;
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
      translateY: {
        sm: string;
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
