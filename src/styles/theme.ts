import { radius } from "./tokens/radius";
import { shadow } from "./tokens/shadow";

export const theme = {
  colors: {
    primary: "#14540d",
    primaryHover: "#15400e",
    primaryLight: "#e8f5e9",
    border: "#afb0afff",
    borderLight: "#eee",
    text: "#222",
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
