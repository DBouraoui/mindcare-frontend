import {AnonymousLayout} from "@/components/layout/Anonymous-layout";
import {Suspense} from "react";
import {TeamSection} from "@/components/blocks/team-section";
import {Badge} from "@/components/ui/badge"

export default function Home(){
    return <>
    <AnonymousLayout>
        <Suspense>
            <section className="py-24 border-t border-border">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <Badge variant="outline" className="mb-6">
                        Projet étudiant
                    </Badge>

                    <h2 className="text-3xl font-semibold mb-4">
                        Un projet académique porté par la passion et la créativité
                    </h2>

                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                        Ce projet, intitulé <strong>MindCare</strong>, a été réalisé dans le cadre de ma deuxième année à
                        <strong> Epitech</strong>. Il s’agit d’un <strong>projet de fin d’année</strong> visant à concevoir une
                        plateforme web moderne autour du bien-être mental et de l’accompagnement psychologique en ligne.
                    </p>

                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                        L’objectif est de démontrer nos compétences en <strong>développement full-stack</strong>,
                        en conception d’interfaces utilisateur, et en intégration de bonnes pratiques
                        de sécurité et de performance. MindCare n’est pas un service commercial — il s’agit d’un projet d’étude,
                        conçu à des fins pédagogiques uniquement.
                    </p>

                    <div className="text-sm text-muted-foreground max-w-2xl mx-auto">
                        Ce projet a été réalisé avec <strong>Next.js</strong>, <strong>TypeScript</strong>, <strong>TailwindCSS</strong>,
                        et les composants <strong>shadcn/ui</strong>.
                        Le design et les fonctionnalités ont été pensés pour refléter les standards modernes du web,
                        tout en respectant les valeurs de clarté et de bienveillance.
                    </div>
                </div>
            </section>
            <TeamSection />
        </Suspense>
    </AnonymousLayout>
    </>
}