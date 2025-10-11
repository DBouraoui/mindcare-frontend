import {AnonymousLayout} from "@/components/layout/Anonymous-layout";
import {Suspense} from "react";
import {Badge} from "@/components/ui/badge";


export default function Home() {
    return (
        <div>
            <AnonymousLayout>
              <Suspense>
                  <section className="py-32">
                      <div className="container">
                          <div className="grid gap-9 lg:grid-cols-2">
                              <div className="flex flex-col gap-5">
                                  <Badge variant="outline" className="bg-background gap-1.5">
                                      <span className="size-1.5 rounded-full bg-green-500" />
                                      Confidentialité
                                  </Badge>
                                  <h1 className="text-balance text-4xl font-medium lg:text-5xl">
                                      Sécurité et protection de vos données personnelles
                                  </h1>
                                  <p className="text-muted-foreground text-lg">
                                      Chez Mindcare, votre bien-être commence par la confiance. Toutes vos
                                      données — qu’il s’agisse de vos rendez-vous, de vos échanges ou de vos
                                      exercices — sont protégées et chiffrées selon les plus hauts standards
                                      de sécurité. Nous respectons strictement le RGPD et les normes de
                                      confidentialité médicale.
                                  </p>
                                  <div className="flex items-center gap-6">
                                      <img
                                          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/compliance/GDPR.svg"
                                          alt="RGPD"
                                          className="h-22 opacity-50 grayscale md:h-28 dark:invert"
                                      />
                                      <img
                                          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/compliance/CCPA.svg"
                                          alt="Données sécurisées"
                                          className="h-22 opacity-60 grayscale md:h-28 dark:invert"
                                      />
                                  </div>
                              </div>

                              <div className="border-border bg-background rounded-2xl border">
                                  <div className="border-border relative overflow-hidden border-b p-6 lg:px-8 lg:py-11">
                                      <div>
                                          <h2 className="text-xl font-medium lg:text-2xl">
                                              Données chiffrées et anonymisées
                                          </h2>
                                          <p className="text-muted-foreground mt-2 w-3/4 pr-10 text-sm md:text-base">
                                              Vos informations sont stockées sur des serveurs sécurisés et
                                              chiffrées de bout en bout. Les données sensibles sont anonymisées
                                              afin de garantir une totale confidentialité.
                                          </p>
                                      </div>
                                      <img
                                          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/compliance/ISO-27001.svg"
                                          alt="Sécurité des données"
                                          className="text-muted-foreground absolute -bottom-7 right-4 size-24 opacity-80 grayscale lg:right-8 lg:size-32 dark:invert"
                                      />
                                  </div>

                                  <div className="relative overflow-hidden p-6 lg:px-8 lg:py-11">
                                      <div>
                                          <h2 className="text-xl font-medium lg:text-2xl">
                                              Surveillance continue
                                          </h2>
                                          <p className="text-muted-foreground mt-2 w-3/4 pr-10 text-sm md:text-base">
                                              Nos systèmes sont surveillés en temps réel pour prévenir toute
                                              tentative d’intrusion ou d’accès non autorisé. Chaque action
                                              sensible est enregistrée et vérifiée automatiquement.
                                          </p>
                                      </div>
                                      <img
                                          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/compliance/ISO-27017.svg"
                                          alt="Protection continue"
                                          className="text-muted-foreground absolute -bottom-7 right-4 size-24 opacity-80 grayscale lg:right-8 lg:size-32 dark:invert"
                                      />
                                  </div>

                                  <div className="border-border relative overflow-hidden border-t p-6 lg:px-8 lg:py-11">
                                      <div>
                                          <h2 className="text-xl font-medium lg:text-2xl">
                                              Transparence et contrôle
                                          </h2>
                                          <p className="text-muted-foreground mt-2 w-3/4 pr-10 text-sm md:text-base">
                                              Vous gardez le contrôle total sur vos données. Vous pouvez à tout
                                              moment consulter, modifier ou supprimer vos informations depuis
                                              votre espace personnel, en toute simplicité.
                                          </p>
                                      </div>
                                      <img
                                          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/compliance/ISO-27018.svg"
                                          alt="Transparence et contrôle"
                                          className="text-muted-foreground absolute -bottom-7 right-4 size-24 opacity-80 grayscale lg:right-8 lg:size-32 dark:invert"
                                      />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </section>

              </Suspense>
            </AnonymousLayout>
        </div>
    );
}
