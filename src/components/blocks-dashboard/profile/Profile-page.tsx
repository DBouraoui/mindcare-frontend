"use client"

import EmailSection from "@/components/blocks-dashboard/profile/Email-section";
import PasswordSection from "@/components/blocks-dashboard/profile/Password-section";
import InformationSection from "@/components/blocks-dashboard/profile/Information-section";

export default function ProfilePage() {
    return (
        <>
                    <InformationSection />
                    <EmailSection />
                    <PasswordSection />
        </>
    )
}