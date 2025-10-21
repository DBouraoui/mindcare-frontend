"use client";

import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import MutationDeleteAccount from "@/mutation/mutationDeleteAccount";
import { Trash2, Loader2 } from "lucide-react";

export default function DeleteAccount() {
    const mutation = MutationDeleteAccount();
    const authStore = useAuthStore();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    function handleDeleteAccount() {
        mutation.mutate(undefined, {
            onSuccess: () => {
                toast.success("Compte supprimé avec succès 👋");
                setOpen(false);

                setTimeout(() => {
                    document.cookie = "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    authStore.logout();
                    router.replace("/connexion");
                }, 1500);
            },
            onError: () => {
                toast.error("Une erreur est survenue lors de la suppression.");
            },
        });
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    variant="destructive"
                    className="gap-2 w-full md:w-auto"
                >
                    <Trash2 className="w-4 h-4" />
                    Supprimer le compte
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle>Supprimer ton compte ?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Cette action est <span className="font-semibold text-destructive">irréversible</span>.
                        Toutes tes données seront définitivement supprimées de nos serveurs.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <Button
                        variant="destructive"
                        onClick={handleDeleteAccount}
                        disabled={mutation.isPending}
                        className="gap-2"
                    >
                        {mutation.isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" /> Suppression...
                            </>
                        ) : (
                            <>
                                <Trash2 className="w-4 h-4" /> Confirmer
                            </>
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
