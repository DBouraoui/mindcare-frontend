import { ArrowRight } from "lucide-react";

interface Stats8Props {
    heading?: string;
    description?: string;
    link?: {
        text: string;
        url: string;
    };
    stats?: Array<{
        id: string;
        value: string;
        label: string;
    }>;
}

export const PerformSectionPro: React.FunctionComponent<Stats8Props> = ({
                    heading = "L’impact mesurable de Mindcare Pro",
                    description = "Des données concrètes qui illustrent l’efficacité de notre plateforme sur le bien-être et la performance des équipes.",
                    link = {
                        text: "Découvrir les études complètes",
                        url: "#",
                    },
                    stats = [
                        {
                            id: "stat-1",
                            value: "–68%",
                            label: "de stress moyen constaté après 8 semaines d’utilisation",
                        },
                        {
                            id: "stat-2",
                            value: "+45%",
                            label: "d’amélioration de l’engagement et de la motivation au travail",
                        },
                        {
                            id: "stat-3",
                            value: "3.5x",
                            label: "plus de cohésion d’équipe selon les enquêtes internes RH",
                        },
                        {
                            id: "stat-4",
                            value: "94%",
                            label: "des responsables RH recommandent Mindcare Pro à d’autres entreprises",
                        },
                    ],
                }: Stats8Props) => {
    return (
        <section className="py-32">
            <div className="container">
                <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold md:text-5xl text-primary">
                        {heading}
                    </h2>
                    <p className="text-muted-foreground text-lg">{description}</p>
                    <a
                        href={link.url}
                        className="inline-flex items-center gap-1 font-semibold text-primary hover:underline justify-center"
                    >
                        {link.text}
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>

                <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4 text-center">
                    {stats.map((stat) => (
                        <div key={stat.id} className="flex flex-col items-center gap-3">
                            <div className="text-5xl font-bold text-primary">{stat.value}</div>
                            <p className="text-muted-foreground max-w-[220px]">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
