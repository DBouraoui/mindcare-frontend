"use client"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import {
    Sheet,
    SheetContent, SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {ModeToggle} from "@/components/ui/ModeToggle";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";

function ListItem({
                      title,
                      children,
                      href,
                      ...props
                  }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}
export const AnonymousNavbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <section className="w-full flex items-center justify-between px-4 py-3 border-b">
            <div className="font-bold text-xl">
                <Link href="/">Mindcare</Link>
            </div>

            <div className="hidden lg:flex items-center justify-center flex-1">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Menu principal</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-3">
                                        <NavigationMenuLink asChild>
                                            <Link
                                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                href="/"
                                            >
                                                <div className="mb-2 mt-4 text-lg font-medium">
                                                    Accueil
                                                </div>
                                                <p className="text-sm leading-tight text-muted-foreground">
                                                    Découvrez en plus sur votre futur communautée
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <ListItem href="/#features" title="Fonctionnalitées">
                                        Toutes les fonctionalité de notre logiciel à votre disposition
                                    </ListItem>
                                    <ListItem href="/#workflow" title="Accompagnement">
                                        Comment mindcare vous accompagne tout au long de votre parcour
                                    </ListItem>
                                    <ListItem href="/#price" title="Tarrification">
                                        Votre santé compte et ne doit pas être pris a la légère
                                    </ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Vos ressources</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                    {components.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            href={component.href}
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/docs" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors">
                                    Docs
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <ModeToggle />
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            {/* Menu Mobile - visible uniquement sur petit écran */}
            <div className="lg:hidden flex items-center gap-2">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTitle></SheetTitle>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[350px] pt-6">
                        <div className="flex flex-col h-full">
                            <div className="flex-1 overflow-y-auto pr-2 -mr-2">
                                <nav className="flex flex-col gap-2 mt-6">
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="accueil" className="border-none">
                                            <AccordionTrigger className="text-base font-medium py-3 hover:no-underline hover:bg-accent/50 px-3 rounded-md">
                                                Menu principal
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-2">
                                                <div className="flex flex-col gap-1 mt-1">
                                                    <Link
                                                        href="/"
                                                        className="block text-sm py-2.5 px-3 rounded-md hover:bg-accent transition-colors"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <div className="font-medium mb-0.5">Accueil</div>
                                                        <p className="text-muted-foreground text-xs leading-relaxed">
                                                            Découvrez en plus sur votre futur communautée
                                                        </p>
                                                    </Link>
                                                    <Link
                                                        href="/#features"
                                                        className="block text-sm py-2.5 px-3 rounded-md hover:bg-accent transition-colors"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <div className="font-medium mb-0.5">Fonctionnalitées</div>
                                                        <p className="text-muted-foreground text-xs leading-relaxed">
                                                            Toutes les fonctionalité de notre logiciel à votre disposition
                                                        </p>
                                                    </Link>
                                                    <Link
                                                        href="/#workflow"
                                                        className="block text-sm py-2.5 px-3 rounded-md hover:bg-accent transition-colors"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <div className="font-medium mb-0.5">Accompagnement</div>
                                                        <p className="text-muted-foreground text-xs leading-relaxed">
                                                            Comment mindcare vous accompagne tout au long de votre parcour
                                                        </p>
                                                    </Link>
                                                    <Link
                                                        href="/#price"
                                                        className="block text-sm py-2.5 px-3 rounded-md hover:bg-accent transition-colors"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <div className="font-medium mb-0.5">Tarrification</div>
                                                        <p className="text-muted-foreground text-xs leading-relaxed">
                                                            Votre santé compte et ne doit pas être pris a la légère
                                                        </p>
                                                    </Link>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="components" className="border-none">
                                            <AccordionTrigger className="text-base font-medium py-3 hover:no-underline hover:bg-accent/50 px-3 rounded-md">
                                                Components
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-2">
                                                <div className="flex flex-col gap-1 mt-1">
                                                    {components.map((component) => (
                                                        <Link
                                                            key={component.title}
                                                            href={component.href}
                                                            className="block text-sm py-2.5 px-3 rounded-md hover:bg-accent transition-colors"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <div className="font-medium mb-0.5">{component.title}</div>
                                                            <p className="text-muted-foreground text-xs leading-relaxed">
                                                                {component.description}
                                                            </p>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>

                                    <Link
                                        href="/docs"
                                        className="block text-base font-medium py-3 px-3 hover:bg-accent rounded-md transition-colors"
                                        onClick={() => setOpen(false)}
                                    >
                                        Docs
                                    </Link>
                                </nav>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </section>
    );
};

const components: { title: string; href: string; description: string }[] = [
    {
        title: "CGV & CGU",
        href: "/cgv-cgu",
        description:
            "Consulter nos condition d'utilisation et de ventes",
    },
    {
        title: "Politique de confidentialitée",
        href: "/confidentialite",
        description:
            "Le secret médical est aussi important pour nous. Consulté nos certification et nos brevet",
    },
    {
        title: "Foire aux question",
        href: "/faq",
        description:
            "Des questions sans réponse ? consulté notre FAQ pour en savoir plus",
    },
    {
        title: "Newsletter",
        href: "/newsletter",
        description:
            "Suivez toute nos nouveauté et également les informations hebdomadaire sur la santée",
    },
    {
        title: "Contactez-nous !",
        href: "/contact",
        description:
            "Un problème, une question ? contactez nous et ayais une réponse sous 24h maximum",
    },
    {
        title: "Qui somme nous ?",
        href: "/contact",
        description:
            "Découvrer l'équipe et le projet dérrière mindcare",
    },
]