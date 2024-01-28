import { auth } from "@clerk/nextjs";
import { Navbar } from "./_components/navbar";
// import dynamic from "next/dynamic";

// const Navbar = dynamic(() => import("./_components/navbar").then((mod) => mod.Navbar));

const DashboardLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {
    const { userId } = await auth();
    
    return (
        <div className="h-full">
            <Navbar userId={userId!}/>
            {children}
        </div>
    )
}

export default DashboardLayout;