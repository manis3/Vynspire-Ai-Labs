import { useState } from "react";

export default function useDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    setIsOpen,
    openModal,
    closeModal,
  };
}
