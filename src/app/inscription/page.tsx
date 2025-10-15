"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {AnonymousLayout} from "@/components/layout/Anonymous-layout";
import {useForm} from "@tanstack/react-form";
import {z} from "zod"
import FieldInfo from "@/components/ui/FieldInfo";
import {useMutation} from "@tanstack/react-query";
import {createClient} from "@/api/Register";
import {RegisterClientModel} from "@/api/models/Register-model";
import {toast} from "sonner"
import {Separator} from "@/components/ui/separator";
import {Suspense} from "react";

const schema = z.object({
        email: z
            .string({ error: 'L’email est requis' })
            .email('Adresse e-mail invalide')
            .max(155, 'L’email ne peut pas dépasser 155 caractères')
            .trim(),

        password: z
            .string({ error: 'Le mot de passe est requis' })
            .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
            .max(128, 'Le mot de passe ne peut pas dépasser 128 caractères')
            .trim(),

        password_confirmation: z
            .string({ error: 'La confirmation du mot de passe est requise' })
            .trim(),

        firstname: z
            .string({ error: 'Le prénom est requis' })
            .min(1, 'Le prénom est requis')
            .max(255, 'Le prénom ne peut pas dépasser 255 caractères')
            .trim(),

        lastname: z
            .string({ error: 'Le nom est requis' })
            .min(1, 'Le nom est requis')
            .max(255, 'Le nom ne peut pas dépasser 255 caractères')
            .trim(),

        city: z
            .string({ error: 'La ville est requise' })
            .min(1, 'La ville est requise')
            .max(255, 'La ville ne peut pas dépasser 255 caractères')
            .trim(),

        phone: z
            .string({ error: 'Le numéro de téléphone est requis' })
            .min(10, 'Le numéro de téléphone doit contenir 10 chiffres')
            .max(10, 'Le numéro de téléphone doit contenir 10 chiffres')
            .regex(/^[0-9]+$/, 'Le numéro de téléphone doit contenir uniquement des chiffres')
            .trim(),
    }).refine((data) => data.password === data.password_confirmation, {
        message: 'Les mots de passe ne correspondent pas',
        path: ['password_confirmation'],
    })

export default function Home(){

    const mutation = useMutation({
        mutationFn: (value: RegisterClientModel)=> createClient(value)
    })

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
            password_confirmation: "",
            firstname: "",
            lastname: "",
            phone: "",
            city: ""
        },
        onSubmit: async ({value}) => {
            mutation.mutate(value);
            toast.success("L'inscription est un succés, regarder votre boite mail !")
            form.reset();
            //todo rediriger vers la connexion
        },
        validators: {
            onChange: schema,
        },
    })

    return (
        <AnonymousLayout>
            <Suspense>
                <section className="h-screen">
                    <div className="flex h-full items-center justify-center">
                        <div className="flex flex-col items-center gap-6 lg:justify-start">
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                form.handleSubmit()
                            }}className="min-w-md border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md">
                                <h1 className="text-xl font-semibold">Mindcare</h1>
                                <p className="text-center text-foreground text-xs">Rejoignez-nous gratuitement et prenez rendez-vous avec vos médecins sans attendre.</p>

                                <form.Field name={"email"}
                                            children={(field)=>{
                                                return (
                                                    <>
                                                        <Input
                                                            type="email"
                                                            placeholder="Email"
                                                            className="text-sm"
                                                            onBlur={field.handleBlur}
                                                            name={field.name}
                                                            required
                                                            value={field.state.value}
                                                            onChange={(e) => field.handleChange(e.target.value)}
                                                        />
                                                        <FieldInfo field={field} />
                                                    </>
                                                )
                                            }}>
                                </form.Field>

                                <form.Field name={"password"} children={(field)=>(
                                    <>
                                        <Input
                                            type="password"
                                            placeholder="Mot de passe"
                                            className="text-sm"
                                            required
                                            onBlur={field.handleBlur}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}>
                                </form.Field>

                                <form.Field name={"password_confirmation"} children={(field)=>(
                                    <>
                                        <Input
                                            type="password"
                                            placeholder="Confirmation du mot de passe"
                                            className="text-sm"
                                            required
                                            onBlur={field.handleBlur}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        <FieldInfo field={field} />
                                    </>

                                )}>
                                </form.Field>

                                <form.Field name={"firstname"} children={(field)=>(
                                    <>
                                        <Input
                                            type="text"
                                            placeholder="Prénom"
                                            className="text-sm"
                                            required
                                            onBlur={field.handleBlur}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        <FieldInfo field={field} />

                                    </>

                                )}>
                                </form.Field>

                                <form.Field name={"lastname"} children={(field)=>(
                                    <>
                                        <Input
                                            type="text"
                                            placeholder="Nom de famille"
                                            className="text-sm"
                                            required
                                            onBlur={field.handleBlur}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        <FieldInfo field={field} />

                                    </>

                                )}>
                                </form.Field>

                                <form.Field name={"city"} children={(field)=>(
                                    <>
                                        <Input
                                            type="text"
                                            placeholder="Ville actuel"
                                            className="text-sm"
                                            required
                                            onBlur={field.handleBlur}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        <FieldInfo field={field} />

                                    </>
                                )}>
                                </form.Field>

                                <form.Field name={"phone"} children={(field)=>(
                                    <>
                                        <Input
                                            type="phone"
                                            placeholder="Numéro de téléphone"
                                            className="text-sm"
                                            required
                                            onBlur={field.handleBlur}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        <FieldInfo field={field} />

                                    </>
                                )}>
                                </form.Field>


                                <form.Subscribe
                                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                                    children={([canSubmit, isSubmitting]) => (
                                        <Button type="submit" disabled={!canSubmit}>
                                            {isSubmitting ? '...' : 'Créer mon compte'}
                                        </Button>
                                    )}
                                />

                                <Separator />

                                <div className="text-muted-foreground flex justify-center gap-1 text-sm">
                                    <p>Vous avez déja un compte client ?</p>
                                    <a
                                        href="/connexion"
                                        className="text-primary font-medium hover:underline"
                                    >
                                        Connexion
                                    </a>
                                </div>
                            </form>

                        </div>
                    </div>
                </section>
            </Suspense>
        </AnonymousLayout>

    );
};
