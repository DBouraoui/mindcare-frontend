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

export const FaqSection = ({
                               heading= "Questions fréquentes",
                               items= [
                                   {
                                       id: "faq-1",
                                       question: "Mindcare est-il vraiment gratuit ?",
                                       answer:
                                       "Oui ! Mindcare est entièrement gratuit à vie. Toutes les fonctionnalités principales, comme la prise de RDV, les exercices guidés et la visioconférence, sont accessibles sans frais.",
                                   },
                                   {
                                       id: "faq-2",
                                       question: "Comment réserver un rendez-vous avec un praticien ?",
                                       answer:
                                       "Vous pouvez parcourir la liste des praticiens disponibles, choisir votre créneau horaire et confirmer votre réservation en quelques clics directement depuis la plateforme.",
                                   },
                                   {
                                       id: "faq-3",
                                       question: "Puis-je accéder aux exercices guidés sans rendez-vous ?",
                                       answer:
                                       "Absolument ! Tous les exercices sont accessibles directement depuis votre espace utilisateur, même si vous n'avez pas encore réservé de rendez-vous.",
                                   },
                                   {
                                       id: "faq-4",
                                       question: "Comment fonctionne la visioconférence avec un praticien ?",
                                       answer:
                                       "La visioconférence se fait directement depuis la plateforme de manière sécurisée. Vous recevrez un lien de connexion après avoir confirmé votre rendez-vous.",
                                   },
                                   {
                                       id: "faq-5",
                                       question: "Mes données sont-elles sécurisées ?",
                                       answer:
                                       "Oui. Mindcare respecte les standards de sécurité et de confidentialité. Toutes vos informations personnelles et rendez-vous sont protégés et ne sont pas partagés sans votre consentement.",
                                   },
                                   {
                                       id: "faq-6",
                                       question: "Puis-je suivre mes progrès au fil du temps ?",
                                       answer:
                                       "Oui ! Mindcare vous permet de suivre vos rendez-vous, vos exercices complétés et de recevoir des recommandations personnalisées pour votre bien-être.",
                                   },
                                   {
                                       id: "faq-7",
                                       question: "Puis-je contacter un support si j’ai un problème ?",
                                       answer:
                                       "Bien sûr ! Nous disposons d’un support disponible 24/7 pour répondre à vos questions et vous aider à résoudre tout problème que vous pourriez rencontrer.",
                                   },
                               ],
              }: Faq1Props) => {
    return (
        <section className="w-full items-center justify-center">
            <div className="container  justify-center items-center">
                <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-4xl">
                    {heading}
                </h1>
                <Accordion type="single" collapsible>
                    {items.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="font-semibold hover:no-underline">
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
