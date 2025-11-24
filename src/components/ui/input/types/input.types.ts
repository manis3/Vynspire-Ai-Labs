import { FieldError, UseFormRegister } from "react-hook-form";

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  fieldId?: string;
  value?: string | number | readonly string[];
}

export interface IInputWithErrorMessageProps
  extends React.ComponentProps<"input"> {
  label: string;
  type: string;
  placeholder?: string;
  name?: any;
  register: UseFormRegister<any>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
}

export type InputType = "text" | "password" | "number";

export interface IInputWithLabelClassName
  extends React.ComponentProps<"input"> {
  inputWithLabelClassName?: string;
  lableClassName?: string;
  title: string;
  wrapperClassName?: string;
  titleClassName?: string;
  className?: string;
  placeholder?: string;
  type?: InputType;
}
