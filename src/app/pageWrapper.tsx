import React, { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full max-h-screen overflow-scroll scrollbar-none bg-background text-text-Primary font-roboto">
      {children}
    </div>
  );
}
