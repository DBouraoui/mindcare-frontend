"use client";

import { useAuthStore } from "@/store/useAuthStore";
import {Button} from "@/components/ui/button";

export default function Home() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

        if (!user) {
            return null;
        }


    const email = user.username;
    const roles = user.roles;
    const isAdmin = roles.includes("ROLE_ADMIN");
    const isPro = roles.includes("ROLE_PRO");

    return (
                <div className="p-6">
                    <Button onClick={()=>logout()}>Deconnexion</Button>
                    <h1 className="text-2xl font-semibold">Bienvenue {email}</h1>
                    <p className="text-gray-600">Vos rôles : {roles.join(", ")}</p>
                    {/* ... reste du contenu ... */}
                </div>
    );
}
