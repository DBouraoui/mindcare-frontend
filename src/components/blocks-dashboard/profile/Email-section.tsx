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
import FormFieldT from "@/components/ui/FormFieldT";
import FormSubmitT from "@/components/ui/FormSubmitT";

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
                   <FormFieldT
                       form={form}
                       inputName={"email"}
                       inputLabel={"Votre nouvelle adresse e-mail"}
                       inputType={"email"}
                       placeHolder={"contact@mindcare.fr"}
                   />

                   <FormSubmitT
                   form={form}
                   buttonLabel={"Modifier mon e-mail"}
                   buttonLabelWaiting={"..."}
                   />
                </form>
            </CardContent>
        </Card>
    );
}
