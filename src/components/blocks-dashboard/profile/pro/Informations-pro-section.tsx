"use client"

import useGetProInformation from "@/query/useGetProInformation";
import {useForm} from "@tanstack/react-form";
import FormFieldT from "@/components/ui/FormFieldT";
import {formatDistanceToNow} from "date-fns";
import {fr} from "date-fns/locale";
import FormSubmitT from "@/components/ui/FormSubmitT";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {toast} from "sonner";
import MutationUpdateProInformations from "@/mutation/mutationUpdateProInformations";

export default function InformationsProSection(){
    const {data, isLoading , isError } = useGetProInformation();
    const updateProMutation = MutationUpdateProInformations();
    const form = useForm({
        defaultValues: {
            id: data?.id,
            userId: data?.userId,
            title: data?.title,
            description: data?.description,
            diplome: data?.diplome,
            price: data?.price,
            country: data?.country,
            city: data?.city,
            address: data?.address,
            phone: data?.phone,
            email: data?.email,
            siren: data?.siren,
            siret: data?.siret,
            createdAt: data?.createdAt,
            updatedAt: data?.updatedAt,
        },
        onSubmit: ({value})=>{
            // @ts-ignore
            updateProMutation.mutate(value);
            toast.success("Les informations PRO on bien été mise à jours")
        }
    });

    if (isLoading || isError || !data) {
        return (
            <>
                <p></p>
            </>
        )
    }
    return (
        <>
            <Card className="border border-border/50 shadow-md rounded-xl overflow-hidden">
                <CardHeader className="bg-muted/40 px-6 py-4 border-b">
                    <CardTitle className="text-lg font-semibold text-center">Informations professionnelles</CardTitle>
                    <CardDescription className="text-center">
                        Mettez à jour vos informations liées à votre activité.
                    </CardDescription>
                </CardHeader>

                <CardContent className="p-6 space-y-6">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className="flex flex-col gap-6"
                    >
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormFieldT
                                form={form}
                                inputLabel="Titre professionnel"
                                placeHolder="Masseur-Kinésithérapeute"
                                inputName="title"
                                inputType="text"
                            />

                            <FormFieldT
                                form={form}
                                inputLabel="Diplôme obtenu"
                                placeHolder="Masseur-Kinésithérapeute bac + 5"
                                inputName="diplome"
                                inputType="text"
                            />
                        </div>

                        <FormFieldT
                            form={form}
                            inputLabel="Description de votre activité"
                            placeHolder="Masseur kinésithérapeute spécialisé dans le sport..."
                            inputName="description"
                            inputType="text"
                        />

                        <Separator />

                        <div className="grid md:grid-cols-2 gap-4">
                            <FormFieldT
                                form={form}
                                inputLabel="Tarif horaire (€)"
                                placeHolder="25"
                                inputName="price"
                                inputType="number"
                            />

                            <FormFieldT
                                form={form}
                                inputLabel="Numéro de téléphone professionnel"
                                placeHolder="06 xx xx xx xx"
                                inputName="phone"
                                inputType="text"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <FormFieldT
                                form={form}
                                inputLabel="Email professionnel"
                                placeHolder="praticien@pro.fr"
                                inputName="email"
                                inputType="email"
                            />

                            <FormFieldT
                                form={form}
                                inputLabel="Pays d’exercice"
                                placeHolder="France"
                                inputName="country"
                                inputType="text"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <FormFieldT
                                form={form}
                                inputLabel="Ville d’exercice"
                                placeHolder="Marseille 1er"
                                inputName="city"
                                inputType="text"
                            />

                            <FormFieldT
                                form={form}
                                inputLabel="Adresse du cabinet"
                                placeHolder="35 rue Jules Guesde"
                                inputName="address"
                                inputType="text"
                            />
                        </div>

                        <Separator />

                        <div className="grid md:grid-cols-2 gap-4">
                            <FormFieldT
                                form={form}
                                inputLabel="Numéro SIRET"
                                placeHolder="12345678901234"
                                inputName="siret"
                                inputType="text"
                            />

                            <FormFieldT
                                form={form}
                                inputLabel="Numéro SIREN"
                                placeHolder="123456789"
                                inputName="siren"
                                inputType="text"
                            />
                        </div>

                        <FormSubmitT
                            form={form}
                            buttonLabel="Mettre à jour mes informations PRO"
                            buttonLabelWaiting="Mise à jour..."
                        />
                    </form>
                </CardContent>

                <CardFooter className="px-6 py-4 bg-muted/30 border-t flex flex-col sm:flex-row justify-between text-sm text-muted-foreground">
                    <p>
                        Créé{" "}
                        <span className="text-foreground font-medium">
                        {data?.createdAt && data?.createdAt
                            ? formatDistanceToNow(new Date(data.createdAt), { addSuffix: true, locale: fr })
                            : "-"}
                    </span>
                    </p>
                    <p>
                        Dernière modification{" "}
                        <span className="text-foreground font-medium">
                        {data?.updatedAt && data?.updatedAt
                            ? formatDistanceToNow(new Date(data.updatedAt), { addSuffix: true, locale: fr })
                            : "-"}
                    </span>
                    </p>
                </CardFooter>
            </Card>
        </>
    )
}