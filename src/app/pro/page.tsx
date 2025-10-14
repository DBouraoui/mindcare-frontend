import {AnonymousLayout} from "@/components/layout/Anonymous-layout";
import {Suspense} from "react";
import {HeroSectionPro} from "@/components/blocks-pro/Hero-section-pro";
import {WorkflowSectionPro} from "@/components/blocks-pro/Workflow-section-pro";
import {ImpactSectionPro} from "@/components/blocks-pro/Impact-section-pro";
import {PerformSectionPro} from "@/components/blocks-pro/Perform-section-pro";
import {PricingSectionPro} from "@/components/blocks-pro/Pricing-section-pro";
import {FaqSectionPro} from "@/components/blocks-pro/Faq-section-pro";

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