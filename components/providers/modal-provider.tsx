"use client";

import { useEffect, useState } from "react";

import { CardModal } from "@/components/modals/card-modals";
import { ProModal } from "@/components/modals/pro-modal";

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CardModal />
        {children}
      <ProModal />
    </>
  )
}