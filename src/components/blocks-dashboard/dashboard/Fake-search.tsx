"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Stethoscope } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FakeSearch() {
    const router = useRouter();

    const handleSearchClick = () => {
        router.replace('/dashboard/recherche');
    };

    return (
        <Card className="border-2 border-dashed border-primary/20 bg-primary/5 hover:border-primary/40 transition-colors">
            <CardContent className="p-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Search className="w-5 h-5 text-primary" />
                        <h2 className="font-semibold">Recherche rapide</h2>
                    </div>

                    <div
                        onClick={handleSearchClick}
                        className="flex items-center gap-3 p-4 bg-background rounded-lg border-2 cursor-pointer hover:border-primary/50 transition-all group"
                    >
                        <Search className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-muted-foreground text-sm flex-1">
                            Rechercher un praticien, une spécialité...
                        </span>
                        <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={handleSearchClick}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full bg-background border hover:bg-accent transition-colors"
                        >
                            <MapPin className="w-3 h-3" />
                            Près de chez moi
                        </button>
                        <button
                            onClick={handleSearchClick}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full bg-background border hover:bg-accent transition-colors"
                        >
                            <Stethoscope className="w-3 h-3" />
                            Psychologue
                        </button>
                        <button
                            onClick={handleSearchClick}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full bg-background border hover:bg-accent transition-colors"
                        >
                            <Stethoscope className="w-3 h-3" />
                            Psychiatre
                        </button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}