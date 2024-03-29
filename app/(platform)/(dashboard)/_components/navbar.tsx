import { Logo } from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { Plus } from "lucide-react"
import { MobileSidebar } from "./mobile-sidebar"
import { FormPopover } from "@/components/form/form-popover"
import { NotificationCard } from "@/components/notification-card"

export const Navbar = ({ userId }: { userId: string }) => {
    return (
        <nav className="fixed z-50 top-0 w-full px-4 h-14 border-b shadow-sm bg-white flex items-center">
            <MobileSidebar />
            <div className="flex items-center gap-x-4">
                <div className="hidden md:flex">
                    <Logo />
                </div>
                <FormPopover align="start" side="bottom" sideOffset={18}>
                    <Button variant="primary" size="sm" className="rounded-sm hidden md:block h-auto py-1.5 px-2">
                        Create
                    </Button>
                </FormPopover>
                {/* <FormPopover>
                    <Button variant="primary" size="sm" className="rounded-sm hidden md:hidden h-auto py-1.5 px-2">
                        <Plus className="h-4 w-4"/>
                    </Button>
                </FormPopover> */}
            </div>
            <div className="lg:ml-auto flex items-center gap-x-4">
                <NotificationCard ids={userId} className="relative translate-y-[54%] border-gray-950"/>
                <OrganizationSwitcher
                    hidePersonal
                    afterCreateOrganizationUrl="/organization/:id"
                    afterLeaveOrganizationUrl="/select-org"
                    afterSelectOrganizationUrl="/organization/:id"
                    appearance={{
                        elements: {
                            rootBox: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            },
                        },
                    }}
                />
                <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: {
                                width: 30,
                                height: 30,
                            }
                        }
                    }}
                />
            </div>
        </nav>
    )
}