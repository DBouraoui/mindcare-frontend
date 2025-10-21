"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Stethoscope, Calendar, TrendingUp } from "lucide-react";

const stats = [
    {
        icon: Users,
        label: "Utilisateurs actifs",
        value: "2,847",
        growth: "+12%",
        subtitle: "ce mois-ci",
        color: "bg-blue-500/10 text-blue-500"
    },
    {
        icon: Stethoscope,
        label: "Praticiens inscrits",
        value: "156",
        growth: "+8%",
        subtitle: "depuis le lancement",
        color: "bg-green-500/10 text-green-500"
    },
    {
        icon: Calendar,
        label: "Consultations réalisées",
        value: "4,293",
        growth: "+18%",
        subtitle: "sur 6 mois",
        color: "bg-purple-500/10 text-purple-500"
    },
    {
        icon: TrendingUp,
        label: "Taux de satisfaction",
        value: "94%",
        growth: "+3%",
        subtitle: "basé sur 1.2k avis",
        color: "bg-orange-500/10 text-orange-500"
    }
];

export default function Stats() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">Nos chiffres</h2>
                    <p className="text-sm text-muted-foreground">6 mois d'activité</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                    Mis à jour aujourd'hui
                </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index} className="border-0 shadow-sm bg-gradient-to-br from-card to-muted/20 hover:shadow-md transition-shadow">
                            <CardContent className="p-5 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className={`p-2.5 rounded-lg ${stat.color}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <Badge variant="secondary" className="text-xs font-semibold">
                                        {stat.growth}
                                    </Badge>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-3xl font-bold tracking-tight">
                                        {stat.value}
                                    </p>
                                    <p className="text-sm font-medium text-foreground">
                                        {stat.label}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {stat.subtitle}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}