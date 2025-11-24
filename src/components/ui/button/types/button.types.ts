import { ReactNode } from "react";
import { IButtonSize } from "../default";

export interface IButtonWithLoaderProps extends React.ComponentProps<"button"> {
  children: ReactNode;
  buttonWithLoaderClassName?: string;
  loading?: boolean;
  variant?: "link" | "default" | "outline" | "secondary" | "ghost" | null;
  size?: IButtonSize;
  buttonTextClassName?: string;
}
