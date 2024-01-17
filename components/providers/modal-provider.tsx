"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const CardModal = dynamic(() => import('@/components/modals/card-modals').then((mod) => mod.CardModal));
const ProModal = dynamic(() => import('@/components/modals/pro-modal').then((mod) => mod.ProModal));

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