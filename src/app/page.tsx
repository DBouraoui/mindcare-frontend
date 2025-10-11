import {AnonymousLayout} from "@/components/layout/Anonymous-layout";
import {HeroSection} from "@/components/blocks/Hero-section";
import {FeaturesSection} from "@/components/blocks/features-section";
import {WorkflowSection} from "@/components/blocks/Workflow-section";
import {PricingSection} from "@/components/blocks/Price-section";
import {FaqSection} from "@/components/blocks/Faq-section";


export default function Home() {
    return (
   <div>
       <AnonymousLayout>
           <HeroSection />
           <FeaturesSection />
            <WorkflowSection  />
           <PricingSection />
           <FaqSection />
       </AnonymousLayout>
   </div>
  );
}
