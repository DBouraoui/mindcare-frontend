"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PraticienModel } from "@/api/models/Praticien-model";
import Link from "next/link";
import { MapPin, ArrowRight, User } from "lucide-react";

interface DisplayRechercheProps {
    data: PraticienModel[];
}

export default function DisplayRecherche({ data }: DisplayRechercheProps) {
    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center mt-16 space-y-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <User className="w-10 h-10 text-primary/40" />
                </div>
                <p className="text-center text-muted-foreground text-lg">Aucun praticien trouvé.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 max-w-5xl mx-auto px-4">
            {data.map((praticien, index) => (
                <Card
                    key={praticien.id}
                    className="group relative hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden border-2 hover:border-primary/20 bg-gradient-to-br from-background to-muted/20"
                    style={{
                        animationDelay: `${index * 100}ms`,
                        animation: "fadeInUp 0.6s ease-out forwards",
                        opacity: 0
                    }}
                >
                    {/* Gradient accent */}
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary via-primary/60 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="flex flex-col md:flex-row">
                        {/* Avatar section */}
                        <div className="hidden md:flex w-32 bg-gradient-to-br from-primary/10 via-primary/5 to-background flex-shrink-0 items-center justify-center relative overflow-hidden">

                            <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                                {praticien.title.charAt(0).toUpperCase()}
                            </div>
                        </div>

                        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                            <div className="space-y-4">
                                <CardHeader className="p-0">
                                    <div className="flex items-start justify-between gap-4">
                                        <CardTitle className="text-2xl md:text-3xl font-bold line-clamp-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                                            {praticien.title}
                                        </CardTitle>
                                        {/* Badge mobile avatar */}
                                        <div className="md:hidden w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
                                            {praticien.title.charAt(0).toUpperCase()}
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-0 space-y-3">
                                    <p className="text-sm md:text-base text-muted-foreground line-clamp-3 leading-relaxed">
                                        {praticien.description}
                                    </p>

                                  <div className="flex md:flex-row flex-col gap-2">
                                      <Badge
                                          variant="secondary"
                                          className="w-fit flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-primary/10 hover:bg-primary/20 transition-colors"
                                      >
                                          <MapPin className="w-3.5 h-3.5" />
                                          {praticien.city}
                                      </Badge>
                                      <Badge
                                          variant="secondary"
                                          className="w-fit flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-primary/10 hover:bg-primary/20 transition-colors"
                                      >
                                          <MapPin className="w-3.5 h-3.5" />
                                          {praticien.address}
                                      </Badge>
                                  </div>
                                </CardContent>
                            </div>

                            <div className="mt-6 flex items-center gap-3">
                                <Link href={`/dashboard/praticien/${praticien.id}`} className="flex-1 md:flex-initial">
                                    <Button
                                        className="w-full cursor-pointer md:w-auto group/btn relative overflow-hidden px-6 py-5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                        size="lg"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            Voir le profil
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}