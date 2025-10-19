"use client";

import useGetBooking from "@/query/useGetBooking";
import MutationDeleteBooking from "@/mutation/mutationDeleteBooking";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin, User2, CalendarDays, Clock, StickyNote, XCircle } from "lucide-react";

export default function Page() {
    const { data, isLoading, isError } = useGetBooking();
    const mutation = MutationDeleteBooking();

    function handleDeleteBooking(id: string) {
        mutation.mutate(id, {
            onSuccess: () => toast.success("La réservation a été annulée"),
            onError: () => toast.error("Une erreur est survenue lors de l'annulation"),
        });
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (isError || !data || data.length === 0) {
        return (
            <div className="text-center text-muted-foreground py-10">
                Aucune réservation pour le moment.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight">🗓️ Mes réservations</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((booking) => (
                    <Card
                        key={booking.id}
                        className="shadow-sm hover:shadow-md transition-all border border-gray-100"
                    >
                        <CardHeader className="flex justify-between items-center pb-2">
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <User2 className="w-5 h-5 text-primary" />
                                {booking.pro.firstname} {booking.pro.lastname}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-3 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="w-4 h-4 text-blue-500" />
                                <span>
                  {booking.pro.address}, {booking.pro.city}
                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <CalendarDays className="w-4 h-4 text-green-500" />
                                <span>
                  {format(new Date(booking.startAt), "EEEE d MMMM yyyy", { locale: fr })}
                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-orange-500" />
                                <span>
                  {format(new Date(booking.startAt), "HH:mm")} -{" "}
                                    {format(new Date(booking.endAt), "HH:mm")}
                </span>
                            </div>

                            {booking.note && (
                                <div className="flex items-start gap-2">
                                    <StickyNote className="w-4 h-4 text-purple-500 mt-1" />
                                    <span className="italic text-muted-foreground">{booking.note}</span>
                                </div>
                            )}

                            <div className="pt-3 border-t mt-3 flex justify-between items-center">
                <span className="text-xs text-gray-400">
                  Créé le {format(new Date(booking.createdAt), "dd/MM/yyyy", { locale: fr })}
                </span>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="gap-1"
                                    onClick={() => handleDeleteBooking(booking.id)}
                                    disabled={mutation.isPending}
                                >
                                    <XCircle className="w-4 h-4" />
                                    Annuler
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
