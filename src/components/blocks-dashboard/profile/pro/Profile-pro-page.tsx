"use client"

import InformationsProSection from "@/components/blocks-dashboard/profile/pro/Informations-pro-section";

export default function ProfileProPage() {


    return (
        <>
            <section className="w-full flex justify-center">
                <main className="container max-w-4xl flex flex-col gap-6">
                    <InformationsProSection />
                </main>
            </section>
        </>
    )
}