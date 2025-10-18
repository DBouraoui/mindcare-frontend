import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-10">
            {/* Bloc principal */}
            <div className="w-full max-w-2xl space-y-6">
                {/* Titre */}
                <div className="flex flex-col items-center space-y-3">
                    <Skeleton className="h-10 w-3/4 rounded-lg" />
                    <Skeleton className="h-4 w-1/2 rounded-lg" />
                </div>

                {/* Bloc de contenu */}
                <div className="space-y-4 mt-8">
                    <Skeleton className="h-screen w-full rounded-xl" />
                </div>

                {/* CTA ou bas de page */}
                <div className="flex justify-center mt-10">
                    <Skeleton className="h-10 w-40 rounded-full" />
                </div>
            </div>
        </div>
    )
}
