"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import useGetPraticienListing from "@/query/usePraticienListing";
import DisplayRecherche from "@/components/blocks-dashboard/recherche/Display-recherche";

export default function Page() {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 500);

        return () => clearTimeout(handler);
    }, [searchTerm]);

    const { data, isError, isLoading } = useGetPraticienListing(debouncedTerm);

    return (
        <>
            <header className="border-b">
                <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">MindCare</h1>
                        <p className="text-muted-foreground">
                            Trouvez le praticien qui vous correspond
                        </p>
                    </div>

                    <div className="flex gap-2 max-w-xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Rechercher par ville, spécialité, diplôme..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                    </div>
                </div>
            </header>

            <main className="w-full mx-auto mt-10 px-4">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent mb-4" />
                        <p>Chargement des praticiens...</p>
                    </div>
                )}

                {isError && (
                    <div className="text-center text-red-500 bg-red-50 border border-red-200 p-4 rounded-lg">
                        <p>Une erreur est survenue lors du chargement des praticiens.</p>
                    </div>
                )}

                {!debouncedTerm && !isLoading && !isError && (
                    <div className="text-center text-muted-foreground py-12 space-y-2">
                        <p className="text-lg font-medium">🔍 Recherchez un praticien</p>
                        <p className="text-sm text-muted-foreground">
                            Saisissez le nom d’un praticien, une spécialité ou une ville pour commencer.
                        </p>
                    </div>
                )}

                {data && data.length > 0 ? (
                <DisplayRecherche data={data} />
                ) : (
                    debouncedTerm &&
                    !isLoading && (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>
                                Aucun praticien trouvé pour <span className="font-medium text-foreground">"{debouncedTerm}"</span>.
                            </p>
                        </div>
                    )
                )}
            </main>

        </>
    );
}
