import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("./_components/navbar").then((mod) => mod.Navbar));


const DashboardLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-full">
            <Navbar />
            {children}
        </div>
    )
}

export default DashboardLayout;