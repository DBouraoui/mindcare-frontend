"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Map } from "lucide-react";
import { PraticienModel } from "@/api/models/Praticien-model";
import LeafletMap from "@/components/blocks-dashboard/praticien/LeatfletMap";

interface DisplayPraticienProps {
    praticien: PraticienModel;
}

export default function DisplayMapPraticien({ praticien }: DisplayPraticienProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <Map className="mr-2 h-4 w-4 cursor-pointer" /> Voir sur la carte
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl w-full">
                <DialogHeader>
                    <DialogTitle>Carte du praticien</DialogTitle>
                    <DialogDescription>Retrouvez votre praticien facilement !</DialogDescription>
                </DialogHeader>

                <LeafletMap praticien={praticien} />

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Fermer</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
