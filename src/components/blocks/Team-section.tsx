import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMember {
    id: string;
    name: string;
    role: string;
    avatar: string;
}

interface Team1Props {
    heading?: string;
    subheading?: string;
    description?: string;
    members?: TeamMember[];
}

export const TeamSection = ({
                   heading = "L'équipe dérrière ce projet",
                   description = "Pour que tout cela soit possible une équipe française à pris les choses en main",
                   members = [
                       {
                           id: "member-1",
                           name: "Tanguy Gibrat",
                           role: "CO-CEO & Founder",
                           avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
                       },
                       {
                           id: "member-2",
                           name: "Romain Farinacci",
                           role: "CO-CEO",
                           avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
                       },
                       {
                           id: "member-3",
                           name: "Nathan Matounga",
                           role: "Head of stategie",
                           avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
                       },
                       {
                           id: "member-4",
                           name: "Aboubakr Chaouki",
                           role: "Lead Designer",
                           avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
                       },
                       {
                           id: "member-5",
                           name: "Rinat Hirvanov",
                           role: "Designer",
                           avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
                       },
                       {
                           id: "member-6",
                           name: "Fethy Ramdany",
                           role: "Product owner",
                           avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
                       },
                       {
                           id: "member-7",
                           name: "Dyan Bouraoui",
                           role: "CTO - Devops",
                           avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
                       },
                   ],
               }: Team1Props) => {
    return (
        <section className="py-32">
            <div className="container flex flex-col items-center text-center">
                <h2 className="my-6 text-pretty text-2xl font-bold lg:text-4xl">
                    {heading}
                </h2>
                <p className="text-muted-foreground mb-8 max-w-3xl lg:text-xl">
                    {description}
                </p>
            </div>
            <div className="container mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                {members.map((member) => (
                    <div key={member.id} className="flex flex-col items-center">
                        <Avatar className="mb-4 size-20 border md:mb-5 lg:size-24">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name}</AvatarFallback>
                        </Avatar>
                        <p className="text-center font-medium">{member.name}</p>
                        <p className="text-muted-foreground text-center">{member.role}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
