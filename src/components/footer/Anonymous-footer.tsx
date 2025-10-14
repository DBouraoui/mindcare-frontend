"use client"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {CheckCircle2, Facebook, Linkedin, Loader2} from "lucide-react"
import Link from "next/link";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {createNewsLetter} from "@/api/Newsletter";

export function AnonymousFooter() {

    const [email, setEmail] = useState("")

    const { mutate, isSuccess, isPending } = useMutation({
        mutationFn: () => createNewsLetter(email),
    })

    function submitEmail(e: React.FormEvent) {
        e.preventDefault()
        if (!email.trim()) return
        mutate()
    }

    return (
        <footer className="border-t bg-background pt-20">
            <div className="container mx-auto px-4 py-10">
                {/* Grille principale */}
                <div className="grid gap-10 md:grid-cols-4">
                    {/* Bloc 1 : présentation */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-lg font-semibold mb-3">Mindcare</h3>
                        <p className="text-sm text-muted-foreground">
                            Garder le controle de votre vie en prenant soin de votre santée mental.
                        </p>
                    </div>

                    {/* Bloc 2 : liens utiles */}
                    <div>
                        <h4 className="text-sm font-semibold mb-3 text-foreground">Liens utiles</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-foreground transition-colors">Accueil</a></li>
                            <li><Link href="information" className="hover:text-foreground transition-colors">Qui sommes nous ?</Link></li>
                            <li><Link href="contact" className="hover:text-foreground transition-colors">Nous contacter</Link></li>
                            <li><Link href="newsletter" className="hover:text-foreground transition-colors">Notre newsletter</Link></li>
                            <li><Link href="pro" className="hover:text-foreground transition-colors">Mindcare PRO</Link></li>
                        </ul>
                    </div>

                    {/* Bloc 3 : ressources */}
                    <div>
                        <h4 className="text-sm font-semibold mb-3 text-foreground">Ressources</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="cgv-cgu" className="hover:text-foreground transition-colors">CGV & CGU</Link></li>
                            <li><Link href="utilisation" className="hover:text-foreground transition-colors">Conditions d’utilisation</Link></li>
                            <li><Link href="confidentialite" className="hover:text-foreground transition-colors">Confidentialité</Link></li>
                            <li><Link href="faq" className="hover:text-foreground transition-colors">Foire aux questions</Link></li>
                        </ul>
                    </div>

                    {/* Bloc 4 : newsletter */}
                    <div>
                        <h4 className="text-sm font-semibold mb-3 text-foreground">Newsletter</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                            Recevez les dernières nouveautés et astuces directement dans votre boîte mail.
                        </p>

                        {!isSuccess ? (
                            <form className="flex gap-2" onSubmit={submitEmail}>
                                <Input
                                    type="email"
                                    placeholder="Votre email"
                                    className="flex-1"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isPending}
                                />
                                <Button type="submit" variant="default" disabled={isPending}>
                                    {isPending ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        "S’inscrire"
                                    )}
                                </Button>
                            </form>
                        ) : (
                            <div className="flex items-center gap-2 text-green-600 mt-2">
                                <CheckCircle2 className="h-5 w-5" />
                                <p className="text-sm font-medium">Merci pour votre inscription !</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Séparateur */}
                <Separator className="my-8" />

                {/* Bas du footer */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Mindcare. Tous droits réservés.
                    </p>
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" asChild>
                            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                                <Facebook className="h-5 w-5" />
                            </a>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    )
}
