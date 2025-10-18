"use client";

import useGetPraticienInformations from "@/query/useGetPraticienInformations";
import DisplayPraticien from "@/components/blocks-dashboard/praticien/Display-praticien";

interface PageProps {
    params: { id: string };
}

export default function Page({ params }: PageProps) {
    const { id } = params;
    const { data, isLoading, isError } = useGetPraticienInformations(id);

    if (isLoading) return <p>Chargement...</p>;
    if (isError) return <p className="text-red-500">Erreur lors du chargement.</p>;
    if (!data) return <p>Aucun praticien trouvé.</p>;

    return (
        <DisplayPraticien praticien={data} />
    );
}
