"use client"

import * as React from "react"
import {
    IconCamera,
    IconChartBar,
    IconDashboard,
    IconDatabase,
    IconFileAi,
    IconFileDescription,
    IconFileWord,
    IconFolder,
    IconHelp,
    IconInnerShadowTop,
    IconListDetails,
    IconReport,
    IconSearch,
    IconSettings,
    IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/navbar/dashboard/nav-documents"
import { NavMain } from "@/components/navbar/dashboard/nav-main"
import { NavSecondary } from "@/components/navbar/dashboard/nav-secondary"
import { NavUser } from "@/components/navbar/dashboard/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {useAuthStore} from "@/store/useAuthStore";


export  function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = useAuthStore((state) => state.user)
    const store = useAuthStore()

    if (!user) {
        return null;
    }

    const data = {
        user: {
            name: store.getName(),
            email: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            city: user.city,
            phone: user.phone,
            avatar: "/avatars/shadcn.jpg",
        },
        navMain: [
            {
                title: "Dashboard",
                url: "#",
                icon: IconDashboard,
            },
            {
                title: "Lifecycle",
                url: "#",
                icon: IconListDetails,
            },
            {
                title: "Analytics",
                url: "#",
                icon: IconChartBar,
            },
            {
                title: "Projects",
                url: "#",
                icon: IconFolder,
            },
            {
                title: "Team",
                url: "#",
                icon: IconUsers,
            },
        ],
        navClouds: [
            {
                title: "Capture",
                icon: IconCamera,
                isActive: true,
                url: "#",
                items: [
                    {
                        title: "Active Proposals",
                        url: "#",
                    },
                    {
                        title: "Archived",
                        url: "#",
                    },
                ],
            },
            {
                title: "Proposal",
                icon: IconFileDescription,
                url: "#",
                items: [
                    {
                        title: "Active Proposals",
                        url: "#",
                    },
                    {
                        title: "Archived",
                        url: "#",
                    },
                ],
            },
            {
                title: "Prompts",
                icon: IconFileAi,
                url: "#",
                items: [
                    {
                        title: "Active Proposals",
                        url: "#",
                    },
                    {
                        title: "Archived",
                        url: "#",
                    },
                ],
            },
        ],
        navSecondary: [
            {
                title: "Settings",
                url: "#",
                icon: IconSettings,
            },
            {
                title: "Get Help",
                url: "#",
                icon: IconHelp,
            },
            {
                title: "Search",
                url: "#",
                icon: IconSearch,
            },
        ],
        documents: [
            {
                name: "Data Library",
                url: "#",
                icon: IconDatabase,
            },
            {
                name: "Reports",
                url: "#",
                icon: IconReport,
            },
            {
                name: "Word Assistant",
                url: "#",
                icon: IconFileWord,
            },
        ],
    }

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <a href="#">
                                <IconInnerShadowTop className="!size-5" />
                                <span className="text-base font-semibold">Mindcare</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavDocuments items={data.documents} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
