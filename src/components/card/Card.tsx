import { useStyleConfig, chakra, forwardRef } from "@chakra-ui/react";
import { CustomCardProps } from "@/theme/theme";
const CustomCard = forwardRef<CustomCardProps, "div">((props, ref) => {
  const { size, variant, ...rest } = props;
  const styles = useStyleConfig("Card", { size, variant });

  return <chakra.div ref={ref} __css={styles} {...rest} />;
});

export default CustomCard;

// Define prop types explicitly
interface CardProps {
  size?: string;
  variant?: string;
  [key: string]: any;
}

// Update to use React's forwardRef with proper types and useMultiStyleConfig
const CustomCard = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { size, variant, ...rest } = props;
  const styles = useMultiStyleConfig("Card", { size, variant });

  return <chakra.div ref={ref} __css={styles} {...rest} />;
});

CustomCard.displayName = "CustomCard";
