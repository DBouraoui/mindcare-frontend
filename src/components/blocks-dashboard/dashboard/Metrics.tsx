"use client";

import useGetDashboardInformation from "@/query/useGetDashboardInformation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2, CalendarDays, History, Heart, Mail } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import MutationCreateNewsletter from "@/mutation/mutationCreateNewsletter";

export default function Metrics() {
    const { data, isLoading, isError } = useGetDashboardInformation();
    const router = useRouter();
    const mutation = MutationCreateNewsletter();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="text-center text-muted-foreground py-10">
                Impossible de charger les informations du tableau de bord.
            </div>
        );
    }

    function handleBooking() {
        router.replace("/dashboard/booking");
    }

    function handleFavorite() {
        router.replace("/dashboard/favoris");
    }


    function handleUpdateNewsletter() {
        mutation.mutate();
        toast.success("Votre abonnement a la newslettr a bien été mis à jours")
    }

    return (
        <div className="space-y-6">

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* RDV à venir */}
                <Card className="shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer" onClick={handleBooking}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            RDV à venir
                        </CardTitle>
                        <CalendarDays className="w-5 h-5 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-blue-700">
                            {data.bookingFutur}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Prévu(s) prochainement
                        </p>
                    </CardContent>
                </Card>

                {/* RDV passés */}
                <Card className="shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            RDV passés
                        </CardTitle>
                        <History className="w-5 h-5 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-orange-600">
                            {data.bookingPast}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Historique terminé
                        </p>
                    </CardContent>
                </Card>

                {/* Praticiens favoris */}
                <Card className="shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer" onClick={handleFavorite}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Praticiens favoris
                        </CardTitle>
                        <Heart className="w-5 h-5 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-red-600">
                            {data.praticianFavorite}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Enregistré(s) dans vos favoris
                        </p>
                    </CardContent>
                </Card>

                {/* Newsletter */}
                <Card className="shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer" onClick={handleUpdateNewsletter}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Newsletter
                        </CardTitle>
                        <Mail className="w-5 h-5 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between" >
                            {data.newsletter ? (
                                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                                    Abonné
                                </Badge>
                            ) : (
                                <Badge variant="secondary" className="bg-gray-100 text-gray-500 border-gray-200">
                                    Non abonné
                                </Badge>
                            )}
                            <Switch checked={data.newsletter} disabled />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {data.newsletter
                                ? "Vous recevez nos actualités"
                                : "Abonnez-vous pour ne rien manquer"}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
