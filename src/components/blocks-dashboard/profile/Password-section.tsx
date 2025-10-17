"use client"

import {useForm} from "@tanstack/react-form";
import {Field, FieldLabel} from "@/components/ui/field";
import FieldInfo from "@/components/ui/FieldInfo";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {z} from "zod";
import {useMutation} from "@tanstack/react-query";
import {UserPassword} from "@/api/models/User-model";
import {updatePasswordUser} from "@/api/User";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";
import FormFieldT from "@/components/ui/FormFieldT";
import FormSubmitT from "@/components/ui/FormSubmitT";

export default function PasswordSection() {

    const mutation = useMutation({
        mutationFn: (payload: UserPassword)=>updatePasswordUser(payload)
    });

    const schema = z.object({
        password: z.string().min(6, "Le mot de passe doit faire au minimum 6 carctère").max(255).trim(),
        password_confirmation: z.string().trim(),
    }).refine((data)=>
        data.password === data.password_confirmation,{
        message: 'Les mots de passe ne correspondent pas',
        path: ['password_confirmation'],
        }
    )

    const form = useForm({
        defaultValues: {
            password: "",
            password_confirmation: "",
        },
        onSubmit: async ({value}) => {
            mutation.mutate({password: value.password})
            toast.success("Le mot de passe à été modifier avec succes")
            form.reset();
        },
        validators: {
            // @ts-ignore
            onChange: schema,
        }
    })

    return (
        <section className="bg-card border rounded-2xl p-6 shadow-sm space-y-6">
            <header>
                <h2 className="text-xl font-semibold text-foreground">🔐 Réinitialisation du mot de passe</h2>
                <p className="text-sm text-muted-foreground">
                    Pour des raisons de sécurité, veuillez confirmer votre intention avant de modifier votre mot de passe.
                </p>
            </header>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="space-y-5"
            >
                {/* Champ : mot de passe */}
                <FormFieldT
                    form={form}
                    inputName={"password"}
                    placeHolder={"Mot de passe"}
                    inputLabel={"Votre nouveau mot de passe"}
                    inputType={"password"}
                />

                {/* Champ : confirmation */}
                <FormFieldT
                    form={form}
                    inputName={"password_confirmation"}
                    placeHolder={"Mot de passe confirmation"}
                    inputLabel={"Confirmer votre nouveau mot de passe"}
                    inputType={"password"}
                />

                {/* Checkbox : validation */}

                        <Field>
                            <div className="flex items-start gap-3">
                                <Checkbox />
                                <div className="grid gap-1 leading-none">
                                    <Label>Changer de mot de passe</Label>
                                    <p className="text-sm text-muted-foreground">
                                        En cochant cette case, vous confirmez vouloir modifier votre mot de passe.</p>
                                </div>
                            </div>
                        </Field>

                {/* Bouton de soumission */}
                <FormSubmitT
                    form={form}
                    buttonLabel={"Modifier votre mot de passe"}
                    buttonLabelWaiting={"..."}
                />
            </form>
        </section>
    )
}