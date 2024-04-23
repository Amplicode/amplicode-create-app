import { PaletteOptions, ThemeOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    colors: {
      neutral: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
    };
  }
  interface CustomThemeOptions extends Omit<ThemeOptions, "palette"> {
    palette: PaletteOptions & {
      primary: {
        main: string;
      };
      secondary: {
        main: string;
      };
      error: {
        main: string;
      };
      neutral: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      text: {
        primary: string;
        secondary: string;
        disabled: string;
      };
      action: {
        active: string;
        disabled: string;
        disabledBackground: string;
        focus: string;
        hover: string;
        selected: string;
      };
      background: {
        default: string;
        paper: string;
      };
      divider: string;
      breakpoints: {
        values: {
          xs: number;
          sm: number;
          md: number;
          lg: number;
          xl: number;
        };
      };
    };
  }
}
