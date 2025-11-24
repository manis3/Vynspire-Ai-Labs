import cn from "@/utils/cn";
import { Loader } from "../loader";
import { Button } from "./default";
import { IButtonWithLoaderProps } from "./types/buttonWithLoader";

export function ButtonWithLoader({
  buttonWithLoaderClassName,
  loading,
  children,
  onClick,
  disabled,
  variant,
  size,
}: IButtonWithLoaderProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        {
          "opacity-50 cursor-not-allowed": disabled,
        },
        buttonWithLoaderClassName,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <div
        className={cn("block", {
          hidden: !loading,
        })}
      >
        <Loader />
      </div>
      <p
        className={cn("block", {
          hidden: loading,
        })}
      >
        {children}
      </p>
    </Button>
  );
}
