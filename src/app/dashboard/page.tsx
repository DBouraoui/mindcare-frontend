"use client";

import AuthRoutes from "@/provider/AuthRoutes"
import {useAuthStore} from "@/store/useAuthStore";

export default function Dashboard() {
    const user = useAuthStore((s) => s.user);

    if (!user) return null;

    const email = user.username;
    const roles = user.roles;
    const isAdmin = roles.includes("ROLE_ADMIN");
    const isPro = roles.includes("ROLE_PRO");

    return (
        <AuthRoutes>
            <div className="p-6">
                <h1 className="text-2xl font-semibold">Bienvenue {email}</h1>

                <p className="text-gray-600">Vos rôles : {roles.join(", ")}</p>

                <section className="mt-6">
                    <h2 className="text-lg font-medium mb-2">Section commune</h2>
                    <p>Contenu visible pour tous les utilisateurs.</p>
                </section>

                {isPro && (
                    <section className="mt-6 bg-blue-50 p-4 rounded">
                        <h2 className="font-medium text-blue-700">Section PRO</h2>
                        <p>Visible uniquement pour les utilisateurs PRO.</p>
                    </section>
                )}

                {isAdmin && (
                    <section className="mt-6 bg-red-50 p-4 rounded">
                        <h2 className="font-medium text-red-700">Section ADMIN</h2>
                        <p>Visible uniquement pour les administrateurs.</p>
                    </section>
                )}
            </div>
        </AuthRoutes>
    );
}
