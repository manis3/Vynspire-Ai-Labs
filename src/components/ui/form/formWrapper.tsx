import Card from "../card/default";
import cn from "@/utils/cn";
import { IFormWrapperProps } from "./types/form.types";

export default function FormWrapper({
  title,
  children,
  colorScheme = "primary",
  padding = "20px",
  border = "border",
  borderRadius = "lg",
  className,
  titleClassName,
}: IFormWrapperProps) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card
        colorScheme={colorScheme}
        padding={padding}
        border={border}
        borderRadius={borderRadius}
        className={cn(
          "inline-flex mx-auto text-text-Primary flex-col gap-4",
          className,
        )}
      >
        <div
          className={cn(
            "text-2xl font-bold mx-auto font-roboto",
            titleClassName,
          )}
        >
          {title}
        </div>

        {children}
      </Card>
    </div>
  );
}
