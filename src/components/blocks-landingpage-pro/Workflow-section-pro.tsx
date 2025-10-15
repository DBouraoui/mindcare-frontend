import {
    BarChart3,
     Clock,
     Headphones,
     Lightbulb, MonitorSmartphone,
     ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface Feature {
    heading: string;
    description: string;
    icon: React.ReactNode;
}

interface Feature43Props {
    title?: string;
    features?: Feature[];
    buttonText?: string;
    buttonUrl?: string;
}

export const WorkflowSectionPro = ({
                                       title = "Une solution complète et professionnelle pour les praticiens en santé mentale",
                                       features = [
                                           {
                                               heading: "Fiabilité & sécurité",
                                               description:
                                                   "Mindcare est conçu pour les praticiens exigeants : infrastructure sécurisée, conformité RGPD et hébergement en Europe. Les données de vos patients sont protégées avec le plus haut niveau de confidentialité.",
                                               icon: <ShieldCheck className="size-6" />,
                                           },
                                           {
                                               heading: "Expérience utilisateur fluide",
                                               description:
                                                   "Interface claire, moderne et intuitive pour vous et vos patients. Aucune formation longue nécessaire, prise en main immédiate pour gérer vos rendez-vous et suivis.",
                                               icon: <MonitorSmartphone className="size-6" />,
                                           },
                                           {
                                               heading: "Accompagnement dédié",
                                               description:
                                                   "Support réactif et humain. Notre équipe vous accompagne dans la configuration, la personnalisation et l’optimisation de vos consultations et suivis patients.",
                                               icon: <Headphones className="size-6" />,
                                           },
                                           {
                                               heading: "Innovation continue",
                                               description:
                                                   "Mindcare évolue selon les besoins des praticiens : nouvelles fonctionnalités, outils de suivi et recommandations basées sur les dernières recherches en psychologie et bien-être.",
                                               icon: <Lightbulb className="size-6" />,
                                           },
                                           {
                                               heading: "Impact mesurable",
                                               description:
                                                   "Suivez vos indicateurs clés : nombre de consultations, satisfaction patients, progression des suivis. Transformez ces données en décisions concrètes pour améliorer vos pratiques.",
                                               icon: <BarChart3 className="size-6" />,
                                           },
                                           {
                                               heading: "Gain de temps",
                                               description:
                                                   "Automatisez la planification, le suivi et la communication avec vos patients. Concentrez-vous sur l’essentiel : l’accompagnement humain et thérapeutique.",
                                               icon: <Clock className="size-6" />,
                                           },
                                       ],
                                       buttonText = "Commencer des à présent",
                       buttonUrl = "http://localhost:3000/inscription/pro",
                   }: Feature43Props) => {
    return (
        <section className="py-32">
            <div className="container">
                {title && (
                    <div className="mx-auto mb-16 max-w-3xl text-center">
                        <h2 className="text-pretty text-4xl font-medium lg:text-5xl">
                            {title}
                        </h2>
                    </div>
                )}
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, i) => (
                        <div key={i} className="flex flex-col">
                            <div className="bg-accent mb-5 flex size-16 items-center justify-center rounded-full">
                                {feature.icon}
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">{feature.heading}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
                {buttonUrl && (
                    <div className="mt-16 flex justify-center">
                        <Button size="lg" asChild>
                            <a href={buttonUrl}>{buttonText}</a>
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};
