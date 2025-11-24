"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import cn from "@/utils/cn";
import { IModalProps } from "./types/modal.types";

export function Modal({
  isOpen,
  closeModal,
  className,
  children,
  title,
  titleClassName,
}: IModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40" />

      <DialogContent
        className={cn(
          "sm:max-w-[425px] bg-white border border-border-snowFlake rounded-[20px] px-0 z-50",
          className,
        )}
      >
        <DialogHeader>
          {title && (
            <DialogTitle
              className={cn(
                "border-b border-border-snowFlake pb-4 px-5",
                titleClassName,
              )}
            >
              {title}
            </DialogTitle>
          )}
          <DialogDescription asChild>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
