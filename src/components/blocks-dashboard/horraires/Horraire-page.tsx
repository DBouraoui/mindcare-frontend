"use client"

import DisplaySchedules from "@/app/dashboard/horraires/Display-schedules";

export default function HorrairePage() {
    return (
        <>
            <section className="w-full flex justify-center">
                <main className="container max-w-4xl flex flex-col gap-6">
                    <p>Je suis une page horraires</p>
                    <DisplaySchedules />
                </main>
            </section>
        </>
    )
}