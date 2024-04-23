import { alpha, PaletteMode } from "@mui/material";
import { common } from "@mui/material/colors";

export const primaryColors = {
  light: "#6CE9A6",
  main: "#12B76A",
  dark: "#027A48",
  contrastText: "#FFFFFF",
};
export const neutralColors = {
  50: "#F9FAFB",
  100: "#F2F4F7",
  200: "#EAECF0",
  300: "#D0D5DD",
  400: "#98A2B3",
  500: "#667085",
  600: "#475467",
  700: "#344054",
  800: "#1D2939",
  900: "#101828",
};

export const neutralDarkColors = {
  900: "#F9FAFB",
  800: "#F2F4F7",
  700: "#EAECF0",
  600: "#D0D5DD",
  500: "#98A2B3",
  400: "#667085",
  300: "#475467",
  200: "#344054",
  100: "#1D2939",
  50: "#101828",
};

const createLightPalette = () => ({
  mode: "light" as "light",
  primary: { ...primaryColors },
  secondary: {
    main: neutralColors[900],
  },
  background: {
    default: "#FCFCFD",
    paper: common.white,
  },
  text: {
    secondary: neutralColors[900],
  },
  action: {
    active: neutralColors[400],
    disabled: alpha(neutralColors[900], 0.38),
    disabledBackground: alpha(primaryColors.main, 0.2),
    focus: alpha(neutralColors[900], 0.16),
    hover: alpha(neutralColors[900], 0.04),
    selected: alpha(neutralColors[900], 0.12),
  },
});

const createDarkPalette = () => ({
  mode: "dark" as "dark",
  primary: { ...primaryColors },
  secondary: {
    main: neutralColors[100],
  },
  background: {
    default: common.black,
    paper: neutralColors[900],
  },
  text: {
    secondary: neutralColors[100],
  },
  action: {
    active: neutralColors[400],
    disabled: alpha(neutralColors[900], 0.38),
    disabledBackground: alpha(primaryColors.main, 0.2),
    focus: alpha(neutralColors[900], 0.16),
    hover: alpha(neutralColors[900], 0.04),
    selected: alpha(neutralColors[900], 0.12),
  },
});

export const createPalette = (themeMode: PaletteMode) => {
  return themeMode === "light" ? createLightPalette() : createDarkPalette();
};
