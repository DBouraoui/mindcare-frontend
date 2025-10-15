import {AnonymousLayout} from "@/components/layout/Anonymous-layout";
import {Suspense} from "react";
import {HeroSectionPro} from "@/components/blocks-landingpage-pro/Hero-section-pro";
import {WorkflowSectionPro} from "@/components/blocks-landingpage-pro/Workflow-section-pro";
import {ImpactSectionPro} from "@/components/blocks-landingpage-pro/Impact-section-pro";
import {PerformSectionPro} from "@/components/blocks-landingpage-pro/Perform-section-pro";
import {PricingSectionPro} from "@/components/blocks-landingpage-pro/Pricing-section-pro";
import {FaqSectionPro} from "@/components/blocks-landingpage-pro/Faq-section-pro";

export default function Home() {
    return (
        <>
        <AnonymousLayout>
            <Suspense>
                <HeroSectionPro />
                <WorkflowSectionPro />
                <ImpactSectionPro />
                <PerformSectionPro />
                <PricingSectionPro />
                <FaqSectionPro />
            </Suspense>
        </AnonymousLayout>
        </>
    )
}