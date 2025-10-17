"use client"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import {EllipsisVertical, LogOut, UserCircle} from "lucide-react";
import {useAuthStore} from "@/store/useAuthStore";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import Notification from "@/components/ui/Notification";

export function NavUser({
                            user,
                        }: {
    user: {
        firstname: string;
        lastname: string;
        city: string;
        phone: string;
        email: string;
        isPro: boolean;
        avatar: string;
    }
}) {
    const { isMobile } = useSidebar()
    const authStore = useAuthStore()
    const router = useRouter();

    function handleLogOut() {
        authStore.logout();
        toast.warning("Vous êtes actuellement déconnecter");
        document.cookie = "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/connexion");
    }

    function handleProfile() {
        router.push("/dashboard/profile");
    }

    function handleProfilePro() {
        router.push("/dashboard/profile/pro");
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg grayscale">
                                <AvatarImage src={user.avatar} alt={user.firstname} />
                                <AvatarFallback className="rounded-lg">{user.firstname}</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{user.lastname} {user.firstname}</span>
                                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
                            </div>
                            <EllipsisVertical className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.avatar} alt={user.firstname} />
                                    <AvatarFallback className="rounded-lg">{user.lastname.split("",1)}{user.firstname.split("",1)}</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{user.lastname} {user.firstname}</span>
                                    <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            {user.isPro && (
                                <DropdownMenuItem onClick={handleProfilePro}>
                                    <UserCircle />
                                   Mes informations PRO
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={handleProfile}>
                                <UserCircle />
                                Mon profile
                            </DropdownMenuItem>
                            <DropdownMenuItem  asChild>
                                <Notification  />
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogOut}>
                            <LogOut />
                            Déconnexion
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
