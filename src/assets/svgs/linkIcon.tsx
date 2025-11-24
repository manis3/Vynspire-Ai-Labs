import { ComponentProps } from "react";

export function LinkIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10 13a5 5 0 0 1 7.07 0l3.53 3.53a5 5 0 0 1-7.07 7.07l-3.53-3.53a5 5 0 0 1 0-7.07z" />
      <line x1="8" y1="8" x2="16" y2="16" />
    </svg>
  );
}
