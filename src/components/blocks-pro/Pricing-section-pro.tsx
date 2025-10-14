import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Pricing6Props {
    heading?: string;
    description?: string;
    price?: string | number;
    priceSuffix?: string;
    features?: string[][];
    buttonText?: string;
}

const defaultFeatures = [
    [
        "Gestion simplifiée des rendez-vous et patients",
        "Fiches patients sécurisées (RGPD)",
        "Messagerie interne confidentielle",
    ],
    [
        "Paiements en ligne et facturation automatique",
        "Statistiques d’activité et revenus mensuels",
        "Support technique prioritaire",
    ],
    [
        "Visioconférences intégrées",
        "Synchronisation agenda (Google, Outlook)",
        "Accès multi-appareils (web, mobile, tablette)",
    ],
];

export const PricingSectionPro = ({
                                      heading = "Abonnement Mindcare Pro",
                                      description = "Pensé pour les praticiens : une seule plateforme pour gérer vos consultations, patients et revenus en toute simplicité.",
                                      price = 39,
                                      priceSuffix = "€/mois",
                                      features = defaultFeatures,
                                      buttonText = "Essayer gratuitement 7 jours",
                                  }: Pricing6Props) => {
    return (
        <section className="py-32">
            <div className="container">
                <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
                    <h2 className="text-pretty text-4xl font-semibold lg:text-6xl text-primary">
                        {heading}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl lg:text-lg">
                        {description}
                    </p>
                    <div className="mx-auto flex w-full flex-col rounded-2xl border border-border bg-background p-8 shadow-sm sm:w-fit sm:min-w-96">
                        <div className="flex justify-center items-end gap-1">
                            <span className="text-5xl font-bold">{price}</span>
                            <span className="text-muted-foreground mb-2 text-sm">
                {priceSuffix}
              </span>
                        </div>

                        <div className="my-8">
                            {features.map((featureGroup, idx) => (
                                <div key={idx}>
                                    <ul className="flex flex-col gap-3 text-left">
                                        {featureGroup.map((feature, i) => (
                                            <li
                                                key={i}
                                                className="flex items-center justify-between gap-2 text-sm font-medium text-muted-foreground"
                                            >
                                                {feature} <Check className="inline size-4 text-primary shrink-0" />
                                            </li>
                                        ))}
                                    </ul>
                                    {idx < features.length - 1 && <Separator className="my-6" />}
                                </div>
                            ))}
                        </div>

                        <Button size="lg" className="w-full text-base font-semibold">
                            {buttonText}
                        </Button>

                        <p className="mt-4 text-xs text-muted-foreground">
                            Sans engagement — annulez à tout moment.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
