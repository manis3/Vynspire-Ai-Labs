import cn from "@/utils/cn";
import { IFormFieldGroup } from "./types/form.types";

export function FormFieldGroup({
  wrapperClassName,
  labelClassName,
  title,
  children,
}: IFormFieldGroup) {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-center gap-y-[8px]",
        wrapperClassName,
      )}
    >
      <span
        className={cn(
          "text-text-labelGray font-medium font-roboto leading-6 text-base",
          labelClassName,
        )}
      >
        {title}
      </span>
      {children}
    </div>
  );
}
