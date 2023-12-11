import { ClerkProvider } from "@clerk/nextjs";

const platformLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <ClerkProvider>
            {children}
        </ClerkProvider>
    )
}

export default platformLayout