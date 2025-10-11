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

export const defaultFeatures = [
    ["Prise de RDV illimitée", "Accès aux praticiens certifiés", "Support 24/7"],
    ["Exercices guidés", "Suivi personnalisé", "Accès aux articles du blog"],
    ["VisioConférence sécurisée", "Accès à la communauté", "Plateforme 100% gratuite à vie"],
]

export const PricingSection = ({
                      heading = "Gratuit et pour toujours",
                      description = "La santée n'a pas de prix",
                      price = 0,
                      priceSuffix = "/mois",
                      features = defaultFeatures,
                      buttonText = "Commencer l'inscription",
                  }: Pricing6Props) => {
    return (
        <section className="py-32">
            <div className="container">
                <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
                    <h2 className="text-pretty text-4xl font-semibold lg:text-6xl">
                        {heading}
                    </h2>
                    <p className="text-muted-foreground max-w-md lg:text-xl">
                        {description}
                    </p>
                    <div className="mx-auto flex w-full flex-col rounded-lg border p-6 sm:w-fit sm:min-w-80">
                        <div className="flex justify-center">
                            <span className="text-6xl font-semibold">{price}</span>
                            <span className="text-lg font-semibold">€</span>
                            <span className="text-muted-foreground self-end">
                {priceSuffix}
              </span>
                        </div>
                        <div className="my-6">
                            {features.map((featureGroup, idx) => (
                                <div key={idx}>
                                    <ul className="flex flex-col gap-3">
                                        {featureGroup.map((feature, i) => (
                                            <li
                                                key={i}
                                                className="flex items-center justify-between gap-2 text-sm font-medium"
                                            >
                                                {feature} <Check className="inline size-4 shrink-0" />
                                            </li>
                                        ))}
                                    </ul>
                                    {idx < features.length - 1 && <Separator className="my-6" />}
                                </div>
                            ))}
                        </div>
                        <Button>{buttonText}</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
