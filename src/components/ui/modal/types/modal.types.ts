import { ReactNode } from "react";

export interface IModalProps {
  title?: string | ReactNode;
  children: ReactNode;
  titleClassName?: string;
  className?: string;
  isOpen: boolean;
  closeModal: () => void;
}
