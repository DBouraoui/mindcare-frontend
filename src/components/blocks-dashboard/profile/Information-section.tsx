import {useForm} from "@tanstack/react-form";
import {z} from "zod";
import {Field, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import FieldInfo from "@/components/ui/FieldInfo";
import {Button} from "@/components/ui/button";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateInformationUserModel} from "@/api/models/User-model";
import {updateInformationUser} from "@/api/User";
import {formatDistanceToNow} from "date-fns";
import {fr} from "date-fns/locale";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {toast} from "sonner";
import useGetUserInformations from "@/query/useGetUserInformations";

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
        return <p className="text-sm text-muted-foreground">Chargement des informations...</p>;
    }

    if (isError || !data) {
        return <p className="text-sm text-red-500">Impossible de charger les informations.</p>;
    }

    return (
        <div className="space-y-8">
            {/* 🧩 Bloc 1 — Informations de base */}
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
                            <form.Field
                                name="firstname"
                                children={(field) => (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Prénom</FieldLabel>
                                        <Input
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        <FieldInfo field={field} />
                                    </Field>
                                )}
                            />

                            <form.Field
                                name="lastname"
                                children={(field) => (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Nom</FieldLabel>
                                        <Input
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        <FieldInfo field={field} />
                                    </Field>
                                )}
                            />
                        </div>

                        <form.Field
                            name="city"
                            children={(field) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>Ville</FieldLabel>
                                    <Input
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    <FieldInfo field={field} />
                                </Field>
                            )}
                        />

                        <form.Field
                            name="phone"
                            children={(field) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>Téléphone</FieldLabel>
                                    <Input
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    <FieldInfo field={field} />
                                </Field>
                            )}
                        />

                        <form.Subscribe
                            selector={(state) => [state.canSubmit, state.isSubmitting]}
                            children={([canSubmit, isSubmitting]) => (
                                <CardFooter className="pt-4">
                                    <Button type="submit" disabled={!canSubmit}>
                                        {isSubmitting ? "..." : "Modifier mes informations"}
                                    </Button>
                                </CardFooter>
                            )}
                        />
                    </form>
                </CardContent>
            </Card>

            {/* 🧩 Bloc 2 — Statut du compte */}
            <Card className="shadow-sm border border-border/40">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Statut du compte</CardTitle>
                    <CardDescription>État actuel de votre compte utilisateur.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p>
                        <span className="font-medium">Actif :</span>{" "}
                        <span className={data?.isActive ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
              {data?.isActive ? "Oui" : "Non"}
            </span>
                    </p>
                </CardContent>
            </Card>

            {/* 🧩 Bloc 3 — Informations système */}
            <Card className="shadow-sm border border-border/40">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Historique du compte</CardTitle>
                    <CardDescription>Détails de création et mise à jour de votre profil.</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>
                        Créé{" "}
                        <span className="font-medium text-foreground">
              {/*              @ts-ignore*/}
              {formatDistanceToNow(new Date(data?.createdAt), { addSuffix: true, locale: fr })}
            </span>
                    </p>
                    <p>
                        Dernière modification{" "}
                        <span className="font-medium text-foreground">
              {/*              @ts-ignore*/}
              {formatDistanceToNow(new Date(data?.updatedAt), { addSuffix: true, locale: fr })}
            </span>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}