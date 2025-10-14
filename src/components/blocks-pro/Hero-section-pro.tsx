import {UserPlus} from "lucide-react";

import { Button } from "@/components/ui/button";

interface Hero47Props {
    heading?: string;
    subheading?: string;
    description?: string;
    image?: {
        src: string;
        alt: string;
    };
    buttons?: {
        primary?: {
            text: string;
            url: string;
        };
        secondary?: {
            text: string;
            url: string;
        };
    };
}

export const HeroSectionPro = ({
                    heading = "Mindcare PRO",
                    subheading = " Votre clientèle vous attend",
                    description = "Une platforme entièrement dédier au professionel, pratiquer en toute séréniter",
                    buttons = {
                        primary: {
                            text: "Je commence maintenant",
                            url: "#",
                        },
                    },
                    image = {
                        src: "logo-mindcare.png",
                        alt: "Placeholder",
                    },
                }: Hero47Props) => {
    return (
        <section className="bg-background py-20 lg:py-32">
            <div className="container flex flex-col items-center gap-10 lg:my-0 lg:flex-row">
                <div className="flex flex-col gap-7 lg:w-2/3">
                    <h2 className="text-foreground text-5xl font-semibold md:text-5xl lg:text-8xl">
                        <span>{heading}</span>
                        <span className="text-muted-foreground">{subheading}</span>
                    </h2>
                    <p className="text-muted-foreground text-base md:text-lg lg:text-xl">
                        {description}
                    </p>
                    <div className="flex flex-wrap items-start gap-5 lg:gap-7">
                        <Button asChild>
                            <a href={buttons.primary?.url}>
                                <div className="flex items-center gap-2">
                                    <UserPlus className="size-4" />
                                </div>
                                <span className="whitespace-nowrap pl-4 pr-6 text-sm lg:pl-6 lg:pr-8 lg:text-base">
                  {buttons.primary?.text}
                </span>
                            </a>
                        </Button>
                        <Button asChild variant="link" className="underline">
                            <a href={buttons.secondary?.url}>{buttons.secondary?.text}</a>
                        </Button>
                    </div>
                </div>
                <div className="relative z-10">
                    <div className="left-1/2! pt-40  w-[69%]! absolute top-2.5 -translate-x-[52%] overflow-hidden rounded-[35px]">
                        <img
                            src={image.src}
                            alt={image.alt}
                            height={350}
                            width={350}
                        />
                    </div>
                    <img
                        className="relative z-10"
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mockups/phone-2.png"
                        width={450}
                        height={889}
                        alt="iphone"
                    />
                </div>
            </div>
        </section>
    );
};
