import { AnonymousLayout } from "@/components/layout/Anonymous-layout"
import { Suspense } from "react"

export default function ConditionsUtilisation() {
    return (
        <AnonymousLayout>
            <Suspense>
                <section className="container mx-auto px-4 py-16 max-w-4xl">
                    <h1 className="text-4xl font-semibold mb-8 text-center">Conditions Générales d’Utilisation</h1>
                    <p className="text-muted-foreground text-center mb-12">
                        Dernière mise à jour : 10 octobre 2025
                    </p>

                    <div className="space-y-10 text-base leading-relaxed text-muted-foreground">
                        <section>
                            <h2 className="text-xl font-medium mb-3 text-foreground">1. Objet</h2>
                            <p>
                                Les présentes Conditions Générales d’Utilisation (ci-après « CGU ») ont pour objet
                                de définir les modalités et conditions d’accès et d’utilisation de la plateforme
                                <strong> MindCare </strong> par les utilisateurs. En accédant au site ou à l’application,
                                vous acceptez sans réserve l’intégralité des présentes conditions.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-medium mb-3 text-foreground">2. Accès au service</h2>
                            <p>
                                La plateforme est accessible gratuitement à tout utilisateur disposant d’un accès à Internet.
                                Certaines fonctionnalités peuvent nécessiter la création d’un compte personnel.
                                L’utilisateur s’engage à fournir des informations exactes et à jour lors de son inscription.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-medium mb-3 text-foreground">3. Responsabilités</h2>
                            <p>
                                <strong>MindCare</strong> met tout en œuvre pour assurer la disponibilité et la sécurité du service.
                                Toutefois, la société ne saurait être tenue responsable en cas d’interruption,
                                d’erreur, de défaillance technique ou de perte de données.
                            </p>
                            <p className="mt-2">
                                L’utilisateur s’engage à ne pas utiliser la plateforme pour des activités frauduleuses,
                                illicites ou contraires aux bonnes mœurs.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-medium mb-3 text-foreground">4. Données personnelles</h2>
                            <p>
                                Le respect de la vie privée et la protection des données des utilisateurs sont une priorité.
                                Les données collectées sont traitées conformément à la réglementation en vigueur
                                (RGPD). Pour plus d’informations, veuillez consulter notre{" "}
                                <a href="/confidentialite" className="text-primary underline">
                                    politique de confidentialité
                                </a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-medium mb-3 text-foreground">5. Propriété intellectuelle</h2>
                            <p>
                                Tous les contenus présents sur la plateforme (textes, visuels, logos, éléments graphiques)
                                sont protégés par le droit d’auteur. Toute reproduction, diffusion ou utilisation non autorisée
                                est strictement interdite sans accord préalable de MindCare.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-medium mb-3 text-foreground">6. Modification des CGU</h2>
                            <p>
                                MindCare se réserve le droit de modifier les présentes conditions à tout moment.
                                Les utilisateurs seront informés de toute mise à jour via la plateforme.
                                La poursuite de l’utilisation du service après modification vaut acceptation des nouvelles conditions.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-medium mb-3 text-foreground">7. Contact</h2>
                            <p>
                                Pour toute question relative à ces Conditions d’Utilisation, vous pouvez nous contacter à :
                                <br />
                                <a href="mailto:support@mindcare.app" className="text-primary underline">
                                    support@mindcare.fr
                                </a>
                            </p>
                        </section>
                    </div>

                    <div className="mt-16 text-center text-sm text-muted-foreground">
                        © {new Date().getFullYear()} MindCare — Tous droits réservés.
                    </div>
                </section>
            </Suspense>
        </AnonymousLayout>
    )
}
