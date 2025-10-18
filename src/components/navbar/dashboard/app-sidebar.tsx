"use client"

import * as React from "react"
import {
    IconClockHour9Filled,
    IconDashboard,
    IconDatabase,
    IconInnerShadowTop, IconSearch,
    IconUserDollar,
} from "@tabler/icons-react"

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
import useGetUserInformations from "@/query/useGetUserInformations";
import Link from "next/link";
import {Star} from "lucide-react";


export  function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const {data, isLoading, isError} = useGetUserInformations();

    if (isLoading || !data) {
        return(
        <>
        </>
        )
    }

    if (isError) {

        return (
            <p></p>
        )
    }

    const data_navbar = {
        user: {
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            city: data.city,
            phone: data.phone,
            isPro: data.isPro,
            avatar: "/avatars/shadcn.jpg",
        },
        navMain: [
            {
                title: "Dashboard",
                url: "/dashboard",
                icon: IconDashboard,
            },
            {
                title: "Rechercher un praticien",
                url: "/dashboard/recherche",
                icon: IconSearch,
            },
            {
                title: "Mes favoris",
                url: "/dashboard/favoris",
                icon: Star,
            }
        ],
        documents: [
            {
                name: "Data Library",
                url: "#",
                icon: IconDatabase,
            },
        ],
        navSecondary: [
            {
                title: "Mes informations PRO",
                url: "/dashboard/profile/pro",
                icon: IconUserDollar,
            },
            {
                title: "Mes horraires d'ouverture",
                url: "/dashboard/horraires",
                icon: IconClockHour9Filled,
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
                            <Link href={'/dashboard'}>
                                <IconInnerShadowTop className="!size-5" />
                                <span className="text-base font-semibold">Mindcare</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data_navbar.navMain} />
                {data.isPro && (
                <NavSecondary items={data_navbar.navSecondary} className="mt-auto" />
                )}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data_navbar.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
