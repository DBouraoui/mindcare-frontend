import { Separator } from "@/components/ui/separator"
import { Building2, HeartPulse, SmilePlus } from "lucide-react"

export const ImpactSectionPro = () => {
    return (
        <section className="py-32">
            <div className="container">
                <div className="flex flex-col gap-6 text-center">
                    <p className="font-medium text-primary">Plus de 250 praticiens accompagnés</p>
                    <h2 className="text-4xl font-medium md:text-5xl">
                        Des résultats concrets pour vos patients
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Mindcare Pro aide les praticiens à suivre l’évolution de leurs patients, améliorer l’efficacité des consultations et renforcer l’engagement thérapeutique grâce à des outils simples et sécurisés.
                    </p>
                </div>

                <div className="mt-20">
                    <div className="grid gap-16 lg:grid-cols-3 xl:gap-24">
                        <div className="border-border flex flex-col gap-10 sm:flex-row lg:col-span-2 lg:border-r lg:pr-16 xl:pr-24">
                            <img
                                src="picture-two.jpeg"
                                alt="témoignage praticien Mindcare"
                                className="aspect-29/35 h-full w-full max-w-60 rounded-2xl object-cover"
                            />
                            <div className="flex h-full flex-col justify-between gap-10">
                                <q className="sm:text-xl leading-relaxed">
                                    Depuis que j’utilise Mindcare, mes patients sont plus engagés et réguliers dans leurs suivis. Les séances sont mieux préparées et les progrès facilement mesurables.
                                </q>
                                <div className="flex items-end gap-6">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-primary text-lg font-semibold">
                                            Dr. Camille Dubois
                                        </p>
                                        <p className="text-muted-foreground">Psychologue clinicienne</p>
                                    </div>
                                    <Building2 className="text-primary h-8 w-8" />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-10 self-center lg:flex-col">
                            <div className="flex flex-col gap-2">
                                <p className="text-primary text-4xl font-medium sm:text-5xl">92%</p>
                                <p className="text-primary font-semibold">
                                    de patients plus réguliers dans leur suivi
                                </p>
                                <p className="text-muted-foreground">
                                    selon nos indicateurs internes
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-primary text-4xl font-medium sm:text-5xl">3.5x</p>
                                <p className="text-primary font-semibold">
                                    amélioration de l’engagement thérapeutique
                                </p>
                                <p className="text-muted-foreground">
                                    mesurée sur plusieurs mois de suivi
                                </p>
                            </div>
                        </div>
                    </div>

                    <Separator className="my-20" />

                    <div className="grid gap-16 lg:grid-cols-3 xl:gap-24">
                        <div className="border-border flex flex-col gap-10 sm:flex-row lg:col-span-2 lg:border-r lg:pr-16 xl:pr-24">
                            <img
                                src="picture-one.jpeg"
                                alt="témoignage praticien Mindcare"
                                className="aspect-29/35 h-full w-full max-w-60 rounded-2xl object-cover"
                            />
                            <div className="flex h-full flex-col justify-between gap-10">
                                <q className="sm:text-xl leading-relaxed">
                                    Mindcare m’a permis de détecter rapidement les signes de fatigue ou de découragement chez mes patients et d’adapter mes séances en conséquence. C’est un véritable outil d’accompagnement.
                                </q>
                                <div className="flex items-end gap-6">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-primary text-lg font-semibold">
                                            Dr. Antoine Leclerc
                                        </p>
                                        <p className="text-muted-foreground">Psychothérapeute</p>
                                    </div>
                                    <HeartPulse className="text-primary h-8 w-8" />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-10 self-center lg:flex-col">
                            <div className="flex flex-col gap-2">
                                <p className="text-primary text-4xl font-medium sm:text-5xl">68%</p>
                                <p className="text-primary font-semibold">
                                    réduction du stress perçu
                                </p>
                                <p className="text-muted-foreground">
                                    chez les patients en 8 semaines
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-primary text-4xl font-medium sm:text-5xl">+45%</p>
                                <p className="text-primary font-semibold">
                                    d’engagement thérapeutique
                                </p>
                                <p className="text-muted-foreground">
                                    observé après 3 mois d’utilisation
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}