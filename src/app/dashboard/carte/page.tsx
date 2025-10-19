"use client";

import useGetAllPraticienListing from "@/query/useGetAllPraticienListing";
import LeafletMap from "@/components/blocks-dashboard/carte/LeatfletMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2, MapPin } from "lucide-react";
import { useState } from "react";

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
                                <Card key={p.id} className="hover:shadow-lg transition-all">
                                    <CardHeader>
                                        <CardTitle className="text-lg font-semibold flex items-center justify-between">
                                            {p.title ?? "Praticien"}
                                            <MapPin className="w-4 h-4 text-primary opacity-70" />
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm text-gray-600">
                                        <p className="mb-1">{p.description ?? "Aucune description"}</p>
                                        <p className="text-gray-500">
                                            {p.address}, {p.city}
                                        </p>
                                        <div className="mt-3 flex justify-end">
                                            <Button
                                                className="cursor-pointer"
                                                size="sm"
                                                onClick={() => window.location.href = `/dashboard/praticien/${p.id}`}
                                            >
                                                Voir le profil
                                            </Button>
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
