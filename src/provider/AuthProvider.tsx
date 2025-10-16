"use client"

import {ReactNode} from "react";
import {useRouter} from "next/navigation";
import {useAuthStore} from "@/store/useAuthStore";
import {toast} from "sonner";

export default function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const store = useAuthStore();

    if (!store.isAuthenticated()) {
        router.push("/connexion");
        toast.error("Vous êtes actuellement hors ligne")
        return null;
    }

    return (
        <>
            {children}
        </>
    )
}