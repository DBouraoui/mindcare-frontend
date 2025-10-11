import {
    BookOpen,
    CalendarCheck,
    Heart,
    LucideActivity,
    Users,
    Video,
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

export const FeaturesSection = ({
                       title = "Découvrez l'intégralité de nos features",
                                    features = [
                                        {
                                            heading: "Prise de RDV",
                                            description:
                                                "Réservez facilement vos rendez-vous avec nos praticiens et choisissez l’horaire qui vous convient en quelques clics.",
                                            icon: <CalendarCheck className="size-6" />,
                                        },
                                        {
                                            heading: "Exercices",
                                            description:
                                                "Accédez à des exercices guidés pour votre bien-être mental, adaptés à votre rythme et vos besoins.",
                                            icon: <LucideActivity className="size-6" />,
                                        },
                                        {
                                            heading: "VisioConférence",
                                            description:
                                                "Discutez en toute sécurité avec votre praticien via la visioconférence intégrée, où que vous soyez.",
                                            icon: <Video className="size-6" />,
                                        },
                                        {
                                            heading: "Blog",
                                            description:
                                                "Découvrez des articles et conseils pratiques pour améliorer votre santé mentale au quotidien.",
                                            icon: <BookOpen className="size-6" />,
                                        },
                                        {
                                            heading: "Communauté",
                                            description:
                                                "Rejoignez une communauté bienveillante pour échanger, partager vos expériences et trouver du soutien.",
                                            icon: <Users className="size-6" />,
                                        },
                                        {
                                            heading: "Suivi Santé",
                                            description:
                                                "Suivez vos progrès, vos habitudes et recevez des recommandations personnalisées pour prendre soin de vous.",
                                            icon: <Heart className="size-6" />,
                                        },
                                    ],
                       buttonText = "Découvrez en plus",
                       buttonUrl = "https://shadcnblocks.com",
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
