"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useGetFavoris from "@/query/useGetFavoris";
import Link from "next/link";
import { Trash2, Heart, MapPin, User, Loader2, HeartOff } from "lucide-react";
import { toast } from "sonner";
import MutationRemoveFavoritePro from "@/mutation/mutationRemoveFavoritePro";

export default function FavorisPage() {
    const { data: favoris, isLoading, isError, refetch } = useGetFavoris();
    const mutation = MutationRemoveFavoritePro();
    const [removingId, setRemovingId] = useState<number | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

    const handleRemove = (id: number) => {
        setRemovingId(id);
        mutation.mutate(id.toString(), {
            onSuccess: () => {
                toast.success("Le praticien a été retiré de vos favoris.");
                refetch();
                setRemovingId(null);
                setConfirmDeleteId(null);
            },
            onError: () => {
                toast.error("Impossible de retirer ce favori.");
                setRemovingId(null);
                setConfirmDeleteId(null);
            },
        });
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Chargement de vos favoris...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
                    <HeartOff className="w-10 h-10 text-destructive" />
                </div>
                <p className="text-destructive font-medium">Erreur lors du chargement des favoris</p>
                <Button onClick={() => refetch()} variant="outline">
                    Réessayer
                </Button>
            </div>
        );
    }

    if (!favoris || favoris.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Heart className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Aucun favori</h2>
                <p className="text-muted-foreground text-center max-w-md">
                    Vous n'avez pas encore ajouté de praticiens à vos favoris.
                    <br />Explorez les profils et ajoutez vos préférés !
                </p>
                <Link href="/dashboard/recherche">
                    <Button className="mt-4">
                        Découvrir les praticiens
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full mx-auto px-4 py-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                        Mes Favoris
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {favoris.length} praticien{favoris.length > 1 ? "s" : ""} enregistré{favoris.length > 1 ? "s" : ""}
                    </p>
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                    {favoris.length}
                </Badge>
            </div>

            {/* Grid des favoris */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                {favoris.map((f) => (
                    <Card
                        key={f.id}
                        className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20"
                    >
                        {/* Badge favori */}
                        <div className="absolute top-4 right-4 z-10">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Heart className="w-5 h-5 text-orange-500 fill-orange-500" />
                            </div>
                        </div>

                        <CardHeader className="space-y-3">
                            {/* Avatar */}
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                                {f.firstname.charAt(0).toUpperCase()}{f.lastname.charAt(0).toUpperCase()}
                            </div>

                            <div>
                                <CardTitle className="text-xl line-clamp-2">
                                    {f.title}
                                </CardTitle>
                                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                                    <User className="w-4 h-4" />
                                    <span>{f.firstname} {f.lastname}</span>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {/* Localisation */}
                            <div className="space-y-2">
                                <div className="flex items-start gap-2 text-sm">
                                    <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-medium">{f.city}</p>
                                        <p className="text-muted-foreground text-xs line-clamp-1">{f.address}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 pt-2">
                                <Link href={`/dashboard/praticien/${f.idPro}`} className="flex-1">
                                    <Button className="w-full" size="sm">
                                        Voir le profil
                                    </Button>
                                </Link>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setConfirmDeleteId(f.id)}
                                    disabled={removingId === f.id}
                                    className="hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                                >
                                    {removingId === f.id ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="w-4 h-4" />
                                    )}
                                </Button>
                            </div>
                        </CardContent>

                        {/* Effet hover gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </Card>
                ))}
            </div>

            {/* Dialog de confirmation */}
            <AlertDialog open={confirmDeleteId !== null} onOpenChange={(open) => !open && setConfirmDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Retirer des favoris ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Êtes-vous sûr de vouloir retirer ce praticien de vos favoris ?
                            Vous pourrez toujours l'ajouter à nouveau plus tard.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => confirmDeleteId && handleRemove(confirmDeleteId)}
                            className="bg-destructive hover:bg-destructive/90"
                        >
                            Retirer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}