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
    TimerOff, FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BookingHeader from "@/components/blocks-dashboard/booking/Booking-header";
import jsPDF from "jspdf";
import useGetUserInformations from "@/query/useGetUserInformations";

export default function Page() {
    const { data, isLoading, isError } = useGetBooking();
    const {data: userData} = useGetUserInformations();
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

    function generatePDF(booking, userData) {
        const doc = new jsPDF();

        // === En-tête principale ===
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("Facture de consultation médicale", 20, 20);

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(`Facture n° : ${booking.id}`, 20, 26);
        doc.text(`Date d’émission : ${format(new Date(), "dd/MM/yyyy")}`, 150, 26);

        // === Informations du praticien ===
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Émis par :", 20, 40);

        doc.setFont("helvetica", "normal");
        doc.text(`${booking.pro.firstname} ${booking.pro.lastname}`, 20, 47);
        if (booking.pro.address) doc.text(`${booking.pro.address}`, 20, 54);
        if (booking.pro.city) doc.text(`${booking.pro.city}`, 20, 61);
        if (booking.pro.siren) doc.text(`SIREN : ${booking.pro.siren}`, 20, 68);
        if (booking.pro.siret) doc.text(`SIRET : ${booking.pro.siret}`, 20, 75);

        // === Informations du patient ===
        doc.setFont("helvetica", "bold");
        doc.text("Destinataire :", 120, 40);

        doc.setFont("helvetica", "normal");
        doc.text(`${userData?.firstname ?? ""} ${userData?.lastname ?? ""}`, 120, 47);
        if (userData?.email) doc.text(`${userData.email}`, 120, 54);

        // === Séparation visuelle ===
        doc.line(20, 85, 190, 85);

        // === Détails du rendez-vous ===
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Détails du rendez-vous", 20, 95);

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(
            `Date : ${format(new Date(booking.startAt), "EEEE d MMMM yyyy", { locale: fr })}`,
            20,
            105
        );
        doc.text(
            `Heure : ${format(new Date(booking.startAt), "HH:mm", { locale: fr })} - ${format(
                new Date(booking.endAt),
                "HH:mm",
                { locale: fr }
            )}`,
            20,
            112
        );

        // === Calculs tarifaires ===
        const tarif = booking.pro.price || 60; // par défaut 60€
        const secuRate = 0.70; // 70% Sécurité sociale
        const mutuelleRate = 0.25; // 25% Mutuelle
        const secu = tarif * secuRate;
        const mutuelle = tarif * mutuelleRate;
        const restant = tarif - (secu + mutuelle); // ce qui reste au patient

        doc.text(`Durée : 30 minutes`, 20, 120);
        doc.text(`Tarif de la consultation : ${tarif.toFixed(2)} €`, 20, 127);
        doc.text(`Pris en charge par la Sécurité sociale : ${secu.toFixed(2)} €`, 20, 134);
        doc.text(`Pris en charge par la Mutuelle : ${mutuelle.toFixed(2)} €`, 20, 141);
        doc.text(`Reste à charge patient : ${restant.toFixed(2)} €`, 20, 148);

        if (booking.note) {
            doc.setFont("helvetica", "italic");
            doc.text("Note du praticien :", 20, 162);
            doc.text(booking.note, 20, 169, { maxWidth: 170 });
        }

        // === Séparation avant le total ===
        doc.line(20, 185, 190, 185);

        // === Bloc du total ===
        doc.setFillColor(240, 240, 240);
        doc.rect(20, 190, 170, 15, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("TOTAL À PAYER :", 30, 200);

        doc.setFontSize(16);
        doc.text(`${tarif.toFixed(2)} €`, 185, 200, { align: "right" });

        // === Mode de paiement et mentions ===
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.text("Mode de paiement : Carte bancaire", 20, 220);
        doc.text(
            "Acte remboursable dans le cadre du parcours de soins coordonnés.",
            20,
            228
        );

        // === Pied de page ===
        doc.line(20, 270, 190, 270);
        doc.setFontSize(10);
        doc.text(
            "Ce document fait office de facture. Merci pour votre confiance.",
            20,
            280
        );
        doc.text("Mindcare © 2025", 190, 280, { align: "right" });

        // === Téléchargement ===
        doc.save(`facture-${booking.id}.pdf`);
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
                                        <Button
                                            variant="outline"
                                            className="flex items-center gap-2 text-sm"
                                            onClick={() => generatePDF(booking, userData)}
                                        >
                                            <FileText className="w-4 h-4" />
                                            Facture
                                        </Button>

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
