import {Skeleton} from "@/components/ui/skeleton";

export default function loading(){
    return (
        <div className="container mx-auto px-4 py-10">
            <div className="mb-10">
                <Skeleton className="h-12 w-1/2 rounded-lg mb-4" />
                <Skeleton className="h-6 w-1/3 rounded-lg" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, idx) => (
                    <div key={idx} className="flex flex-col space-y-3">
                        <Skeleton className="h-[125px] w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 flex flex-col items-center space-y-4">
                <Skeleton className="h-6 w-40 rounded-lg" />
                <Skeleton className="h-4 w-64 rounded-lg" />
            </div>
        </div>
    )
}