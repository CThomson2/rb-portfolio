import { mode } from "@chakra-ui/theme-tools";

// In Chakra UI v3, component styles are added to the theme via defineConfig() in theme.tsx:
//
// const config = defineConfig({
//   components: {
//     Badge: badgeStyles,  // Badge styles are registered here
//     ...
//   }
// })
//
// The system is then created with:
// export const system = createSystem(config)
//
// And made available through ChakraProvider:
// <ChakraProvider value={system}>

export const badgeStyles = {
  components: {
    Badge: {
      baseStyle: {
        borderRadius: "6px",
        lineHeight: "100%",
        padding: "7px",
        paddingLeft: "12px",
        paddingRight: "12px",
      },
      variants: {
        outline: () => ({
          borderRadius: "6px",
        }),
        brand: (props: any) => ({
          bg: mode("brand.500", "brand.400")(props),
          color: "white",
          _focus: {
            bg: mode("brand.500", "brand.400")(props),
          },
          _active: {
            bg: mode("brand.500", "brand.400")(props),
          },
          _hover: {
            bg: mode("brand.600", "brand.400")(props),
          },
        }),
      },
    },
  },
};
