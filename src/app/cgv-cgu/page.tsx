import { AnonymousLayout } from "@/components/layout/Anonymous-layout"
import { Suspense } from "react"

export default function Home() {
    return (
        <AnonymousLayout>
            <Suspense fallback={<div className="container mx-auto px-4 py-10">Chargement…</div>}>
                <main className="container mx-auto px-4 py-16 prose max-w-3xl">
                    <p className="text-sm text-muted-foreground">Document CGV & CGU Mindcare</p>

                    <h1>Conditions Générales d'Utilisation (CGU) & Conditions Générales de Vente (CGV)</h1>

                    <p>
                        Bienvenue sur <strong>Mindcare</strong>. Ces Conditions Générales d'Utilisation
                        (« CGU ») et Conditions Générales de Vente (« CGV ») définissent les règles
                        d'utilisation de la plateforme Mindcare et les conditions applicables à l'accès
                        aux services proposés sur le site.
                    </p>

                    <h2 id="1">1. Définitions</h2>
                    <ul>
                        <li><strong>Plateforme</strong> : désigne le site web et les services accessibles via Mindcare.</li>
                        <li><strong>Utilisateur</strong> : toute personne accédant à la plateforme.</li>
                        <li><strong>Praticien</strong> : professionnel référencé sur la plateforme proposant des consultations.</li>
                        <li><strong>Services</strong> : prise de rendez-vous, visioconférence, exercices guidés, contenu éditorial, etc.</li>
                    </ul>

                    <h2 id="2">2. Acceptation des conditions</h2>
                    <p>
                        En utilisant Mindcare, vous acceptez sans réserve ces CGU/CGV. Si vous n'acceptez
                        pas ces conditions, merci de ne pas utiliser la plateforme.
                    </p>

                    <h2 id="3">3. Accès et création de compte</h2>
                    <p>
                        Certains services nécessitent la création d'un compte. Vous êtes responsable de la
                        confidentialité de vos identifiants et de toute activité réalisée via votre compte.
                        Veillez à fournir des informations exactes et à jour.
                    </p>

                    <h2 id="4">4. Description des services</h2>
                    <p>
                        Mindcare met à disposition :
                    </p>
                    <ul>
                        <li>Un service de réservation de rendez-vous avec des praticiens.</li>
                        <li>Un module de visioconférence pour les consultations à distance.</li>
                        <li>Une bibliothèque d'exercices guidés et de ressources.</li>
                        <li>Un blog et une communauté d'entraide.</li>
                    </ul>
                    <p>
                        <strong>Note :</strong> La plateforme est annoncée comme <em>gratuite à vie</em> — cela signifie
                        qu'aucun paiement n'est requis pour les fonctionnalités de base listées ci-dessus.
                    </p>

                    <h2 id="5">5. Réservations et annulations</h2>
                    <p>
                        Les utilisateurs peuvent réserver des créneaux proposés par les praticiens. Les conditions
                        d'annulation peuvent être définies par chaque praticien : vérifiez toujours les conditions
                        affichées lors de la réservation.
                    </p>

                    <h2 id="6">6. Paiements et remboursement</h2>
                    <p>
                        Pour le présent MVP, les services principaux sont gratuits. Si à l'avenir des services
                        payants étaient proposés, les modalités de paiement et de remboursement seraient précisées
                        de manière transparente lors du processus d'achat.
                    </p>

                    <h2 id="7">7. Confidentialité et sécurité</h2>
                    <p>
                        Mindcare prend la sécurité et la confidentialité au sérieux. Vos données sont stockées
                        conformément à notre Politique de Confidentialité. Pour consulter les détails sur la
                        collecte, l'utilisation et la protection des données, rendez-vous sur la page
                        <a href="/confidentialite" className="ml-1 text-primary hover:underline">Politique de Confidentialité</a>.
                    </p>

                    <h2 id="8">8. Responsabilités</h2>
                    <p>
                        Mindcare fournit la plateforme et les outils de mise en relation ; les praticiens sont
                        indépendants et responsables de leurs consultations. Mindcare ne remplace pas un avis
                        médical professionnel. En aucun cas la plateforme ne saurait être tenue responsable de
                        dommages directs ou indirects résultant d'une utilisation inappropriée des services.
                    </p>

                    <h2 id="9">9. Propriété intellectuelle</h2>
                    <p>
                        Tous les contenus présents sur Mindcare (textes, images, logos, code) sont la propriété
                        de Mindcare ou de ses partenaires et sont protégés. Toute reproduction non autorisée est
                        interdite.
                    </p>

                    <h2 id="10">10. Modération et conduite</h2>
                    <p>
                        Les utilisateurs s'engagent à adopter un comportement respectueux. Mindcare se réserve
                        le droit de supprimer ou de suspendre tout compte en cas de non-respect des présentes
                        conditions ou de comportements inappropriés.
                    </p>

                    <h2 id="11">11. Durée et résiliation</h2>
                    <p>
                        Ces CGU/CGV sont applicables tant que vous utilisez la plateforme. Vous pouvez supprimer
                        votre compte à tout moment. Mindcare peut suspendre ou supprimer un compte en cas de
                        violation des règles.
                    </p>

                    <h2 id="12">12. Évolution des conditions</h2>
                    <p>
                        Mindcare peut modifier ces conditions. Les nouvelles versions seront publiées sur le site
                        et entreront en vigueur selon les modalités indiquées. Il est conseillé de consulter
                        régulièrement cette page.
                    </p>

                    <h2 id="13">13. Droit applicable & juridiction</h2>
                    <p>
                        Ces CGU/CGV sont régies par le droit français. En cas de litige, les tribunaux compétents
                        seront ceux du ressort du siège social de Mindcare, dans la mesure permise par la loi.
                    </p>

                    <h2 id="14">14. Contact</h2>
                    <p>
                        Pour toute question relative aux présentes conditions, contactez-nous via :
                    </p>
                    <ul>
                        <li>Email : <a href="mailto:support@mindcare.example" className="text-primary hover:underline">support@mindcare.fr</a></li>
                        <li>Adresse : 3 place jules guesn, 13001 Marseille</li>
                    </ul>
                </main>
            </Suspense>
        </AnonymousLayout>
    )
}
