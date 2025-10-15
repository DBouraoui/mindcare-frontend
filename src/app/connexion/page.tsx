"use client"
import { Input } from "@/components/ui/input";
import {AnonymousLayout} from "@/components/layout/Anonymous-layout";
import {Suspense} from "react";
import {useForm} from "@tanstack/react-form";
import {z} from "zod";
import FieldInfo from "@/components/ui/FieldInfo";
import {Field,FieldLabel} from "@/components/ui/field";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";

const schema = z.object({
    email: z.string()
        .email({ message: "L'email doit être une adresse valide." })
        .max(155, { message: "L'email ne doit pas dépasser 155 caractères." })
        .trim(),
    password: z.string()
        .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." })
        .max(255, { message: "Le mot de passe ne doit pas dépasser 255 caractères." })
        .trim(),
});


export default function Login (){

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        onSubmit: async (values) => {
            console.log(values);
        },
        validators: {
            onChange: schema
        }
    })

    return (
        <AnonymousLayout>
            <Suspense>
                <section className="h-screen">
                    <div className="flex h-full items-center justify-center">
                        <div className="flex flex-col items-center gap-6 lg:justify-start">
                            <div className="min-w-md border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md">
                                <h1 className="text-xl font-semibold">Mindcare</h1>
                                <p className="text-muted-foreground text-sm text-center">Accéder à votre compte pro ou client </p>
                               <form onSubmit={(e) =>{
                                   e.preventDefault()
                                   form.handleSubmit()
                               }} className="w-full flex flex-col items-center gap-6 lg:justify-start">

                                <form.Field name="email" children={(field)=>{
                                    return (
                                        <>
                                            <Field>
                                            <FieldLabel htmlFor={field.name}>Adresse email</FieldLabel>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                onBlur={field.handleBlur}
                                                value={field.state.value}
                                                onChange={(e)=>field.handleChange(e.target.value)}
                                            />
                                            <FieldInfo field={field} />
                                            </Field>
                                        </>
                                    )
                                }}>
                                </form.Field>

                                   <form.Field name="password" children={(field)=>{
                                       return (
                                           <>
                                               <Field>
                                                   <FieldLabel htmlFor={field.name}>Mot de passe</FieldLabel>
                                                   <Input
                                                       id={field.name}
                                                       name={field.name}
                                                       onBlur={field.handleBlur}
                                                       value={field.state.value}
                                                       onChange={(e)=>field.handleChange(e.target.value)}
                                                   />
                                                   <FieldInfo field={field} />
                                               </Field>
                                           </>
                                       )
                                   }}>
                                   </form.Field>

                                   <form.Subscribe
                                       selector={(state) => [state.canSubmit, state.isSubmitting]}
                                       children={([canSubmit, isSubmitting]) => (
                                           <Button type="submit" disabled={!canSubmit} className="cursor-pointer">
                                               {isSubmitting ? '...' : 'Se connecter'}
                                           </Button>
                                       )}/>

                                   <Separator />

                                   <div className="text-muted-foreground flex justify-center gap-1 text-sm">
                                       <p>Vous n'avez pas encore de compte client ?</p>
                                       <a
                                           href="/inscription"
                                           className="text-primary font-medium hover:underline"
                                       >
                                           Inscription Client
                                       </a>
                                   </div>

                                   <div className="text-muted-foreground flex justify-center gap-1 text-sm">
                                       <p>Vous n'avez pas encore de compte PRO ?</p>
                                       <a
                                           href="/inscription/pro"
                                           className="text-primary font-medium hover:underline"
                                       >
                                           Inscription PRO
                                       </a>
                                   </div>
                               </form>
                            </div>
                        </div>
                    </div>
                </section>
            </Suspense>
        </AnonymousLayout>
    );
};
