"use client";

import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import cn from "@/utils/cn";
import { SortingArrowDown } from "@/assets/svgs";
import { ButtonWithDropdownIcon } from "../button";

interface DropdownProps {
  options: string[];
  selectedFilter?: string | null;
  onSelect: (value: string) => void;
  isCaseStatusFilter?: boolean;
  disabled?: boolean;
  dropdownTriggerClassName?: string;
  isDisabledFirstItem?: boolean;
}

const Dropdown = React.forwardRef<HTMLButtonElement, DropdownProps>(
  (
    {
      options,
      onSelect,
      selectedFilter,
      dropdownTriggerClassName,
      disabled,
      isDisabledFirstItem,
    },
    ref,
  ) => {
    const selectedFilterValue = selectedFilter?.split(",");
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          ref={ref}
          className={cn(
            "flex items-center justify-center  rounded-md bg-white shadow-sm hover:bg-gray-200 focus:outline-none",
            dropdownTriggerClassName,
          )}
          disabled={disabled}
        >
          <ButtonWithDropdownIcon
            icon={<SortingArrowDown />}
            buttonClassName="px-3"
          >
            {selectedFilter}
          </ButtonWithDropdownIcon>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="start"
            className={cn(
              "min-w-[150px] mt-2 rounded-md bg-white shadow-lg max-h-[300px] overflow-y-auto scrollbar-none",
              "p-1 text-sm text-gray-700",
            )}
          >
            {options.map((option, index) => (
              <DropdownMenu.Item
                disabled={isDisabledFirstItem && index === 0}
                key={option}
                className={cn(
                  "cursor-pointer select-none rounded-md px-3 py-2 bg-transparent font-roboto ring-0 focus:outline-none",
                  {
                    "bg-foreground hover:rounded-none":
                      selectedFilterValue?.includes(option),
                    "hover:bg-foreground": !isDisabledFirstItem || index !== 0,
                    "text-gray-400 cursor-not-allowed":
                      isDisabledFirstItem && index === 0,
                  },
                )}
                onClick={() => {
                  if (!(isDisabledFirstItem && index === 0)) {
                    onSelect(option);
                  }
                }}
              >
                {option}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  },
);

Dropdown.displayName = "Dropdown";

export default Dropdown;
