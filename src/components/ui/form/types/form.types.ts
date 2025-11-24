import { ReactNode } from "react";

export interface IFormWrapperProps {
  colorScheme?: "primary" | "secondary" | null;
  padding?: "16px" | "18px" | "20px" | null;
  border?: "none" | "border" | null;
  borderRadius?: "none" | "md" | "xl" | "10px" | "sm" | "lg" | "full" | null;
  className?: string;
  titleClassName?: string;
  title?: string;
  children: ReactNode;
}

export interface IFormFieldGroup {
  wrapperClassName?: string;
  labelClassName?: string;
  title: string;
  children: ReactNode;
}
