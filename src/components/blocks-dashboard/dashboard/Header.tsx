"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function Header() {
    const today = new Date();

    return (
        <Card className="border-0 shadow-none bg-gradient-to-br from-primary/5 via-background to-background">
            <div className="p-6 space-y-3">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                        <h1 className="text-2xl font-bold tracking-tight">
                            Tableau de bord
                        </h1>
                        <p className="text-muted-foreground text-sm max-w-2xl">
                            Gérez vos rendez-vous et praticiens en toute simplicité
                        </p>
                    </div>

                    <Badge variant="secondary" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {format(today, "dd MMMM yyyy", { locale: fr })}
                    </Badge>
                </div>
            </div>
        </Card>
    );
}