import { cn } from "@/lib/utils";

/**
 * Skeleton component is used as a placeholder while content is loading.
 * It provides a visual cue to the user that content is being loaded.
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
