import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

interface Faq1Props {
    heading?: string;
    items?: FaqItem[];
}

export const FaqSectionPro = ({
                  heading = "Questions fréquentes des praticiens",
                  items = [
                      {
                          id: "faq-1",
                          question: "Mindcare est-il conforme au RGPD ?",
                          answer:
                              "Oui. Mindcare est hébergé en France sur des serveurs sécurisés et conformes au RGPD. Toutes les données de vos patients sont chiffrées et stockées de manière confidentielle.",
                      },
                      {
                          id: "faq-2",
                          question: "Puis-je utiliser Mindcare pour mes consultations en ligne ?",
                          answer:
                              "Absolument. Mindcare intègre un module de visioconsultation sécurisé, sans installation nécessaire pour vos patients. Vous pouvez gérer vos rendez-vous et vos paiements en ligne directement depuis la plateforme.",
                      },
                      {
                          id: "faq-3",
                          question: "Combien de temps faut-il pour prendre en main l’outil ?",
                          answer:
                              "Mindcare a été conçu pour être simple et intuitif. En général, les praticiens sont opérationnels en moins de 15 minutes, sans formation nécessaire.",
                      },
                      {
                          id: "faq-4",
                          question: "Puis-je annuler mon abonnement à tout moment ?",
                          answer:
                              "Oui, bien sûr. L’abonnement est sans engagement. Vous pouvez annuler à tout moment depuis votre espace personnel, sans frais cachés.",
                      },
                      {
                          id: "faq-5",
                          question: "Est-ce que mes patients doivent créer un compte ?",
                          answer:
                              "Non. Vos patients peuvent réserver un rendez-vous ou échanger avec vous via un lien sécurisé, sans créer de compte. C’est simple et fluide pour eux.",
                      },
                      {
                          id: "faq-6",
                          question: "Mindcare propose-t-il une période d’essai gratuite ?",
                          answer:
                              "Oui, vous bénéficiez de 7 jours d’essai gratuit pour découvrir toutes les fonctionnalités sans carte bancaire. Vous pouvez décider ensuite de poursuivre ou non.",
                      },
                      {
                          id: "faq-7",
                          question: "Puis-je importer mes anciens patients ou mes rendez-vous existants ?",
                          answer:
                              "Oui. Vous pouvez importer vos contacts et vos rendez-vous en quelques clics depuis un fichier CSV ou directement depuis Google Calendar.",
                      },
                  ],
              }: Faq1Props) => {
    return (
        <section className="w-full items-center justify-center">
            <div className="container  justify-center items-center">
                <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-4xl text-center text-primary">
                    {heading}
                </h1>
                <Accordion type="single" collapsible>
                    {items.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="font-semibold hover:no-underline text-left">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
};
