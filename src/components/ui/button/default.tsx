import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "@/utils/cn";

export type IButtonSize = "default" | "lg" | "icon" | "sm" | null | undefined;

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-text-primary rounded-md text-sm font-medium ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-buttonPrimary tracking-[1px]  leading-[18px]  shadow hover:opacity/90 cursor-pointer rounded-lg",
        outline: "border border-buttonOutlineBorder bg-none cursor-pointer",
        secondary: "bg-foreground text-text-secondary hover:bg-secondary/80",
        ghost: "!bg-transparent text-textDark !text-xs !font-roboto",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "text-sm py-3 px-[94px]",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        sm: "rounded-xl px-6 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, disabled, onClick, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        onClick={onClick}
        ref={ref}
        {...props}
        disabled={disabled}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
