/**
 * Theme Provider Component
 *
 * This is a client-side provider component that wraps the application to enable theme switching functionality.
 * It uses the next-themes library to manage light/dark mode themes and persists the user's theme preference.
 * The provider allows child components to access and modify the current theme through the useTheme hook.
 */

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
