import React, { ReactNode } from "react";
import cn from "@/utils/cn";

export function ButtonWithDropdownIcon({
  children,
  buttonClassName,
  iconClassName,
  icon,
}: {
  children: ReactNode;
  buttonClassName?: string;
  iconClassName?: string;
  icon: ReactNode;
}) {
  return (
    <>
      <p
        className={cn(
          "bg-transparent shadow-none flex items-center justify-between p-2 w-[200px] text-text-darkStaleGray text-sm font-medium [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          buttonClassName,
        )}
      >
        {children}

        <span className={cn(iconClassName)}>{icon}</span>
      </p>
    </>
  );
}
