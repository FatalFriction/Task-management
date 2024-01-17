import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";

import dynamic from "next/dynamic";
import { Toaster } from "sonner";

const ClerkProvider = dynamic(() => import('@clerk/nextjs').then((mod) => mod.ClerkProvider));

const platformLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <ClerkProvider>
            <QueryProvider>
                <Toaster />
                <ModalProvider>
                    {children}
                </ModalProvider>
            </QueryProvider>
        </ClerkProvider>
    )
}

export default platformLayout