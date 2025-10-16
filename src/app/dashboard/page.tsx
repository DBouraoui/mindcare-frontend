import { AppSidebar } from "@/components/navbar/dashboard/app-sidebar"
import { SiteHeader } from "@/components/navbar/dashboard/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import AuthProvider from "@/provider/AuthProvider";


export default function Page() {
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
                           </div>
                       </div>
                   </div>
               </SidebarInset>
           </SidebarProvider>
       </AuthProvider>
    )
}
