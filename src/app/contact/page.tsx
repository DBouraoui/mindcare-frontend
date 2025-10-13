"use client"

import { AnonymousLayout } from "@/components/layout/Anonymous-layout"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Suspense, useState } from "react"
import { CheckCircle2, Loader2 } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { createContact } from "@/api/Contact"

export default function ContactPage() {
    const [form, setForm] = useState({
        title: "",
        email: "",
        type: "",
        message: "",
    })
    const [sent, setSent] = useState(false)

    const { mutate, isPending, isSuccess, isError, error } = useMutation({
        mutationFn: createContact,
        onSuccess: () => {
            setSent(true)
            setForm({ title: "", email: "", type: "", message: "" })
        },
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleCategory = (value: string) => {
        setForm({ ...form, type: value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (form.email && form.message && form.title) {
            mutate(form)
        }
    }

    return (
        <AnonymousLayout>
            <Suspense>
                <section className="container mx-auto px-4 py-24 max-w-2xl">
                    {!sent ? (
                        <>
                            <div className="text-center mb-12">
                                <h1 className="text-4xl font-semibold mb-4">Contactez-nous</h1>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    Une question, un souci technique, ou simplement envie d’échanger ?
                                    Nous sommes là pour vous aider et vous accompagner.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Titre de votre demande</label>
                                    <Input
                                        name="title"
                                        placeholder="Exemple : Problème de connexion"
                                        value={form.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Adresse e-mail</label>
                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder="votre@email.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Type de demande</label>
                                    <Select onValueChange={handleCategory} value={form.type}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choisissez une catégorie" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="technical">Problème technique</SelectItem>
                                            <SelectItem value="account">Mon compte / inscription</SelectItem>
                                            <SelectItem value="content">Contenu ou exercice</SelectItem>
                                            <SelectItem value="suggestion">Suggestion / retour</SelectItem>
                                            <SelectItem value="other">Autre demande</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Votre message</label>
                                    <Textarea
                                        className="resize-none h-40"
                                        name="message"
                                        placeholder="Décrivez votre demande avec quelques détails..."
                                        value={form.message}
                                        onChange={handleChange}
                                        rows={10}
                                        required
                                    />
                                </div>

                                <div className="pt-4 text-center">
                                    <Button type="submit" className="px-8 h-12 text-base" disabled={isPending}>
                                        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Envoyer le message"}
                                    </Button>
                                </div>

                                {isError && (
                                    <p className="text-red-500 text-center text-sm mt-4">
                                        Une erreur est survenue : {(error as Error).message}
                                    </p>
                                )}
                            </form>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center space-y-4 py-20">
                            <CheckCircle2 className="text-green-500 h-12 w-12" />
                            <h2 className="text-2xl font-medium">Message envoyé avec succès 🎉</h2>
                            <p className="text-muted-foreground max-w-sm">
                                Merci de nous avoir contactés ! Notre équipe vous répondra dans les plus brefs délais.
                            </p>
                            <Button variant="outline" onClick={() => setSent(false)} className="mt-6">
                                Envoyer un autre message
                            </Button>
                        </div>
                    )}
                </section>
            </Suspense>
        </AnonymousLayout>
    )
}
