"use client";

import useGetAllPraticienListing from "@/query/useGetAllPraticienListing";
import LeafletMap from "@/components/blocks-dashboard/carte/LeatfletMap";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {ChevronRight, Loader2, MapPin, User} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
    const { data = [], isLoading, isError } = useGetAllPraticienListing();
    const [page, setPage] = useState(1);
    const pageSize = 6;

    const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);
    const totalPages = Math.ceil(data.length / pageSize);

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <span className="ml-2 text-gray-500">Chargement des praticiens...</span>
            </div>
        );

    if (isError)
        return (
            <div className="text-center py-10 text-red-500">
                Erreur lors du chargement des praticiens 😔
            </div>
        );

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col gap-4">
                <div className="bg-muted rounded-lg shadow-md p-4">
                    <h1 className="text-2xl font-semibold mb-2">Carte des praticiens</h1>
                    <p className="text-gray-500 text-sm mb-4">
                        Visualisez les praticiens proches de chez vous sur la carte.
                    </p>
                    {/* Carte Leaflet */}
                    {/* @ts-ignore */}
                    <LeafletMap praticiens={data} />
                </div>

                <Separator className="my-4" />

                <div>
                    <h2 className="text-xl font-semibold mb-4">Liste des praticiens</h2>

                    {paginatedData.length === 0 ? (
                        <div className="text-center text-gray-500 italic">
                            Aucun praticien trouvé.
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {paginatedData.map((p: any) => (
                                <Card className="hover:bg-accent/50 transition-colors" key={p.id}>
                                    <CardHeader>
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="space-y-1 flex-1">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                                    <User className="w-3.5 h-3.5" />
                                                    <span>Dr {p.lastname} {p.firstname}</span>
                                                </div>
                                                <CardTitle className="text-xl">
                                                    {p.title || "Praticien"}
                                                </CardTitle>
                                                <CardDescription className="line-clamp-2">
                                                    {p.description || "Aucune description disponible"}
                                                </CardDescription>
                                            </div>
                                            <Link href={`/dashboard/praticien/${p.id}`}>
                                                <Button variant="ghost" size="icon" className="shrink-0">
                                                    <ChevronRight className="w-5 h-5" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="space-y-3">
                                        <Separator />
                                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                            <MapPin className="w-4 h-4" />
                                            <span>{p.city}</span>
                                            {p.address && (
                                                <>
                                                    <span>•</span>
                                                    <span className="line-clamp-1">{p.address}</span>
                                                </>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-6">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                            >
                                Précédent
                            </Button>
                            <span className="text-sm text-gray-500">
                Page {page} sur {totalPages}
              </span>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === totalPages}
                                onClick={() => setPage(page + 1)}
                            >
                                Suivant
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
