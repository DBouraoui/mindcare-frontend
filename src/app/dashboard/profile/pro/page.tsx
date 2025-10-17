import AuthProvider from "@/provider/AuthProvider";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/navbar/dashboard/app-sidebar";
import {SiteHeader} from "@/components/navbar/dashboard/site-header";
import ProfileProPage from "@/components/blocks-dashboard/profile/pro/Profile-pro-page";

export default function Home() {
    return (
        <>
            <AuthProvider>
                <SidebarProvider
                    style={
                        {
                            "--sidebar-width": "calc(var(--spacing) * 72)",
                            "--header-height": "calc(var(--spacing) * 12)",
                        } as React.CSSProperties
                    }
                >
                    <AppSidebar variant="inset" />
                    <SidebarInset>
                        <SiteHeader />
                        <div className="flex flex-1 flex-col">
                            <div className="@container/main flex flex-1 flex-col gap-2">
                                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                    <ProfileProPage />
                                </div>
                            </div>
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </AuthProvider>
        </>
    )
}