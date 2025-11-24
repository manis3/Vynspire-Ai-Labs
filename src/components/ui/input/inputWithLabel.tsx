import { Input } from "@/components/ui/input";
import cn from "@/utils/cn";
import { FormFieldGroup } from "../form";
import { IInputWithLabelClassName } from "./types/input.types";

export function InputWithLabel({
  title,
  disabled,
  name,
  wrapperClassName,
  titleClassName,
  value,
  onChange,
  className,
  placeholder,
  type,
}: IInputWithLabelClassName) {
  return (
    <FormFieldGroup
      title={title}
      wrapperClassName={wrapperClassName}
      labelClassName={titleClassName}
    >
      <Input
        value={value ?? ""}
        type={type}
        onChange={onChange}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        className={cn(
          "text-base leading-5 font-roboto py-[13px]",
          {
            "text-text-disable": disabled,
          },
          className,
        )}
      />
    </FormFieldGroup>
  );
}
