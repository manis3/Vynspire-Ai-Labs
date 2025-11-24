import cn from "@/utils/cn";
import * as React from "react";
import { IInputProps } from "./types/input.types";

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ className, type, disabled, value, onChange, fieldId, ...props }, ref) => {
    return (
      <input
        type={type}
        name={fieldId}
        className={cn(
          "flex px-3 py-4 w-full rounded-md border border-searchInputBorder bg-foreground text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:ring-0 focus:outline-none",
          {
            "bg-disable cursor-not-allowed": disabled,
          },
          className,
        )}
        value={value}
        onChange={onChange || (() => {})}
        ref={ref}
        {...props}
        disabled={disabled}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
