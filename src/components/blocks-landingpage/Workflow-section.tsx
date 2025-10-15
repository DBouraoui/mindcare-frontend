
import {CalendarCheck, Heart, Video, Activity} from "lucide-react";

export const WorkflowSection = () => {
    const services = [
        {
            icon: <CalendarCheck className="h-6 w-6" />,
            title: "Réservation",
            description:
                "Choisissez rapidement un praticien et planifiez votre rendez-vous en quelques clics, selon vos disponibilités.",
            items: ["Choix du praticien", "Sélection du créneau", "Confirmation instantanée"],
        },
        {
            icon: <Activity className="h-6 w-6" />,
            title: "Exercices",
            description:
                "Accédez à des exercices guidés pour améliorer votre bien-être mental et physique, adaptés à votre rythme.",
            items: ["Respiration & méditation", "Relaxation guidée", "Suivi quotidien"],
        },
        {
            icon: <Video className="h-6 w-6" />,
            title: "VisioConférence",
            description:
                "Discutez en toute sécurité avec votre praticien depuis votre domicile ou votre bureau, via notre plateforme intégrée.",
            items: ["Connexion sécurisée", "Partage de documents", "Historique des rendez-vous"],
        },
        {
            icon: <Heart className="h-6 w-6" />,
            title: "Suivi & Conseils",
            description:
                "Suivez vos progrès, consultez vos statistiques personnelles et recevez des recommandations personnalisées.",
            items: ["Historique des rendez-vous", "Évolution de votre bien-être", "Notifications & rappels"],
        },
    ];

    const header = {
        title:"Comment Mindcare vous accompagne",
        subtitle:"Découvrez comment notre plateforme vous aide à réserver vos rendez-vous, suivre vos exercices, profiter des visioconférences avec vos praticiens et garder un œil sur votre bien-être au quotidien.\n"
    }

    return (
        <section className="py-32" id="workflow">
            <div className="container">
                <div className="mx-auto max-w-6xl space-y-12">
                    <div className="space-y-4 text-center">
                        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl text-foreground text-center">
                            {header.title}
                        </h2>
                        <p className="text-muted-foreground mx-auto max-w-2xl text-lg tracking-tight md:text-xl text-center">
                            {header.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="border-border space-y-6 rounded-lg border p-8 transition-shadow hover:shadow-sm"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="bg-muted rounded-full p-3">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold">{service.title}</h3>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    {service.description}
                                </p>
                                <div className="space-y-2">
                                    {service.items.map((item, itemIndex) => (
                                        <div key={itemIndex} className="flex items-center gap-2">
                                            <div className="bg-foreground h-1.5 w-1.5 rounded-full" />
                                            <span className="text-sm font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
