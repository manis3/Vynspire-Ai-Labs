import cn from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

const cardVarients = cva("text-text text-base font-roboto", {
  variants: {
    colorScheme: {
      primary: "bg-background",
      secondary: "bg-foreground",
    },
    padding: {
      "16px": "p-4",
      "18px": "p-[18px]",
      "20px": "p-5",
    },
    shadow: {
      none: "shadow-none",
      md: "shadow-md",
      xl: "shadow-xl",
    },
    borderRadius: {
      none: "rounded-none",
      "10px": "rounded-[10px]",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
    border: {
      none: "border-none",
      border: "border border-border-lavender",
    },
  },
  defaultVariants: {
    colorScheme: "primary",
    padding: "16px",
    shadow: "none",
    borderRadius: "10px",
    border: "none",
  },
});

interface cardProps extends VariantProps<typeof cardVarients> {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className,
  shadow,
  colorScheme,
  borderRadius,
  border,
  padding,
}: cardProps) {
  return (
    <div
      className={cn(
        cardVarients({ colorScheme, padding, shadow, borderRadius, border }),
        className,
      )}
    >
      {children}
    </div>
  );
}
