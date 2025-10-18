import {ReactNode, Suspense} from "react";
import AuthProvider from "@/provider/AuthProvider";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/navbar/dashboard/app-sidebar";
import {SiteHeader} from "@/components/navbar/dashboard/site-header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
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
                                    <Suspense>
                                        <section className="w-full flex justify-center">
                                            <main className="container max-w-4xl flex flex-col gap-6">
                                                {children}
                                            </main>
                                        </section>
                                    </Suspense>
                                </div>
                            </div>
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </AuthProvider>
    );
}
