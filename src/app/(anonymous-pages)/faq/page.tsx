"use client"

import { AnonymousLayout } from "@/components/layout/Anonymous-layout"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Suspense } from "react"

export default function FAQPage() {
    return (
        <AnonymousLayout>
            <Suspense>
                <section className="container mx-auto px-4 py-16 max-w-3xl">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-semibold mb-4">Foire aux questions</h1>
                        <p className="text-muted-foreground text-lg">
                            Retrouvez ici les réponses aux questions les plus courantes à propos de MindCare.
                        </p>
                    </div>

                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {/* 1 */}
                        <AccordionItem value="faq-1" className="border rounded-lg px-4">
                            <AccordionTrigger className="text-left text-lg font-medium">
                                MindCare est-elle vraiment gratuite ?
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                Oui, l’accès à MindCare est entièrement gratuit, sans frais cachés ni abonnement obligatoire.
                                Nous croyons que le bien-être mental doit être accessible à tous. Certaines fonctionnalités
                                optionnelles (comme la mise en avant des praticiens) pourront toutefois être payantes à l’avenir.
                            </AccordionContent>
                        </AccordionItem>

                        {/* 2 */}
                        <AccordionItem value="faq-2" className="border rounded-lg px-4">
                            <AccordionTrigger className="text-left text-lg font-medium">
                                Comment puis-je réserver un rendez-vous avec un praticien ?
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                Vous pouvez rechercher un praticien selon sa spécialité, sa localisation ou ses disponibilités.
                                Une fois trouvé, vous pouvez réserver directement en ligne via le calendrier intégré.
                                Une confirmation vous sera envoyée par e-mail.
                            </AccordionContent>
                        </AccordionItem>

                        {/* 3 */}
                        <AccordionItem value="faq-3" className="border rounded-lg px-4">
                            <AccordionTrigger className="text-left text-lg font-medium">
                                Les échanges avec les praticiens sont-ils confidentiels ?
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                Absolument. Toutes les communications sont sécurisées et chiffrées. MindCare respecte les normes
                                européennes de protection des données (RGPD) et ne partage jamais vos informations personnelles
                                sans votre consentement explicite.
                            </AccordionContent>
                        </AccordionItem>

                        {/* 4 */}
                        <AccordionItem value="faq-4" className="border rounded-lg px-4">
                            <AccordionTrigger className="text-left text-lg font-medium">
                                Puis-je annuler ou modifier un rendez-vous ?
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                Oui, vous pouvez modifier ou annuler un rendez-vous directement depuis votre espace personnel,
                                jusqu’à 24h avant l’heure prévue. Passé ce délai, il est conseillé de contacter le praticien
                                directement via la messagerie interne.
                            </AccordionContent>
                        </AccordionItem>

                        {/* 5 */}
                        <AccordionItem value="faq-5" className="border rounded-lg px-4">
                            <AccordionTrigger className="text-left text-lg font-medium">
                                Comment les praticiens sont-ils sélectionnés ?
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                Tous les praticiens inscrits sur MindCare sont vérifiés manuellement. Nous demandons des justificatifs
                                (diplômes, certifications, enregistrements professionnels) avant validation de leur profil.
                            </AccordionContent>
                        </AccordionItem>

                        {/* 6 */}
                        <AccordionItem value="faq-6" className="border rounded-lg px-4">
                            <AccordionTrigger className="text-left text-lg font-medium">
                                Puis-je utiliser MindCare sur mon téléphone ?
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                Bien sûr ! MindCare est entièrement responsive et fonctionne sur mobile, tablette et ordinateur.
                                Une application mobile native est également prévue dans les prochains mois.
                            </AccordionContent>
                        </AccordionItem>

                        {/* 7 */}
                        <AccordionItem value="faq-7" className="border rounded-lg px-4">
                            <AccordionTrigger className="text-left text-lg font-medium">
                                Je suis praticien, comment puis-je rejoindre la plateforme ?
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                Rendez-vous sur la page d’inscription et choisissez le rôle “Praticien”.
                                Vous pourrez ensuite compléter votre profil, ajouter vos spécialités, et définir vos disponibilités.
                            </AccordionContent>
                        </AccordionItem>

                        {/* 8 */}
                        <AccordionItem value="faq-8" className="border rounded-lg px-4">
                            <AccordionTrigger className="text-left text-lg font-medium">
                                Mes données sont-elles partagées avec les praticiens ?
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                Seules les informations nécessaires à la prise de rendez-vous (nom, prénom, coordonnées)
                                sont partagées avec le praticien choisi. Vos données médicales restent strictement confidentielles.
                            </AccordionContent>
                        </AccordionItem>

                        {/* 9 */}
                        <AccordionItem value="faq-9" className="border rounded-lg px-4">
                            <AccordionTrigger className="text-left text-lg font-medium">
                                Puis-je supprimer mon compte à tout moment ?
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                Oui, vous pouvez demander la suppression définitive de votre compte depuis les paramètres de votre profil.
                                Toutes vos données seront effacées de manière sécurisée sous 30 jours, conformément au RGPD.
                            </AccordionContent>
                        </AccordionItem>

                        {/* 10 */}
                        <AccordionItem value="faq-10" className="border rounded-lg px-4">
                            <AccordionTrigger className="text-left text-lg font-medium">
                                Comment contacter le support MindCare ?
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                Vous pouvez nous contacter à tout moment à l’adresse suivante :{" "}
                                <a href="mailto:support@mindcare.app" className="text-primary underline">
                                    support@mindcare.app
                                </a>.
                                Notre équipe vous répondra généralement sous 24 heures.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>
            </Suspense>
        </AnonymousLayout>
    )
}
