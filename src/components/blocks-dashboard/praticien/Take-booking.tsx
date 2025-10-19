"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import {PraticienModel, PraticienRDVModel} from "@/api/models/Praticien-model";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { format, setHours, setMinutes, isBefore } from "date-fns";
import { fr } from "date-fns/locale";
import { useState, useMemo } from "react";
import { Calendar as DayPicker } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {createBookingWithPraticien} from "@/api/Praticien";

interface TakeBookingProps {
    praticien: PraticienModel;
}

// Mapping entre les jours français et leur index JS
const dayMapFr: Record<string, number> = {
    dimanche: 0,
    lundi: 1,
    mardi: 2,
    mercredi: 3,
    jeudi: 4,
    vendredi: 5,
    samedi: 6,
};

export default function TakeBooking({ praticien }: TakeBookingProps) {
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [selectedSlot, setSelectedSlot] = useState<string>("");
    const [note, setNote] = useState<string>("");

    const { mutate: book, isPending } = useMutation({
        mutationFn: (payload: PraticienRDVModel) => createBookingWithPraticien(payload),
        onSuccess: () => {
            toast.success("Rendez-vous enregistré avec succès !");
            setOpen(false);
            setSelectedDate(undefined);
            setSelectedSlot("");
            setNote("");
        },
        onError: () => {
            toast.error("Erreur lors de la réservation");
        },
    });

    const availableDays = praticien.horraires.filter((h) => !h.closed);
    const availableDayIndexes = availableDays.map(
        (h) => dayMapFr[h.day.toLowerCase()]
    );

    // Cherche le bon horaire selon la date choisie
    const selectedSchedule = useMemo(() => {
        if (!selectedDate) return null;
        const dayName = format(selectedDate, "EEEE", { locale: fr }).toLowerCase();
        return praticien.horraires.find(
            (h) => h.day.toLowerCase() === dayName
        );
    }, [selectedDate, praticien]);

    const generateSlots = (start: string | number, end: string | number) => {
        const slots = [];
        const base = new Date();

        // Convertir en nombre si c'est une string, sinon garder le nombre
        const startNum = typeof start === 'string' ? parseFloat(start) : start;
        const endNum = typeof end === 'string' ? parseFloat(end) : end;

        // Extraire heures et minutes depuis le nombre décimal
        // Ex: 8.5 = 8h30, 9.75 = 9h45, 14 = 14h00
        const sH = Math.floor(startNum);
        const sM = Math.round((startNum - sH) * 60);
        const eH = Math.floor(endNum);
        const eM = Math.round((endNum - eH) * 60);

        let current = setHours(setMinutes(new Date(base), sM), sH);
        const endDate = setHours(setMinutes(new Date(base), eM), eH);

        while (isBefore(current, endDate)) {
            const slotStart = format(current, "HH:mm");
            const slotEnd = format(
                setMinutes(new Date(current), current.getMinutes() + 30),
                "HH:mm"
            );
            slots.push({ start: slotStart, end: slotEnd });
            current = setMinutes(current, current.getMinutes() + 30);
        }
        return slots;
    };

    const timeSlots = useMemo(() => {
        if (!selectedSchedule || selectedSchedule.closed) return [];
        const slots: { start: string; end: string }[] = [];
        if (selectedSchedule.morning && selectedSchedule.morning.start && selectedSchedule.morning.end) {
            slots.push(
                ...generateSlots(
                    selectedSchedule.morning.start,
                    selectedSchedule.morning.end
                )
            );
        }
        if (selectedSchedule.afternoon && selectedSchedule.afternoon.start && selectedSchedule.afternoon.end) {
            slots.push(
                ...generateSlots(
                    selectedSchedule.afternoon.start,
                    selectedSchedule.afternoon.end
                )
            );
        }
        return slots;
    }, [selectedSchedule]);

    function handleConfirm() {
        if (!selectedDate || !selectedSlot) return;
        const [startAt, endAt] = selectedSlot.split(" - ");
        const [hourStart, minuteStart] = startAt.split(":").map(Number);
        const [hourEnd, minuteEnd] = endAt.split(":").map(Number);
        const startDate = setMinutes(setHours(selectedDate, hourStart), minuteStart);
        const endDate = setMinutes(setHours(selectedDate, hourEnd), minuteEnd);
        book({
            proId: praticien.id.toString(),
            startAt: format(startDate, "yyyy-MM-dd'T'HH:mm:ss"),
            endAt: format(endDate, "yyyy-MM-dd'T'HH:mm:ss"),
            note,
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className="gap-2 font-medium">
                    <Calendar className="w-5 h-5" />
                    Prendre rendez-vous
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto p-0">
                <DialogHeader className="px-6 pt-6 pb-4 border-b">
                    <DialogTitle className="text-2xl font-bold">
                        Prendre rendez-vous
                    </DialogTitle>
                    <DialogDescription className="text-base">
                        avec {praticien.title}
                    </DialogDescription>
                </DialogHeader>

                <div className="px-6 py-4">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] gap-6">
                        {/* 🗓️ Calendrier */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" />
                                <h3 className="font-semibold">Choisir une date</h3>
                            </div>
                            <div className="rounded-xl border-2 bg-card p-4">
                                <DayPicker
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={(date) => {
                                        setSelectedDate(date);
                                        setSelectedSlot("");
                                    }}
                                    locale={fr}
                                    disabled={(date) =>
                                        date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                                        !availableDayIndexes.includes(date.getDay())
                                    }
                                    className="w-full"
                                />
                                <p className="text-xs text-center text-muted-foreground mt-3 pt-3 border-t">
                                    Jours gris = indisponibles
                                </p>
                            </div>
                        </div>

                        {/* 🕓 Créneaux et Note */}
                        <div className="space-y-4">
                            {/* Liste des créneaux */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-primary" />
                                    <h3 className="font-semibold">
                                        Créneaux disponibles
                                        {selectedDate && (
                                            <span className="text-sm font-normal text-muted-foreground ml-2">
                                                - {format(selectedDate, "EEEE d MMMM", { locale: fr })}
                                            </span>
                                        )}
                                    </h3>
                                </div>
                                    <p className="text-muted-foreground text-xs">La durée d'un RDV est de 30 minutes maximum</p>
                                <div className="rounded-xl border-2 bg-card p-4 min-h-[280px]">
                                    {timeSlots.length > 0 ? (
                                        <div className="grid grid-cols-3 gap-2 max-h-[240px] overflow-y-auto pr-2">
                                            {timeSlots.map((slot, idx) => (
                                                <Button
                                                    key={idx}
                                                    variant={
                                                        selectedSlot === `${slot.start} - ${slot.end}`
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                    size="sm"
                                                    className={cn(
                                                        "h-9 text-xs font-medium transition-all",
                                                        selectedSlot === `${slot.start} - ${slot.end}`
                                                            ? "shadow-md ring-2 ring-primary/20"
                                                            : "hover:bg-accent hover:border-primary/50"
                                                    )}
                                                    onClick={() =>
                                                        setSelectedSlot(`${slot.start} - ${slot.end}`)
                                                    }
                                                >
                                                    {slot.start}
                                                </Button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full space-y-3">
                                            <Clock className="w-12 h-12 text-muted-foreground/30" />
                                            <p className="text-sm text-muted-foreground text-center">
                                                {selectedDate
                                                    ? "Aucun créneau disponible ce jour"
                                                    : "Sélectionnez une date pour voir les créneaux"}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* ✏️ Note optionnelle */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold block">
                                    Note (facultatif)
                                </label>
                                <Textarea
                                    placeholder="Ajoutez un message pour le praticien..."
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className="resize-none h-24 rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="px-6 py-4 border-t bg-muted/30">
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={isPending}
                    >
                        Annuler
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={!selectedDate || !selectedSlot || isPending}
                        className="gap-2"
                    >
                        {isPending ? (
                            <>Réservation en cours...</>
                        ) : (
                            <>
                                <Calendar className="w-4 h-4" />
                                Confirmer le rendez-vous
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}