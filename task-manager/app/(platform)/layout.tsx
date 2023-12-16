import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const platformLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <ClerkProvider>
            <Toaster />
            {children}
        </ClerkProvider>
    )
}

export default platformLayout