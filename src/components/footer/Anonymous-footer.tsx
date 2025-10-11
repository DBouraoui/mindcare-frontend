import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Facebook, Linkedin} from "lucide-react"
import Link from "next/link";

export function AnonymousFooter() {
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
                            <li><a href="#" className="hover:text-foreground transition-colors">Fonctionnalités</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">À propos</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Bloc 3 : ressources */}
                    <div>
                        <h4 className="text-sm font-semibold mb-3 text-foreground">Ressources</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="cgv-cgu" className="hover:text-foreground transition-colors">CGV & CGU</Link></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Conditions d’utilisation</a></li>
                            <li><Link href="confidentialite" className="hover:text-foreground transition-colors">Confidentialité</Link></li>
                        </ul>
                    </div>

                    {/* Bloc 4 : newsletter */}
                    <div>
                        <h4 className="text-sm font-semibold mb-3 text-foreground">Newsletter</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                            Recevez les dernières nouveautés et astuces directement dans votre boîte mail.
                        </p>
                        <form className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="Votre email"
                                className="flex-1"
                            />
                            <Button type="submit" variant="default">
                                S’inscrire
                            </Button>
                        </form>
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
