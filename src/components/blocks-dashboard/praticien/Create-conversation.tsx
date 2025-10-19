"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import { PraticienModel } from "@/api/models/Praticien-model";
import MutationCreateConversation from "@/mutation/mutationCreateConversation";
import { toast } from "sonner";

interface CreateConversationProps {
    praticien: PraticienModel;
}

export default function CreateConversation({ praticien }: CreateConversationProps) {
    const [message, setMessage] = useState("");
    const mutation = MutationCreateConversation();

    const handleCreateConversation = () => {
        if (!message.trim()) {
            toast.error("Veuillez écrire un message avant d’envoyer.");
            return;
        }

        mutation.mutate(
            { user2: praticien.id.toString(), text: message },
            {
                onSuccess: () => {
                    toast.success("Le message a été envoyé avec succès 🎉");
                    setMessage("");
                },
                onError: () => {
                    toast.error("Une erreur est survenue lors de l’envoi du message.");
                },
            }
        );
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="lg" variant="outline" className="gap-2 cursor-pointer">
                    <MessageSquare className="w-5 h-5" />
                    Contacter le praticien
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="sm:max-w-[500px]">
                <AlertDialogHeader>
                    <AlertDialogTitle>Envoyer un message ?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Posez une question, précisez votre besoin ou demandez un premier contact.
                        Le praticien recevra votre message directement.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="mt-4 space-y-3">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">
                        Votre message
                    </label>
                    <Textarea
                        id="message"
                        placeholder="Bonjour, je souhaite prendre rendez-vous ou avoir des renseignements..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="min-h-[120px]"
                    />
                </div>

                <AlertDialogFooter className="mt-6">
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleCreateConversation}
                        disabled={mutation.isPending}
                        className="cursor-pointer"
                    >
                        {mutation.isPending ? "Envoi..." : "Envoyer le message"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
