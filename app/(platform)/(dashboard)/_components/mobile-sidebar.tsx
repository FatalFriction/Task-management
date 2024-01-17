"use client";

import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";

import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("./sidebar").then((mod) => mod.Sidebar));
const Sheet = dynamic(() => import("@/components/ui/sheet").then((mod) => mod.Sheet));
const SheetContent = dynamic(() => import("@/components/ui/sheet").then((mod) => mod.SheetContent));
const Button = dynamic(() => import("@/components/ui/button").then((mod) => mod.Button));

export const MobileSidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  const isOpen = useMobileSidebar((state) => state.isOpen);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button
        onClick={onOpen}
        className="block md:hidden mr-2"
        variant="ghost"
        size="sm"
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          side="left"
          className="p-2 pt-10"
        >
          <Sidebar
            storageKey="t-sidebar-mobile-state"
          />
        </SheetContent>
      </Sheet>
    </>
  )
}