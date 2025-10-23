"use client";

import useGetBooking from "@/query/useGetBooking";
import MutationDeleteBooking from "@/mutation/mutationDeleteBooking";
import { toast } from "sonner";
import { format, isAfter } from "date-fns";
import { fr } from "date-fns/locale";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Loader2,
    MapPin,
    User2,
    CalendarDays,
    Clock,
    StickyNote,
    XCircle,
    CheckCircle2,
    TimerOff,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BookingHeader from "@/components/blocks-dashboard/booking/Booking-header";

export default function Page() {
    const { data, isLoading, isError } = useGetBooking();
    const mutation = MutationDeleteBooking();

    function handleDeleteBooking(id: string) {
        mutation.mutate(id, {
            onSuccess: () => toast.success("La réservation a été annulée"),
            onError: () => toast.error("Une erreur est survenue lors de l'annulation"),
        });
    }

    function formatToLocal(dateString: string) {
        const date = new Date(dateString);
        const hours = date.getUTCHours().toString().padStart(2, "0");
        const minutes = date.getUTCMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
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
            <BookingHeader />

            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                {data.map((booking) => {
                    const now = new Date();
                    const startDate = new Date(booking.startAt);
                    const isPast = isAfter(now, startDate);

                    return (
                        <Card
                            key={booking.id}
                            className="shadow-sm hover:shadow-md transition-all border border-gray-100 w-full"
                        >
                            <CardHeader className="flex justify-between items-center pb-2">
                                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                    <User2 className="w-5 h-5 text-primary" />
                                    {booking.pro.firstname} {booking.pro.lastname}
                                </CardTitle>

                                <div className="flex items-center gap-2">
                                    {/* Badge RDV passé / futur */}
                                    <Badge
                                        variant={isPast ? "secondary" : "outline"}
                                        className={`${
                                            isPast
                                                ? "bg-gray-100 text-gray-500 border-gray-200"
                                                : "border-green-300 text-green-700"
                                        }`}
                                    >
                                        {isPast ? (
                                            <div className="flex items-center gap-1">
                                                <TimerOff className="w-3.5 h-3.5" /> RDV dépassé
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1">
                                                <CheckCircle2 className="w-3.5 h-3.5" /> À venir
                                            </div>
                                        )}
                                    </Badge>

                                    {/* Badge du statut */}
                                    <Badge
                                        variant="outline"
                                        className={`
    capitalize border
    ${
                                            booking.status === "pending"
                                                ? "border-yellow-300 text-yellow-700 bg-yellow-50"
                                                : booking.status === "confirmed"
                                                    ? "border-green-300 text-green-700 bg-green-50"
                                                    : booking.status === "cancelled"
                                                        ? "border-red-300 text-red-700 bg-red-50"
                                                        : booking.status === "done"
                                                            ? "border-blue-300 text-blue-700 bg-blue-50"
                                                            : ""
                                        }
  `}
                                    >
                                        {booking.status === "pending" && (
                                            <>
                                                <Clock className="w-3.5 h-3.5 mr-1" />
                                                En attente
                                            </>
                                        )}
                                        {booking.status === "confirmed" && (
                                            <>
                                                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                                                Confirmé
                                            </>
                                        )}
                                        {booking.status === "cancelled" && (
                                            <>
                                                <XCircle className="w-3.5 h-3.5 mr-1" />
                                                Annulé
                                            </>
                                        )}
                                        {booking.status === "done" && (
                                            <>
                                                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-blue-600" />
                                                Terminé
                                            </>
                                        )}
                                    </Badge>

                                </div>
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
        {formatToLocal(booking.startAt)} - {formatToLocal(booking.endAt)}
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

                                    {!isPast ? (
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="gap-1"
                                            onClick={() => handleDeleteBooking(booking.id)}
                                            disabled={mutation.isPending}
                                        >
                                            {mutation.isPending ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" /> Annulation...
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle className="w-4 h-4" /> Annuler
                                                </>
                                            )}
                                        </Button>
                                    ) : (
                                        <span className="text-xs text-gray-400 italic flex items-center gap-1">
          <TimerOff className="w-3.5 h-3.5" />
          RDV dépassé
        </span>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                    );
                })}
            </div>
        </div>
    );
}
