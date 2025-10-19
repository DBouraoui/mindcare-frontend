"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PraticienModel } from "@/api/models/Praticien-model";
import Link from "next/link";
import {MapPin, User, Eye} from "lucide-react";
import DisplayMapPraticien from "@/components/blocks-dashboard/praticien/DIsplay-map-praticien";

interface DisplayRechercheProps {
    data: PraticienModel[];
}

export default function DisplayRecherche({ data }: DisplayRechercheProps) {
    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <User className="w-12 h-12 text-muted-foreground mb-3" />
                <p className="text-muted-foreground">Aucun praticien trouvé</p>
            </div>
        );
    }

    return (
        <div className="space-y-4 max-w-4xl mx-auto">
            {data.map((praticien) => (
                <Card key={praticien.id} className="hover:bg-accent/50 transition-colors">
                    <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1 flex-1">
                                <CardTitle className="text-xl">{praticien.title}</CardTitle>
                                <CardDescription className="line-clamp-2">
                                    {praticien.description}
                                </CardDescription>
                                <p className="text-xs text-foreground underline underline-offset-2">Dr {praticien.lastname} {praticien.firstname}</p>
                            </div>
                            <Link href={`/dashboard/praticien/${praticien.id}`}>
                                <Button variant="ghost" size="sm" className="shrink-0 cursor-pointer">
                                    <Eye className="w-10 h-10" />
                                    Voir plus
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        <Separator />
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4" />
                                <span>{praticien.city}</span>
                            </div>
                            <span>•</span>
                            <span className="line-clamp-1">{praticien.address}</span>

                            <DisplayMapPraticien praticien={praticien} />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}