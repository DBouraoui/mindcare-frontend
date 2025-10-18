"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ArrowLeft, Calendar, MessageSquare, MapPin, Mail, Phone, Globe, Clock, CreditCard, Languages, Shield, Award, Euro,  Star
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { PraticienModel, ScheduleSlotModel } from "@/api/models/Praticien-model";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DIsplayMapPraticien from "@/components/blocks-dashboard/praticien/DIsplay-map-praticien";
import useSaveFavoritePro from "@/mutation/useSaveFavoritePro";
import {toast} from "sonner";

interface DisplayPraticienProps {
    praticien: PraticienModel;
}

const mockPaymentMethods = ["Carte bancaire", "Espèces", "Chèque", "Virement"];
const mockLanguages = ["Français", "Anglais", "Espagnol"];
const mockInsurance = {
    conventioned: true,
    carteVitale: true,
    tiersPayant: false,
    mutuelle: true
};
const mockSpecialities = ["Thérapie cognitive", "Hypnose", "Gestion du stress", "Troubles anxieux"];

export default function DisplayPraticien({ praticien }: DisplayPraticienProps) {
    const router = useRouter();

    const mutation = useSaveFavoritePro();

    function handleCreateFavoris() {
        mutation.mutate(praticien.id.toString());
        praticien.isFavorite = true;
        toast.success("Le praticien a été ajouter aux favoris")
    }


    return (
        <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
            {/* Header avec retour */}
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => router.back()}
                    className="rounded-full"
                >
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold">{praticien.title}</h1>
                    <p className="text-muted-foreground mt-1">{praticien.description}</p>
                </div>
            </div>

            {/* Localisation */}
            <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-medium">{praticien.city}</span>
                <span className="text-muted-foreground">• {praticien.address}</span>
                <DIsplayMapPraticien praticien={praticien} />
            </div>

            {/* Actions principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <Button size="lg" className="gap-2 cursor-pointer">
                    <Calendar className="w-5 h-5" />
                    Prendre rendez-vous
                </Button>
                <Button size="lg" variant="outline" className="gap-2 cursor-pointer">
                    <MessageSquare className="w-5 h-5" />
                    Contacter le praticien
                </Button>
                {!praticien.isFavorite ? (
                    <Button size="lg" variant="secondary" className="gap-2 cursor-pointer" onClick={handleCreateFavoris}>
                        <Star className="w-4 h-4" />
                        Ajouter au favoris
                    </Button>
                ) : (
                    <Button size="lg" variant="secondary" className="gap-2 cursor-pointer">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        Enregistré
                    </Button>
                )}
            </div>

            {/* Grid 2 colonnes pour desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Colonne principale */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Tarifs et Remboursement */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Euro className="w-5 h-5 text-primary" />
                                <CardTitle>Tarifs et remboursement</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Tarif principal */}
                            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                                <span className="text-sm font-medium">Consultation</span>
                                <span className="text-2xl font-bold text-primary">{praticien.price} €</span>
                            </div>

                            {/* Statuts remboursement */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2 p-3 bg-card rounded-lg border">
                                    <div className={`w-2 h-2 rounded-full ${mockInsurance.conventioned ? 'bg-green-500' : 'bg-gray-300'}`} />
                                    <span className="text-sm">Conventionné</span>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-card rounded-lg border">
                                    <div className={`w-2 h-2 rounded-full ${mockInsurance.carteVitale ? 'bg-green-500' : 'bg-gray-300'}`} />
                                    <span className="text-sm">Carte Vitale</span>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-card rounded-lg border">
                                    <div className={`w-2 h-2 rounded-full ${mockInsurance.tiersPayant ? 'bg-green-500' : 'bg-gray-300'}`} />
                                    <span className="text-sm">Tiers payant</span>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-card rounded-lg border">
                                    <div className={`w-2 h-2 rounded-full ${mockInsurance.mutuelle ? 'bg-green-500' : 'bg-gray-300'}`} />
                                    <span className="text-sm">Mutuelle</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Spécialités */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Award className="w-5 h-5 text-primary" />
                                <CardTitle>Spécialités</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {mockSpecialities.map((spec, index) => (
                                    <Badge key={index} variant="secondary" className="px-3 py-1.5">
                                        {spec}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Horaires */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-primary" />
                                    <CardTitle>Horaires d'ouverture</CardTitle>
                                </div>
                                {praticien.updatedAt && (
                                    <Badge variant="secondary" className="text-xs">
                                        Mis à jour le {format(new Date(praticien.updatedAt), "dd MMM yyyy", { locale: fr })}
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {praticien.horraires.map((horaire: ScheduleSlotModel) => (
                                    <div
                                        key={horaire.id}
                                        className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                                    >
                                        <span className="font-medium min-w-[100px]">{horaire.day}</span>

                                        {horaire.closed ? (
                                            <Badge variant="destructive" className="ml-auto">Fermé</Badge>
                                        ) : (
                                            <div className="flex items-center gap-4 text-sm">
                                                {horaire.morning ? (
                                                    <span className="text-muted-foreground">
                                                        {horaire.morning.start}h - {horaire.morning.end}h
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                                <span className="text-muted-foreground">•</span>
                                                {horaire.afternoon ? (
                                                    <span className="text-muted-foreground">
                                                        {horaire.afternoon.start}h - {horaire.afternoon.end}h
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 ml-2">
                                                    Ouvert
                                                </Badge>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar - Informations complémentaires */}
                <div className="space-y-6">
                    {/* Contact */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Contact</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-start gap-3">
                                <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                                <a href={`mailto:${praticien.email}`} className="text-sm hover:text-primary transition-colors break-all">
                                    {praticien.email}
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                <a href={`tel:${praticien.phone}`} className="text-sm hover:text-primary transition-colors">
                                    {praticien.phone}
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Globe className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                <span className="text-sm">{praticien.country}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Moyens de paiement */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-primary" />
                                <CardTitle className="text-lg">Paiement</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {mockPaymentMethods.map((method, index) => (
                                    <div key={index} className="flex items-center gap-2 text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        <span>{method}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Langues */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Languages className="w-4 h-4 text-primary" />
                                <CardTitle className="text-lg">Langues</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {mockLanguages.map((lang, index) => (
                                    <Badge key={index} variant="outline">
                                        {lang}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Informations légales */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-primary" />
                                <CardTitle className="text-lg">Légal</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <div>
                                <span className="text-muted-foreground">Diplôme</span>
                                <p className="font-medium">{praticien.diplome}</p>
                            </div>
                            <div className="pt-2 border-t">
                                <span className="text-muted-foreground">SIRET</span>
                                <p className="font-mono text-xs">{praticien.siret}</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">SIREN</span>
                                <p className="font-mono text-xs">{praticien.siren}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}