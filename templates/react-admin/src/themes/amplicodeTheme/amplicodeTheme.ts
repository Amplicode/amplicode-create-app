import { PaletteMode, Theme } from "@mui/material";
import { createTheme as createMuiTheme } from "@mui/material/styles";
import merge from "deepmerge";
import { createComponents } from "./createComponents";
import { createPalette, neutralColors, neutralDarkColors } from "./createPalette";
import { createShadows } from "./createShadows";
import { createTypography } from "./createTypography";

export const createAmplicodeTheme = (themeMode: PaletteMode) => {
  const defaultThemeConfig = createMuiTheme();
  const palette = createPalette(themeMode);
  const colors =
    themeMode === "light" ? { neutral: neutralColors } : { neutral: neutralDarkColors };
  const augmentedTheme = merge.all([defaultThemeConfig, { palette }, { colors }]);
  const components = createComponents(augmentedTheme as Theme);
  const shadows = createShadows(augmentedTheme as Theme);
  const typography = createTypography();

  const themeOptions = {
    palette,
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440,
      },
    },
    typography,
    sidebar: {
      width: 280,
    },
    shadows,
    components,
  };

  const theme = createMuiTheme(themeOptions);
  return theme;
};

export const amplicodeLightTheme = createAmplicodeTheme("light");
export const amplicodeDarkTheme = createAmplicodeTheme("dark");
