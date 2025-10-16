"use client"

import EmailSection from "@/components/blocks-dashboard/profile/Email-section";
import PasswordSection from "@/components/blocks-dashboard/profile/Password-section";
import InformationSection from "@/components/blocks-dashboard/profile/Information-section";

export default function ProfilePage() {
    return (
        <>
            <section className="w-full flex justify-center">
                <main className="container max-w-4xl flex flex-col gap-6">
                    <EmailSection />
                    <InformationSection />
                    <PasswordSection />
                </main>
            </section>
        </>
    )
}