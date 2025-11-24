import cn from "@/utils/cn";
import { Input } from "./default";
import { IInputWithErrorMessageProps } from "./types/input.types";

export function InputWithErrorMessage({
  label,
  type,
  name,
  error,
  register,
  placeholder,
  valueAsNumber,
  className,
  labelClassName,
  disabled,
  ...props
}: IInputWithErrorMessageProps) {
  return (
    <div
      className={cn(
        "w-full flex flex-col items-start font-roboto justify-start gap-2",
        className,
      )}
    >
      <span className={cn("font-medium text-sm font-roboto", labelClassName)}>
        {label}
      </span>
      <Input
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
        {...props}
        className={cn(
          "text-base leading-5 font-roboto focus:outline-none focus:ring-0 ",
          {
            "border border-border-error focus:ring-0 focus:outline-none": error,
          },
        )}
        disabled={disabled}
      />
      {error && <p className="text-error text-sm mt-1">{error.message}</p>}
    </div>
  );
}
