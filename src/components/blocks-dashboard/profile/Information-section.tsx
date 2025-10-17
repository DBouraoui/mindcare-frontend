import {useForm} from "@tanstack/react-form";
import {z} from "zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateInformationUserModel} from "@/api/models/User-model";
import {updateInformationUser} from "@/api/User";
import {formatDistanceToNow} from "date-fns";
import {fr} from "date-fns/locale";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {toast} from "sonner";
import useGetUserInformations from "@/query/useGetUserInformations";
import FormFieldT from "@/components/ui/FormFieldT";
import FormSubmitT from "@/components/ui/FormSubmitT";

export default function InformationSection() {
    const queryClient = useQueryClient();

    const {data,isLoading, isError} = useGetUserInformations();

    const mutation = useMutation({
        mutationFn: (payload: updateInformationUserModel) => updateInformationUser(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["userInformations"]});
        }
    })

    const schema = z.object({
        firstname: z.string().min(1, {message: "Le prénom ne peut être vide"}),
        lastname: z.string().min(1, {message: "Le nom ne peut être vide"}),
        city: z.string().min(1, {message: "La ville ne peut être vide"}),
        phone: z.string().min(1, {message: "Le numéro de téléphone ne peut être vide"}),
    })

    const form = useForm({
        defaultValues: {
            firstname: data?.firstname,
            lastname: data?.lastname,
            city: data?.city,
            phone: data?.phone,
        },
        onSubmit: ({value}) => {
            // @ts-ignore
            mutation.mutate(value)
            toast.success("Vos informations on été modifier")
        },
        validators: {
            // @ts-ignore
            onChange: schema
        }
    });

    if (isLoading) {
        return <><p></p></>
    }

    if (isError || !data) {
        return <><p></p></>
    }

    return (
        <div className="space-y-8">
            {/* 🧩 Bloc1 — Statut & Historique du compte */}
            <Card className="shadow-sm border border-border/40">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Statut du compte</CardTitle>
                    <CardDescription>Résumé de votre compte utilisateur.</CardDescription>
                </CardHeader>

                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Statut actif */}
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-muted-foreground">Actif :</span>
                        <span
                            className={`text-sm font-semibold ${
                                data?.isActive ? "text-green-600" : "text-red-500"
                            }`}
                        >
        {data?.isActive ? "Oui" : "Non"}
      </span>
                    </div>

                    {/* Professionnel */}
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-muted-foreground">Compte pro :</span>
                        <span className={`text-sm font-semibold ${data?.isPro ? "text-blue-600" : "text-gray-500"}`}>
        {data?.isPro ? "Oui" : "Non"}
      </span>
                    </div>

                    {/* Création du compte */}
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-muted-foreground">Créé :</span>
                        <span className="text-sm font-semibold text-foreground">
        {data?.createdAt
            ? formatDistanceToNow(new Date(data.createdAt), { addSuffix: true, locale: fr })
            : "-"}
      </span>
                    </div>

                    {/* Dernière modification */}
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-muted-foreground">Dernière modification :</span>
                        <span className="text-sm font-semibold text-foreground">
        {data?.updatedAt
            ? formatDistanceToNow(new Date(data.updatedAt), { addSuffix: true, locale: fr })
            : "-"}
      </span>
                    </div>
                </CardContent>
            </Card>


            {/* 🧩 Bloc 2 — Informations de base */}
            <Card className="shadow-md border border-border/50">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Informations personnelles</CardTitle>
                    <CardDescription>Mettez à jour vos informations de base.</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            form.handleSubmit()
                        }}
                        className="space-y-4"
                    >
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormFieldT
                            form={form}
                            inputName={"firstname"}
                            placeHolder={"Prénom"}
                            inputLabel={"Votre prénom"}
                            inputType={"text"}
                            />

                            <FormFieldT
                                form={form}
                                inputName={"lastname"}
                                placeHolder={"Nom de famille"}
                                inputLabel={"Votre Nom de famille"}
                                inputType={"text"}
                            />
                        </div>

                        <FormFieldT
                            form={form}
                            inputName={"city"}
                            placeHolder={"Votre ville"}
                            inputLabel={"Votre ville de résidence"}
                            inputType={"text"}
                        />

                        <FormFieldT
                            form={form}
                            inputName={"phone"}
                            placeHolder={"06 xx xx xx xx"}
                            inputLabel={"Numéro de téléphone personelle"}
                            inputType={"text"}
                        />

                        <FormSubmitT
                        form={form}
                        buttonLabel={"Modifier mes informations"}
                        buttonLabelWaiting={"...."}
                        />
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}