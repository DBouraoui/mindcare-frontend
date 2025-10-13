"use client"

import { AnonymousLayout } from "@/components/layout/Anonymous-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Suspense, useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { createNewsLetter } from "@/api/Newsletter"

export default function NewsletterPage() {
    const [email, setEmail] = useState("")

    const { mutate, isPending, isSuccess, error } = useMutation({
        mutationFn: () => createNewsLetter(email),
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (email.trim()) {
            mutate()
        }
    }

    return (
        <AnonymousLayout>
            <Suspense>
                <section className="container mx-auto px-4 py-24 max-w-2xl text-center">
                    <div className="mb-10">
                        <h1 className="text-4xl font-semibold mb-4">Restez connecté à votre bien-être</h1>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Recevez chaque mois des conseils exclusifs, des exercices simples à pratiquer,
                            et les dernières nouveautés de MindCare directement dans votre boîte mail.
                            Un pas de plus vers un esprit apaisé 🌿
                        </p>
                    </div>

                    {!isSuccess ? (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                            <Input
                                type="email"
                                required
                                placeholder="Entrez votre adresse e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-12 w-full sm:w-80"
                            />
                            <Button type="submit" disabled={isPending} className="h-12 px-6">
                                {isPending ? "Envoi..." : "S’abonner"}
                            </Button>
                        </form>
                    ) : (
                        <div className="mt-8 flex flex-col items-center justify-center text-center space-y-3">
                            <CheckCircle2 className="text-green-500 h-10 w-10" />
                            <p className="text-lg font-medium">Merci pour votre inscription !</p>
                            <p className="text-muted-foreground text-sm max-w-sm">
                                Vous recevrez bientôt votre première dose de sérénité dans votre boîte mail.
                            </p>
                        </div>
                    )}

                    {error && (
                        <p className="text-red-500 mt-4">
                            Une erreur est survenue. Veuillez réessayer plus tard.
                        </p>
                    )}

                    <p className="text-sm text-muted-foreground mt-8">
                        Vous pouvez vous désabonner à tout moment.
                        MindCare respecte votre vie privée et ne partage jamais vos données.
                    </p>
                </section>
            </Suspense>
        </AnonymousLayout>
    )
}
