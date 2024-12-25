import { extendTheme, HTMLChakraProps, ThemingProps } from "@chakra-ui/react";
import { CardComponent } from "../theme/components/card";
import { buttonStyles } from "../theme/components/button";
import { badgeStyles } from "../theme/components/badge";
import { inputStyles } from "../theme/components/input";
import { progressStyles } from "../theme/components/progress";
import { sliderStyles } from "../theme/components/slider";
import { textareaStyles } from "../theme/components/textarea";
import { switchStyles } from "../theme/components/switch";
import { linkStyles } from "../theme/components/link";
import { breakpoints } from "../theme/foundations/breakpoints";
import { globalStyles } from "../theme/styles";
// import { globalStyles as globalStylesRed } from './stylesRed';

let theme = extendTheme(
  { breakpoints }, // Breakpoints
  globalStyles,
  badgeStyles, // badge styles
  buttonStyles, // button styles
  linkStyles, // link styles
  progressStyles, // progress styles
  sliderStyles, // slider styles
  inputStyles, // input styles
  textareaStyles, // textarea styles
  switchStyles, // switch styles
  CardComponent // card component
);

export default theme;

export interface CustomCardProps extends HTMLChakraProps<"div">, ThemingProps {}
