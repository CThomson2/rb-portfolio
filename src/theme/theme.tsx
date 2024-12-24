import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

// Create a custom system with default config
export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        // You can customize your colors here
      },
      fonts: {
        // You can customize your fonts here
      },
    },
  },
});

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
