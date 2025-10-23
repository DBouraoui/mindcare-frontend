"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, Clock, CalendarDays, User2, Video, XCircle, CheckCircle2, FileText } from "lucide-react";
import { format, isBefore, isAfter, addMinutes, subMinutes } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import MutationUpdateBookingStatus from "@/mutation/mutationUpdateBookingStatus";
import useGetAllBookingPro from "@/query/useGetAllBookingPro";

export default function PracticianDashboard() {
    const { data, isLoading, isError } = useGetAllBookingPro();
    const mutation = MutationUpdateBookingStatus();

    // Séparation RDV passés / futurs
    const { past, future } = useMemo(() => {
        if (!data) return { past: [], future: [] };
        const now = new Date();
        return {
            past: data.filter((b) => isBefore(new Date(b.endAt), now)),
            future: data.filter((b) => isAfter(new Date(b.endAt), now)),
        };
    }, [data]);

    function handleUpdateStatus(id: string, status: "cancelled" | "confirmed") {
        mutation.mutate(
            { id, status },
            {
                onSuccess: () => toast.success(`Le rendez-vous a été ${status === "cancelled" ? "annulé" : "validé"} avec succès`),
                onError: () => toast.error("Erreur lors de la mise à jour du rendez-vous"),
            }
        );
    }

    function canStartVisio(startAt: string) {
        const now = new Date();
        const start = new Date(startAt);
        return now >= subMinutes(start, 5) && now <= addMinutes(start, 30);
    }

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
        );

    if (isError)
        return <p className="text-center text-muted-foreground py-10">Erreur de chargement des rendez-vous.</p>;

    return (
        <div className="space-y-10">
            <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-primary" /> Rendez-vous à venir
                </h2>
                {future.length === 0 ? (
                    <p className="text-muted-foreground">Aucun rendez-vous à venir.</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {future.map((booking) => (
                            <Card key={booking.id} className="border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <User2 className="w-4 h-4 text-primary" />
                        {booking.user.firstName} {booking.user.lastName}
                    </span>
                                        <Badge variant={booking.status === "pending" ? "outline" : "default"}>
                                            {booking.status === "pending" ? "En attente" : "Confirmé"}
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Clock className="w-4 h-4 text-orange-500" />
                                        <span>
                      {format(new Date(booking.startAt), "EEEE d MMMM yyyy", { locale: fr })} —{" "}
                                            {format(new Date(booking.startAt), "HH:mm", { locale: fr })} →{" "}
                                            {format(new Date(booking.endAt), "HH:mm", { locale: fr })}
                    </span>
                                    </div>

                                    <Separator />

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {booking.status === "pending" && (
                                            <>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="gap-1"
                                                    onClick={() => handleUpdateStatus(booking.id.toString(), "confirmed")}
                                                >
                                                    <CheckCircle2 className="w-4 h-4" /> Valider
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    className="gap-1"
                                                    onClick={() => handleUpdateStatus(booking.id.toString(), "cancelled")}
                                                >
                                                    <XCircle className="w-4 h-4" /> Annuler
                                                </Button>
                                            </>
                                        )}
                                        {canStartVisio(booking.startAt) && (
                                            <Button size="sm" className="gap-1 bg-green-600 hover:bg-green-700">
                                                <Video className="w-4 h-4" /> Démarrer la visio
                                            </Button>
                                        )}
                                        <Button size="sm" variant="secondary" className="gap-1">
                                            <FileText className="w-4 h-4" /> Fiche patient
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-muted-foreground" /> Rendez-vous passés
                </h2>
                {past.length === 0 ? (
                    <p className="text-muted-foreground">Aucun rendez-vous passé.</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {past.map((booking) => (
                            <Card key={booking.id} className="border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <User2 className="w-4 h-4 text-muted-foreground" />
                        {booking.user.firstName} {booking.user.lastName}
                    </span>
                                        <Badge variant="secondary">Terminé</Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground space-y-2">
                                    <p>
                                        {format(new Date(booking.startAt), "EEEE d MMMM yyyy", { locale: fr })} —{" "}
                                        {format(new Date(booking.startAt), "HH:mm", { locale: fr })} →{" "}
                                        {format(new Date(booking.endAt), "HH:mm", { locale: fr })}
                                    </p>
                                    {booking.note && <p className="italic text-xs opacity-80">Note : {booking.note}</p>}
                                    <Button size="sm" variant="outline" className="gap-1">
                                        <FileText className="w-4 h-4" />
                                        Voir fiche patient
                                    </Button>
                                {/*    todo fini fiche client */}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
