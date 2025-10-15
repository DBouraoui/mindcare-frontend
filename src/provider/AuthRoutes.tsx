"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {useAuthStore} from "@/store/useAuthStore";

export default function AuthRoutes({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.replace("/login");
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated()) {
        return <div className="p-6 text-center">Redirection...</div>;
    }

    return <>{children}</>;
}
