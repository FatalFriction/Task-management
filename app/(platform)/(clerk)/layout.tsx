
const clerkLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="flex h-full items-center justify-center">
        <link rel="preconnect" href="https://img.clerk.com" />
            {children}
        </div>
    )
}

export default clerkLayout