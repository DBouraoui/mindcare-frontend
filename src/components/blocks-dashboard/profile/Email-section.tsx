import { useForm } from "@tanstack/react-form";
import { useAuthStore } from "@/store/useAuthStore";
import FieldInfo from "@/components/ui/FieldInfo";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import {Button} from "@/components/ui/button";
import {useMutation} from "@tanstack/react-query";
import {updateEmailUser} from "@/api/User";
import {UserEmail} from "@/api/models/User-model";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

export default function EmailSection() {
    const { user,logout } = useAuthStore();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: (payload : UserEmail)=>updateEmailUser(payload),
        onSuccess: ()=>{
            toast.success("L'adresse email a été mise à jour. Veuillez vous reconnecté")
            logout()
            router.push("/connexion")
        }
    });

    const form = useForm({
        defaultValues: {
            email: user?.username ?? "",
        },
        onSubmit: ({ value }) => {
            mutation.mutate({email: value.email});
        },
    });

    if (!user) {
        return <div className="text-muted-foreground text-sm p-2">Chargement...</div>;
    }

    return (
        <Card className="shadow-md border border-border/50">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Adresse e-mail</CardTitle>
                <CardDescription>
                    Mettez à jour votre adresse e-mail utilisée pour la connexion et les notifications.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                    className="space-y-6"
                >
                    <form.Field
                        name="email"
                        children={(field) => (
                            <Field>
                                <FieldLabel htmlFor={field.name}>Nouvelle adresse e-mail</FieldLabel>
                                <Input
                                    type="email"
                                    name={field.name}
                                    placeholder="exemple@domaine.com"
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
                            <CardFooter className="pt-2">
                                <Button
                                    type="submit"
                                    disabled={!canSubmit}
                                    className="w-full sm:w-auto"
                                >
                                    {isSubmitting ? "Mise à jour..." : "Modifier mon e-mail"}
                                </Button>
                            </CardFooter>
                        )}
                    />
                </form>
            </CardContent>
        </Card>
    );
}
