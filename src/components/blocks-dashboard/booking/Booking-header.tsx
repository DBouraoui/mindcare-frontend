"use client";

import { CalendarDays } from "lucide-react";
import { Separator } from "@/components/ui/separator";


export default function BookingHeader() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <CalendarDays className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Mes réservations
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Retrouvez ici l’ensemble de vos rendez-vous à venir et passés.
                        </p>
                    </div>
                </div>
            </div>

            <Separator />
        </div>
    );
}
