import {AnonymousLayout} from "@/components/layout/Anonymous-layout";
import {HeroSection} from "@/components/blocks-landingpage/Hero-section";
import {FeaturesSection} from "@/components/blocks-landingpage/Features-section";
import {WorkflowSection} from "@/components/blocks-landingpage/Workflow-section";
import {PricingSection} from "@/components/blocks-landingpage/Price-section";
import {FaqSection} from "@/components/blocks-landingpage/Faq-section";
import {Suspense} from "react";


export default function Home() {
    return (
   <div>
       <AnonymousLayout>
        <Suspense>
            <HeroSection />
            <FeaturesSection />
            <WorkflowSection  />
            <PricingSection />
            <FaqSection />
        </Suspense>
       </AnonymousLayout>
   </div>
  );
}
