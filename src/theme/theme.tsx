"use client";

import {
  ChakraProvider,
  createSystem,
  defineConfig,
  HTMLChakraProps,
  ThemeProps,
} from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { CardComponent } from "./components/card";
import { buttonStyles } from "./components/button";
import { badgeStyles } from "./components/badge";
import { inputStyles } from "./components/input";
import { progressStyles } from "./components/progress";
import { sliderStyles } from "./components/slider";
import { textareaStyles } from "./components/textarea";
import { switchStyles } from "./components/switch";
import { linkStyles } from "./components/link";
import { breakpoints } from "./foundations/breakpoints";
import { globalStyles } from "./styles";
import { ReactNode } from "react";

/*
export type TokenCategory = "zIndex" | "opacity" | "colors" | "fonts" | "fontSizes" | 
  "fontWeights" | "lineHeights" | "letterSpacings" | "sizes" | "shadows" | "spacing" | 
  "radii" | "borders" | "durations" | "easings" | "animations" | "blurs" | "gradients" | 
  "assets" | "cursor" | "borderWidths" | "breakpoints" | "borderStyles" | "aspectRatios";
*/

// Define the theme configuration
const config = defineConfig({
  globalCss: {
    body: {
      overflowX: "hidden",
      bg: "white",
      fontFamily: "Inter",
      letterSpacing: "wide",
    },
    input: {
      color: "black",
    },
    html: {
      fontFamily: "Inter",
    },
  },
  theme: {
    breakpoints,
    tokens: {
      colors: {
        brand: {
          50: { value: "#f5f5f5" },
          100: { value: "#e0e0e0" },
          200: { value: "#bdbdbd" },
          300: { value: "#9e9e9e" },
          400: { value: "#757575" },
          500: { value: "#616161" },
          600: { value: "#424242" },
          700: { value: "#212121" },
          800: { value: "#121212" },
          900: { value: "#000000" },
        },
        brandScheme: {
          50: { value: "#f0e8ff" },
          100: { value: "#d6c7fe" },
          200: { value: "#baa2ff" },
          300: { value: "#9b7aff" },
          400: { value: "#805aff" },
          500: { value: "#613aff" },
          600: { value: "#5335f8" },
          700: { value: "#3b2def" },
          800: { value: "#1727ea" },
          900: { value: "#0018e3" },
        },
        brandTabs: {
          50: { value: "#f0e8ff" },
          100: { value: "#d6c7fe" },
          200: { value: "#baa2ff" },
          300: { value: "#9b7aff" },
          400: { value: "#805aff" },
          500: { value: "#613aff" },
          600: { value: "#5335f8" },
          700: { value: "#3b2def" },
          800: { value: "#1727ea" },
          900: { value: "#0018e3" },
        },
        horizonGreen: {
          50: { value: "#E1FFF4" },
          100: { value: "#BDFFE7" },
          200: { value: "#7BFECE" },
          300: { value: "#39FEB6" },
          400: { value: "#01F99E" },
          500: { value: "#01B574" },
          600: { value: "#01935D" },
          700: { value: "#016B44" },
          800: { value: "#00472D" },
          900: { value: "#002417" },
        },
        horizonOrange: {
          50: { value: "#FFF7EB" },
          100: { value: "#FFF1DB" },
          200: { value: "#FFE2B8" },
          300: { value: "#FFD28F" },
          400: { value: "#FFC46B" },
          500: { value: "#FFB547" },
          600: { value: "#FF9B05" },
          700: { value: "#C27400" },
          800: { value: "#855000" },
          900: { value: "#422800" },
          950: { value: "#1F1200" },
        },
        horizonRed: {
          50: { value: "#FCE8E8" },
          100: { value: "#FAD1D1" },
          200: { value: "#F4A4A4" },
          300: { value: "#EF7676" },
          400: { value: "#EA4848" },
          500: { value: "#E31A1A" },
          600: { value: "#B71515" },
          700: { value: "#891010" },
          800: { value: "#5B0B0B" },
          900: { value: "#2E0505" },
          950: { value: "#170303" },
        },
        horizonBlue: {
          50: { value: "#EBEFFF" },
          100: { value: "#D6DFFF" },
          200: { value: "#ADBFFF" },
          300: { value: "#8AA3FF" },
          400: { value: "#6183FF" },
          500: { value: "#3965FF" },
          600: { value: "#0036FA" },
          700: { value: "#0029BD" },
          800: { value: "#001B7A" },
          900: { value: "#000D3D" },
          950: { value: "#00071F" },
        },
        horizonTeal: {
          50: { value: "#EBFAF8" },
          100: { value: "#D7F4F2" },
          200: { value: "#AAE9E4" },
          300: { value: "#82DED6" },
          400: { value: "#59D4C9" },
          500: { value: "#33C3B7" },
          600: { value: "#299E94" },
          700: { value: "#1F756E" },
          800: { value: "#144D48" },
          900: { value: "#0B2826" },
          950: { value: "#051413" },
        },
        horizonPurple: {
          50: { value: "#EFEBFF" },
          100: { value: "#E9E3FF" },
          200: { value: "#422AFB" },
          300: { value: "#422AFB" },
          400: { value: "#7551FF" },
          500: { value: "#422AFB" },
          600: { value: "#3311DB" },
          700: { value: "#02044A" },
          800: { value: "#190793" },
          900: { value: "#11047A" },
        },
        secondaryGray: {
          100: { value: "#E0E5F2" },
          200: { value: "#E1E9F8" },
          300: { value: "#F4F7FE" },
          400: { value: "#E9EDF7" },
          500: { value: "#8F9BBA" },
          600: { value: "#A3AED0" },
          700: { value: "#707EAE" },
          800: { value: "#707EAE" },
          900: { value: "#1B2559" },
        },
        red: {
          100: { value: "#FEEFEE" },
          500: { value: "#EE5D50" },
          600: { value: "#E31A1A" },
        },
        blue: {
          50: { value: "#EFF4FB" },
          500: { value: "#3965FF" },
        },
        orange: {
          100: { value: "#FFF6DA" },
          500: { value: "#FFB547" },
        },
        green: {
          100: { value: "#E6FAF5" },
          500: { value: "#01B574" },
        },
        navy: {
          50: { value: "#d0dcfb" },
          100: { value: "#aac0fe" },
          200: { value: "#a3b9f8" },
          300: { value: "#728fea" },
          400: { value: "#3652ba" },
          500: { value: "#1b3bbb" },
          600: { value: "#24388a" },
          700: { value: "#1B254B" },
          800: { value: "#111c44" },
          900: { value: "#0b1437" },
        },
        gray: {
          100: { value: "#FAFCFE" },
        },
        background: {
          100: { value: "#FAFCFE" },
          900: { value: "#0b1437" },
        },
        // Add other color definitions similarly
      },
      radii: {
        none: { value: "0" },
        sm: { value: "0.125rem" },
        base: { value: "0.25rem" },
        md: { value: "0.375rem" },
        lg: { value: "0.5rem" },
        xl: { value: "0.75rem" },
        "2xl": { value: "1rem" },
        "3xl": { value: "1.5rem" },
        full: { value: "9999px" },
      },
    },
  },
});

// Create the system using the defined config
export const system = createSystem(config);

interface ProviderProps {
  children: ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </ChakraProvider>
  );
}

export interface CustomCardProps extends ThemeProps {}
